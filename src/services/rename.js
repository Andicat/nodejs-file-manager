const fs = require('fs');
const path = require('path');
const { checkFileExists } = require('../utils/utils');

async function remane(srcFileName, destFileName) {
  try {
    const srcFilePath = path.join(process.env.FS_DIR, srcFileName);

    await checkFileExists(srcFilePath)
      .then(async (fileExists) => {
        if (!fileExists) {
          throw new Error(`FS operation failed. File "${srcFileName}" does not exist!`);
        }
      });

    const destFilePath = path.join(process.env.FS_DIR, destFileName);

    await checkFileExists(destFilePath)
      .then(async (fileExists) => {
        if (fileExists) {
          throw new Error(`FS operation failed. File "${destFileName}" already exists!`);
        }
      });

    await fs.promises.rename(srcFilePath, destFilePath);

    console.log(`File "${srcFileName}" has been successfully renamed to "${destFileName}"!`);
  } catch (error) {
    console.error(error.message);
  }
}

remane('wrongFilename.txt', "properFilename.md");