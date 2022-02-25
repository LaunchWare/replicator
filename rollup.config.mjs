import path from "path";

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { globbySync } from "globby";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
// import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import uglify from "rollup-plugin-uglify";

// import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import resolve from "@rollup/plugin-node-resolve";

const cssConfig = globbySync(["src/**/*.css"]).map((inputFile) => ({
  input: inputFile,
  output: [
    {
      dir: `dist/css/${inputFile.replace(path.basename(inputFile), "")}`,
      sourcemap: true,
      format: "es",
    },
  ],
  plugins: [
    // peerDepsExternal(),
    resolve(),
    postcss({ extensions: [".css"], extract: true }),
    del({
      targets: ["dist/css/**/*.js", "dist/css/**/*.js.map"],
      hook: "closeBundle",
      runOnce: true,
    }),
  ],
}));

const jsConfig = {
  input: "index.js",
  output: [
    {
      file: "dist/index.js",
      compact: true,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.es.js",
      format: "esm",
      compact: true,
      sourcemap: true,
    },
  ],
  plugins: [
    // peerDepsExternal(),
    resolve(),
    babel({ babelHelpers: "bundled" }),
    commonjs({ extract: true }),
    postcss({ extensions: [".css"] }),
    copy({
      targets: [{ src: "src/assets/images/**/*", dest: "dist/images" }],
      verbose: true,
      copyOnce: true,
    }),
    process.env.NODE_ENV === "production" && uglify.uglify(),
  ],
};

export default [jsConfig, ...cssConfig];
