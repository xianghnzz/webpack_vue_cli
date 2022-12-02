module.exports = {
    extends: ["eslint:recommended"],
    env: {
        node: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        parser: 'babel-eslint'
    },
    rules: {
        'no-var': 2
    },
    plugins: ['import']
}