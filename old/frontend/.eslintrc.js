module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
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
    'react/prefer-stateless-function': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'react/destructuring-assignment': 2,
    'react/prop-types': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 1,
    'react/jsx-props-no-spreading': 1,
    camelcase: 1,
    quotes: 2,
    semi: ['error', 'always'],
  },
};
