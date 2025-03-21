const { execSync } = require("child_process");
const { COLORS } = require("./common");

function getFileDiff(filePath) {
  try {
    return execSync(`git diff --cached --unified=0 -- ${filePath}`, {
      encoding: "utf8",
      windowsHide: true,
    });
  } catch (e) {
    return "";
  }
}

function detectKeywords(CONFIG, files) {
  let hasError = false;

  files.forEach((file) => {
    if (
      !CONFIG.FILE_INCLUDE.some((regex) => regex.test(file)) ||
      CONFIG.FILE_EXCLUDE.test(file)
    )
      return;

    const diffContent = getFileDiff(file);
    const addedLines = diffContent
      .split("\n")
      .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
      .map((line) => line.slice(1));

    const violations = [];
    addedLines.forEach((line, index) => {
      CONFIG.KEYWORDS.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        if (regex.test(line)) {
          const isCommented = CONFIG.ALLOWED_COMMENTS.some((prefix) =>
            line.trim().startsWith(prefix)
          );
          if (!isCommented) {
            violations.push({
              keyword,
              code: line.trim().slice(0, 50),
            });
          }
        }
      });
    });

    if (violations.length > 0) {
      hasError = true;
      console.log(COLORS.red(`\n❌ Keyword submission detected: \b ${file}`));
      violations.forEach(({ keyword, code }) => {
        console.log(
          `  Keyword: ${COLORS.yellow(keyword)}  Code snippet: ${COLORS.red(
            code
          )}`
        );
      });
    }
  });

  if (hasError) {
    console.log(
      COLORS.red(
        "The submission has been blocked. Please fix the above issues and resubmit."
      )
    );
    process.exit(1);
  } else {
    console.log(
      COLORS.green(
        "✅ The code has passed the detection and can be submitted safely!"
      )
    );
  }
}

module.exports = detectKeywords;
