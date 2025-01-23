const path = require("path");
const { checkDirExist } = require("../../utils/utils");

async function change(args) {
  try {
    const targetDir = args.join(" ");
    if (!targetDir) {
      throw new Error("Invalid input: no path provided");
    }

    const resolvedDir = path.isAbsolute(targetDir)
      ? targetDir
      : path.join(process.cwd(), targetDir);

    const dirExists = await checkDirExist(resolvedDir);
    if (!dirExists) {
      throw new Error(`Invalid input. Folder "${targetDir}" does not exist`);
    }

    process.chdir(resolvedDir);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { change };
