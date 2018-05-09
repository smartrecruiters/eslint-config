module.exports = {
    env: {
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2017
    },
    extends: [
        'eslint:recommended',
        '../rules/best-practices.yaml',
        '../rules/ecmascript-6.yaml',
        '../rules/node_js-and-commonjs.yaml',
        '../rules/possible-errors.yaml',
        '../rules/stylistic-issues.yaml',
        '../rules/variables.yaml'
    ]
}
