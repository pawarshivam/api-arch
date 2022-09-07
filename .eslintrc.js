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
    ecmaVersion: 13,
  },
  rules: {
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-multi-spaces': [
      'error',
      {
        exceptions:
        {
          VariableDeclarator: true,
        },
      },
    ],
    'no-empty-pattern': 'off',
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
