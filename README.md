## Overview
A tool to check keywords in code to be committed.

## Install
```bash
npm install --save-dev check-keywords
```

## Init
To generate default configuration file `check-keywords.config.js`
```bash
check-keywords init 
```

## Lint
### Work with lint-stage(Recommended)
```
 "lint-staged": {
    "*.ts|*.tsx": [
      "npx tsc-files --noEmit",
      "eslint --max-warnings 0 --fix",
      "check-keywords"
    ]
  }
```

### Use it alone
```bash
check-keywords src/xxx.js src/xxx.ts
```
