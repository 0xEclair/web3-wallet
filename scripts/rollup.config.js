import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import fs from "fs-extra";
import path from "path";

const root = path.join(__dirname, "../")
const entry = path.join(root, "src/index.js")
const distPath = path.join(root, "dist")

export default (async() => {
  await fs.remove(distPath)
  const cjsoptions = {
    // todo
    transformMixedEsModules: true
  }

  return {
    input: entry,
    output: {
      format: "esm",
      banner: "const __$G = (typeof globalThis !== 'undefined' ? globalThis: typeof window !== 'undefined' ? window: typeof global !== 'undefined' ? global: typeof self !== 'undefined' ? self: {});",
      dir: distPath,
      entryFileNames: "ess.js",
    },
    context: "window",
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: [
          [
            "@babel/preset-env",
            {
              "targets": "> 0.25%, not dead",
              "modules": false
            }
          ],
        ],
      }),
      nodeResolve({ browser: true, preferBuiltins: false }),
      cjs({transformMixedEsModules: false, ...cjsoptions}),
      nodePolyfills(),
      json(),
      terser(),
      visualizer(),
    ],
  }
})()
