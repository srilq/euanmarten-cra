#!/usr/bin/env node

const path = require('path');
const fs = require('fs').promises;
const del = require('del');
const createLoggerFn = require('./utils/logger');
const createImageRenditions = require('./utils/create-image-renditions');

const config = {
  inputDir: path.join('build', 'images'),
  outputDir: path.join('build', 'images', 'renditions'),
  concurrency: 5,
  fileTypes: ['jpg', 'jpeg', 'png'],
  quality: {
    // JPEG compression (lossy)
    // higher number means better quality
    // but larger file size
    jpeg: 90,
    // PNG commpression (lossless)
    // higher number means smaller file size
    // but it takes longer
    png: 100
  },
  renditions: [
    {
      width: 100
    },
    {
      width: 200
    }
  ],
};

const exec = async config => {
  const logger = {
    info: createLoggerFn(console.info, '  '),
    warn: createLoggerFn(console.warn, '⚠️'),
    error: createLoggerFn(console.error, '🚨')
  };

  try {
    await del(config.outputDir);
    await fs.mkdir(config.outputDir, { recursive: true });
    await createImageRenditions({
      args: config,
      logger
    });
    logger.info('Finished!', '✅');
  } catch (err) {
    logger.error(err);
    logger.error('Something went wrong, terminating process');
    setImmediate(process.exit.bind(process, 1));
  }
};

exec(config);
