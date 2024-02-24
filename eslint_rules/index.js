const fs = require("fs");
const path = require("path");

const ruleFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "index.js" && !file.endsWith("test.js"));

// Use `require` to dynamically import the rules based on the filenames.
// This assumes that the rules are CommonJS modules.
const rules = ruleFiles.reduce((acc, file) => {
  const ruleName = path.basename(file, ".js");
  acc[ruleName] = require("./" + file);
  return acc;
}, {});

module.exports = { rules };
