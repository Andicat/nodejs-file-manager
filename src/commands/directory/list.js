const fs = require("fs");

async function list() {
  try {
    await fs.promises
      .readdir(process.cwd(), { withFileTypes: true })
      .then(async (items) => {
        const foldersAndFiles = items
          .map((item) => ({ isFolder: item.isDirectory(), name: item.name }))
          .sort((a, b) => a.name.localeCompare(b.name));
        const folders = foldersAndFiles.filter(({ isFolder }) => isFolder);
        const files = foldersAndFiles.filter(({ isFolder }) => !isFolder);

        console.log(`Folders: ${folders.length ? "" : "no folders"}`);
        folders.forEach((folder) => {
          console.log(`  ${folder.name}`);
        });

        console.log(`Files: ${files.length ? "" : "no files"}`);
        files.forEach((file) => {
          console.log(`  ${file.name}`);
        });
      });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { list };
