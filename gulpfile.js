const { src, dest, watch } = require("gulp");
const gulp = require("gulp");
const minifyJs = require("gulp-uglify");
const concat = require("gulp-concat");
var exec = require("child_process").exec;
const sass = require("gulp-sass")(require("sass"));
const shelljs = require("shelljs");
const runsequence = require("run-sequence");
const rollupTypescript = require("@rollup/plugin-typescript");
const rollup = require("rollup");
const fs = require("fs");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
// import {nodeResolve} from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import multi from '@rollup/plugin-multi-entry';
// import { terser } from 'rollup-plugin-terser';

// const bundleJs = () => {
//     return src(["./dist/src/**/*.js"])
//         // .pipe(minifyJs())
//         .pipe(concat("bundle.js"))
//         .pipe(dest("./public/"));
// }

// function bundle() {
//     appBundles.forEach(function (appBundle) {
//         console.log('Creating bundle and sourcemaps: ' + appBundle.output);
//         gulp.src(appBundle.scripts)
//             .pipe(concat(appBundle.output))
//             .pipe(sourcemaps.init())
//             .pipe(sourcemaps.write(outFolder + '\\maps'))
//             .pipe(gulp.dest(outFolder))
//             .on('error', errorHandler);
//     });
// }

// const devWatch = () => {
//     watch(
//         [
//             "./public/src/Base/component.js",
//             "./public/src/DropDownList/Base/**/*.js",
//         ],
//         bundleJs
//     );
// };

function generateCSS(cb) {
    shelljs.exec("gulp fontawesome-webfont");
    src("./src/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("./dist/src"));
    cb();
}

gulp.task("bundle", async function () {
    shelljs.exec("gulp build");
    var packJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    const bundle = await rollup.rollup({
        input: "./src/index.ts",
        plugins: [
            rollupTypescript({
                compilerOptions: {
                    module: "esnext",
                    sourceMap: false
                }
            })
        ],
    });

    await bundle.write({
        file: "./dist/bundle.js",
        format: "umd",
        name: packJson.name,
        sourcemap: false,
    });
});

gulp.task("fontawesome-webfont", function (cb) {
    src("./src/styles/fontawesome/webfonts/*").pipe(
        dest("./dist/src/styles/fontawesome/webfonts")
    );
    cb();
});

gulp.task("build", function (cb) {
    shelljs.exec("gulp css");
    // var tsConfigJson = JSON.parse(fs.readFileSync("./tsconfig.json", "utf8"));
    exec("cd src && tsc", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
    // debugger;
    // tsConfigJson.include.push("demo/**/*");
    // console.log("tsconfig: " + tsConfigJson);
    // exec("cd src && tsc", function (err, stdout, stderr) {
    //     console.log(stdout);
    //     console.log(stderr);
    //     cb(err);
    // });
    // tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

gulp.task("watch", function (cb) {
    shelljs.exec("gulp css");
    exec("cd src && tsc -w", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// exports.bundleJs = bundleJs;
// exports.devWatch = devWatch;
exports.css = generateCSS;
