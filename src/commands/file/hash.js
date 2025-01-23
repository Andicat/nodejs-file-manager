const fs = require("fs");
const crypto = require("crypto");
const { checkFileExists } = require("../../utils/utils");

async function hash([filePath]) {
  try {
    if (!filePath) {
      throw new Error(`Invalid input. File "${filePath}" does not exist!`);
    }

    const fileExists = await checkFileExists(filePath);
    if (!fileExists) {
      throw new Error(`Invalid input. File "${filePath}" does not exist!`);
    }

    await new Promise((resolve, reject) => {
      const hash = crypto.createHash("sha256");
      const stream = fs.createReadStream(filePath);

      stream.on("data", (chunk) => hash.update(chunk));

      stream.on("end", () => {
        console.log(`File "${filePath}" SHA256 hash: ${hash.digest("hex")}`);
        resolve();
      });

      stream.on("error", (err) =>
        reject(new Error(`Error calculating hash: ${err.message}`)),
      );
    });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { hash };
