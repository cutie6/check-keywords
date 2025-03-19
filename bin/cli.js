#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { initHandler } = require("../lib/init");
const detectKeywords = require("../lib/lint");

const argv = yargs(process.argv.slice(2))
  .command({
    command: "init",
    describe: "Generate configuration file",
    handler: initHandler,
  })
  .option("p", {
    alias: "config",
    type: "string",
    description: "Configuration file",
  })
  .parse();

if (!argv._[0] || argv._[0] !== "init") {
  try {
    const configPath = path.resolve(process.cwd(), argv.p || defaultConfigFile);
    const config = require(configPath);
    const fileList = argv._;

    detectKeywords(config, fileList);
    process.exit(1);
  } catch (error) {
    console.error("Error: ", error.message);
    process.exit(1);
  }
}
