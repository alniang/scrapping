const fs = require("fs");
var jsonMerger = require("json-merger");

var resultAbenafrica = jsonMerger.mergeFiles([
  "./json/abenafrica/abenafrica.json",
  "./json/abenafrica/abenafrica-logos.json",
  "./json/abenafrica/abenafrica-urls.json",
]);
var resultAfrikrea = jsonMerger.mergeFiles([
  "./json/afrikrea/afrikrea-urls.json",
  "./json/afrikrea/afrikrea-logos.json",
  "./json/afrikrea/afrikrea-titres.json",
  "./json/afrikrea/afrikrea-prix.json",
]);

let dataAbenafrica = JSON.stringify(resultAbenafrica, null, 2);
fs.writeFileSync("./json/abenafrica/fusionAbenafrica.json", dataAbenafrica);
fs.writeFileSync("../configMongoDB/dataset/fusionAbenafrica.json", dataAbenafrica);

let dataAfrikrea = JSON.stringify(resultAfrikrea, null, 2);
fs.writeFileSync("./json/afrikrea/fusionAfrikrea.json", dataAfrikrea);
fs.writeFileSync("../configMongoDB/dataset/fusionAfrikrea.json", dataAfrikrea);
