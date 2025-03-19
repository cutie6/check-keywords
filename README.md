## Overview
A tool to check keywords in code to be committed.

## Install
```bash
npm install --save-dev check-keywords
```

## Init
To generate default configuration file `check-keywords.config.js`
```bash
npx check-keywords init 
```
Then you can customize your configurations in `check-keywords.config.js`

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
npx check-keywords src/xxx.js src/xxx.ts
```

### Use custom configuration file
```bash
npx check-keywords -p your.config.js src/xxx.js src/xxx.ts
```