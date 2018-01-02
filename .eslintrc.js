
module.exports = {
    'root': true,
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'module'
    },
    'env': {
        'browser': true,
        'node': true
    },
    // required to lint *.vue files
    'plugins': [
        'html'
    ],
    'extends': 'eslint:recommended',
    // add your custom rules here
    'rules': {
        // allow debugger during development
        'brace-style':                 ['error', '1tbs', { 'allowSingleLine': true }],
        'comma-dangle':                ['error', 'never'],
        'comma-spacing':               ['error', { 'before': false, 'after': true }],
        'comma-style':                 ['error', 'last'],
        'indent':                      ['error', 4],
        'keyword-spacing':             ['error', { 'before': true, 'after': true }],
        'no-multi-spaces':             ['error'],
        'no-ternary':                  ['error'],
        'no-unused-vars':              ['error', { 'args': 'all' }],
        'one-var':                     ['error', 'never'],
        'quotes':                      ['error', 'single'],
        'semi':                        ['error', 'always'],
        'space-before-function-paren': ['error', 'always'],
        'space-in-parens':             ['error', 'never'],
        'space-infix-ops':             ['error'],
        'no-debugger':                 process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
