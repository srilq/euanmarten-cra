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

const writeImage = ({ logger }, image, path) => {
  return new Promise((resolve, reject) => {
    image.write(path, err => {
      if (err) {
        return reject(err);
      }

      logger.info(`Writing ${path}`, '✨');

      resolve(image);
    });
  });
};

const optimiseImage = ({ args }, width, height, image) => {
  let imageFormat;

  return image
    .format((err, value) => {
      if (err) {
        throw err;
      }

      if (typeof value !== 'string') {
        throw new Error('Could not determine image format');
      }

      imageFormat = value.toLowerCase();
    })
    .resize(width, height, '>')
    .quality(imageFormat === 'png' ? args.pngQuality : args.jpegQuality)
    .noProfile();
};

const createRendition = async (context, inputPath, outputPath, filename, { width, height }) => {
  const [imageFileExtension, imageName] = splitFileExtension(filename);
  const imagePath = path.join(inputPath, filename);
  const renditionPath = path.join(outputPath, `${imageName}_${width}.${imageFileExtension}`);

  try {
    const image = gm(imagePath);

    const optimisedRendition = await optimiseImage(context, width, height, image);

    return writeImage(context, optimisedRendition, renditionPath);
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

  const limit = promiseLimit(args.concurrency);

  logger.info(`Creating renditions for ${filenames.length} images`);

  const jobs = filenames.reduce((acc, filename) => {
    const renditionJobs = renditions.map(async rendition => {
      await createRendition(context, inputDir, outputDir, filename, rendition);
    });

    acc.push(...renditionJobs.map(job => limit(() => job)));

    return acc;
  }, []);

  return Promise.all(jobs);
};

module.exports = createImageRenditions;
