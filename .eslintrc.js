module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'max-len': 'off',
    camelcase: 'off',
  },
};
