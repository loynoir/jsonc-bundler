#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var process = require("process");
var index_1 = require("./index");
var files = process.argv.slice(2);
if (files.length === 0) {
    console.log("env JSONC_BUNDLER_EXTENDS=extends prog [jsonc files ...]");
    console.log("prog a.tsconfig.json b.tsconfig.json c.tsconfig.json");
}
else {
    index_1.jsoncBundler(files, { extend: process.env.JSONC_BUNDLER_EXTENDS || "extends" }).then(console.log);
}
