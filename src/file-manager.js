const readline = require("readline");
const { printCurrentDir } = require("./utils/utils");
const { list } = require("./commands/directory/list");
const { change } = require("./commands/directory/change");
const { moveUp } = require("./commands/directory/move-up");
const { read } = require("./commands/file/read");
const { add } = require("./commands/file/add");
const { rename } = require("./commands/file/rename");
const { copy } = require("./commands/file/copy");
const { hash } = require("./commands/file/hash");
const { osc } = require("./commands/osc");

function fileManager() {
  const dirCommands = {
    ls: () => list(),
    cd: (args) => change(args),
    up: () => moveUp(),
  };

  const fileCommands = {
    cat: (args) => read(args),
    add: (args) => add(args),
    rn: (args) => rename(args),
    cp: (args) => copy(args),
    hash: (args) => hash(args),
  };

  const username =
    process.argv
      .slice(2)
      .find((arg) => arg.startsWith("--username="))
      ?.replace("--username=", "") || "";

  console.log(`Welcome to the File Manager${username ? ", " + username : ""}!`);

  printCurrentDir();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (input) => {
    const [command, ...args] = input.trim().split(" ");

    const commands = {
      ...dirCommands,
      ...fileCommands,
      os: (args) => osc(args),
    };

    try {
      if (command === ".exit") {
        rl.close();
        return;
      }
      if (commands[command]) {
        await commands[command](args);
        printCurrentDir();
      } else {
        throw new Error("Invalid input");
      }
    } catch (error) {
      console.error(error.message);
    }
  });

  rl.on("close", () =>
    console.log(
      `Thank you for using File Manager${username ? ", " + username : ""}, goodbye!`,
    ),
  );
}

module.exports = { fileManager };
