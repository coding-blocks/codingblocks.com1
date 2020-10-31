# coding-blocks.github.io

## Deploys

[![Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://app.netlify.com/sites/cb-netlify-prod)  
Commits to master and PRs are automatically built and deployed by Netlify


## Contributions and PR

 - PRs should be generated against `master`
 - Wait for `@codingblocks-bot` to deploy site and paste link of preview 
 - Check preview. If all good, then only `PR -> master` merge is made
 - how can i help you
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
    │   └── config.js           # Exports module for tasks config
    └── ...

## Src Structure

    .
    ├── ...
    ├── src
    │   ├── ...
    │   ├── assets              # assets for the website
    │   │   ├── fonts
    │   │   ├── images
    │   │   ├── scripts
    │   │   ├── styles
    |   ├── data                # Common JSON data for all pages
    |   ├── helpers             # Handlebars helpers (js exporting a function in module)
    |   ├── partials            # Handlebars partials (hbs template)
    |   ├── index.hbs           # HBS template file 
    |   ├── index.json          # JSON file for the HBS (/src/index.hbs)
    │   └── ...
    └── ...

## Data

Common JSON data for all pages

    .
    ├── ...
    ├── src
    │   ├── ...
    │   ├── data             
    │   │   ├── bootcamps.json      # Bootcamps data (price table and upcoming batches)
    │   │   ├── courses.json        # Courses data (price table and upcoming batches)
    │   │   ├── footer.json         # Footer imgSrc data
    │   │   ├── navbar.json         # Navbar imgSrc data
    │   │   ├── reviews.json        # All reviews data
    │   │   ├── team.json           # All team member's data
    │   └── ...
    └── ...

## Helpers

Js files export modules with a single function.

    .
    ├── ...
    ├── src
    │   ├── ...
    │   ├── helpers             
    │   │   ├── ifEquals.js     # In-case Sensitive matching of a string
    │   │   ├── relativePath.js # Generate relative path from two absolute path strings
    │   │   ├── removeComma.js  # Remove commas from a string
    │   └── ...
    └── ...

**Example:**

```
module.exports = function (..., options) {
.
.
.
}
```

## Partials

Handlebars Template files

    .
    ├── ...
    ├── src
    │   ├── ...
    │   ├── partials                        
    │   │   ├── bootcamps.hbs               # Bootcamps section
    │   │   ├── centerlocation.hbs          # Center location & contact Box
    │   │   ├── course.hbs                  # Course price box 
    │   │   ├── coursecontents.hbs          # Course content section
    │   │   ├── courseenroll.hbs            # Upcoming batches and price box section
    │   │   ├── coursefaq.hbs               # Course Faq section
    │   │   ├── coursehighlights.hbs        # Course Highlights section
    │   │   ├── courses.hbs                 # Courses section
    │   │   ├── courseSchema.hbs            # Course JSON-LD Schema
    │   │   ├── footer.hbs                  # Footer container
    │   │   ├── head.hbs                    # Site-wide head dependencies
    │   │   ├── header.hbs                  # Page header section
    │   │   ├── map.hbs                     # Contact form with map section
    │   │   ├── meta.hbs                    # Meta & open graph tags
    │   │   ├── navbar.hbs                  # Navbar section
    │   │   ├── numbers.hbs                 # Numbers Speak Louder section
    │   │   ├── overview.hbs                # Course overview section
    │   │   ├── readmoretestimonials.hbs    # Read more reviews buttons section
    │   │   ├── registration.hbs            # Registration iframe section
    │   │   ├── scripts.hbs                 # Site-wide body bottom JS dependencies
    │   │   ├── slider.hbs                  # Slider section
    │   │   ├── team.hbs                    # Team section
    │   │   ├── teamMember.hbs              # Team member box
    │   │   ├── whatstudentssay.hbs         # Reviews Section
    │   └── ...
    └── ...
