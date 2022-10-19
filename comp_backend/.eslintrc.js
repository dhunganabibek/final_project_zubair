module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: false,
    es6: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  globals: {
    window: true,
    document: true,
    navigator: true,
    localstorage: true,
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'max-len': [2, 120, 2, { ignoreComments: true }],
    'linebreak-style': ['error', 'unix'],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-underscore-dangle': 0,
    camelcase: 1,
    quotes: 2,
    semi: ['error', 'always'],
    "no-console": ["warn"]
  },
};
