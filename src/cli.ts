#!/usr/bin/env node
import * as process from "process";
import { jsoncBundler } from "./index";
const files = process.argv.slice(2);

if (files.length === 0) {
  console.log("env JSONC_EXTENDS=extends prog [jsonc files ...]");
  console.log("prog a.tsconfig.json b.tsconfig.json c.tsconfig.json");
} else {
  jsoncBundler(files, { extend: process.env.JSONC_EXTENDS || "extends" }).then(
    console.log
  );
}
