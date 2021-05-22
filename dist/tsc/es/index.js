var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as path from "path";
import * as fs from "fs";
import { mergeWith, merge } from "lodash";
import { parse as _jcParse, stringify as _jcStringify, } from "comment-json";
import { copy_comments } from "comment-json/src/common";
export var jsoncMerge = function (a, b) {
    var ret = mergeWith(a, b, function (_x, _y, key, object, source) {
        copy_comments(object, source, key, key);
    });
    if (!(JSON.stringify(ret) === JSON.stringify(merge(a, b)))) {
        throw new Error("without comment should be same");
    }
    return ret;
};
// convert jsonc with dependencies loaded, while keeping comments
export var jsoncParse = function (filename, _a) {
    var _b = _a["extends"], _extends = _b === void 0 ? "extends" : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var LOOP, content, data, dep, dep_abs, dep_data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    LOOP = jsoncParse;
                    return [4 /*yield*/, fs.promises.readFile(filename, { encoding: "utf8" })];
                case 1:
                    content = _c.sent();
                    data = _jcParse(content);
                    if (!(_extends in data)) {
                        return [2 /*return*/, data];
                    }
                    dep = data[_extends];
                    dep_abs = path.resolve(path.dirname(filename), dep);
                    if (!fs.existsSync(dep_abs)) {
                        throw new Error("Not exists: " + dep_abs + "}");
                    }
                    return [4 /*yield*/, LOOP(dep_abs, { "extends": _extends })];
                case 2:
                    dep_data = _c.sent();
                    // remove field
                    delete data[_extends];
                    return [2 /*return*/, jsoncMerge(dep_data, data)];
            }
        });
    });
};
export var jsoncStringify = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var s;
    return __generator(this, function (_a) {
        s = _jcStringify(data, null, 2);
        return [2 /*return*/, s];
    });
}); };
export var jsoncBundler = function (filenames, _a) {
    var output = _a.output, _extends = _a["extends"];
    return __awaiter(void 0, void 0, void 0, function () {
        var datas, data, content;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all(filenames.map(function (filename) { return jsoncParse(filename, { "extends": _extends }); }))];
                case 1:
                    datas = _b.sent();
                    if (datas.length === 0) {
                        return [2 /*return*/];
                    }
                    data = datas.reduce(function (acc, cur) {
                        return jsoncMerge(acc, cur);
                    });
                    return [4 /*yield*/, jsoncStringify(data)];
                case 2:
                    content = _b.sent();
                    return [2 /*return*/, Array.isArray(output)
                            ? Promise.all(output.map(function (x) { return fs.promises.writeFile(x, content); }))
                            : fs.promises.writeFile(output, content)];
            }
        });
    });
};
