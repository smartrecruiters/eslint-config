module.exports = {
    "env": {
        "mocha": true
    },
    "globals": {
        "sinon": false,
        "chai": false,
        "expect": false,
        "should": false,
        "assert": false
    },
    "extends": [
        "./main.js",
        "../rules/testing.yaml"
    ]
}
