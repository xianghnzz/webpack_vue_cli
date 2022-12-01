module.exports = {
    extends: ["eslint:recommended"],
    env: {
        node: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    rule: {
        'no-var': 2
    }
}