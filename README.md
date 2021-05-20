### jsonc-bundler

A bundler for json-with-comments.

### Use case

Bundle tsconfig.json and preserve comments.

### Usage

```sh
jsonc-bundler ./examples/extended.jsonc
```

### Example

```txt
$ cat examples/tsconfig/base.tsconfig.json
{
    "compilerOptions": {
        // comment from base: esnext
        "module": "esnext",
        "target": "esnext",

        // comment from base: strict for default
        "noUnusedLocals": true,
        "noUnusedParameters": true
    }
}
$ cat examples/tsconfig/extend.tsconfig.json
{
    "extends": "./base.tsconfig.json",
    "compilerOptions": {
        // comment from extend: less strict for ts-node
        "noUnusedLocals": false,
        "noUnusedParameters": false
    }
}

$ cat examples/tsconfig/spec/actual.bundle.tsconfig.json
{
  "compilerOptions": {
    // comment from base: esnext
    "module": "esnext",
    "target": "esnext",
    // comment from extend: less strict for ts-node
    "noUnusedLocals": false,
    "noUnusedParameters": false
  }
}
```

### Environment

JSONC_BUNDLER_EXTENDS | optional | default="extends"
