const fs = require("fs");
const path = require("path");
const COLORS = require("./color");

exports.initHandler = () => {
  const configPath = path.resolve(process.cwd(), "check-keywords.config.js");
  if (fs.existsSync(configPath)) {
    console.log(COLORS.yellow("Configuration file already exists!"));
    return;
  }

  const template = `module.exports = {
    KEYWORDS: ["mock.*", "console.log"],
    ALLOWED_COMMENTS: ["//", "/*", "{/*", "<!--"],
    FILE_INCLUDE: [
      /^pages\\/.*\\.(js|jsx|ts|tsx)$/,
      /^components\\/.*\\.(js|jsx|ts|tsx)$/,
    ],
    FILE_EXCLUDE: /(-mock.|.test.)/,
  };`;

  try {
    fs.writeFileSync(configPath, configContent);
    console.log(
      COLORS.green(`Configuration file generated: ${defaultConfigFile}`)
    );
  } catch (error) {
    console.error("Configuration file generation failed:", error.message);
    process.exit(1);
  }
};
