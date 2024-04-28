import { createHash } from "crypto";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";

import terser from "@rollup/plugin-terser";
import type { RollupOptions } from "rollup";
import { swc } from "rollup-plugin-swc3";

const vendettaImport = /^@vendetta(\/|$)/;

const globals: Record<string, string | undefined> = {
    "@react-native-clipboard/clipboard": "vendetta.metro.common.clipboard",
    chroma: "vendetta.metro.common.chroma",
    lodash: "vendetta.metro.common.lodash",
    moment: "vendetta.metro.common.moment",
    react: "React",
    "react-native": "vendetta.metro.common.ReactNative" // Backwards compatibility
};

export default (await Promise.all(readdirSync("./plugins", { withFileTypes: true }).map(async dirent => {
    if (dirent.isFile()) return;

    let manifest;
    try {
        manifest = JSON.parse(await readFile(`./plugins/${dirent.name}/manifest.json`, "utf8"));
        if (!manifest.main)
            throw new Error("Missing entry point.");
    } catch (error) {
        console.error(`Plugin at './plugins/${dirent.name}' does not have a valid manifest. See: https://plugindocs.nexpid.xyz/guides/manifest\n`, error);
        return;
    }

    return {
        external: [vendettaImport, ...Object.keys(globals)],
        input: `plugins/${dirent.name}/${manifest.main}`,
        output: {
            file: `dist/${dirent.name}/index.js`,
            format: "iife",
            exports: "default",
            globals: id => vendettaImport.test(id) ? id.substring(1).replaceAll("/", ".") : globals[id] ?? id
        },
        plugins: [
            swc({
                jsc: { target: undefined },
                env: {
                    targets: "fully supports es6",
                    include: [
                        "transform-block-scoping",
                        "transform-classes"
                    ],
                    exclude: [
                        "transform-exponentiation-operator",
                        "transform-named-capturing-groups-regex",
                        "transform-nullish-coalescing-operator",
                        "transform-object-rest-spread",
                        "transform-optional-chaining"
                    ]
                }
            }),
            terser({
                compress: {
                    ecma: 2015,
                    expression: true,
                    passes: 4,
                    unsafe: true,
                    unsafe_arrows: true,
                    unsafe_comps: true,
                    unsafe_Function: true,
                    unsafe_methods: true,
                    unsafe_regexp: true,
                    unsafe_undefined: true
                },
                mangle: { eval: true }
            }),
            {
                name: "manifest",
                renderChunk(code) {
                    manifest.main = "index.js";
                    manifest.hash = createHash("sha256").update(code).digest("base64");
                    this.emitFile({
                        type: "asset",
                        fileName: "manifest.json",
                        source: JSON.stringify(manifest)
                    });
                }
            }
        ]
    } satisfies RollupOptions;
}))).filter(Boolean);
