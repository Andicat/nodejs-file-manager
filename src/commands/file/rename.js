const fs = require("fs");
const { checkFileExists } = require("../../utils/utils");

async function rename([filePath, newFilePath]) {
  try {
    if (!filePath || !newFilePath) {
      throw new Error("Invalid input. Names are not provided");
    }

    const fileExists = await checkFileExists(filePath);
    if (!fileExists) {
      throw new Error(`Invalid input. File "${filePath}" does not exist!`);
    }

    const newfileExists = await checkFileExists(newFilePath);
    if (newfileExists) {
      throw new Error(`Invalid input. File "${newFilePath}" already exists!`);
    }

    await fs.promises.rename(filePath, newFilePath);

    console.log(
      `File "${filePath}" has been successfully renamed to "${newFilePath}"!`,
    );
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { rename };
