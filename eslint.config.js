import globals from "globals";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {languageOptions: { globals: globals.browser },
        "rules": {
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "indent": ["error", 4],
            "no-multi-spaces": ["error"]
        }},
];