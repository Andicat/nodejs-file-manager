const fs = require("fs");
const { checkFileExists } = require("../../utils/utils");

async function add(args) {
  try {
    const filePath = args.join(" ");
    if (!filePath) {
      throw new Error("Invalid input: no file name provided");
    }

    const fileExists = await checkFileExists(filePath);
    if (fileExists) {
      throw new Error(`File "${filePath}" already exists!`);
    }

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      writeStream.write("");
      writeStream.end(() => {
        console.log(`File "${filePath}" created successfully.`);
        resolve();
      });

      writeStream.on("error", (err) => {
        reject(new Error(`Error creating the file: ${err.message}`));
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { add };
