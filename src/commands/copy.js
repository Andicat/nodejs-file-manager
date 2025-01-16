const config = require('config');
const fs = require('fs');
const path = require('path');
const { checkDirExist, createDir } = require('../utils/utils');

async function copy(srcDirName, destDirName) {
  try {
    const scrDirPath = path.join(config.get('FS_DIR'), srcDirName);

    await checkDirExist(scrDirPath)
      .then(async (dirExists) => {
        if (!dirExists) {
          throw new Error('FS operation failed');
        }
      });

    const destDirPath = path.join(config.get('FS_DIR'), destDirName);

    await checkDirExist(destDirPath)
      .then(async (dirExists) => {
        if (!dirExists) {
          await createDir(destDirPath);
        } else {
          throw new Error(`FS operation failed. Folder "${destDirName}" already exists!`);
        }
      });

    await fs.promises.cp(scrDirPath, destDirPath, { recursive: true });

    console.log(`Folder "${srcDirName}" has been successfully copied to "${destDirName}"!`);
  } catch (error) {
    console.error(error.message);
  }
}

copy('files', "files_copy");