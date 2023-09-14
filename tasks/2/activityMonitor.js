const { exec } = require("child_process");
const { appendFile } = require("fs");
const os = require("os");
const path = require("path");

const LOG_FILE_PATH = path.join(
  path.dirname(path.relative("./", __filename)),
  "activityMonitor.log"
);
const MS_SET_TIMEOUT = 100;

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
};

const logging = (text) => {
  appendFile(LOG_FILE_PATH, `${text}\n`, (err) => {
    if (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  });
};

const getSystemCommand = () => {
  if (os.platform() === "win32") {
    return "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
  } else {
    return "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
  }
};

const executeCommand = () => {
  exec(getSystemCommand(), (error, stdout) => {
    if (error) {
      console.error(`Command execution error: ${error}`);
      return;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const processInfo = stdout.trim();
    const seconds = currentTime % 60;
    const milliseconds = (currentTime % 1000).toString().padStart(3, "0");
    const displayText = `\r${colors.green}${seconds}.${milliseconds}${colors.reset}: ${colors.red}${processInfo}${colors.reset}`;
    process.stdout.write(displayText);
    if (currentTime % 60 === 0) {
      logging(`${currentTime}: ${processInfo}`);
    }
    setTimeout(executeCommand, MS_SET_TIMEOUT);
  });
};

const monitor = () => {
  console.log("Start monitoring the most loaded process...");
  executeCommand();
};

monitor();
