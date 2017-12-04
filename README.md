# @sr/eslint-config

SmartRecruiters’ ESLint rules and configs.

- [Linting code in your module](#linting-code-in-your-module)
  * [Install eslint && @sr/eslint-config](#install-eslint-----sr-eslint-config)
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

## Install eslint && @sr/eslint-config

Install the latest `eslint` and ` @sr/eslint-config` as devDependency (`-D`) and exact version in package.json (`-E`)
```
$ npm i -DE eslint @sr/eslint-config
```

## Configure eslint in your project

In root directory of your project, create `.eslintrc.yaml` with following content:

```yaml
extends: '@sr/eslint-config/node/main'
```

Additionally, if your project uses `mocha`, you may override main config and use eslint config prepared for mocha test.
To do it, go to your test directory and create `.eslintrc.yaml` with following content:
```yaml
extends: '@sr/eslint-config/node/mocha'
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

### Automatix fix

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
extends: '@sr/eslint-config/node/main'
rules:
  no-console: off
```

or disable this rule in a particular file or in a part of it: 
[Disabling Rules with Inline Comments](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments)

### Change rule violation from error to warning

Similarly, if you really want to use `console.log`, but you also want to be somehow warned about it's usage, you can 
change `no-console` rule violations severity from error to warning by changing `.eslintrc.yaml`:

```yaml
extends: '@sr/eslint-config/node/main'
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

* [Possible errors](lib/rules/possible-errors.json)
* [Best Practices](lib/rules/best-practices.json)
* [Variables](lib/rules/variables.json)
* [Node.js](lib/rules/node.json)
* [Stylistic issues](lib/rules/stylistic-issues.json)
* [ECMAScript 6](lib/rules/es6.json)

## smartrecruiters/node/mocha

Based on *'@sr/eslint-config/node/main'*, but it is prepared for mocha & chai env. If you have globals configured for your
mocha test similarly:

```javascript
const chai = require('chai');
chai.use(require('chai-as-promised'));
const sinon = require('sinon');

global.sinon = sinon;
global.chai = chai;
global.expect = chai.expect;
global.should = chai.should();
global.assert = chai.assert;

```

Then you can write tests without requiring chai in each file. This will look like using undefined variables, so this
eslint configuration speficies `sinon`, `chai`, `expect`,`should` and `assert` as allowed global variables.

It also disables `no-unused-expressions` rule, because e.g. writing assertions with expect may end up with:
```javascript
expect(aVirginOver20).to.exists;

```

Which of course from technical point of view is an unused expression.

# Contributing

Should you have any suggestions, ideas, fixes or you would like to contribute with new eslint config (e.g. for browsers) please
raise an issue or create a pull request.

# References

 - http://eslint.org/
 - http://eslint.org/docs/rules/
