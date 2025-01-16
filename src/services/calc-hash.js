const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { checkFileExists } = require('../utils/utils');

async function calcHash(fileName) {
  try {
    const filePath = path.join(process.env.FS_DIR, fileName);

    await checkFileExists(filePath)
      .then(async (fileExists) => {
        if (!fileExists) {
          throw new Error(`FS operation failed. File "${fileName}" does not exist!`);
        }
      });

    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('data', chunk => hash.update(chunk));

    return new Promise(() => {
      stream.on('end', () => console.log(`File "${fileName}" SHA256 hash: ${hash.digest('hex')}`));
      stream.on('error', err => { throw err });
    });
  } catch (error) {
    console.error(error.message);
  }
}

calcHash('fileToCalculateHashFor.txt');