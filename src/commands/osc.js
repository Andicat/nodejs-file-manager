const os = require("os");
const { readableStr } = require("../utils/utils");

async function osc(args) {
  try {
    const osCommand = args.join(" ");

    const osCommands = {
      "--EOL": () => console.log(`End-Of-Line: "${readableStr(os.EOL)}"`),
      "--cpus": () => getCPUInfo(),
      "--homedir": () => console.log(`Home directory: "${os.homedir()}"`),
      "--username": () => console.log(`Username: "${os.userInfo().username}"`),
      "--architecture": () => console.log(`CPU architecture: "${os.arch()}"`),
    };

    if (!osCommand || !osCommands[osCommand]) {
      throw new Error("Invalid input.");
    }

    osCommands[osCommand]();
  } catch (error) {
    console.error(error.message);
  }
}

function getCPUInfo() {
  const cpus = os.cpus();

  console.log(`CPU information: \n Total count: ${cpus.length}`);

  cpus.forEach((cpu, index) => {
    console.log(
      `  Core ${index + 1}: Model: ${cpu.model}, Speed: ${cpu.speed} MHz`,
    );
  });
}

module.exports = { osc };
