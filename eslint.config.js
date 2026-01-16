import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'vue/no-mutating-props': 'off',
    'antfu/top-level-function': 'off',
  },
  stylistic: {
    indent: 2,
    quotes: 'single', // single or 'double'
  },
})
