<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

About
It's a prototype to demonstrate how to use [NestJS](https://github.com/nestjs/nest) with [MikroORM](https://mikro-orm.io/) and WebPack build.

## Prerequisites
- install PostgreSQL server
- create database:
    ```
    createdb -U <database_user> nestmikrotest
    ```
    for example:
    ```
    createdb -U postgres nestmikrotest
    ```
## Installation
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Problem
If WebPack is enabled in nest-cli.json: 
```
"webpack": true
```
then you have this error during startup:
```
> nest-mikro-test@0.0.1 start:dev D:\a\_NEST8_MIKRO5\nest-mikro-test
> nest start --watch

 Info  Webpack is building your sources...

webpack 5.71.0 compiled successfully in 1338 ms
Type-checking in progress...
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './typings' is not defined by "exports" in D:\a\_NEST8_MIKRO5\nest-mikro-test\node_modules\@mikro-orm\core\package.json
    at throwExportsNotFound (internal/modules/esm/resolve.js:285:9)
    at packageExportsResolve (internal/modules/esm/resolve.js:508:3)
    at resolveExports (internal/modules/cjs/loader.js:450:36)
    at Function.Module._findPath (internal/modules/cjs/loader.js:490:31)
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:888:27)
    at Function.Module._load (internal/modules/cjs/loader.js:746:27)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:92:18)
    at Object.@mikro-orm/core/typings (D:\a\_NEST8_MIKRO5\nest-mikro-test\dist\main.js:967:18)
    at __webpack_require__ (D:\a\_NEST8_MIKRO5\nest-mikro-test\dist\main.js:1051:42)
No errors found.

Process finished with exit code 1
```

If you disable WebPack in nest-cli.json:
```
"webpack": false
```
then it can run properly. Why?

## Solution
Fortunately I've opened a [StackOverflow question](https://stackoverflow.com/questions/71858988/i-have-err-package-path-not-exported-error-in-a-nestjs-project-if-mikroorm-upgra/71859220#71859220) and it has been aswered.
The problem was that WebPack only supports imports components exported from the root of the package.

So, I replaced:
```
import { EntityData, FilterQuery, Primary } from '@mikro-orm/core/typings';
```
with 
```
import { EntityData, FilterQuery, Primary } from '@mikro-orm/core';
```
and now it work properly :)
