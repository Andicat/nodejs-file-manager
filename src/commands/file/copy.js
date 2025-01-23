const fs = require("fs");
const path = require("path");
const { checkDirExist, checkFileExists } = require("../../utils/utils");

async function copy([filePath, newDirPath]) {
  try {
    if (!filePath || !newDirPath) {
      throw new Error("Invalid input. Paths are not provided");
    }

    const fileExists = await checkFileExists(filePath);
    if (!fileExists) {
      throw new Error(`Invalid input. File "${filePath}" does not exist!`);
    }

    const dirExists = await checkDirExist(newDirPath);

    if (!dirExists) {
      throw new Error(
        `Invalid input. Directory "${newDirPath}" does not exist!`,
      );
    }

    const targetfilePath = path.join(newDirPath, filePath);

    await checkFileExists(targetfilePath).then(async (fileExists) => {
      if (fileExists) {
        throw new Error(
          `Invalid input. File "${filePath}" already exists in "${newDirPath}"!`,
        );
      }
    });

    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(path.join(newDirPath, filePath));

      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log(`File "${filePath}" copied to ${newDirPath}`);
        resolve();
      });

      writeStream.on("error", (err) => {
        reject(new Error(`Error copying the file: ${err.message}`));
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { copy };
