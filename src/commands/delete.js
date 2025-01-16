const config = require('config');
const fs = require('fs');
const path = require('path');
const { checkFileExists } = require('../utils/utils');

async function deleteFile(fileName) {
  try {
    const filePath = path.join(config.get('FS_FILES_DIR'), fileName);

    await checkFileExists(filePath)
      .then(async (fileExists) => {
        if (!fileExists) {
          throw new Error(`FS operation failed. File "${filePath}" does not exist!`);
        }
      });

    await fs.promises.unlink(filePath);

    console.log(`File "${fileName}" has been successfully deleted!`);
  } catch (error) {
    console.error(error.message);
  }
}

deleteFile('fileToRemove.txt');