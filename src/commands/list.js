const config = require('config');
const fs = require('fs');
const path = require('path');
const { checkDirExist } = require('../utils/utils');

async function list(dirName) {
  try {
    const dirPath = path.join(config.get('FS_DIR'), dirName);

    await checkDirExist(dirPath)
      .then(async (dirExists) => {
        if (!dirExists) {
          throw new Error(`FS operation failed. Directory "${dirName}" does not exist!`);
        }
      });

    const filesList = await fs.promises.readdir(dirPath, { withFileTypes: true })
      .then(async (files) => {
        return files.filter(file => file.isFile()).map(file => file.name).join(', ') || 'no files';
      });

    console.log(`Directory "${dirName}" contains files: ${filesList}`);
  } catch (error) {
    console.error(error.message);
  }
}

list('files');