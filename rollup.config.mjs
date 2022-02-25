import path from "path";

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { globbySync } from "globby";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
// import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import uglify from "rollup-plugin-uglify";

// import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import resolve from "@rollup/plugin-node-resolve";

const cssConfig = globbySync(["src/**/*.css"]).map((inputFile) => {
  console.log(inputFile);
  return {
    input: inputFile,
    output: [
      {
        dir: `dist/css/${inputFile
          .replace("src/", "")
          .replace(path.basename(inputFile), "")
          .replace("/css", "")}`,
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
  };
});

const jsConfig = {
  input: "src/index.ts",
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
    typescript(),
    commonjs(),
    resolve(),
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
