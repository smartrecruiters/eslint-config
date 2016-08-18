module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "../rules/best-practices.yaml",
        "../rules/es6.yaml",
        "../rules/node.yaml",
        "../rules/possible-errors.yaml",
        "../rules/stylistic-issues.yaml",
        "../rules/variables.yaml"
    ]
}
