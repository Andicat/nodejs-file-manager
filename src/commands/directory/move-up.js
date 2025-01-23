const path = require("path");
const os = require("os");

async function moveUp() {
  try {
    const parentDir = path.dirname(process.cwd());

    if (os.homedir() === parentDir) {
      console.log("You are already at the root directory.");
    } else {
      process.chdir(parentDir);
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { moveUp };
