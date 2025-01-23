const fs = require("fs");
const { checkFileExists } = require("../../utils/utils");

async function read(args) {
  try {
    const filePath = args.join(" ");
    if (!filePath) {
      throw new Error("Invalid input: no path provided");
    }

    const fileExists = await checkFileExists(filePath);
    if (!fileExists) {
      throw new Error(`Invalid input. File "${filePath}" does not exist!`);
    }

    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath, "utf8");

      console.log(`File "${filePath}" contains:`);

      readStream.on("data", (data) => {
        process.stdout.write(data);
      });

      readStream.on("end", () => {
        console.log("");
        resolve();
      });

      readStream.on("error", (err) => {
        reject(new Error(`Error reading the file: ${err.message}`));
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { read };
