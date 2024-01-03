import { createHash } from "crypto";
import { readdir, readFile, writeFile } from "fs/promises";

import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { swc } from "rollup-plugin-swc3";

/** @type import("rollup").InputPluginOption */
const plugins = [
    nodeResolve(),
    commonjs(),
    swc({
        jsc: { target: undefined },
        env: {
            targets: "supports es6",
            exclude: [
                "transform-async-generator-functions",
                "transform-exponentiation-operator",
                "transform-nullish-coalescing-operator",
                "transform-object-rest-spread",
                "transform-optional-chaining"
            ],
            inlude: [
                "transform-arrow-functions",
                "transform-block-scoping",
                "transform-classes"
            ]
        }
    }),
    esbuild({ minify: true, target: "hermes0.12.0" })
];

for (const plugDir of await readdir("./plugins", { withFileTypes: true })) {
    if (plugDir.isFile()) continue;

    let manifest;
    try {
        manifest = JSON.parse(await readFile(`./plugins/${plugDir.name}/manifest.json`));
        if (!manifest.main) {
            console.warn(`The manifest of ${manifest.name} (./plugins/${plugDir.name}) does not contain an entrypoint. See: https://plugindocs.nexpid.xyz/guides/manifest`);
            continue;
        }
    } catch (e) {
        console.error(`Plugin at ./plugins/${plugDir.name} does not have a valid manifest. See: https://plugindocs.nexpid.xyz/guides/manifest\n`, e);
        continue;
    }

    const outPath = `./dist/${plugDir.name}/index.js`;

    try {
        const bundle = await rollup({
            input: `./plugins/${plugDir.name}/${manifest.main}`,
            onwarn: () => {},
            plugins
        });

        await bundle.write({
            file: outPath,
            globals(id) {
                if (id.startsWith("@vendetta")) return id.substring(1).replace(/\//g, ".");
                const map = {
                    react: "window.React"
                };

                return map[id] || null;
            },
            format: "iife",
            compact: true,
            exports: "named"
        });
        await bundle.close();

        const toHash = await readFile(outPath);
        manifest.hash = createHash("sha256").update(toHash).digest("hex");
        manifest.main = "index.js";
        await writeFile(`./dist/${plugDir.name}/manifest.json`, JSON.stringify(manifest));

        console.log(`Successfully built ${manifest.name} (./plugins/${plugDir.name})!`);
    } catch (e) {
        console.error(`Failed to build plugin: ${manifest.name} (./plugins/${plugDir.name})\n`, e);
    }
}
