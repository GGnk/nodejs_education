const { exec } = require("child_process");
const { appendFile } = require("fs");
const os = require("os");
const path = require("path");

const LOG_FILE_PATH = path.join(
  path.dirname(path.relative("./", __filename)),
  "activityMonitor.log"
);
const MS_SET_TIMEOUT = 100;

const logging = (processInfo) => {
  const logEntry = `${Date.now()} : ${processInfo}\n`;
  appendFile(LOG_FILE_PATH, logEntry, (err) => {
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
    const processInfo = stdout.trim();
    process.stdout.write(`\x1b[31m \r${processInfo}`);
    logging(processInfo);
    setTimeout(executeCommand, MS_SET_TIMEOUT);
  });
};

const monitor = () => {
  console.log("Start monitoring the most loaded process...");
  executeCommand();
};

monitor();
