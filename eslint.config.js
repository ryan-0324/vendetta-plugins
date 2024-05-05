import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist/**"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: { project: true }
        },
        plugins: {
            "@stylistic": stylistic,
            "@typescript-eslint": tseslint.plugin,
            "eslint-plugin-simple-import-sort": simpleImportSort
        },
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        rules: {
            ...stylistic.configs["recommended-flat"].rules,
            "@stylistic/arrow-parens": ["error", "as-needed"],
            "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
            "@stylistic/comma-dangle": ["error", "only-multiline"],
            "@stylistic/function-call-spacing": "error",
            "@stylistic/generator-star-spacing": "error",
            "@stylistic/indent": "error",
            "@stylistic/indent-binary-ops": ["error", 4],
            "@stylistic/jsx-curly-spacing": ["error", { children: true }],
            "@stylistic/jsx-indent": "error",
            "@stylistic/jsx-indent-props": "error",
            "@stylistic/jsx-newline": ["error", { prevent: true }],
            "@stylistic/jsx-pascal-case": ["error", {
                allowAllCaps: true,
                allowNamespace: true
            }],
            "@stylistic/jsx-props-no-multi-spaces": "error",
            "@stylistic/jsx-self-closing-comp": "error",
            "@stylistic/jsx-wrap-multilines": ["error", {
                declaration: "parens-new-line",
                assignment: "parens-new-line",
                return: "parens-new-line",
                arrow: "parens-new-line",
                condition: "parens-new-line",
                logical: "parens-new-line"
            }],
            "@stylistic/linebreak-style": "error",
            "@stylistic/member-delimiter-style": ["error", { singleline: { requireLast: true } }],
            "@stylistic/no-extra-semi": "error",
            "@stylistic/no-mixed-operators": "off",
            "@stylistic/no-multi-spaces": ["error", { exceptions: { Property: false } }],
            "@stylistic/object-curly-newline": ["error", { multiline: true }],
            "@stylistic/one-var-declaration-per-line": "error",
            "@stylistic/quote-props": ["error", "as-needed"],
            "@stylistic/quotes": ["error", "double", {
                avoidEscape: true,
                allowTemplateLiterals: true
            }],
            "@stylistic/semi": "error",
            "@stylistic/semi-style": "error",
            "@stylistic/switch-colon-spacing": "error",
            "@stylistic/wrap-iife": ["error", "inside", { functionPrototypeMethods: true }],
            "@stylistic/yield-star-spacing": "error",
            "@typescript-eslint/class-literal-property-style": "off",
            "@typescript-eslint/default-param-last": "error",
            "@typescript-eslint/method-signature-style": "error",
            "@typescript-eslint/no-array-delete": "off",
            "@typescript-eslint/no-confusing-non-null-assertion": "off",
            "@typescript-eslint/no-dynamic-delete": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-floating-promises": "off",
            "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-unnecessary-qualifier": "error",
            "@typescript-eslint/no-unnecessary-type-arguments": "error",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unsafe-unary-minus": "error",
            "@typescript-eslint/no-unused-expressions": "error",
            "@typescript-eslint/no-unused-vars": ["error", {
                args: "all",
                argsIgnorePattern: "^_",
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                ignoreRestSiblings: true
            }],
            "@typescript-eslint/no-use-before-define": "error",
            "@typescript-eslint/no-useless-empty-export": "error",
            "@typescript-eslint/prefer-find": "error",
            "@typescript-eslint/prefer-namespace-keyword": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
            "eslint-plugin-simple-import-sort/exports": "error",
            "eslint-plugin-simple-import-sort/imports": ["error", {
                groups: [
                    ["^((node:)?(assert|dns|fs|path|readline|stream|timers|util)|node:test)(/|$)|^((node:)?(async_hooks|buffer|child_process|cluster|console|constants|crypto|dgram|diagnostics_channel|domain|events|http|http2|https|inspector|module|net|os|perf_hooks|process|punycode|querystring|repl|string_decoder|tls|trace_events|tty|url|v8|vm|wasi|worker_threads|zlib)|node:sea)$"],
                    ["^@(vendetta|eslint|react-native-clipboard|rollup|shopify|stylistic)(/|$)|^[^@.]"],
                    ["^[@.]"]
                ]
            }],
            "array-callback-return": ["error", { checkForEach: true }],
            "no-constant-binary-expression": "error",
            "no-duplicate-imports": "error",
            "no-self-compare": "error",
            "default-case-last": "error",
            eqeqeq: ["error", "always", { null: "ignore" }],
            "logical-assignment-operators": "error",
            "no-alert": "error",
            "no-caller": "error",
            "no-else-return": "error",
            "no-empty": ["error", { allowEmptyCatch: true }],
            "no-empty-static-block": "error",
            "no-eval": "error",
            "no-extend-native": "error",
            "no-extra-label": "error",
            "no-implicit-globals": "error",
            "no-iterator": "error",
            "no-lonely-if": "error",
            "no-new": "error",
            "no-new-func": "error",
            "no-new-wrappers": "error",
            "no-object-constructor": "error",
            "no-proto": "error",
            "no-restricted-globals": ["error", "document", "JSX", "React"],
            "no-restricted-properties": ["error", {
                object: "window",
                property: "document"
            }],
            "no-undef-init": "error",
            "no-unneeded-ternary": "error",
            "no-useless-call": "error",
            "no-useless-computed-key": "error",
            "no-useless-concat": "error",
            "no-useless-rename": "error",
            "no-useless-return": "error",
            "object-shorthand": ["error", "always", { avoidExplicitReturnArrows: true }],
            "operator-assignment": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-exponentiation-operator": "error",
            "prefer-numeric-literals": "error",
            "prefer-object-has-own": "error",
            "prefer-object-spread": "error",
            "prefer-regex-literals": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            radix: ["error", "as-needed"],
            yoda: ["error", "never", { exceptRange: true }]
        }
    },
    {
        files: ["plugins/**"],
        rules: {
            "no-restricted-imports": ["error", {
                paths: ["assert", "async_hooks", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram", "diagnostics_channel", "dns", "domain", "events", "fs", "http", "http2", "https", "inspector", "module", "net", "os", "path", "perf_hooks", "process", "punycode", "querystring", "readline", "repl", "stream", "string_decoder", "timers", "tls", "trace_events", "tty", "url", "util", "v8", "vm", "wasi", "worker_threads", "zlib", "node:assert", "node:async_hooks", "node:buffer", "node:child_process", "node:cluster", "node:console", "node:constants", "node:crypto", "node:dgram", "node:diagnostics_channel", "node:dns", "node:domain", "node:events", "node:fs", "node:http", "node:http2", "node:https", "node:inspector", "node:module", "node:net", "node:os", "node:path", "node:perf_hooks", "node:process", "node:punycode", "node:querystring", "node:readline", "node:repl", "node:sea", "node:stream", "node:string_decoder", "node:test", "node:timers", "node:tls", "node:trace_events", "node:tty", "node:url", "node:util", "node:v8", "node:vm", "node:wasi", "node:worker_threads", "node:zlib"],
                patterns: ["assert/*", "dns/*", "fs/*", "path/*", "readline/*", "stream/*", "timers/*", "util/*", "node:assert/*", "node:dns/*", "node:fs/*", "node:path/*", "node:readline/*", "node:stream/*", "node:test/*", "node:timers/*", "node:util/*"]
            }],
            "no-restricted-syntax": ["error",
                {
                    selector: "ArrowFunctionExpression[async=true]",
                    message: "Hermes does not support async arrow functions, and build output size would increase if `transform-arrow-functions` were included."
                },
                {
                    selector: "AwaitExpression:not(:function *)",
                    message: "Hermes does not support top-level await, and SWC cannot transform it."
                }
            ]
        }
    }
);
