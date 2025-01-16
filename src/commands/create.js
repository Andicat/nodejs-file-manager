const config = require('config');
const fs = require('fs');
const path = require('path');
const { checkDirExist, createDir, checkFileExists } = require('../utils/utils');

async function create(dirPathName, fileName, content) {
  const dirPath = path.join(config.get('FS_DIR'), dirPathName);

  try {
    await checkDirExist(dirPath)
      .then(async (dirExists) => {
        if (!dirExists) {
          await createDir(dirPath);
        }
      })

    const filePath = path.join(dirPath, fileName);

    await checkFileExists(filePath)
    .then(async (fileExists) => {
      if (fileExists) {
        throw new Error(`FS operation failed. File "${filePath}" already exists!`);
      }
    });

    await fs.promises.writeFile(filePath, content, 'utf8');

    console.log(`File "${fileName}" has been successfully created in the "${dirPathName}" directory!`);
  } catch (error) {
    console.error(error.message);
  }
}

create('files', 'fresh.txt', "I am fresh and young");
