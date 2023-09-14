const csvtojson = require("csvtojson");
const fs = require("fs");
const { pipeline } = require("stream");

const csvFilePath = "./tasks/3/csvdirectory/nodejs.csv";
const txtFilePath = "./tasks/3/csvdirectory/nodejs.txt";

const csvReadStream = fs.createReadStream(csvFilePath);
const txtWriteStream = fs.createWriteStream(txtFilePath);

const csvToJsonTransform = csvtojson({
  noheader: true,
  headers: ["book", "author", "amount", "price"],
  colParser: {
    price: "number",
  },
  ignoreColumns: /amount/,
  downstreamFormat: "line",
});

pipeline(csvReadStream, csvToJsonTransform, txtWriteStream, (error) => {
  if (error) {
    console.error("Pipeline failed:", error);
  } else {
    console.log("Conversion completed successfully.");
  }
});
