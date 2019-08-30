# @smartrecruiters/eslint-config

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Licence][license-image]][license-url]
[![Build][travis-image]][travis-url]

SmartRecruiters’ ESLint rules and configs.

- [Linting code in your module](#linting-code-in-your-module)
  * [Install eslint & @smartrecruiters/eslint-config](#install-eslint----smartrecruiters-eslint-config)
  * [Configure eslint in your project](#configure-eslint-in-your-project)
  * [Run linter](#run-linter)
  * [Hints](#hints)
    + [Automatix fix](#automatix-fix)
    + [Disable unwanted rule](#disable-unwanted-rule)
    + [Change rule violation from error to warning](#change-rule-violation-from-error-to-warning)
    + [Limit warnings](#limit-warnings)
    + [Ignore specific files and directories](#ignore-specific-files-and-directories)
  * [Configuration for Intellij IDEA](#configuration-for-intellij-idea)
- [Available configurations](#available-configurations)
  * [smartrecruiters/node/main](#smartrecruiters-node-main)
  * [smartrecruiters/node/mocha](#smartrecruiters-node-mocha)
- [Contributing](#contributing)
- [References](#references)

# Linting code in your module

## ESLint compatibility

Current version is designed to work with `eslint@^6`.

## Install eslint & @smartrecruiters/eslint-config

Install the latest `eslint` and ` @smartrecruiters/eslint-config` as devDependency (`-D`) in your project:
```
$ npm i -D eslint @smartrecruiters/eslint-config
```

## Configure eslint in your project

In root directory of your project, create `.eslintrc.yaml` with following content:

```yaml
extends: '@smartrecruiters/eslint-config/node/main'
```

or, when you use node.js v10
```yaml
extends: '@smartrecruiters/eslint-config/node/10/main'
```

Additionally, if your project uses `mocha`, you may override main config and use eslint config prepared for mocha test.
To do it, go to your test directory and create `.eslintrc.yaml` with following content:
```yaml
extends: '@smartrecruiters/eslint-config/node/mocha'
```

or, when you use node.js v10
```yaml
extends: '@smartrecruiters/eslint-config/node/10/mocha'
```

Update script section in your `package.json`:
```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

## Run linter

To run linter, just type:
```
$ npm run lint
```

## Hints

When you first apply linting in your legacy project, you may find many violations. Don't worry, there are some easy ways
to handle this:

### Automatic fix

Many rules have ability to fix your code. After you configured eslint in your project in a way described above, just run:
```
npm run lint -- --fix
```

It is done in such way because if you want to pass params into your custom npm script, you need to do that after `--`,
so in fact what this command does is:
```
node_modules/.bin/eslint . --fix
```

### Disable unwanted rule

You can easily override eslint configuration. For example, if you really want to use `console.log` function, you can 
globally disable `no-console` rule by changing `.eslintrc.yaml`:

```yaml
extends: '@smartrecruiters/eslint-config/node/main'
rules:
  no-console: off
```

or disable this rule in a particular file or in a part of it: 
[Disabling Rules with Inline Comments](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments)

### Change rule violation from error to warning

Similarly, if you really want to use `console.log`, but you also want to be somehow warned about it's usage, you can 
change `no-console` rule violations severity from error to warning by changing `.eslintrc.yaml`:

```yaml
extends: '@smartrecruiters/eslint-config/node/main'
rules:
  no-console: warn
```

or you can change severity of rule in a particular file: 
[Configuring Rules](http://eslint.org/docs/user-guide/configuring#configuring-rules)

### Limit warnings

And if you decide to change some errors to warnings, you can limit possible warning count to make sure no more lint
violations are introduced:
```
npm run lint -- --max-warnings Int
```

where `Int` is a number of maximum number of warnings allowed.

Same, what this command does is actually:
```
node_modules/.bin/eslint . --max-warnings Int
```

### Ignore specific files and directories
Use `.eslintignore` file to disable eslint in files and directories: 
[Ignoring Files and Directories](http://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories)

## Configuration for Intellij IDEA

It is very handy to have enabled automatic linting in your IDE:

1. _Intellij IDEA_ -> _Preferences_
2. _Languages & Frameworks_ -> _JavaScript_ -> _Code Quality Tools_ -> _ESLint_
3. Tick _Enable_
4. Specify _ESLint package_: `<path_to_your_project>/node_modules/eslint`
5. Tick _Automatic search_

# Available configurations

## smartrecruiters/node/main

Prepared for your **node.js** code. It is based on built-in eslint config 
[eslint-recommended](http://eslint.org/docs/user-guide/configuring#using-eslintrecommended). 
But it also has following rules enabled (see reference section for description of each rule):

* [Possible errors](lib/rules/possible-errors.yaml)
* [Best Practices](lib/rules/best-practices.yaml)
* [Variables](lib/rules/variables.yaml)
* [Node.js and CommonJS](lib/rules/node_js-and-commonjs.yaml)
* [Stylistic issues](lib/rules/stylistic-issues.yaml)
* [ECMAScript 6](lib/rules/ecmascript-6.yaml)

## smartrecruiters/node/mocha

Based on *'@smartrecruiters/eslint-config/node/main'*, but it is prepared for mocha & chai env. If you have globals
configured for your mocha test similarly:

```javascript
const chai = require('chai')
chai.use(require('chai-as-promised'))
const sinon = require('sinon')

global.sinon = sinon
global.chai = chai
global.expect = chai.expect
global.should = chai.should()
global.assert = chai.assert

```

Then you can write tests without requiring chai in each file. This will look like using undefined variables, so this
eslint configuration speficies `sinon`, `chai`, `expect`,`should` and `assert` as allowed global variables.

It also disables `no-unused-expressions` rule, because e.g. writing assertions with expect may end up with:
```javascript
expect(aVirginOver20).to.exists

```

Which of course from technical point of view is an unused expression.

# Contributing

Please see our [Code of conduct](docs/CODE_OF_CONDUCT.md) and [Contributing guidelines](docs/CONTRIBUTING.md)

# References

 - http://eslint.org/
 - http://eslint.org/docs/rules/


## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@smartrecruiters/eslint-config.svg
[npm-url]: https://www.npmjs.com/package/@smartrecruiters/eslint-config
[downloads-image]: https://img.shields.io/npm/dm/@smartrecruiters/eslint-config.svg
[downloads-url]: https://www.npmjs.com/package/@smartrecruiters/eslint-config
[node-version-image]: https://img.shields.io/node/v/@smartrecruiters/eslint-config.svg
[node-version-url]: https://nodejs.org/en/download/
[license-url]: https://github.com/smartrecruiters/eslint-config/blob/master/LICENSE
[license-image]: https://img.shields.io/npm/l/@smartrecruiters/eslint-config.svg
[travis-url]: https://travis-ci.org/smartrecruiters/eslint-config
[travis-image]: https://api.travis-ci.org/smartrecruiters/eslint-config.svg?branch=master
