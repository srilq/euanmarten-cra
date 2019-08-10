#!/usr/bin/env node

const path = require('path');
const fs = require('fs').promises;
const del = require('del');
const createLoggerFn = require('./utils/logger');
const createImageRenditions = require('./utils/create-image-renditions');

const CONTEXT = {
  args: {
    inputDir: path.join('build', 'images'),
    outputDir: path.join('build', 'images', 'renditions'),
    concurrency: 5,
    fileTypes: ['jpg', 'jpeg', 'png'],
    quality: {
      jpeg: 90,
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
  },
  logger: {
    info: createLoggerFn(console.info, '  '),
    warn: createLoggerFn(console.warn, '⚠️'),
    error: createLoggerFn(console.error, '🚨')
  }
};

const exec = async context => {
  const { logger, args } = context;

  try {
    await del(args.outputDir);
    await fs.mkdir(args.outputDir, { recursive: true });
    await createImageRenditions(context);
    logger.info('Finished!', '✅');
  } catch (err) {
    logger.error(err);
    logger.error('Something went wrong, terminating process');
    setImmediate(process.exit.bind(process, 1));
  }
};

exec(CONTEXT);
