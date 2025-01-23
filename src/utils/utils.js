const fs = require("fs");

function printCurrentDir() {
  console.log(`You are currently in ${process.cwd()}`);
}

function readableStr(str) {
  return str
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/\f/g, "\\f")
    .replace(/\v/g, "\\v");
}

async function checkDirExist(path) {
  try {
    await fs.promises.access(path);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  }
}

async function createDir(path) {
  try {
    await fs.promises.mkdir(path);
  } catch {
    throw new Error("FS operation failed");
  }
}

async function checkFileExists(path) {
  try {
    await fs.promises.access(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw new Error("FS operation failed");
  }
}

module.exports = {
  checkDirExist,
  createDir,
  checkFileExists,
  printCurrentDir,
  readableStr,
};
