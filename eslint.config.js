import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				React: 'readonly',
				console: 'readonly',
				process: 'readonly',
				window: 'readonly',
				localStorage: 'readonly',
				HTMLButtonElement: 'readonly',
				HTMLInputElement: 'readonly',
				describe: 'readonly',
				it: 'readonly',
				expect: 'readonly',
				vi: 'readonly',
				__dirname: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': typescript,
			prettier
		},
		rules: {
			...typescript.configs.recommended.rules,
			...prettierConfig.rules,
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-empty-function': 'warn',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/triple-slash-reference': 'off',
			'prefer-const': 'error',
			'no-var': 'error',
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-undef': 'off' // TypeScript handles this
		}
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: {
				module: 'readonly',
				require: 'readonly',
				process: 'readonly',
				__dirname: 'readonly'
			}
		}
	},
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'dist/**',
			'build/**',
			'coverage/**',
			'*.min.js',
			'*.min.css'
		]
	}
]
