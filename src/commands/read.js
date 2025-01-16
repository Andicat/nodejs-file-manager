const config = require('config');
const fs = require('fs');
const path = require('path');
const { checkFileExists } = require('../utils/utils');

async function read(fileName) {
  try {
    const filePath = path.join(config.get('FS_FILES_DIR'), fileName);

    await checkFileExists(filePath)
      .then(async (fileExists) => {
        if (!fileExists) {
          throw new Error(`FS operation failed. File "${filePath}" does not exist!`);
        }
      });

    const content = await fs.promises.readFile(filePath, 'utf-8');

    console.log(`File "${fileName}" contains:\n"${content}"`);
  } catch (error) {
    console.error(error.message);
  }
}

read('fileToRead.txt');