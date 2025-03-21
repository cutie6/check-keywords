const fs = require("fs");
const path = require("path");
const { COLORS, defaultConfigFile } = require("./common");

exports.initHandler = () => {
  const configPath = path.resolve(process.cwd(), defaultConfigFile);
  if (fs.existsSync(configPath)) {
    console.log(COLORS.yellow("Configuration file already exists!"));
    return;
  }

  const template = `module.exports = {
    KEYWORDS: ["mock.*", "console.log"],
    ALLOWED_COMMENTS: ["//", "/*", "{/*", "<!--"],
    FILE_INCLUDE: [
      /\\.(js|jsx|ts|tsx)$/,
    ],
    FILE_EXCLUDE: /(-mock.|.test.)/,
  };`;

  try {
    fs.writeFileSync(configPath, template);
    console.log(COLORS.green(`Configuration file generated: ${configPath}`));
  } catch (error) {
    console.error("Configuration file generation failed:", error.message);
    process.exit(1);
  }
};
