module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'airbnb', // Airbnb 스타일 가이드 사용
        'airbnb/hooks',
        'airbnb-typescript'
      ],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        // 추가적인 규칙 설정
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
        'linebreak-style': 0,
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off'
      }
    }
  ]
};
