const config = require('config');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const { checkFileExists } = require('../utils/utils');

async function decompress(srcfileName, destFileName) {
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
    const gunzipStream = zlib.createGunzip();

    readStream.pipe(gunzipStream).pipe(writeStream).on('finish', () => {
      console.log(`File "${srcfileName}" successfully decompressed to "${destFilePath}"!`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

decompress('archive.gz', 'fileToCompress.txt');