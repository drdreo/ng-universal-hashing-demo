This is a fork from: https://github.com/mzuccaroli/universal-multisite-multilanguage

# Angular Universal Multisite Multilanguage Bug replication

This repo demonstrates the use of Angular Universal Server-side Rendering applied to a multilanguage and multisite application
Starting from a simple application codebase it automatically generates two parallel sites with differents assets and contens
and translated version of them using i18n and xliffmerge.
The express server is configured to serve each site in a different port (4002 and 4001)

The different usage of images are handled differently in universal. Images in templates are hashed and used only by the client app, the server has no access to this hashed images and doesn't find them. Only when the client app takes over, the images are rendered.
Disabling hashing makes it possible for the server to access the correct image.

### This project is based on Angular Universal Starter

![Angular Universal](https://angular.io/generated/images/marketing/concept-icons/universal.png)

A minimal Angular starter for Universal JavaScript using the [Angular CLI](https://github.com/angular/angular-cli)
If you're looking for the Angular Universal repo go to [**angular/universal**](https://github.com/angular/universal)  

## Getting Started

This demo is built following the [Angular CLI Wiki guide](https://github.com/angular/angular-cli/wiki/stories-universal-rendering)

We're utilizing packages from the [Angular Universal @nguniversal](https://github.com/angular/universal) repo, such as [ng-module-map-ngfactory-loader](https://github.com/angular/universal/modules/module-map-ngfactory-loader) to enable Lazy Loading.

---

### Build Time Pre-rendering vs. Server-side Rendering (SSR)
This repo demonstrates the use of Server-side Rendering.

**Server-side Rendering (SSR)**
* Happens at runtime
* Uses `ngExpressEngine` to render your application on the fly at the requested url.

---

### Installation
* `npm install` or `yarn`

### Development (Client-side only rendering)
* run `npm run start:site1` which will start `ng serve` for site 1 configuration
* run `npm run start:site2` which will start `ng serve` for site 2 configuration

### Production (also for testing SSR/Pre-rendering locally)
**`npm run build:ssr && npm run serve:ssr`** - Compiles your application and spins up a Node Express to serve your Universal application:
* the site 1 wil be served on `http://localhost:4002`
* the site 2 wil be served on `http://localhost:4001`

### Languages and translations
**`npm run extract-i18n`** - extract all the i18n ready to translate strings and put its into to messages.xlf files located in  `src/locale`
After a succesfull production build language specific static versions of the application will be placed in `dist/site1/en`  `dist/site1/it` ecc..
The site 1 translated application will be served on :  `http://localhost:4002/en` `http://localhost:4002/it` `http://localhost:4002/fr`
The site 2 translated application will be served on :  `http://localhost:4001/en` `http://localhost:4001/it` `http://localhost:4001/fr`



# License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
