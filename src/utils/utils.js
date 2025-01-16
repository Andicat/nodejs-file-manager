const fs = require('fs');



async function checkDirExist(path) {
  console.log('checkDirExist', path)
  try {
    await fs.promises.access(path);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

async function createDir(path) {
  console.log('createDir', path)
  try {
    await fs.promises.mkdir(path);
  }
  catch {
    throw new Error('FS operation failed');
  }
}

async function checkFileExists(path) {
  console.log('checkFileExists', path)
  try {
    await fs.promises.access(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw new Error('FS operation failed');
  }
}

module.exports = { checkDirExist, createDir, checkFileExists };
