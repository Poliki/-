module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    'indent': 'off',
    'no-unused-vars': 'off',
    'prefer-const': 'off',
    'object-curly-spacing': 'off',
    'no-multiple-empty-lines': 'off',
    'quotes': 'off',
    'semi': 'off'
  }
}
