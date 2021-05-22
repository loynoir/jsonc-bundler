#!/usr/bin/env node
import * as process from "process";
import { jsoncBundler } from "./index";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .scriptName("jsonc-bundler")
  // .fail((msg, err, args) => {
  //   // const ec=1
  //   const ec=2
  //   yargs
  //     .showHelp()
  //     .exit(ec, err)
  // })
  .demandCommand()
  .recommendCommands()
  .option("verbose", {
    default: 0,
    alias: "v",
    count: true,
    describe: "Verbosity",
  })
  .command(
    "$0 <files..>",
    "bundle jsonc",
    (yargs) => {
      const options = {
        output: {
          default: "/dev/stdout" as string | string[],
          alias: "o",
          describe: "Path of bundled jsonc output",
          defaultDescription: "stdout",
        }, // as yargs.Options,
        extends: {
          demandOption: true,
          default: "extends" as string | string[],
          alias: "e",
          describe: "Field like tsconfig.json `extends`",
          defaultDescription: "extends",
        }, // as yargs.Options,
      };

      return yargs
        .strictOptions(true)
        .option("output", options.output)
        .option("extends", options.extends)
        .positional("files", {
          type: "string",
          // desc: ts workaround
          default: [] as string[],
          describe: "Path of jsonc files",
        });
    },
    async (args) => {
      const { output, files, extends: _extends } = args;
      const e = Array.isArray(_extends)
        ? _extends[_extends.length - 1]
        : _extends;
      await jsoncBundler(files, {
        output,
        extends: e,
      });
    }
  ).argv;
