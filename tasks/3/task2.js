const EventEmitter = require("./task1");

class WithTime extends EventEmitter {
  async execute(asyncFunction) {
    this.emit("begin");
    console.time("execute");
    try {
      const data = await asyncFunction();
      console.timeEnd("execute");
      this.emit("end");
      this.emit("data", JSON.stringify(data));
    } catch (error) {
      this.emit("error", error);
    }
  }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
withTime.on("data", (data) => console.log(`Data received: ${data}`));
withTime.on("error", (error) => console.error(`Error: ${error.message}`));

withTime.execute(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return response.json();
});

console.log(withTime.rawListeners("end"));
