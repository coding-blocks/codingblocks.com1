# coding-blocks.github.io

[![Build Status](https://travis-ci.org/coding-blocks/coding-blocks.github.io.svg?branch=gulp)](https://travis-ci.org/coding-blocks/coding-blocks.github.io)


## Build Setup
``` bash
# install dependencies
npm install

# build for production with minification
npm run build
```

## Tasks
``` bash
# minify src images
gulp compress

# clean tmp and dist
gulp clean
```

## Project Structure

    .
    ├── dist                    # Compiled files (auto deployed to master)
    ├── gulp                    # Gulp tasks and config
    ├── src                     # Source files
    └── ...

## Gulp Structure

    .
    ├── ...
    ├── gulp
    │   ├── tasks               # Task.js files
    │   ├── config.js           # Exports module for tasks config
    └── ...

## Src Structure

    .
    ├── ...
    ├── src
        ├── ...
    │   ├── assets             # assets for the website
    │       ├── fonts
    │       ├── images
    │       ├── scripts
    │       ├── styles
    |   ├── data                # Common data for all pages
        ├── helpers             # Handlebars helpers (js exporting a function in module)
        ├── partials            # Handlebars partials (hbs template)
        ├── index.hbs           # HBS template file 
        ├── index.json          # JSON file for the HBS (/src/index.hbs)
    │   ├── ...
    └── ...
