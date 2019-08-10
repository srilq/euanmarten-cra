const path = require('path');
const fs = require('fs').promises;
const promiseLimit = require('promise-limit');
const gm = require('gm');

const splitFileExtension = filename => {
  const DELIMITER = '.';
  const filenameSegments = filename.split(DELIMITER);
  const fileExtension = filenameSegments.pop();
  return [fileExtension, filenameSegments.join(DELIMITER)];
};

const getImageFilenames = async ({ args }, pathToDir) => {
  const files = await fs.readdir(pathToDir);

  const imageFilenames = files.filter(filename => {
    const [extension] = splitFileExtension(filename);
    return extension && args.fileTypes.includes(extension.toLowerCase());
  });

  return imageFilenames;
};

const writeImage = (image, path) => {
  return new Promise((resolve, reject) => {
    image.write(path, err => {
      if (err) {
        return reject(err);
      }

      resolve(image);
    });
  });
};

const getImageFormat = ({ filename }, image) => {
  return new Promise((resolve, reject) => {
    image.format((err, value) => {
      if (err) {
        return reject(err);
      }

      if (typeof value !== 'string') {
        return reject(new Error(`Failed to determine image format for ${filename}`));
      }

      return resolve(value.toLowerCase());
    });
  });
};

const optimiseImage = async (context, width, height, image) => {
  const { args } = context;

  const imageFormat = await getImageFormat(context, image);

  return image
    .resize(width, height, '>')
    .quality(args.quality[imageFormat] || args.quality.jpeg)
    .noProfile();
};

const createRendition = async (context, inputPath, outputPath, filename, { width, height }) => {
  const { logger } = context;

  const [imageFileExtension, imageName] = splitFileExtension(filename);

  const imagePath = path.join(inputPath, filename);
  const renditionPath = path.join(outputPath, `${imageName}_${width}.${imageFileExtension}`);

  try {
    const image = gm(imagePath);

    const optimisedImage = await optimiseImage({ ...context, filename }, width, height, image);

    await writeImage(optimisedImage, renditionPath);

    logger.info(`Created ${renditionPath}`, '✨');
  } catch (err) {
    err.message = `Error optimising image ${filename}:\n${err.message || ''}`;
    throw err;
  }
};

const createImageRenditions = async context => {
  const { logger, args } = context;
  const { inputDir, outputDir, renditions } = args;

  logger.info(`Finding images in directory ${args.inputDir}`, '🔎');

  const filenames = await getImageFilenames(context, args.inputDir);

  logger.info(`Creating optimised renditions for ${filenames.length} images`);

  const limit = promiseLimit(args.concurrency);
  const jobs = filenames.reduce((acc, filename) => {
    const renditionJobs = renditions.map(rendition => async () => {
      await createRendition(context, inputDir, outputDir, filename, rendition);
    });

    acc.push(...renditionJobs.map(job => limit(() => job())));

    return acc;
  }, []);

  return Promise.all(jobs);
};

module.exports = createImageRenditions;
