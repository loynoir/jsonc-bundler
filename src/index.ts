import * as path from "path";
import * as fs from "fs";
import { mergeWith, merge } from "lodash";
import {
  parse as _jcParse,
  stringify as _jcStringify,
  assign as _jcAssign,
} from "comment-json";
import { copy_comments } from "comment-json/src/common";

export const jsoncMerge = (a: any, b: any) => {
  const ret = mergeWith<any, any>(a, b, (_x, _y, key, object, source) => {
    copy_comments(object, source, key, key);
  });

  if (!(JSON.stringify(ret) === JSON.stringify(merge(a, b)))) {
    throw new Error("without comment should be same");
  }

  return ret;
};

// convert jsonc with dependencies loaded, while keeping comments
export const jsoncParse = async (
  filename: string,
  { extend = "extends" }
): Promise<any> => {
  const LOOP = jsoncParse;

  const content = await fs.promises.readFile(filename, "utf8");
  const data = _jcParse(content);

  if (!(extend in data)) {
    return data;
  }

  const dep = data[extend];
  const dep_abs = path.resolve(path.dirname(filename), dep);
  if (!fs.existsSync(dep_abs)) {
    throw new Error(`Not exists: ${dep_abs}}`);
  }
  const dep_data = await LOOP(dep_abs, { extend });

  // remove field
  delete data[extend];
  return jsoncMerge(dep_data, data);
};

export const jsoncStringify = async (data: any) => {
  const s = _jcStringify(data, null, 2);
  return s;
};

export const jsoncBundler = async (
  filenames: string[],
  { extend = "extends" }
) => {
  const datas = await Promise.all(
    filenames.map((filename) => jsoncParse(filename, { extend }))
  );
  if (datas.length === 0) {
    return;
  }

  const data = datas.reduce((acc, cur) => {
    return jsoncMerge(acc, cur);
  });

  return jsoncStringify(data);
};
