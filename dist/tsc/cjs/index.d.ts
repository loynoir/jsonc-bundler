export declare const jsoncMerge: (a: any, b: any) => any;
export declare const jsoncParse: (filename: string, { extends: _extends }: {
    extends?: string;
}) => Promise<any>;
export declare const jsoncStringify: (data: any) => Promise<string>;
interface JsoncBundlerOptions {
    output: string | string[];
    extends: string;
}
export declare const jsoncBundler: (filenames: string[], { output, extends: _extends }: JsoncBundlerOptions) => Promise<void | void[]>;
export {};
