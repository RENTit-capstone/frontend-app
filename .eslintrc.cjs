module.exports = {
    root: true,
    extends: ['expo', 'plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'off',
    },
};
