const config = require('config');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const { checkFileExists } = require('../utils/utils');

async function compress(srcfileName, destFileName) {
  try {
    const scrFilePath = path.join(config.get('FS_FILES_DIR'), srcfileName);

    await checkFileExists(scrFilePath)
      .then(async (fileExists) => {
        if (!fileExists) {
          throw new Error(`FS operation failed. File "${srcfileName}" does not exist!`);
        }
      });

    const destFilePath = path.join(config.get('FS_FILES_DIR'), destFileName);

    const readStream = fs.createReadStream(scrFilePath);
    const writeStream = fs.createWriteStream(destFilePath);
    const gzipStream = zlib.createGzip();

    readStream.pipe(gzipStream).pipe(writeStream).on('finish', () => {
      console.log(`File "${srcfileName}" successfully compressed to "${destFilePath}"!`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

compress('fileToCompress.txt', 'archive.gz');