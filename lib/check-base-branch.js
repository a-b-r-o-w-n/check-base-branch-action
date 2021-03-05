var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __assign = Object.assign;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (result) => {
      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);
    };
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function toCommandValue(input) {
    if (input === null || input === void 0) {
      return "";
    } else if (typeof input === "string" || input instanceof String) {
      return input;
    }
    return JSON.stringify(input);
  }
  exports2.toCommandValue = toCommandValue;
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
  }
  exports2.issueCommand = issueCommand;
  function issue(name, message = "") {
    issueCommand(name, {}, message);
  }
  exports2.issue = issue;
  var CMD_STRING = "::";
  var Command = class {
    constructor(command, properties, message) {
      if (!command) {
        command = "missing.command";
      }
      this.command = command;
      this.properties = properties;
      this.message = message;
    }
    toString() {
      let cmdStr = CMD_STRING + this.command;
      if (this.properties && Object.keys(this.properties).length > 0) {
        cmdStr += " ";
        let first = true;
        for (const key in this.properties) {
          if (this.properties.hasOwnProperty(key)) {
            const val = this.properties[key];
            if (val) {
              if (first) {
                first = false;
              } else {
                cmdStr += ",";
              }
              cmdStr += `${key}=${escapeProperty(val)}`;
            }
          }
        }
      }
      cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
      return cmdStr;
    }
  };
  function escapeData(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  }
  function escapeProperty(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
      throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
      encoding: "utf8"
    });
  }
  exports2.issueCommand = issueCommand;
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var command_1 = require_command();
  var file_command_1 = require_file_command();
  var utils_1 = require_utils();
  var os = __importStar(require("os"));
  var path = __importStar(require("path"));
  var ExitCode;
  (function(ExitCode2) {
    ExitCode2[ExitCode2["Success"] = 0] = "Success";
    ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
  })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
  function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) {
      const delimiter = "_GitHubActionsFileCommandDelimeter_";
      const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
      file_command_1.issueCommand("ENV", commandValue);
    } else {
      command_1.issueCommand("set-env", {name}, convertedVal);
    }
  }
  exports2.exportVariable = exportVariable;
  function setSecret(secret) {
    command_1.issueCommand("add-mask", {}, secret);
  }
  exports2.setSecret = setSecret;
  function addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) {
      file_command_1.issueCommand("PATH", inputPath);
    } else {
      command_1.issueCommand("add-path", {}, inputPath);
    }
    process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
  }
  exports2.addPath = addPath;
  function getInput2(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) {
      throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
  }
  exports2.getInput = getInput2;
  function setOutput(name, value) {
    command_1.issueCommand("set-output", {name}, value);
  }
  exports2.setOutput = setOutput;
  function setCommandEcho(enabled) {
    command_1.issue("echo", enabled ? "on" : "off");
  }
  exports2.setCommandEcho = setCommandEcho;
  function setFailed2(message) {
    process.exitCode = ExitCode.Failure;
    error2(message);
  }
  exports2.setFailed = setFailed2;
  function isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
  }
  exports2.isDebug = isDebug;
  function debug2(message) {
    command_1.issueCommand("debug", {}, message);
  }
  exports2.debug = debug2;
  function error2(message) {
    command_1.issue("error", message instanceof Error ? message.toString() : message);
  }
  exports2.error = error2;
  function warning(message) {
    command_1.issue("warning", message instanceof Error ? message.toString() : message);
  }
  exports2.warning = warning;
  function info2(message) {
    process.stdout.write(message + os.EOL);
  }
  exports2.info = info2;
  function startGroup(name) {
    command_1.issue("group", name);
  }
  exports2.startGroup = startGroup;
  function endGroup() {
    command_1.issue("endgroup");
  }
  exports2.endGroup = endGroup;
  function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
      startGroup(name);
      let result;
      try {
        result = yield fn();
      } finally {
        endGroup();
      }
      return result;
    });
  }
  exports2.group = group;
  function saveState(name, value) {
    command_1.issueCommand("save-state", {name}, value);
  }
  exports2.saveState = saveState;
  function getState(name) {
    return process.env[`STATE_${name}`] || "";
  }
  exports2.getState = getState;
});

// node_modules/is-plain-object/dist/is-plain-object.js
var require_is_plain_object = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  /*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */
  function isObject(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  }
  function isPlainObject(o) {
    var ctor, prot;
    if (isObject(o) === false)
      return false;
    ctor = o.constructor;
    if (ctor === void 0)
      return true;
    prot = ctor.prototype;
    if (isObject(prot) === false)
      return false;
    if (prot.hasOwnProperty("isPrototypeOf") === false) {
      return false;
    }
    return true;
  }
  exports2.isPlainObject = isPlainObject;
});

// node_modules/universal-user-agent/dist-node/index.js
var require_dist_node = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function getUserAgent() {
    if (typeof navigator === "object" && "userAgent" in navigator) {
      return navigator.userAgent;
    }
    if (typeof process === "object" && "version" in process) {
      return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
    }
    return "<environment undetectable>";
  }
  exports2.getUserAgent = getUserAgent;
});

// node_modules/@octokit/endpoint/dist-node/index.js
var require_dist_node2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var isPlainObject = require_is_plain_object();
  var universalUserAgent = require_dist_node();
  function lowercaseKeys(object) {
    if (!object) {
      return {};
    }
    return Object.keys(object).reduce((newObj, key) => {
      newObj[key.toLowerCase()] = object[key];
      return newObj;
    }, {});
  }
  function mergeDeep(defaults, options) {
    const result = Object.assign({}, defaults);
    Object.keys(options).forEach((key) => {
      if (isPlainObject.isPlainObject(options[key])) {
        if (!(key in defaults))
          Object.assign(result, {
            [key]: options[key]
          });
        else
          result[key] = mergeDeep(defaults[key], options[key]);
      } else {
        Object.assign(result, {
          [key]: options[key]
        });
      }
    });
    return result;
  }
  function merge(defaults, route, options) {
    if (typeof route === "string") {
      let [method, url] = route.split(" ");
      options = Object.assign(url ? {
        method,
        url
      } : {
        url: method
      }, options);
    } else {
      options = Object.assign({}, route);
    }
    options.headers = lowercaseKeys(options.headers);
    const mergedOptions = mergeDeep(defaults || {}, options);
    if (defaults && defaults.mediaType.previews.length) {
      mergedOptions.mediaType.previews = defaults.mediaType.previews.filter((preview) => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
    }
    mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map((preview) => preview.replace(/-preview/, ""));
    return mergedOptions;
  }
  function addQueryParameters(url, parameters) {
    const separator = /\?/.test(url) ? "&" : "?";
    const names = Object.keys(parameters);
    if (names.length === 0) {
      return url;
    }
    return url + separator + names.map((name) => {
      if (name === "q") {
        return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
      }
      return `${name}=${encodeURIComponent(parameters[name])}`;
    }).join("&");
  }
  var urlVariableRegex = /\{[^}]+\}/g;
  function removeNonChars(variableName) {
    return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
  }
  function extractUrlVariableNames(url) {
    const matches = url.match(urlVariableRegex);
    if (!matches) {
      return [];
    }
    return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
  }
  function omit(object, keysToOmit) {
    return Object.keys(object).filter((option) => !keysToOmit.includes(option)).reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  }
  function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
      if (!/%[0-9A-Fa-f]/.test(part)) {
        part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
      }
      return part;
    }).join("");
  }
  function encodeUnreserved(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  function encodeValue(operator, value, key) {
    value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
    if (key) {
      return encodeUnreserved(key) + "=" + value;
    } else {
      return value;
    }
  }
  function isDefined(value) {
    return value !== void 0 && value !== null;
  }
  function isKeyOperator(operator) {
    return operator === ";" || operator === "&" || operator === "?";
  }
  function getValues(context2, operator, key, modifier) {
    var value = context2[key], result = [];
    if (isDefined(value) && value !== "") {
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        value = value.toString();
        if (modifier && modifier !== "*") {
          value = value.substring(0, parseInt(modifier, 10));
        }
        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
      } else {
        if (modifier === "*") {
          if (Array.isArray(value)) {
            value.filter(isDefined).forEach(function(value2) {
              result.push(encodeValue(operator, value2, isKeyOperator(operator) ? key : ""));
            });
          } else {
            Object.keys(value).forEach(function(k) {
              if (isDefined(value[k])) {
                result.push(encodeValue(operator, value[k], k));
              }
            });
          }
        } else {
          const tmp = [];
          if (Array.isArray(value)) {
            value.filter(isDefined).forEach(function(value2) {
              tmp.push(encodeValue(operator, value2));
            });
          } else {
            Object.keys(value).forEach(function(k) {
              if (isDefined(value[k])) {
                tmp.push(encodeUnreserved(k));
                tmp.push(encodeValue(operator, value[k].toString()));
              }
            });
          }
          if (isKeyOperator(operator)) {
            result.push(encodeUnreserved(key) + "=" + tmp.join(","));
          } else if (tmp.length !== 0) {
            result.push(tmp.join(","));
          }
        }
      }
    } else {
      if (operator === ";") {
        if (isDefined(value)) {
          result.push(encodeUnreserved(key));
        }
      } else if (value === "" && (operator === "&" || operator === "?")) {
        result.push(encodeUnreserved(key) + "=");
      } else if (value === "") {
        result.push("");
      }
    }
    return result;
  }
  function parseUrl(template) {
    return {
      expand: expand.bind(null, template)
    };
  }
  function expand(template, context2) {
    var operators = ["+", "#", ".", "/", ";", "?", "&"];
    return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(_, expression, literal) {
      if (expression) {
        let operator = "";
        const values = [];
        if (operators.indexOf(expression.charAt(0)) !== -1) {
          operator = expression.charAt(0);
          expression = expression.substr(1);
        }
        expression.split(/,/g).forEach(function(variable) {
          var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
          values.push(getValues(context2, operator, tmp[1], tmp[2] || tmp[3]));
        });
        if (operator && operator !== "+") {
          var separator = ",";
          if (operator === "?") {
            separator = "&";
          } else if (operator !== "#") {
            separator = operator;
          }
          return (values.length !== 0 ? operator : "") + values.join(separator);
        } else {
          return values.join(",");
        }
      } else {
        return encodeReserved(literal);
      }
    });
  }
  function parse(options) {
    let method = options.method.toUpperCase();
    let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{+$1}");
    let headers = Object.assign({}, options.headers);
    let body;
    let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]);
    const urlVariableNames = extractUrlVariableNames(url);
    url = parseUrl(url).expand(parameters);
    if (!/^http/.test(url)) {
      url = options.baseUrl + url;
    }
    const omittedParameters = Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat("baseUrl");
    const remainingParameters = omit(parameters, omittedParameters);
    const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);
    if (!isBinaryRequest) {
      if (options.mediaType.format) {
        headers.accept = headers.accept.split(/,/).map((preview) => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
      }
      if (options.mediaType.previews.length) {
        const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
        headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map((preview) => {
          const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
          return `application/vnd.github.${preview}-preview${format}`;
        }).join(",");
      }
    }
    if (["GET", "HEAD"].includes(method)) {
      url = addQueryParameters(url, remainingParameters);
    } else {
      if ("data" in remainingParameters) {
        body = remainingParameters.data;
      } else {
        if (Object.keys(remainingParameters).length) {
          body = remainingParameters;
        } else {
          headers["content-length"] = 0;
        }
      }
    }
    if (!headers["content-type"] && typeof body !== "undefined") {
      headers["content-type"] = "application/json; charset=utf-8";
    }
    if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
      body = "";
    }
    return Object.assign({
      method,
      url,
      headers
    }, typeof body !== "undefined" ? {
      body
    } : null, options.request ? {
      request: options.request
    } : null);
  }
  function endpointWithDefaults(defaults, route, options) {
    return parse(merge(defaults, route, options));
  }
  function withDefaults(oldDefaults, newDefaults) {
    const DEFAULTS2 = merge(oldDefaults, newDefaults);
    const endpoint2 = endpointWithDefaults.bind(null, DEFAULTS2);
    return Object.assign(endpoint2, {
      DEFAULTS: DEFAULTS2,
      defaults: withDefaults.bind(null, DEFAULTS2),
      merge: merge.bind(null, DEFAULTS2),
      parse
    });
  }
  var VERSION = "6.0.6";
  var userAgent = `octokit-endpoint.js/${VERSION} ${universalUserAgent.getUserAgent()}`;
  var DEFAULTS = {
    method: "GET",
    baseUrl: "https://api.github.com",
    headers: {
      accept: "application/vnd.github.v3+json",
      "user-agent": userAgent
    },
    mediaType: {
      format: "",
      previews: []
    }
  };
  var endpoint = withDefaults(null, DEFAULTS);
  exports2.endpoint = endpoint;
});

// node_modules/node-fetch/lib/index.mjs
var require_lib = __commonJS((exports2) => {
  __markAsModule(exports2);
  __export(exports2, {
    FetchError: () => FetchError,
    Headers: () => Headers,
    Request: () => Request,
    Response: () => Response,
    default: () => lib_default
  });
  var import_stream = __toModule(require("stream"));
  var import_http = __toModule(require("http"));
  var import_url = __toModule(require("url"));
  var import_https = __toModule(require("https"));
  var import_zlib = __toModule(require("zlib"));
  var Readable = import_stream.default.Readable;
  var BUFFER = Symbol("buffer");
  var TYPE = Symbol("type");
  var Blob = class {
    constructor() {
      this[TYPE] = "";
      const blobParts = arguments[0];
      const options = arguments[1];
      const buffers = [];
      let size = 0;
      if (blobParts) {
        const a = blobParts;
        const length = Number(a.length);
        for (let i = 0; i < length; i++) {
          const element = a[i];
          let buffer;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element[BUFFER];
          } else {
            buffer = Buffer.from(typeof element === "string" ? element : String(element));
          }
          size += buffer.length;
          buffers.push(buffer);
        }
      }
      this[BUFFER] = Buffer.concat(buffers);
      let type = options && options.type !== void 0 && String(options.type).toLowerCase();
      if (type && !/[^\u0020-\u007E]/.test(type)) {
        this[TYPE] = type;
      }
    }
    get size() {
      return this[BUFFER].length;
    }
    get type() {
      return this[TYPE];
    }
    text() {
      return Promise.resolve(this[BUFFER].toString());
    }
    arrayBuffer() {
      const buf = this[BUFFER];
      const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      return Promise.resolve(ab);
    }
    stream() {
      const readable = new Readable();
      readable._read = function() {
      };
      readable.push(this[BUFFER]);
      readable.push(null);
      return readable;
    }
    toString() {
      return "[object Blob]";
    }
    slice() {
      const size = this.size;
      const start = arguments[0];
      const end = arguments[1];
      let relativeStart, relativeEnd;
      if (start === void 0) {
        relativeStart = 0;
      } else if (start < 0) {
        relativeStart = Math.max(size + start, 0);
      } else {
        relativeStart = Math.min(start, size);
      }
      if (end === void 0) {
        relativeEnd = size;
      } else if (end < 0) {
        relativeEnd = Math.max(size + end, 0);
      } else {
        relativeEnd = Math.min(end, size);
      }
      const span = Math.max(relativeEnd - relativeStart, 0);
      const buffer = this[BUFFER];
      const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
      const blob = new Blob([], {type: arguments[2]});
      blob[BUFFER] = slicedBuffer;
      return blob;
    }
  };
  Object.defineProperties(Blob.prototype, {
    size: {enumerable: true},
    type: {enumerable: true},
    slice: {enumerable: true}
  });
  Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: "Blob",
    writable: false,
    enumerable: false,
    configurable: true
  });
  function FetchError(message, type, systemError) {
    Error.call(this, message);
    this.message = message;
    this.type = type;
    if (systemError) {
      this.code = this.errno = systemError.code;
    }
    Error.captureStackTrace(this, this.constructor);
  }
  FetchError.prototype = Object.create(Error.prototype);
  FetchError.prototype.constructor = FetchError;
  FetchError.prototype.name = "FetchError";
  var convert;
  try {
    convert = require("encoding").convert;
  } catch (e) {
  }
  var INTERNALS = Symbol("Body internals");
  var PassThrough = import_stream.default.PassThrough;
  function Body(body) {
    var _this = this;
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
    let size = _ref$size === void 0 ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
    if (body == null) {
      body = null;
    } else if (isURLSearchParams(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS] = {
      body,
      disturbed: false,
      error: null
    };
    this.size = size;
    this.timeout = timeout;
    if (body instanceof import_stream.default) {
      body.on("error", function(err) {
        const error2 = err.name === "AbortError" ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
        _this[INTERNALS].error = error2;
      });
    }
  }
  Body.prototype = {
    get body() {
      return this[INTERNALS].body;
    },
    get bodyUsed() {
      return this[INTERNALS].disturbed;
    },
    arrayBuffer() {
      return consumeBody.call(this).then(function(buf) {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      });
    },
    blob() {
      let ct = this.headers && this.headers.get("content-type") || "";
      return consumeBody.call(this).then(function(buf) {
        return Object.assign(new Blob([], {
          type: ct.toLowerCase()
        }), {
          [BUFFER]: buf
        });
      });
    },
    json() {
      var _this2 = this;
      return consumeBody.call(this).then(function(buffer) {
        try {
          return JSON.parse(buffer.toString());
        } catch (err) {
          return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
        }
      });
    },
    text() {
      return consumeBody.call(this).then(function(buffer) {
        return buffer.toString();
      });
    },
    buffer() {
      return consumeBody.call(this);
    },
    textConverted() {
      var _this3 = this;
      return consumeBody.call(this).then(function(buffer) {
        return convertBody(buffer, _this3.headers);
      });
    }
  };
  Object.defineProperties(Body.prototype, {
    body: {enumerable: true},
    bodyUsed: {enumerable: true},
    arrayBuffer: {enumerable: true},
    blob: {enumerable: true},
    json: {enumerable: true},
    text: {enumerable: true}
  });
  Body.mixIn = function(proto) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
      if (!(name in proto)) {
        const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
        Object.defineProperty(proto, name, desc);
      }
    }
  };
  function consumeBody() {
    var _this4 = this;
    if (this[INTERNALS].disturbed) {
      return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
    }
    this[INTERNALS].disturbed = true;
    if (this[INTERNALS].error) {
      return Body.Promise.reject(this[INTERNALS].error);
    }
    let body = this.body;
    if (body === null) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    if (isBlob(body)) {
      body = body.stream();
    }
    if (Buffer.isBuffer(body)) {
      return Body.Promise.resolve(body);
    }
    if (!(body instanceof import_stream.default)) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    let accum = [];
    let accumBytes = 0;
    let abort = false;
    return new Body.Promise(function(resolve, reject) {
      let resTimeout;
      if (_this4.timeout) {
        resTimeout = setTimeout(function() {
          abort = true;
          reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
        }, _this4.timeout);
      }
      body.on("error", function(err) {
        if (err.name === "AbortError") {
          abort = true;
          reject(err);
        } else {
          reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
        }
      });
      body.on("data", function(chunk) {
        if (abort || chunk === null) {
          return;
        }
        if (_this4.size && accumBytes + chunk.length > _this4.size) {
          abort = true;
          reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
          return;
        }
        accumBytes += chunk.length;
        accum.push(chunk);
      });
      body.on("end", function() {
        if (abort) {
          return;
        }
        clearTimeout(resTimeout);
        try {
          resolve(Buffer.concat(accum, accumBytes));
        } catch (err) {
          reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
        }
      });
    });
  }
  function convertBody(buffer, headers) {
    if (typeof convert !== "function") {
      throw new Error("The package `encoding` must be installed to use the textConverted() function");
    }
    const ct = headers.get("content-type");
    let charset = "utf-8";
    let res, str;
    if (ct) {
      res = /charset=([^;]*)/i.exec(ct);
    }
    str = buffer.slice(0, 1024).toString();
    if (!res && str) {
      res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }
    if (!res && str) {
      res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
      if (!res) {
        res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
        if (res) {
          res.pop();
        }
      }
      if (res) {
        res = /charset=(.*)/i.exec(res.pop());
      }
    }
    if (!res && str) {
      res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }
    if (res) {
      charset = res.pop();
      if (charset === "gb2312" || charset === "gbk") {
        charset = "gb18030";
      }
    }
    return convert(buffer, "UTF-8", charset).toString();
  }
  function isURLSearchParams(obj) {
    if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
      return false;
    }
    return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
  }
  function isBlob(obj) {
    return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
  }
  function clone(instance) {
    let p1, p2;
    let body = instance.body;
    if (instance.bodyUsed) {
      throw new Error("cannot clone body after it is used");
    }
    if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
      p1 = new PassThrough();
      p2 = new PassThrough();
      body.pipe(p1);
      body.pipe(p2);
      instance[INTERNALS].body = p1;
      body = p2;
    }
    return body;
  }
  function extractContentType(body) {
    if (body === null) {
      return null;
    } else if (typeof body === "string") {
      return "text/plain;charset=UTF-8";
    } else if (isURLSearchParams(body)) {
      return "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (isBlob(body)) {
      return body.type || null;
    } else if (Buffer.isBuffer(body)) {
      return null;
    } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
      return null;
    } else if (ArrayBuffer.isView(body)) {
      return null;
    } else if (typeof body.getBoundary === "function") {
      return `multipart/form-data;boundary=${body.getBoundary()}`;
    } else if (body instanceof import_stream.default) {
      return null;
    } else {
      return "text/plain;charset=UTF-8";
    }
  }
  function getTotalBytes(instance) {
    const body = instance.body;
    if (body === null) {
      return 0;
    } else if (isBlob(body)) {
      return body.size;
    } else if (Buffer.isBuffer(body)) {
      return body.length;
    } else if (body && typeof body.getLengthSync === "function") {
      if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
        return body.getLengthSync();
      }
      return null;
    } else {
      return null;
    }
  }
  function writeToStream(dest, instance) {
    const body = instance.body;
    if (body === null) {
      dest.end();
    } else if (isBlob(body)) {
      body.stream().pipe(dest);
    } else if (Buffer.isBuffer(body)) {
      dest.write(body);
      dest.end();
    } else {
      body.pipe(dest);
    }
  }
  Body.Promise = global.Promise;
  var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
  var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
  function validateName(name) {
    name = `${name}`;
    if (invalidTokenRegex.test(name) || name === "") {
      throw new TypeError(`${name} is not a legal HTTP header name`);
    }
  }
  function validateValue(value) {
    value = `${value}`;
    if (invalidHeaderCharRegex.test(value)) {
      throw new TypeError(`${value} is not a legal HTTP header value`);
    }
  }
  function find(map, name) {
    name = name.toLowerCase();
    for (const key in map) {
      if (key.toLowerCase() === name) {
        return key;
      }
    }
    return void 0;
  }
  var MAP = Symbol("map");
  var Headers = class {
    constructor() {
      let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      this[MAP] = Object.create(null);
      if (init instanceof Headers) {
        const rawHeaders = init.raw();
        const headerNames = Object.keys(rawHeaders);
        for (const headerName of headerNames) {
          for (const value of rawHeaders[headerName]) {
            this.append(headerName, value);
          }
        }
        return;
      }
      if (init == null)
        ;
      else if (typeof init === "object") {
        const method = init[Symbol.iterator];
        if (method != null) {
          if (typeof method !== "function") {
            throw new TypeError("Header pairs must be iterable");
          }
          const pairs = [];
          for (const pair of init) {
            if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
              throw new TypeError("Each header pair must be iterable");
            }
            pairs.push(Array.from(pair));
          }
          for (const pair of pairs) {
            if (pair.length !== 2) {
              throw new TypeError("Each header pair must be a name/value tuple");
            }
            this.append(pair[0], pair[1]);
          }
        } else {
          for (const key of Object.keys(init)) {
            const value = init[key];
            this.append(key, value);
          }
        }
      } else {
        throw new TypeError("Provided initializer must be an object");
      }
    }
    get(name) {
      name = `${name}`;
      validateName(name);
      const key = find(this[MAP], name);
      if (key === void 0) {
        return null;
      }
      return this[MAP][key].join(", ");
    }
    forEach(callback) {
      let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
      let pairs = getHeaders(this);
      let i = 0;
      while (i < pairs.length) {
        var _pairs$i = pairs[i];
        const name = _pairs$i[0], value = _pairs$i[1];
        callback.call(thisArg, value, name, this);
        pairs = getHeaders(this);
        i++;
      }
    }
    set(name, value) {
      name = `${name}`;
      value = `${value}`;
      validateName(name);
      validateValue(value);
      const key = find(this[MAP], name);
      this[MAP][key !== void 0 ? key : name] = [value];
    }
    append(name, value) {
      name = `${name}`;
      value = `${value}`;
      validateName(name);
      validateValue(value);
      const key = find(this[MAP], name);
      if (key !== void 0) {
        this[MAP][key].push(value);
      } else {
        this[MAP][name] = [value];
      }
    }
    has(name) {
      name = `${name}`;
      validateName(name);
      return find(this[MAP], name) !== void 0;
    }
    delete(name) {
      name = `${name}`;
      validateName(name);
      const key = find(this[MAP], name);
      if (key !== void 0) {
        delete this[MAP][key];
      }
    }
    raw() {
      return this[MAP];
    }
    keys() {
      return createHeadersIterator(this, "key");
    }
    values() {
      return createHeadersIterator(this, "value");
    }
    [Symbol.iterator]() {
      return createHeadersIterator(this, "key+value");
    }
  };
  Headers.prototype.entries = Headers.prototype[Symbol.iterator];
  Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    value: "Headers",
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Headers.prototype, {
    get: {enumerable: true},
    forEach: {enumerable: true},
    set: {enumerable: true},
    append: {enumerable: true},
    has: {enumerable: true},
    delete: {enumerable: true},
    keys: {enumerable: true},
    values: {enumerable: true},
    entries: {enumerable: true}
  });
  function getHeaders(headers) {
    let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
    const keys = Object.keys(headers[MAP]).sort();
    return keys.map(kind === "key" ? function(k) {
      return k.toLowerCase();
    } : kind === "value" ? function(k) {
      return headers[MAP][k].join(", ");
    } : function(k) {
      return [k.toLowerCase(), headers[MAP][k].join(", ")];
    });
  }
  var INTERNAL = Symbol("internal");
  function createHeadersIterator(target, kind) {
    const iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
      target,
      kind,
      index: 0
    };
    return iterator;
  }
  var HeadersIteratorPrototype = Object.setPrototypeOf({
    next() {
      if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
        throw new TypeError("Value of `this` is not a HeadersIterator");
      }
      var _INTERNAL = this[INTERNAL];
      const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
      const values = getHeaders(target, kind);
      const len = values.length;
      if (index >= len) {
        return {
          value: void 0,
          done: true
        };
      }
      this[INTERNAL].index = index + 1;
      return {
        value: values[index],
        done: false
      };
    }
  }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: "HeadersIterator",
    writable: false,
    enumerable: false,
    configurable: true
  });
  function exportNodeCompatibleHeaders(headers) {
    const obj = Object.assign({__proto__: null}, headers[MAP]);
    const hostHeaderKey = find(headers[MAP], "Host");
    if (hostHeaderKey !== void 0) {
      obj[hostHeaderKey] = obj[hostHeaderKey][0];
    }
    return obj;
  }
  function createHeadersLenient(obj) {
    const headers = new Headers();
    for (const name of Object.keys(obj)) {
      if (invalidTokenRegex.test(name)) {
        continue;
      }
      if (Array.isArray(obj[name])) {
        for (const val of obj[name]) {
          if (invalidHeaderCharRegex.test(val)) {
            continue;
          }
          if (headers[MAP][name] === void 0) {
            headers[MAP][name] = [val];
          } else {
            headers[MAP][name].push(val);
          }
        }
      } else if (!invalidHeaderCharRegex.test(obj[name])) {
        headers[MAP][name] = [obj[name]];
      }
    }
    return headers;
  }
  var INTERNALS$1 = Symbol("Response internals");
  var STATUS_CODES = import_http.default.STATUS_CODES;
  var Response = class {
    constructor() {
      let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      Body.call(this, body, opts);
      const status = opts.status || 200;
      const headers = new Headers(opts.headers);
      if (body != null && !headers.has("Content-Type")) {
        const contentType = extractContentType(body);
        if (contentType) {
          headers.append("Content-Type", contentType);
        }
      }
      this[INTERNALS$1] = {
        url: opts.url,
        status,
        statusText: opts.statusText || STATUS_CODES[status],
        headers,
        counter: opts.counter
      };
    }
    get url() {
      return this[INTERNALS$1].url || "";
    }
    get status() {
      return this[INTERNALS$1].status;
    }
    get ok() {
      return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
    }
    get redirected() {
      return this[INTERNALS$1].counter > 0;
    }
    get statusText() {
      return this[INTERNALS$1].statusText;
    }
    get headers() {
      return this[INTERNALS$1].headers;
    }
    clone() {
      return new Response(clone(this), {
        url: this.url,
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        ok: this.ok,
        redirected: this.redirected
      });
    }
  };
  Body.mixIn(Response.prototype);
  Object.defineProperties(Response.prototype, {
    url: {enumerable: true},
    status: {enumerable: true},
    ok: {enumerable: true},
    redirected: {enumerable: true},
    statusText: {enumerable: true},
    headers: {enumerable: true},
    clone: {enumerable: true}
  });
  Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    value: "Response",
    writable: false,
    enumerable: false,
    configurable: true
  });
  var INTERNALS$2 = Symbol("Request internals");
  var parse_url = import_url.default.parse;
  var format_url = import_url.default.format;
  var streamDestructionSupported = "destroy" in import_stream.default.Readable.prototype;
  function isRequest(input) {
    return typeof input === "object" && typeof input[INTERNALS$2] === "object";
  }
  function isAbortSignal(signal) {
    const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
    return !!(proto && proto.constructor.name === "AbortSignal");
  }
  var Request = class {
    constructor(input) {
      let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let parsedURL;
      if (!isRequest(input)) {
        if (input && input.href) {
          parsedURL = parse_url(input.href);
        } else {
          parsedURL = parse_url(`${input}`);
        }
        input = {};
      } else {
        parsedURL = parse_url(input.url);
      }
      let method = init.method || input.method || "GET";
      method = method.toUpperCase();
      if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
        throw new TypeError("Request with GET/HEAD method cannot have body");
      }
      let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
      Body.call(this, inputBody, {
        timeout: init.timeout || input.timeout || 0,
        size: init.size || input.size || 0
      });
      const headers = new Headers(init.headers || input.headers || {});
      if (inputBody != null && !headers.has("Content-Type")) {
        const contentType = extractContentType(inputBody);
        if (contentType) {
          headers.append("Content-Type", contentType);
        }
      }
      let signal = isRequest(input) ? input.signal : null;
      if ("signal" in init)
        signal = init.signal;
      if (signal != null && !isAbortSignal(signal)) {
        throw new TypeError("Expected signal to be an instanceof AbortSignal");
      }
      this[INTERNALS$2] = {
        method,
        redirect: init.redirect || input.redirect || "follow",
        headers,
        parsedURL,
        signal
      };
      this.follow = init.follow !== void 0 ? init.follow : input.follow !== void 0 ? input.follow : 20;
      this.compress = init.compress !== void 0 ? init.compress : input.compress !== void 0 ? input.compress : true;
      this.counter = init.counter || input.counter || 0;
      this.agent = init.agent || input.agent;
    }
    get method() {
      return this[INTERNALS$2].method;
    }
    get url() {
      return format_url(this[INTERNALS$2].parsedURL);
    }
    get headers() {
      return this[INTERNALS$2].headers;
    }
    get redirect() {
      return this[INTERNALS$2].redirect;
    }
    get signal() {
      return this[INTERNALS$2].signal;
    }
    clone() {
      return new Request(this);
    }
  };
  Body.mixIn(Request.prototype);
  Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    value: "Request",
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Request.prototype, {
    method: {enumerable: true},
    url: {enumerable: true},
    headers: {enumerable: true},
    redirect: {enumerable: true},
    clone: {enumerable: true},
    signal: {enumerable: true}
  });
  function getNodeRequestOptions(request) {
    const parsedURL = request[INTERNALS$2].parsedURL;
    const headers = new Headers(request[INTERNALS$2].headers);
    if (!headers.has("Accept")) {
      headers.set("Accept", "*/*");
    }
    if (!parsedURL.protocol || !parsedURL.hostname) {
      throw new TypeError("Only absolute URLs are supported");
    }
    if (!/^https?:$/.test(parsedURL.protocol)) {
      throw new TypeError("Only HTTP(S) protocols are supported");
    }
    if (request.signal && request.body instanceof import_stream.default.Readable && !streamDestructionSupported) {
      throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
    }
    let contentLengthValue = null;
    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
      contentLengthValue = "0";
    }
    if (request.body != null) {
      const totalBytes = getTotalBytes(request);
      if (typeof totalBytes === "number") {
        contentLengthValue = String(totalBytes);
      }
    }
    if (contentLengthValue) {
      headers.set("Content-Length", contentLengthValue);
    }
    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
    }
    if (request.compress && !headers.has("Accept-Encoding")) {
      headers.set("Accept-Encoding", "gzip,deflate");
    }
    let agent = request.agent;
    if (typeof agent === "function") {
      agent = agent(parsedURL);
    }
    if (!headers.has("Connection") && !agent) {
      headers.set("Connection", "close");
    }
    return Object.assign({}, parsedURL, {
      method: request.method,
      headers: exportNodeCompatibleHeaders(headers),
      agent
    });
  }
  function AbortError(message) {
    Error.call(this, message);
    this.type = "aborted";
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
  AbortError.prototype = Object.create(Error.prototype);
  AbortError.prototype.constructor = AbortError;
  AbortError.prototype.name = "AbortError";
  var PassThrough$1 = import_stream.default.PassThrough;
  var resolve_url = import_url.default.resolve;
  function fetch(url, opts) {
    if (!fetch.Promise) {
      throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
    }
    Body.Promise = fetch.Promise;
    return new fetch.Promise(function(resolve, reject) {
      const request = new Request(url, opts);
      const options = getNodeRequestOptions(request);
      const send = (options.protocol === "https:" ? import_https.default : import_http.default).request;
      const signal = request.signal;
      let response = null;
      const abort = function abort2() {
        let error2 = new AbortError("The user aborted a request.");
        reject(error2);
        if (request.body && request.body instanceof import_stream.default.Readable) {
          request.body.destroy(error2);
        }
        if (!response || !response.body)
          return;
        response.body.emit("error", error2);
      };
      if (signal && signal.aborted) {
        abort();
        return;
      }
      const abortAndFinalize = function abortAndFinalize2() {
        abort();
        finalize();
      };
      const req = send(options);
      let reqTimeout;
      if (signal) {
        signal.addEventListener("abort", abortAndFinalize);
      }
      function finalize() {
        req.abort();
        if (signal)
          signal.removeEventListener("abort", abortAndFinalize);
        clearTimeout(reqTimeout);
      }
      if (request.timeout) {
        req.once("socket", function(socket) {
          reqTimeout = setTimeout(function() {
            reject(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
            finalize();
          }, request.timeout);
        });
      }
      req.on("error", function(err) {
        reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
        finalize();
      });
      req.on("response", function(res) {
        clearTimeout(reqTimeout);
        const headers = createHeadersLenient(res.headers);
        if (fetch.isRedirect(res.statusCode)) {
          const location = headers.get("Location");
          const locationURL = location === null ? null : resolve_url(request.url, location);
          switch (request.redirect) {
            case "error":
              reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
              finalize();
              return;
            case "manual":
              if (locationURL !== null) {
                try {
                  headers.set("Location", locationURL);
                } catch (err) {
                  reject(err);
                }
              }
              break;
            case "follow":
              if (locationURL === null) {
                break;
              }
              if (request.counter >= request.follow) {
                reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                finalize();
                return;
              }
              const requestOpts = {
                headers: new Headers(request.headers),
                follow: request.follow,
                counter: request.counter + 1,
                agent: request.agent,
                compress: request.compress,
                method: request.method,
                body: request.body,
                signal: request.signal,
                timeout: request.timeout,
                size: request.size
              };
              if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                finalize();
                return;
              }
              if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                requestOpts.method = "GET";
                requestOpts.body = void 0;
                requestOpts.headers.delete("content-length");
              }
              resolve(fetch(new Request(locationURL, requestOpts)));
              finalize();
              return;
          }
        }
        res.once("end", function() {
          if (signal)
            signal.removeEventListener("abort", abortAndFinalize);
        });
        let body = res.pipe(new PassThrough$1());
        const response_options = {
          url: request.url,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers,
          size: request.size,
          timeout: request.timeout,
          counter: request.counter
        };
        const codings = headers.get("Content-Encoding");
        if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        const zlibOptions = {
          flush: import_zlib.default.Z_SYNC_FLUSH,
          finishFlush: import_zlib.default.Z_SYNC_FLUSH
        };
        if (codings == "gzip" || codings == "x-gzip") {
          body = body.pipe(import_zlib.default.createGunzip(zlibOptions));
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        if (codings == "deflate" || codings == "x-deflate") {
          const raw = res.pipe(new PassThrough$1());
          raw.once("data", function(chunk) {
            if ((chunk[0] & 15) === 8) {
              body = body.pipe(import_zlib.default.createInflate());
            } else {
              body = body.pipe(import_zlib.default.createInflateRaw());
            }
            response = new Response(body, response_options);
            resolve(response);
          });
          return;
        }
        if (codings == "br" && typeof import_zlib.default.createBrotliDecompress === "function") {
          body = body.pipe(import_zlib.default.createBrotliDecompress());
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        response = new Response(body, response_options);
        resolve(response);
      });
      writeToStream(req, request);
    });
  }
  fetch.isRedirect = function(code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  };
  fetch.Promise = global.Promise;
  var lib_default = fetch;
});

// node_modules/deprecation/dist-node/index.js
var require_dist_node3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var Deprecation = class extends Error {
    constructor(message) {
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "Deprecation";
    }
  };
  exports2.Deprecation = Deprecation;
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS((exports2, module2) => {
  module2.exports = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb)
      return wrappy(fn)(cb);
    if (typeof fn !== "function")
      throw new TypeError("need wrapper function");
    Object.keys(fn).forEach(function(k) {
      wrapper[k] = fn[k];
    });
    return wrapper;
    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb2 = args[args.length - 1];
      if (typeof ret === "function" && ret !== cb2) {
        Object.keys(cb2).forEach(function(k) {
          ret[k] = cb2[k];
        });
      }
      return ret;
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS((exports2, module2) => {
  var wrappy = require_wrappy();
  module2.exports = wrappy(once);
  module2.exports.strict = wrappy(onceStrict);
  once.proto = once(function() {
    Object.defineProperty(Function.prototype, "once", {
      value: function() {
        return once(this);
      },
      configurable: true
    });
    Object.defineProperty(Function.prototype, "onceStrict", {
      value: function() {
        return onceStrict(this);
      },
      configurable: true
    });
  });
  function once(fn) {
    var f = function() {
      if (f.called)
        return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }
  function onceStrict(fn) {
    var f = function() {
      if (f.called)
        throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || "Function wrapped with `once`";
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
});

// node_modules/@octokit/request-error/dist-node/index.js
var require_dist_node4 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var deprecation = require_dist_node3();
  var once = _interopDefault(require_once());
  var logOnce = once((deprecation2) => console.warn(deprecation2));
  var RequestError = class extends Error {
    constructor(message, statusCode, options) {
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "HttpError";
      this.status = statusCode;
      Object.defineProperty(this, "code", {
        get() {
          logOnce(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
          return statusCode;
        }
      });
      this.headers = options.headers || {};
      const requestCopy = Object.assign({}, options.request);
      if (options.request.headers.authorization) {
        requestCopy.headers = Object.assign({}, options.request.headers, {
          authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
        });
      }
      requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
      this.request = requestCopy;
    }
  };
  exports2.RequestError = RequestError;
});

// node_modules/@octokit/request/dist-node/index.js
var require_dist_node5 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var endpoint = require_dist_node2();
  var universalUserAgent = require_dist_node();
  var isPlainObject = require_is_plain_object();
  var nodeFetch = _interopDefault(require_lib());
  var requestError = require_dist_node4();
  var VERSION = "5.4.9";
  function getBufferResponse(response) {
    return response.arrayBuffer();
  }
  function fetchWrapper(requestOptions) {
    if (isPlainObject.isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
      requestOptions.body = JSON.stringify(requestOptions.body);
    }
    let headers = {};
    let status;
    let url;
    const fetch = requestOptions.request && requestOptions.request.fetch || nodeFetch;
    return fetch(requestOptions.url, Object.assign({
      method: requestOptions.method,
      body: requestOptions.body,
      headers: requestOptions.headers,
      redirect: requestOptions.redirect
    }, requestOptions.request)).then((response) => {
      url = response.url;
      status = response.status;
      for (const keyAndValue of response.headers) {
        headers[keyAndValue[0]] = keyAndValue[1];
      }
      if (status === 204 || status === 205) {
        return;
      }
      if (requestOptions.method === "HEAD") {
        if (status < 400) {
          return;
        }
        throw new requestError.RequestError(response.statusText, status, {
          headers,
          request: requestOptions
        });
      }
      if (status === 304) {
        throw new requestError.RequestError("Not modified", status, {
          headers,
          request: requestOptions
        });
      }
      if (status >= 400) {
        return response.text().then((message) => {
          const error2 = new requestError.RequestError(message, status, {
            headers,
            request: requestOptions
          });
          try {
            let responseBody = JSON.parse(error2.message);
            Object.assign(error2, responseBody);
            let errors = responseBody.errors;
            error2.message = error2.message + ": " + errors.map(JSON.stringify).join(", ");
          } catch (e) {
          }
          throw error2;
        });
      }
      const contentType = response.headers.get("content-type");
      if (/application\/json/.test(contentType)) {
        return response.json();
      }
      if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
        return response.text();
      }
      return getBufferResponse(response);
    }).then((data) => {
      return {
        status,
        url,
        headers,
        data
      };
    }).catch((error2) => {
      if (error2 instanceof requestError.RequestError) {
        throw error2;
      }
      throw new requestError.RequestError(error2.message, 500, {
        headers,
        request: requestOptions
      });
    });
  }
  function withDefaults(oldEndpoint, newDefaults) {
    const endpoint2 = oldEndpoint.defaults(newDefaults);
    const newApi = function(route, parameters) {
      const endpointOptions = endpoint2.merge(route, parameters);
      if (!endpointOptions.request || !endpointOptions.request.hook) {
        return fetchWrapper(endpoint2.parse(endpointOptions));
      }
      const request2 = (route2, parameters2) => {
        return fetchWrapper(endpoint2.parse(endpoint2.merge(route2, parameters2)));
      };
      Object.assign(request2, {
        endpoint: endpoint2,
        defaults: withDefaults.bind(null, endpoint2)
      });
      return endpointOptions.request.hook(request2, endpointOptions);
    };
    return Object.assign(newApi, {
      endpoint: endpoint2,
      defaults: withDefaults.bind(null, endpoint2)
    });
  }
  var request = withDefaults(endpoint.endpoint, {
    headers: {
      "user-agent": `octokit-request.js/${VERSION} ${universalUserAgent.getUserAgent()}`
    }
  });
  exports2.request = request;
});

// node_modules/@octokit/graphql/dist-node/index.js
var require_dist_node6 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var request = require_dist_node5();
  var universalUserAgent = require_dist_node();
  var VERSION = "4.5.6";
  var GraphqlError = class extends Error {
    constructor(request2, response) {
      const message = response.data.errors[0].message;
      super(message);
      Object.assign(this, response.data);
      Object.assign(this, {
        headers: response.headers
      });
      this.name = "GraphqlError";
      this.request = request2;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  };
  var NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"];
  var GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
  function graphql(request2, query, options) {
    if (typeof query === "string" && options && "query" in options) {
      return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
    }
    const parsedOptions = typeof query === "string" ? Object.assign({
      query
    }, options) : query;
    const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
      if (NON_VARIABLE_OPTIONS.includes(key)) {
        result[key] = parsedOptions[key];
        return result;
      }
      if (!result.variables) {
        result.variables = {};
      }
      result.variables[key] = parsedOptions[key];
      return result;
    }, {});
    const baseUrl = parsedOptions.baseUrl || request2.endpoint.DEFAULTS.baseUrl;
    if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
      requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
    }
    return request2(requestOptions).then((response) => {
      if (response.data.errors) {
        const headers = {};
        for (const key of Object.keys(response.headers)) {
          headers[key] = response.headers[key];
        }
        throw new GraphqlError(requestOptions, {
          headers,
          data: response.data
        });
      }
      return response.data.data;
    });
  }
  function withDefaults(request$1, newDefaults) {
    const newRequest = request$1.defaults(newDefaults);
    const newApi = (query, options) => {
      return graphql(newRequest, query, options);
    };
    return Object.assign(newApi, {
      defaults: withDefaults.bind(null, newRequest),
      endpoint: request.request.endpoint
    });
  }
  var graphql$1 = withDefaults(request.request, {
    headers: {
      "user-agent": `octokit-graphql.js/${VERSION} ${universalUserAgent.getUserAgent()}`
    },
    method: "POST",
    url: "/graphql"
  });
  function withCustomRequest(customRequest) {
    return withDefaults(customRequest, {
      method: "POST",
      url: "/graphql"
    });
  }
  exports2.graphql = graphql$1;
  exports2.withCustomRequest = withCustomRequest;
});

// node_modules/@octokit/plugin-request-log/dist-node/index.js
var require_dist_node7 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var VERSION = "1.0.0";
  function requestLog(octokit) {
    octokit.hook.wrap("request", (request, options) => {
      octokit.log.debug("request", options);
      const start = Date.now();
      const requestOptions = octokit.request.endpoint.parse(options);
      const path = requestOptions.url.replace(options.baseUrl, "");
      return request(options).then((response) => {
        octokit.log.info(`${requestOptions.method} ${path} - ${response.status} in ${Date.now() - start}ms`);
        return response;
      }).catch((error2) => {
        octokit.log.info(`${requestOptions.method} ${path} - ${error2.status} in ${Date.now() - start}ms`);
        throw error2;
      });
    });
  }
  requestLog.VERSION = VERSION;
  exports2.requestLog = requestLog;
});

// node_modules/@octokit/plugin-rest-endpoint-methods/dist-node/index.js
var require_dist_node8 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var deprecation = require_dist_node3();
  var endpointsByScope = {
    actions: {
      cancelWorkflowRun: {
        method: "POST",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          run_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/runs/:run_id/cancel"
      },
      createOrUpdateSecretForRepo: {
        method: "PUT",
        params: {
          encrypted_value: {
            type: "string"
          },
          key_id: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/secrets/:name"
      },
      createRegistrationToken: {
        method: "POST",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/runners/registration-token"
      },
      createRemoveToken: {
        method: "POST",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/runners/remove-token"
      },
      deleteArtifact: {
        method: "DELETE",
        params: {
          artifact_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/artifacts/:artifact_id"
      },
      deleteSecretFromRepo: {
        method: "DELETE",
        params: {
          name: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/secrets/:name"
      },
      downloadArtifact: {
        method: "GET",
        params: {
          archive_format: {
            required: true,
            type: "string"
          },
          artifact_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/artifacts/:artifact_id/:archive_format"
      },
      getArtifact: {
        method: "GET",
        params: {
          artifact_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/artifacts/:artifact_id"
      },
      getPublicKey: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/secrets/public-key"
      },
      getSecret: {
        method: "GET",
        params: {
          name: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/secrets/:name"
      },
      getSelfHostedRunner: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          runner_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/runners/:runner_id"
      },
      getWorkflow: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          workflow_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/workflows/:workflow_id"
      },
      getWorkflowJob: {
        method: "GET",
        params: {
          job_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/jobs/:job_id"
      },
      getWorkflowRun: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          run_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/runs/:run_id"
      },
      listDownloadsForSelfHostedRunnerApplication: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/runners/downloads"
      },
      listJobsForWorkflowRun: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          run_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/runs/:run_id/jobs"
      },
      listRepoWorkflowRuns: {
        method: "GET",
        params: {
          actor: {
            type: "string"
          },
          branch: {
            type: "string"
          },
          event: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          status: {
            enum: ["completed", "status", "conclusion"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/runs"
      },
      listRepoWorkflows: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/workflows"
      },
      listSecretsForRepo: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/secrets"
      },
      listSelfHostedRunnersForRepo: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/runners"
      },
      listWorkflowJobLogs: {
        method: "GET",
        params: {
          job_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/actions/jobs/:job_id/logs"
      },
      listWorkflowRunArtifacts: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          run_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/runs/:run_id/artifacts"
      },
      listWorkflowRunLogs: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          run_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/runs/:run_id/logs"
      },
      listWorkflowRuns: {
        method: "GET",
        params: {
          actor: {
            type: "string"
          },
          branch: {
            type: "string"
          },
          event: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          status: {
            enum: ["completed", "status", "conclusion"],
            type: "string"
          },
          workflow_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/workflows/:workflow_id/runs"
      },
      reRunWorkflow: {
        method: "POST",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          run_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/runs/:run_id/rerun"
      },
      removeSelfHostedRunner: {
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          runner_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/actions/runners/:runner_id"
      }
    },
    activity: {
      checkStarringRepo: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/user/starred/:owner/:repo"
      },
      deleteRepoSubscription: {
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/subscription"
      },
      deleteThreadSubscription: {
        method: "DELETE",
        params: {
          thread_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/notifications/threads/:thread_id/subscription"
      },
      getRepoSubscription: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/subscription"
      },
      getThread: {
        method: "GET",
        params: {
          thread_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/notifications/threads/:thread_id"
      },
      getThreadSubscription: {
        method: "GET",
        params: {
          thread_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/notifications/threads/:thread_id/subscription"
      },
      listEventsForOrg: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/events/orgs/:org"
      },
      listEventsForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/events"
      },
      listFeeds: {
        method: "GET",
        params: {},
        url: "/feeds"
      },
      listNotifications: {
        method: "GET",
        params: {
          all: {
            type: "boolean"
          },
          before: {
            type: "string"
          },
          page: {
            type: "integer"
          },
          participating: {
            type: "boolean"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          }
        },
        url: "/notifications"
      },
      listNotificationsForRepo: {
        method: "GET",
        params: {
          all: {
            type: "boolean"
          },
          before: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          participating: {
            type: "boolean"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          since: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/notifications"
      },
      listPublicEvents: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/events"
      },
      listPublicEventsForOrg: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/events"
      },
      listPublicEventsForRepoNetwork: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/networks/:owner/:repo/events"
      },
      listPublicEventsForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/events/public"
      },
      listReceivedEventsForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/received_events"
      },
      listReceivedPublicEventsForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/received_events/public"
      },
      listRepoEvents: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/events"
      },
      listReposStarredByAuthenticatedUser: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          sort: {
            enum: ["created", "updated"],
            type: "string"
          }
        },
        url: "/user/starred"
      },
      listReposStarredByUser: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          sort: {
            enum: ["created", "updated"],
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/starred"
      },
      listReposWatchedByUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/subscriptions"
      },
      listStargazersForRepo: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/stargazers"
      },
      listWatchedReposForAuthenticatedUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/subscriptions"
      },
      listWatchersForRepo: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/subscribers"
      },
      markAsRead: {
        method: "PUT",
        params: {
          last_read_at: {
            type: "string"
          }
        },
        url: "/notifications"
      },
      markNotificationsAsReadForRepo: {
        method: "PUT",
        params: {
          last_read_at: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/notifications"
      },
      markThreadAsRead: {
        method: "PATCH",
        params: {
          thread_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/notifications/threads/:thread_id"
      },
      setRepoSubscription: {
        method: "PUT",
        params: {
          ignored: {
            type: "boolean"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          subscribed: {
            type: "boolean"
          }
        },
        url: "/repos/:owner/:repo/subscription"
      },
      setThreadSubscription: {
        method: "PUT",
        params: {
          ignored: {
            type: "boolean"
          },
          thread_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/notifications/threads/:thread_id/subscription"
      },
      starRepo: {
        method: "PUT",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/user/starred/:owner/:repo"
      },
      unstarRepo: {
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/user/starred/:owner/:repo"
      }
    },
    apps: {
      addRepoToInstallation: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "PUT",
        params: {
          installation_id: {
            required: true,
            type: "integer"
          },
          repository_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/installations/:installation_id/repositories/:repository_id"
      },
      checkAccountIsAssociatedWithAny: {
        method: "GET",
        params: {
          account_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/marketplace_listing/accounts/:account_id"
      },
      checkAccountIsAssociatedWithAnyStubbed: {
        method: "GET",
        params: {
          account_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/marketplace_listing/stubbed/accounts/:account_id"
      },
      checkAuthorization: {
        deprecated: "octokit.apps.checkAuthorization() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#check-an-authorization",
        method: "GET",
        params: {
          access_token: {
            required: true,
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/tokens/:access_token"
      },
      checkToken: {
        headers: {
          accept: "application/vnd.github.doctor-strange-preview+json"
        },
        method: "POST",
        params: {
          access_token: {
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/token"
      },
      createContentAttachment: {
        headers: {
          accept: "application/vnd.github.corsair-preview+json"
        },
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          content_reference_id: {
            required: true,
            type: "integer"
          },
          title: {
            required: true,
            type: "string"
          }
        },
        url: "/content_references/:content_reference_id/attachments"
      },
      createFromManifest: {
        headers: {
          accept: "application/vnd.github.fury-preview+json"
        },
        method: "POST",
        params: {
          code: {
            required: true,
            type: "string"
          }
        },
        url: "/app-manifests/:code/conversions"
      },
      createInstallationToken: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "POST",
        params: {
          installation_id: {
            required: true,
            type: "integer"
          },
          permissions: {
            type: "object"
          },
          repository_ids: {
            type: "integer[]"
          }
        },
        url: "/app/installations/:installation_id/access_tokens"
      },
      deleteAuthorization: {
        headers: {
          accept: "application/vnd.github.doctor-strange-preview+json"
        },
        method: "DELETE",
        params: {
          access_token: {
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/grant"
      },
      deleteInstallation: {
        headers: {
          accept: "application/vnd.github.gambit-preview+json,application/vnd.github.machine-man-preview+json"
        },
        method: "DELETE",
        params: {
          installation_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/app/installations/:installation_id"
      },
      deleteToken: {
        headers: {
          accept: "application/vnd.github.doctor-strange-preview+json"
        },
        method: "DELETE",
        params: {
          access_token: {
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/token"
      },
      findOrgInstallation: {
        deprecated: "octokit.apps.findOrgInstallation() has been renamed to octokit.apps.getOrgInstallation() (2019-04-10)",
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/installation"
      },
      findRepoInstallation: {
        deprecated: "octokit.apps.findRepoInstallation() has been renamed to octokit.apps.getRepoInstallation() (2019-04-10)",
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/installation"
      },
      findUserInstallation: {
        deprecated: "octokit.apps.findUserInstallation() has been renamed to octokit.apps.getUserInstallation() (2019-04-10)",
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/installation"
      },
      getAuthenticated: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {},
        url: "/app"
      },
      getBySlug: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          app_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/apps/:app_slug"
      },
      getInstallation: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          installation_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/app/installations/:installation_id"
      },
      getOrgInstallation: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/installation"
      },
      getRepoInstallation: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/installation"
      },
      getUserInstallation: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/installation"
      },
      listAccountsUserOrOrgOnPlan: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          plan_id: {
            required: true,
            type: "integer"
          },
          sort: {
            enum: ["created", "updated"],
            type: "string"
          }
        },
        url: "/marketplace_listing/plans/:plan_id/accounts"
      },
      listAccountsUserOrOrgOnPlanStubbed: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          plan_id: {
            required: true,
            type: "integer"
          },
          sort: {
            enum: ["created", "updated"],
            type: "string"
          }
        },
        url: "/marketplace_listing/stubbed/plans/:plan_id/accounts"
      },
      listInstallationReposForAuthenticatedUser: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          installation_id: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/installations/:installation_id/repositories"
      },
      listInstallations: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/app/installations"
      },
      listInstallationsForAuthenticatedUser: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/installations"
      },
      listMarketplacePurchasesForAuthenticatedUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/marketplace_purchases"
      },
      listMarketplacePurchasesForAuthenticatedUserStubbed: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/marketplace_purchases/stubbed"
      },
      listPlans: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/marketplace_listing/plans"
      },
      listPlansStubbed: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/marketplace_listing/stubbed/plans"
      },
      listRepos: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/installation/repositories"
      },
      removeRepoFromInstallation: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "DELETE",
        params: {
          installation_id: {
            required: true,
            type: "integer"
          },
          repository_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/installations/:installation_id/repositories/:repository_id"
      },
      resetAuthorization: {
        deprecated: "octokit.apps.resetAuthorization() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#reset-an-authorization",
        method: "POST",
        params: {
          access_token: {
            required: true,
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/tokens/:access_token"
      },
      resetToken: {
        headers: {
          accept: "application/vnd.github.doctor-strange-preview+json"
        },
        method: "PATCH",
        params: {
          access_token: {
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/token"
      },
      revokeAuthorizationForApplication: {
        deprecated: "octokit.apps.revokeAuthorizationForApplication() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#revoke-an-authorization-for-an-application",
        method: "DELETE",
        params: {
          access_token: {
            required: true,
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/tokens/:access_token"
      },
      revokeGrantForApplication: {
        deprecated: "octokit.apps.revokeGrantForApplication() is deprecated, see https://developer.github.com/v3/apps/oauth_applications/#revoke-a-grant-for-an-application",
        method: "DELETE",
        params: {
          access_token: {
            required: true,
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/grants/:access_token"
      },
      revokeInstallationToken: {
        headers: {
          accept: "application/vnd.github.gambit-preview+json"
        },
        method: "DELETE",
        params: {},
        url: "/installation/token"
      }
    },
    checks: {
      create: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "POST",
        params: {
          actions: {
            type: "object[]"
          },
          "actions[].description": {
            required: true,
            type: "string"
          },
          "actions[].identifier": {
            required: true,
            type: "string"
          },
          "actions[].label": {
            required: true,
            type: "string"
          },
          completed_at: {
            type: "string"
          },
          conclusion: {
            enum: ["success", "failure", "neutral", "cancelled", "timed_out", "action_required"],
            type: "string"
          },
          details_url: {
            type: "string"
          },
          external_id: {
            type: "string"
          },
          head_sha: {
            required: true,
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          output: {
            type: "object"
          },
          "output.annotations": {
            type: "object[]"
          },
          "output.annotations[].annotation_level": {
            enum: ["notice", "warning", "failure"],
            required: true,
            type: "string"
          },
          "output.annotations[].end_column": {
            type: "integer"
          },
          "output.annotations[].end_line": {
            required: true,
            type: "integer"
          },
          "output.annotations[].message": {
            required: true,
            type: "string"
          },
          "output.annotations[].path": {
            required: true,
            type: "string"
          },
          "output.annotations[].raw_details": {
            type: "string"
          },
          "output.annotations[].start_column": {
            type: "integer"
          },
          "output.annotations[].start_line": {
            required: true,
            type: "integer"
          },
          "output.annotations[].title": {
            type: "string"
          },
          "output.images": {
            type: "object[]"
          },
          "output.images[].alt": {
            required: true,
            type: "string"
          },
          "output.images[].caption": {
            type: "string"
          },
          "output.images[].image_url": {
            required: true,
            type: "string"
          },
          "output.summary": {
            required: true,
            type: "string"
          },
          "output.text": {
            type: "string"
          },
          "output.title": {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          started_at: {
            type: "string"
          },
          status: {
            enum: ["queued", "in_progress", "completed"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-runs"
      },
      createSuite: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "POST",
        params: {
          head_sha: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-suites"
      },
      get: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "GET",
        params: {
          check_run_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-runs/:check_run_id"
      },
      getSuite: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "GET",
        params: {
          check_suite_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-suites/:check_suite_id"
      },
      listAnnotations: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "GET",
        params: {
          check_run_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-runs/:check_run_id/annotations"
      },
      listForRef: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "GET",
        params: {
          check_name: {
            type: "string"
          },
          filter: {
            enum: ["latest", "all"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          status: {
            enum: ["queued", "in_progress", "completed"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:ref/check-runs"
      },
      listForSuite: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "GET",
        params: {
          check_name: {
            type: "string"
          },
          check_suite_id: {
            required: true,
            type: "integer"
          },
          filter: {
            enum: ["latest", "all"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          status: {
            enum: ["queued", "in_progress", "completed"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-suites/:check_suite_id/check-runs"
      },
      listSuitesForRef: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "GET",
        params: {
          app_id: {
            type: "integer"
          },
          check_name: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:ref/check-suites"
      },
      rerequestSuite: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "POST",
        params: {
          check_suite_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-suites/:check_suite_id/rerequest"
      },
      setSuitesPreferences: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "PATCH",
        params: {
          auto_trigger_checks: {
            type: "object[]"
          },
          "auto_trigger_checks[].app_id": {
            required: true,
            type: "integer"
          },
          "auto_trigger_checks[].setting": {
            required: true,
            type: "boolean"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-suites/preferences"
      },
      update: {
        headers: {
          accept: "application/vnd.github.antiope-preview+json"
        },
        method: "PATCH",
        params: {
          actions: {
            type: "object[]"
          },
          "actions[].description": {
            required: true,
            type: "string"
          },
          "actions[].identifier": {
            required: true,
            type: "string"
          },
          "actions[].label": {
            required: true,
            type: "string"
          },
          check_run_id: {
            required: true,
            type: "integer"
          },
          completed_at: {
            type: "string"
          },
          conclusion: {
            enum: ["success", "failure", "neutral", "cancelled", "timed_out", "action_required"],
            type: "string"
          },
          details_url: {
            type: "string"
          },
          external_id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          output: {
            type: "object"
          },
          "output.annotations": {
            type: "object[]"
          },
          "output.annotations[].annotation_level": {
            enum: ["notice", "warning", "failure"],
            required: true,
            type: "string"
          },
          "output.annotations[].end_column": {
            type: "integer"
          },
          "output.annotations[].end_line": {
            required: true,
            type: "integer"
          },
          "output.annotations[].message": {
            required: true,
            type: "string"
          },
          "output.annotations[].path": {
            required: true,
            type: "string"
          },
          "output.annotations[].raw_details": {
            type: "string"
          },
          "output.annotations[].start_column": {
            type: "integer"
          },
          "output.annotations[].start_line": {
            required: true,
            type: "integer"
          },
          "output.annotations[].title": {
            type: "string"
          },
          "output.images": {
            type: "object[]"
          },
          "output.images[].alt": {
            required: true,
            type: "string"
          },
          "output.images[].caption": {
            type: "string"
          },
          "output.images[].image_url": {
            required: true,
            type: "string"
          },
          "output.summary": {
            required: true,
            type: "string"
          },
          "output.text": {
            type: "string"
          },
          "output.title": {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          started_at: {
            type: "string"
          },
          status: {
            enum: ["queued", "in_progress", "completed"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/check-runs/:check_run_id"
      }
    },
    codesOfConduct: {
      getConductCode: {
        headers: {
          accept: "application/vnd.github.scarlet-witch-preview+json"
        },
        method: "GET",
        params: {
          key: {
            required: true,
            type: "string"
          }
        },
        url: "/codes_of_conduct/:key"
      },
      getForRepo: {
        headers: {
          accept: "application/vnd.github.scarlet-witch-preview+json"
        },
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/community/code_of_conduct"
      },
      listConductCodes: {
        headers: {
          accept: "application/vnd.github.scarlet-witch-preview+json"
        },
        method: "GET",
        params: {},
        url: "/codes_of_conduct"
      }
    },
    emojis: {
      get: {
        method: "GET",
        params: {},
        url: "/emojis"
      }
    },
    gists: {
      checkIsStarred: {
        method: "GET",
        params: {
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/star"
      },
      create: {
        method: "POST",
        params: {
          description: {
            type: "string"
          },
          files: {
            required: true,
            type: "object"
          },
          "files.content": {
            type: "string"
          },
          public: {
            type: "boolean"
          }
        },
        url: "/gists"
      },
      createComment: {
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/comments"
      },
      delete: {
        method: "DELETE",
        params: {
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id"
      },
      deleteComment: {
        method: "DELETE",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/comments/:comment_id"
      },
      fork: {
        method: "POST",
        params: {
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/forks"
      },
      get: {
        method: "GET",
        params: {
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id"
      },
      getComment: {
        method: "GET",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/comments/:comment_id"
      },
      getRevision: {
        method: "GET",
        params: {
          gist_id: {
            required: true,
            type: "string"
          },
          sha: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/:sha"
      },
      list: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          }
        },
        url: "/gists"
      },
      listComments: {
        method: "GET",
        params: {
          gist_id: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/gists/:gist_id/comments"
      },
      listCommits: {
        method: "GET",
        params: {
          gist_id: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/gists/:gist_id/commits"
      },
      listForks: {
        method: "GET",
        params: {
          gist_id: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/gists/:gist_id/forks"
      },
      listPublic: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          }
        },
        url: "/gists/public"
      },
      listPublicForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/gists"
      },
      listStarred: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          }
        },
        url: "/gists/starred"
      },
      star: {
        method: "PUT",
        params: {
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/star"
      },
      unstar: {
        method: "DELETE",
        params: {
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/star"
      },
      update: {
        method: "PATCH",
        params: {
          description: {
            type: "string"
          },
          files: {
            type: "object"
          },
          "files.content": {
            type: "string"
          },
          "files.filename": {
            type: "string"
          },
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id"
      },
      updateComment: {
        method: "PATCH",
        params: {
          body: {
            required: true,
            type: "string"
          },
          comment_id: {
            required: true,
            type: "integer"
          },
          gist_id: {
            required: true,
            type: "string"
          }
        },
        url: "/gists/:gist_id/comments/:comment_id"
      }
    },
    git: {
      createBlob: {
        method: "POST",
        params: {
          content: {
            required: true,
            type: "string"
          },
          encoding: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/blobs"
      },
      createCommit: {
        method: "POST",
        params: {
          author: {
            type: "object"
          },
          "author.date": {
            type: "string"
          },
          "author.email": {
            type: "string"
          },
          "author.name": {
            type: "string"
          },
          committer: {
            type: "object"
          },
          "committer.date": {
            type: "string"
          },
          "committer.email": {
            type: "string"
          },
          "committer.name": {
            type: "string"
          },
          message: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          parents: {
            required: true,
            type: "string[]"
          },
          repo: {
            required: true,
            type: "string"
          },
          signature: {
            type: "string"
          },
          tree: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/commits"
      },
      createRef: {
        method: "POST",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/refs"
      },
      createTag: {
        method: "POST",
        params: {
          message: {
            required: true,
            type: "string"
          },
          object: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          tag: {
            required: true,
            type: "string"
          },
          tagger: {
            type: "object"
          },
          "tagger.date": {
            type: "string"
          },
          "tagger.email": {
            type: "string"
          },
          "tagger.name": {
            type: "string"
          },
          type: {
            enum: ["commit", "tree", "blob"],
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/tags"
      },
      createTree: {
        method: "POST",
        params: {
          base_tree: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          tree: {
            required: true,
            type: "object[]"
          },
          "tree[].content": {
            type: "string"
          },
          "tree[].mode": {
            enum: ["100644", "100755", "040000", "160000", "120000"],
            type: "string"
          },
          "tree[].path": {
            type: "string"
          },
          "tree[].sha": {
            allowNull: true,
            type: "string"
          },
          "tree[].type": {
            enum: ["blob", "tree", "commit"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/trees"
      },
      deleteRef: {
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/refs/:ref"
      },
      getBlob: {
        method: "GET",
        params: {
          file_sha: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/blobs/:file_sha"
      },
      getCommit: {
        method: "GET",
        params: {
          commit_sha: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/commits/:commit_sha"
      },
      getRef: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/ref/:ref"
      },
      getTag: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          tag_sha: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/tags/:tag_sha"
      },
      getTree: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          recursive: {
            enum: ["1"],
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          tree_sha: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/trees/:tree_sha"
      },
      listMatchingRefs: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/matching-refs/:ref"
      },
      listRefs: {
        method: "GET",
        params: {
          namespace: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/refs/:namespace"
      },
      updateRef: {
        method: "PATCH",
        params: {
          force: {
            type: "boolean"
          },
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/git/refs/:ref"
      }
    },
    gitignore: {
      getTemplate: {
        method: "GET",
        params: {
          name: {
            required: true,
            type: "string"
          }
        },
        url: "/gitignore/templates/:name"
      },
      listTemplates: {
        method: "GET",
        params: {},
        url: "/gitignore/templates"
      }
    },
    interactions: {
      addOrUpdateRestrictionsForOrg: {
        headers: {
          accept: "application/vnd.github.sombra-preview+json"
        },
        method: "PUT",
        params: {
          limit: {
            enum: ["existing_users", "contributors_only", "collaborators_only"],
            required: true,
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/interaction-limits"
      },
      addOrUpdateRestrictionsForRepo: {
        headers: {
          accept: "application/vnd.github.sombra-preview+json"
        },
        method: "PUT",
        params: {
          limit: {
            enum: ["existing_users", "contributors_only", "collaborators_only"],
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/interaction-limits"
      },
      getRestrictionsForOrg: {
        headers: {
          accept: "application/vnd.github.sombra-preview+json"
        },
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/interaction-limits"
      },
      getRestrictionsForRepo: {
        headers: {
          accept: "application/vnd.github.sombra-preview+json"
        },
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/interaction-limits"
      },
      removeRestrictionsForOrg: {
        headers: {
          accept: "application/vnd.github.sombra-preview+json"
        },
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/interaction-limits"
      },
      removeRestrictionsForRepo: {
        headers: {
          accept: "application/vnd.github.sombra-preview+json"
        },
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/interaction-limits"
      }
    },
    issues: {
      addAssignees: {
        method: "POST",
        params: {
          assignees: {
            type: "string[]"
          },
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/assignees"
      },
      addLabels: {
        method: "POST",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          labels: {
            required: true,
            type: "string[]"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/labels"
      },
      checkAssignee: {
        method: "GET",
        params: {
          assignee: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/assignees/:assignee"
      },
      create: {
        method: "POST",
        params: {
          assignee: {
            type: "string"
          },
          assignees: {
            type: "string[]"
          },
          body: {
            type: "string"
          },
          labels: {
            type: "string[]"
          },
          milestone: {
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          title: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues"
      },
      createComment: {
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/comments"
      },
      createLabel: {
        method: "POST",
        params: {
          color: {
            required: true,
            type: "string"
          },
          description: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/labels"
      },
      createMilestone: {
        method: "POST",
        params: {
          description: {
            type: "string"
          },
          due_on: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          state: {
            enum: ["open", "closed"],
            type: "string"
          },
          title: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/milestones"
      },
      deleteComment: {
        method: "DELETE",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/comments/:comment_id"
      },
      deleteLabel: {
        method: "DELETE",
        params: {
          name: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/labels/:name"
      },
      deleteMilestone: {
        method: "DELETE",
        params: {
          milestone_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "milestone_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/milestones/:milestone_number"
      },
      get: {
        method: "GET",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number"
      },
      getComment: {
        method: "GET",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/comments/:comment_id"
      },
      getEvent: {
        method: "GET",
        params: {
          event_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/events/:event_id"
      },
      getLabel: {
        method: "GET",
        params: {
          name: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/labels/:name"
      },
      getMilestone: {
        method: "GET",
        params: {
          milestone_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "milestone_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/milestones/:milestone_number"
      },
      list: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          filter: {
            enum: ["assigned", "created", "mentioned", "subscribed", "all"],
            type: "string"
          },
          labels: {
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          },
          sort: {
            enum: ["created", "updated", "comments"],
            type: "string"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          }
        },
        url: "/issues"
      },
      listAssignees: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/assignees"
      },
      listComments: {
        method: "GET",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          since: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/comments"
      },
      listCommentsForRepo: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          since: {
            type: "string"
          },
          sort: {
            enum: ["created", "updated"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/comments"
      },
      listEvents: {
        method: "GET",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/events"
      },
      listEventsForRepo: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/events"
      },
      listEventsForTimeline: {
        headers: {
          accept: "application/vnd.github.mockingbird-preview+json"
        },
        method: "GET",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/timeline"
      },
      listForAuthenticatedUser: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          filter: {
            enum: ["assigned", "created", "mentioned", "subscribed", "all"],
            type: "string"
          },
          labels: {
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          },
          sort: {
            enum: ["created", "updated", "comments"],
            type: "string"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          }
        },
        url: "/user/issues"
      },
      listForOrg: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          filter: {
            enum: ["assigned", "created", "mentioned", "subscribed", "all"],
            type: "string"
          },
          labels: {
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          },
          sort: {
            enum: ["created", "updated", "comments"],
            type: "string"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          }
        },
        url: "/orgs/:org/issues"
      },
      listForRepo: {
        method: "GET",
        params: {
          assignee: {
            type: "string"
          },
          creator: {
            type: "string"
          },
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          labels: {
            type: "string"
          },
          mentioned: {
            type: "string"
          },
          milestone: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          since: {
            type: "string"
          },
          sort: {
            enum: ["created", "updated", "comments"],
            type: "string"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues"
      },
      listLabelsForMilestone: {
        method: "GET",
        params: {
          milestone_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "milestone_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/milestones/:milestone_number/labels"
      },
      listLabelsForRepo: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/labels"
      },
      listLabelsOnIssue: {
        method: "GET",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/labels"
      },
      listMilestonesForRepo: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["due_on", "completeness"],
            type: "string"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/milestones"
      },
      lock: {
        method: "PUT",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          lock_reason: {
            enum: ["off-topic", "too heated", "resolved", "spam"],
            type: "string"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/lock"
      },
      removeAssignees: {
        method: "DELETE",
        params: {
          assignees: {
            type: "string[]"
          },
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/assignees"
      },
      removeLabel: {
        method: "DELETE",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          name: {
            required: true,
            type: "string"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/labels/:name"
      },
      removeLabels: {
        method: "DELETE",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/labels"
      },
      replaceLabels: {
        method: "PUT",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          labels: {
            type: "string[]"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/labels"
      },
      unlock: {
        method: "DELETE",
        params: {
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/lock"
      },
      update: {
        method: "PATCH",
        params: {
          assignee: {
            type: "string"
          },
          assignees: {
            type: "string[]"
          },
          body: {
            type: "string"
          },
          issue_number: {
            required: true,
            type: "integer"
          },
          labels: {
            type: "string[]"
          },
          milestone: {
            allowNull: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          state: {
            enum: ["open", "closed"],
            type: "string"
          },
          title: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number"
      },
      updateComment: {
        method: "PATCH",
        params: {
          body: {
            required: true,
            type: "string"
          },
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/comments/:comment_id"
      },
      updateLabel: {
        method: "PATCH",
        params: {
          color: {
            type: "string"
          },
          current_name: {
            required: true,
            type: "string"
          },
          description: {
            type: "string"
          },
          name: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/labels/:current_name"
      },
      updateMilestone: {
        method: "PATCH",
        params: {
          description: {
            type: "string"
          },
          due_on: {
            type: "string"
          },
          milestone_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "milestone_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          state: {
            enum: ["open", "closed"],
            type: "string"
          },
          title: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/milestones/:milestone_number"
      }
    },
    licenses: {
      get: {
        method: "GET",
        params: {
          license: {
            required: true,
            type: "string"
          }
        },
        url: "/licenses/:license"
      },
      getForRepo: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/license"
      },
      list: {
        deprecated: "octokit.licenses.list() has been renamed to octokit.licenses.listCommonlyUsed() (2019-03-05)",
        method: "GET",
        params: {},
        url: "/licenses"
      },
      listCommonlyUsed: {
        method: "GET",
        params: {},
        url: "/licenses"
      }
    },
    markdown: {
      render: {
        method: "POST",
        params: {
          context: {
            type: "string"
          },
          mode: {
            enum: ["markdown", "gfm"],
            type: "string"
          },
          text: {
            required: true,
            type: "string"
          }
        },
        url: "/markdown"
      },
      renderRaw: {
        headers: {
          "content-type": "text/plain; charset=utf-8"
        },
        method: "POST",
        params: {
          data: {
            mapTo: "data",
            required: true,
            type: "string"
          }
        },
        url: "/markdown/raw"
      }
    },
    meta: {
      get: {
        method: "GET",
        params: {},
        url: "/meta"
      }
    },
    migrations: {
      cancelImport: {
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/import"
      },
      deleteArchiveForAuthenticatedUser: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "DELETE",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/migrations/:migration_id/archive"
      },
      deleteArchiveForOrg: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "DELETE",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/migrations/:migration_id/archive"
      },
      downloadArchiveForOrg: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/migrations/:migration_id/archive"
      },
      getArchiveForAuthenticatedUser: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/migrations/:migration_id/archive"
      },
      getArchiveForOrg: {
        deprecated: "octokit.migrations.getArchiveForOrg() has been renamed to octokit.migrations.downloadArchiveForOrg() (2020-01-27)",
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/migrations/:migration_id/archive"
      },
      getCommitAuthors: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          since: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/import/authors"
      },
      getImportProgress: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/import"
      },
      getLargeFiles: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/import/large_files"
      },
      getStatusForAuthenticatedUser: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/migrations/:migration_id"
      },
      getStatusForOrg: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/migrations/:migration_id"
      },
      listForAuthenticatedUser: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/migrations"
      },
      listForOrg: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/migrations"
      },
      listReposForOrg: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/migrations/:migration_id/repositories"
      },
      listReposForUser: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "GET",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/:migration_id/repositories"
      },
      mapCommitAuthor: {
        method: "PATCH",
        params: {
          author_id: {
            required: true,
            type: "integer"
          },
          email: {
            type: "string"
          },
          name: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/import/authors/:author_id"
      },
      setLfsPreference: {
        method: "PATCH",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          use_lfs: {
            enum: ["opt_in", "opt_out"],
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/import/lfs"
      },
      startForAuthenticatedUser: {
        method: "POST",
        params: {
          exclude_attachments: {
            type: "boolean"
          },
          lock_repositories: {
            type: "boolean"
          },
          repositories: {
            required: true,
            type: "string[]"
          }
        },
        url: "/user/migrations"
      },
      startForOrg: {
        method: "POST",
        params: {
          exclude_attachments: {
            type: "boolean"
          },
          lock_repositories: {
            type: "boolean"
          },
          org: {
            required: true,
            type: "string"
          },
          repositories: {
            required: true,
            type: "string[]"
          }
        },
        url: "/orgs/:org/migrations"
      },
      startImport: {
        method: "PUT",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          tfvc_project: {
            type: "string"
          },
          vcs: {
            enum: ["subversion", "git", "mercurial", "tfvc"],
            type: "string"
          },
          vcs_password: {
            type: "string"
          },
          vcs_url: {
            required: true,
            type: "string"
          },
          vcs_username: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/import"
      },
      unlockRepoForAuthenticatedUser: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "DELETE",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          },
          repo_name: {
            required: true,
            type: "string"
          }
        },
        url: "/user/migrations/:migration_id/repos/:repo_name/lock"
      },
      unlockRepoForOrg: {
        headers: {
          accept: "application/vnd.github.wyandotte-preview+json"
        },
        method: "DELETE",
        params: {
          migration_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          repo_name: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/migrations/:migration_id/repos/:repo_name/lock"
      },
      updateImport: {
        method: "PATCH",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          vcs_password: {
            type: "string"
          },
          vcs_username: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/import"
      }
    },
    oauthAuthorizations: {
      checkAuthorization: {
        deprecated: "octokit.oauthAuthorizations.checkAuthorization() has been renamed to octokit.apps.checkAuthorization() (2019-11-05)",
        method: "GET",
        params: {
          access_token: {
            required: true,
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/tokens/:access_token"
      },
      createAuthorization: {
        deprecated: "octokit.oauthAuthorizations.createAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization",
        method: "POST",
        params: {
          client_id: {
            type: "string"
          },
          client_secret: {
            type: "string"
          },
          fingerprint: {
            type: "string"
          },
          note: {
            required: true,
            type: "string"
          },
          note_url: {
            type: "string"
          },
          scopes: {
            type: "string[]"
          }
        },
        url: "/authorizations"
      },
      deleteAuthorization: {
        deprecated: "octokit.oauthAuthorizations.deleteAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#delete-an-authorization",
        method: "DELETE",
        params: {
          authorization_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/authorizations/:authorization_id"
      },
      deleteGrant: {
        deprecated: "octokit.oauthAuthorizations.deleteGrant() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#delete-a-grant",
        method: "DELETE",
        params: {
          grant_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/applications/grants/:grant_id"
      },
      getAuthorization: {
        deprecated: "octokit.oauthAuthorizations.getAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-a-single-authorization",
        method: "GET",
        params: {
          authorization_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/authorizations/:authorization_id"
      },
      getGrant: {
        deprecated: "octokit.oauthAuthorizations.getGrant() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-a-single-grant",
        method: "GET",
        params: {
          grant_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/applications/grants/:grant_id"
      },
      getOrCreateAuthorizationForApp: {
        deprecated: "octokit.oauthAuthorizations.getOrCreateAuthorizationForApp() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app",
        method: "PUT",
        params: {
          client_id: {
            required: true,
            type: "string"
          },
          client_secret: {
            required: true,
            type: "string"
          },
          fingerprint: {
            type: "string"
          },
          note: {
            type: "string"
          },
          note_url: {
            type: "string"
          },
          scopes: {
            type: "string[]"
          }
        },
        url: "/authorizations/clients/:client_id"
      },
      getOrCreateAuthorizationForAppAndFingerprint: {
        deprecated: "octokit.oauthAuthorizations.getOrCreateAuthorizationForAppAndFingerprint() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app-and-fingerprint",
        method: "PUT",
        params: {
          client_id: {
            required: true,
            type: "string"
          },
          client_secret: {
            required: true,
            type: "string"
          },
          fingerprint: {
            required: true,
            type: "string"
          },
          note: {
            type: "string"
          },
          note_url: {
            type: "string"
          },
          scopes: {
            type: "string[]"
          }
        },
        url: "/authorizations/clients/:client_id/:fingerprint"
      },
      getOrCreateAuthorizationForAppFingerprint: {
        deprecated: "octokit.oauthAuthorizations.getOrCreateAuthorizationForAppFingerprint() has been renamed to octokit.oauthAuthorizations.getOrCreateAuthorizationForAppAndFingerprint() (2018-12-27)",
        method: "PUT",
        params: {
          client_id: {
            required: true,
            type: "string"
          },
          client_secret: {
            required: true,
            type: "string"
          },
          fingerprint: {
            required: true,
            type: "string"
          },
          note: {
            type: "string"
          },
          note_url: {
            type: "string"
          },
          scopes: {
            type: "string[]"
          }
        },
        url: "/authorizations/clients/:client_id/:fingerprint"
      },
      listAuthorizations: {
        deprecated: "octokit.oauthAuthorizations.listAuthorizations() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#list-your-authorizations",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/authorizations"
      },
      listGrants: {
        deprecated: "octokit.oauthAuthorizations.listGrants() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#list-your-grants",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/applications/grants"
      },
      resetAuthorization: {
        deprecated: "octokit.oauthAuthorizations.resetAuthorization() has been renamed to octokit.apps.resetAuthorization() (2019-11-05)",
        method: "POST",
        params: {
          access_token: {
            required: true,
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/tokens/:access_token"
      },
      revokeAuthorizationForApplication: {
        deprecated: "octokit.oauthAuthorizations.revokeAuthorizationForApplication() has been renamed to octokit.apps.revokeAuthorizationForApplication() (2019-11-05)",
        method: "DELETE",
        params: {
          access_token: {
            required: true,
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/tokens/:access_token"
      },
      revokeGrantForApplication: {
        deprecated: "octokit.oauthAuthorizations.revokeGrantForApplication() has been renamed to octokit.apps.revokeGrantForApplication() (2019-11-05)",
        method: "DELETE",
        params: {
          access_token: {
            required: true,
            type: "string"
          },
          client_id: {
            required: true,
            type: "string"
          }
        },
        url: "/applications/:client_id/grants/:access_token"
      },
      updateAuthorization: {
        deprecated: "octokit.oauthAuthorizations.updateAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#update-an-existing-authorization",
        method: "PATCH",
        params: {
          add_scopes: {
            type: "string[]"
          },
          authorization_id: {
            required: true,
            type: "integer"
          },
          fingerprint: {
            type: "string"
          },
          note: {
            type: "string"
          },
          note_url: {
            type: "string"
          },
          remove_scopes: {
            type: "string[]"
          },
          scopes: {
            type: "string[]"
          }
        },
        url: "/authorizations/:authorization_id"
      }
    },
    orgs: {
      addOrUpdateMembership: {
        method: "PUT",
        params: {
          org: {
            required: true,
            type: "string"
          },
          role: {
            enum: ["admin", "member"],
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/memberships/:username"
      },
      blockUser: {
        method: "PUT",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/blocks/:username"
      },
      checkBlockedUser: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/blocks/:username"
      },
      checkMembership: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/members/:username"
      },
      checkPublicMembership: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/public_members/:username"
      },
      concealMembership: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/public_members/:username"
      },
      convertMemberToOutsideCollaborator: {
        method: "PUT",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/outside_collaborators/:username"
      },
      createHook: {
        method: "POST",
        params: {
          active: {
            type: "boolean"
          },
          config: {
            required: true,
            type: "object"
          },
          "config.content_type": {
            type: "string"
          },
          "config.insecure_ssl": {
            type: "string"
          },
          "config.secret": {
            type: "string"
          },
          "config.url": {
            required: true,
            type: "string"
          },
          events: {
            type: "string[]"
          },
          name: {
            required: true,
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/hooks"
      },
      createInvitation: {
        method: "POST",
        params: {
          email: {
            type: "string"
          },
          invitee_id: {
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          role: {
            enum: ["admin", "direct_member", "billing_manager"],
            type: "string"
          },
          team_ids: {
            type: "integer[]"
          }
        },
        url: "/orgs/:org/invitations"
      },
      deleteHook: {
        method: "DELETE",
        params: {
          hook_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/hooks/:hook_id"
      },
      get: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org"
      },
      getHook: {
        method: "GET",
        params: {
          hook_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/hooks/:hook_id"
      },
      getMembership: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/memberships/:username"
      },
      getMembershipForAuthenticatedUser: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/user/memberships/orgs/:org"
      },
      list: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "integer"
          }
        },
        url: "/organizations"
      },
      listBlockedUsers: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/blocks"
      },
      listForAuthenticatedUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/orgs"
      },
      listForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/orgs"
      },
      listHooks: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/hooks"
      },
      listInstallations: {
        headers: {
          accept: "application/vnd.github.machine-man-preview+json"
        },
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/installations"
      },
      listInvitationTeams: {
        method: "GET",
        params: {
          invitation_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/invitations/:invitation_id/teams"
      },
      listMembers: {
        method: "GET",
        params: {
          filter: {
            enum: ["2fa_disabled", "all"],
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          role: {
            enum: ["all", "admin", "member"],
            type: "string"
          }
        },
        url: "/orgs/:org/members"
      },
      listMemberships: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          state: {
            enum: ["active", "pending"],
            type: "string"
          }
        },
        url: "/user/memberships/orgs"
      },
      listOutsideCollaborators: {
        method: "GET",
        params: {
          filter: {
            enum: ["2fa_disabled", "all"],
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/outside_collaborators"
      },
      listPendingInvitations: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/invitations"
      },
      listPublicMembers: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/public_members"
      },
      pingHook: {
        method: "POST",
        params: {
          hook_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/hooks/:hook_id/pings"
      },
      publicizeMembership: {
        method: "PUT",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/public_members/:username"
      },
      removeMember: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/members/:username"
      },
      removeMembership: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/memberships/:username"
      },
      removeOutsideCollaborator: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/outside_collaborators/:username"
      },
      unblockUser: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/blocks/:username"
      },
      update: {
        method: "PATCH",
        params: {
          billing_email: {
            type: "string"
          },
          company: {
            type: "string"
          },
          default_repository_permission: {
            enum: ["read", "write", "admin", "none"],
            type: "string"
          },
          description: {
            type: "string"
          },
          email: {
            type: "string"
          },
          has_organization_projects: {
            type: "boolean"
          },
          has_repository_projects: {
            type: "boolean"
          },
          location: {
            type: "string"
          },
          members_allowed_repository_creation_type: {
            enum: ["all", "private", "none"],
            type: "string"
          },
          members_can_create_internal_repositories: {
            type: "boolean"
          },
          members_can_create_private_repositories: {
            type: "boolean"
          },
          members_can_create_public_repositories: {
            type: "boolean"
          },
          members_can_create_repositories: {
            type: "boolean"
          },
          name: {
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org"
      },
      updateHook: {
        method: "PATCH",
        params: {
          active: {
            type: "boolean"
          },
          config: {
            type: "object"
          },
          "config.content_type": {
            type: "string"
          },
          "config.insecure_ssl": {
            type: "string"
          },
          "config.secret": {
            type: "string"
          },
          "config.url": {
            required: true,
            type: "string"
          },
          events: {
            type: "string[]"
          },
          hook_id: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/hooks/:hook_id"
      },
      updateMembership: {
        method: "PATCH",
        params: {
          org: {
            required: true,
            type: "string"
          },
          state: {
            enum: ["active"],
            required: true,
            type: "string"
          }
        },
        url: "/user/memberships/orgs/:org"
      }
    },
    projects: {
      addCollaborator: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "PUT",
        params: {
          permission: {
            enum: ["read", "write", "admin"],
            type: "string"
          },
          project_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/projects/:project_id/collaborators/:username"
      },
      createCard: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "POST",
        params: {
          column_id: {
            required: true,
            type: "integer"
          },
          content_id: {
            type: "integer"
          },
          content_type: {
            type: "string"
          },
          note: {
            type: "string"
          }
        },
        url: "/projects/columns/:column_id/cards"
      },
      createColumn: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "POST",
        params: {
          name: {
            required: true,
            type: "string"
          },
          project_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/:project_id/columns"
      },
      createForAuthenticatedUser: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "POST",
        params: {
          body: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          }
        },
        url: "/user/projects"
      },
      createForOrg: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "POST",
        params: {
          body: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/projects"
      },
      createForRepo: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "POST",
        params: {
          body: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/projects"
      },
      delete: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "DELETE",
        params: {
          project_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/:project_id"
      },
      deleteCard: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "DELETE",
        params: {
          card_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/columns/cards/:card_id"
      },
      deleteColumn: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "DELETE",
        params: {
          column_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/columns/:column_id"
      },
      get: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          project_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/:project_id"
      },
      getCard: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          card_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/columns/cards/:card_id"
      },
      getColumn: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          column_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/columns/:column_id"
      },
      listCards: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          archived_state: {
            enum: ["all", "archived", "not_archived"],
            type: "string"
          },
          column_id: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/projects/columns/:column_id/cards"
      },
      listCollaborators: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          affiliation: {
            enum: ["outside", "direct", "all"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          project_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/:project_id/collaborators"
      },
      listColumns: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          project_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/projects/:project_id/columns"
      },
      listForOrg: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          }
        },
        url: "/orgs/:org/projects"
      },
      listForRepo: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/projects"
      },
      listForUser: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/projects"
      },
      moveCard: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "POST",
        params: {
          card_id: {
            required: true,
            type: "integer"
          },
          column_id: {
            type: "integer"
          },
          position: {
            required: true,
            type: "string",
            validation: "^(top|bottom|after:\\d+)$"
          }
        },
        url: "/projects/columns/cards/:card_id/moves"
      },
      moveColumn: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "POST",
        params: {
          column_id: {
            required: true,
            type: "integer"
          },
          position: {
            required: true,
            type: "string",
            validation: "^(first|last|after:\\d+)$"
          }
        },
        url: "/projects/columns/:column_id/moves"
      },
      removeCollaborator: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "DELETE",
        params: {
          project_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/projects/:project_id/collaborators/:username"
      },
      reviewUserPermissionLevel: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          project_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/projects/:project_id/collaborators/:username/permission"
      },
      update: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "PATCH",
        params: {
          body: {
            type: "string"
          },
          name: {
            type: "string"
          },
          organization_permission: {
            type: "string"
          },
          private: {
            type: "boolean"
          },
          project_id: {
            required: true,
            type: "integer"
          },
          state: {
            enum: ["open", "closed"],
            type: "string"
          }
        },
        url: "/projects/:project_id"
      },
      updateCard: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "PATCH",
        params: {
          archived: {
            type: "boolean"
          },
          card_id: {
            required: true,
            type: "integer"
          },
          note: {
            type: "string"
          }
        },
        url: "/projects/columns/cards/:card_id"
      },
      updateColumn: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "PATCH",
        params: {
          column_id: {
            required: true,
            type: "integer"
          },
          name: {
            required: true,
            type: "string"
          }
        },
        url: "/projects/columns/:column_id"
      }
    },
    pulls: {
      checkIfMerged: {
        method: "GET",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/merge"
      },
      create: {
        method: "POST",
        params: {
          base: {
            required: true,
            type: "string"
          },
          body: {
            type: "string"
          },
          draft: {
            type: "boolean"
          },
          head: {
            required: true,
            type: "string"
          },
          maintainer_can_modify: {
            type: "boolean"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          title: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls"
      },
      createComment: {
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          commit_id: {
            required: true,
            type: "string"
          },
          in_reply_to: {
            deprecated: true,
            description: "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
            type: "integer"
          },
          line: {
            type: "integer"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          path: {
            required: true,
            type: "string"
          },
          position: {
            type: "integer"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          side: {
            enum: ["LEFT", "RIGHT"],
            type: "string"
          },
          start_line: {
            type: "integer"
          },
          start_side: {
            enum: ["LEFT", "RIGHT", "side"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/comments"
      },
      createCommentReply: {
        deprecated: "octokit.pulls.createCommentReply() has been renamed to octokit.pulls.createComment() (2019-09-09)",
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          commit_id: {
            required: true,
            type: "string"
          },
          in_reply_to: {
            deprecated: true,
            description: "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
            type: "integer"
          },
          line: {
            type: "integer"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          path: {
            required: true,
            type: "string"
          },
          position: {
            type: "integer"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          side: {
            enum: ["LEFT", "RIGHT"],
            type: "string"
          },
          start_line: {
            type: "integer"
          },
          start_side: {
            enum: ["LEFT", "RIGHT", "side"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/comments"
      },
      createFromIssue: {
        deprecated: "octokit.pulls.createFromIssue() is deprecated, see https://developer.github.com/v3/pulls/#create-a-pull-request",
        method: "POST",
        params: {
          base: {
            required: true,
            type: "string"
          },
          draft: {
            type: "boolean"
          },
          head: {
            required: true,
            type: "string"
          },
          issue: {
            required: true,
            type: "integer"
          },
          maintainer_can_modify: {
            type: "boolean"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls"
      },
      createReview: {
        method: "POST",
        params: {
          body: {
            type: "string"
          },
          comments: {
            type: "object[]"
          },
          "comments[].body": {
            required: true,
            type: "string"
          },
          "comments[].path": {
            required: true,
            type: "string"
          },
          "comments[].position": {
            required: true,
            type: "integer"
          },
          commit_id: {
            type: "string"
          },
          event: {
            enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
            type: "string"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/reviews"
      },
      createReviewCommentReply: {
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/comments/:comment_id/replies"
      },
      createReviewRequest: {
        method: "POST",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          reviewers: {
            type: "string[]"
          },
          team_reviewers: {
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
      },
      deleteComment: {
        method: "DELETE",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/comments/:comment_id"
      },
      deletePendingReview: {
        method: "DELETE",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          review_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
      },
      deleteReviewRequest: {
        method: "DELETE",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          reviewers: {
            type: "string[]"
          },
          team_reviewers: {
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
      },
      dismissReview: {
        method: "PUT",
        params: {
          message: {
            required: true,
            type: "string"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          review_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/dismissals"
      },
      get: {
        method: "GET",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number"
      },
      getComment: {
        method: "GET",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/comments/:comment_id"
      },
      getCommentsForReview: {
        method: "GET",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          review_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/comments"
      },
      getReview: {
        method: "GET",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          review_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
      },
      list: {
        method: "GET",
        params: {
          base: {
            type: "string"
          },
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          head: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["created", "updated", "popularity", "long-running"],
            type: "string"
          },
          state: {
            enum: ["open", "closed", "all"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls"
      },
      listComments: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          since: {
            type: "string"
          },
          sort: {
            enum: ["created", "updated"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/comments"
      },
      listCommentsForRepo: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          since: {
            type: "string"
          },
          sort: {
            enum: ["created", "updated"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/comments"
      },
      listCommits: {
        method: "GET",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/commits"
      },
      listFiles: {
        method: "GET",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/files"
      },
      listReviewRequests: {
        method: "GET",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
      },
      listReviews: {
        method: "GET",
        params: {
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/reviews"
      },
      merge: {
        method: "PUT",
        params: {
          commit_message: {
            type: "string"
          },
          commit_title: {
            type: "string"
          },
          merge_method: {
            enum: ["merge", "squash", "rebase"],
            type: "string"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/merge"
      },
      submitReview: {
        method: "POST",
        params: {
          body: {
            type: "string"
          },
          event: {
            enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
            required: true,
            type: "string"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          review_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/events"
      },
      update: {
        method: "PATCH",
        params: {
          base: {
            type: "string"
          },
          body: {
            type: "string"
          },
          maintainer_can_modify: {
            type: "boolean"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          state: {
            enum: ["open", "closed"],
            type: "string"
          },
          title: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number"
      },
      updateBranch: {
        headers: {
          accept: "application/vnd.github.lydian-preview+json"
        },
        method: "PUT",
        params: {
          expected_head_sha: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/update-branch"
      },
      updateComment: {
        method: "PATCH",
        params: {
          body: {
            required: true,
            type: "string"
          },
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/comments/:comment_id"
      },
      updateReview: {
        method: "PUT",
        params: {
          body: {
            required: true,
            type: "string"
          },
          number: {
            alias: "pull_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          pull_number: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          review_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
      }
    },
    rateLimit: {
      get: {
        method: "GET",
        params: {},
        url: "/rate_limit"
      }
    },
    reactions: {
      createForCommitComment: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/comments/:comment_id/reactions"
      },
      createForIssue: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/reactions"
      },
      createForIssueComment: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/comments/:comment_id/reactions"
      },
      createForPullRequestReviewComment: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/comments/:comment_id/reactions"
      },
      createForTeamDiscussion: {
        deprecated: "octokit.reactions.createForTeamDiscussion() has been renamed to octokit.reactions.createForTeamDiscussionLegacy() (2020-01-16)",
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/reactions"
      },
      createForTeamDiscussionComment: {
        deprecated: "octokit.reactions.createForTeamDiscussionComment() has been renamed to octokit.reactions.createForTeamDiscussionCommentLegacy() (2020-01-16)",
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
      },
      createForTeamDiscussionCommentInOrg: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number/reactions"
      },
      createForTeamDiscussionCommentLegacy: {
        deprecated: "octokit.reactions.createForTeamDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/reactions/#create-reaction-for-a-team-discussion-comment-legacy",
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
      },
      createForTeamDiscussionInOrg: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/reactions"
      },
      createForTeamDiscussionLegacy: {
        deprecated: "octokit.reactions.createForTeamDiscussionLegacy() is deprecated, see https://developer.github.com/v3/reactions/#create-reaction-for-a-team-discussion-legacy",
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "POST",
        params: {
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/reactions"
      },
      delete: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "DELETE",
        params: {
          reaction_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/reactions/:reaction_id"
      },
      listForCommitComment: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/comments/:comment_id/reactions"
      },
      listForIssue: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          issue_number: {
            required: true,
            type: "integer"
          },
          number: {
            alias: "issue_number",
            deprecated: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/:issue_number/reactions"
      },
      listForIssueComment: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/issues/comments/:comment_id/reactions"
      },
      listForPullRequestReviewComment: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pulls/comments/:comment_id/reactions"
      },
      listForTeamDiscussion: {
        deprecated: "octokit.reactions.listForTeamDiscussion() has been renamed to octokit.reactions.listForTeamDiscussionLegacy() (2020-01-16)",
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/reactions"
      },
      listForTeamDiscussionComment: {
        deprecated: "octokit.reactions.listForTeamDiscussionComment() has been renamed to octokit.reactions.listForTeamDiscussionCommentLegacy() (2020-01-16)",
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
      },
      listForTeamDiscussionCommentInOrg: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number/reactions"
      },
      listForTeamDiscussionCommentLegacy: {
        deprecated: "octokit.reactions.listForTeamDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/reactions/#list-reactions-for-a-team-discussion-comment-legacy",
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
      },
      listForTeamDiscussionInOrg: {
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/reactions"
      },
      listForTeamDiscussionLegacy: {
        deprecated: "octokit.reactions.listForTeamDiscussionLegacy() is deprecated, see https://developer.github.com/v3/reactions/#list-reactions-for-a-team-discussion-legacy",
        headers: {
          accept: "application/vnd.github.squirrel-girl-preview+json"
        },
        method: "GET",
        params: {
          content: {
            enum: ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/reactions"
      }
    },
    repos: {
      acceptInvitation: {
        method: "PATCH",
        params: {
          invitation_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/repository_invitations/:invitation_id"
      },
      addCollaborator: {
        method: "PUT",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          permission: {
            enum: ["pull", "push", "admin"],
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/collaborators/:username"
      },
      addDeployKey: {
        method: "POST",
        params: {
          key: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          read_only: {
            type: "boolean"
          },
          repo: {
            required: true,
            type: "string"
          },
          title: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/keys"
      },
      addProtectedBranchAdminEnforcement: {
        method: "POST",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
      },
      addProtectedBranchAppRestrictions: {
        method: "POST",
        params: {
          apps: {
            mapTo: "data",
            required: true,
            type: "string[]"
          },
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
      },
      addProtectedBranchRequiredSignatures: {
        headers: {
          accept: "application/vnd.github.zzzax-preview+json"
        },
        method: "POST",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
      },
      addProtectedBranchRequiredStatusChecksContexts: {
        method: "POST",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          contexts: {
            mapTo: "data",
            required: true,
            type: "string[]"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
      },
      addProtectedBranchTeamRestrictions: {
        method: "POST",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          teams: {
            mapTo: "data",
            required: true,
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
      },
      addProtectedBranchUserRestrictions: {
        method: "POST",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          users: {
            mapTo: "data",
            required: true,
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
      },
      checkCollaborator: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/collaborators/:username"
      },
      checkVulnerabilityAlerts: {
        headers: {
          accept: "application/vnd.github.dorian-preview+json"
        },
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/vulnerability-alerts"
      },
      compareCommits: {
        method: "GET",
        params: {
          base: {
            required: true,
            type: "string"
          },
          head: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/compare/:base...:head"
      },
      createCommitComment: {
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          commit_sha: {
            required: true,
            type: "string"
          },
          line: {
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          path: {
            type: "string"
          },
          position: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            alias: "commit_sha",
            deprecated: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:commit_sha/comments"
      },
      createDeployment: {
        method: "POST",
        params: {
          auto_merge: {
            type: "boolean"
          },
          description: {
            type: "string"
          },
          environment: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          payload: {
            type: "string"
          },
          production_environment: {
            type: "boolean"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          required_contexts: {
            type: "string[]"
          },
          task: {
            type: "string"
          },
          transient_environment: {
            type: "boolean"
          }
        },
        url: "/repos/:owner/:repo/deployments"
      },
      createDeploymentStatus: {
        method: "POST",
        params: {
          auto_inactive: {
            type: "boolean"
          },
          deployment_id: {
            required: true,
            type: "integer"
          },
          description: {
            type: "string"
          },
          environment: {
            enum: ["production", "staging", "qa"],
            type: "string"
          },
          environment_url: {
            type: "string"
          },
          log_url: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          state: {
            enum: ["error", "failure", "inactive", "in_progress", "queued", "pending", "success"],
            required: true,
            type: "string"
          },
          target_url: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/deployments/:deployment_id/statuses"
      },
      createDispatchEvent: {
        method: "POST",
        params: {
          client_payload: {
            type: "object"
          },
          event_type: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/dispatches"
      },
      createFile: {
        deprecated: "octokit.repos.createFile() has been renamed to octokit.repos.createOrUpdateFile() (2019-06-07)",
        method: "PUT",
        params: {
          author: {
            type: "object"
          },
          "author.email": {
            required: true,
            type: "string"
          },
          "author.name": {
            required: true,
            type: "string"
          },
          branch: {
            type: "string"
          },
          committer: {
            type: "object"
          },
          "committer.email": {
            required: true,
            type: "string"
          },
          "committer.name": {
            required: true,
            type: "string"
          },
          content: {
            required: true,
            type: "string"
          },
          message: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          path: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/contents/:path"
      },
      createForAuthenticatedUser: {
        method: "POST",
        params: {
          allow_merge_commit: {
            type: "boolean"
          },
          allow_rebase_merge: {
            type: "boolean"
          },
          allow_squash_merge: {
            type: "boolean"
          },
          auto_init: {
            type: "boolean"
          },
          delete_branch_on_merge: {
            type: "boolean"
          },
          description: {
            type: "string"
          },
          gitignore_template: {
            type: "string"
          },
          has_issues: {
            type: "boolean"
          },
          has_projects: {
            type: "boolean"
          },
          has_wiki: {
            type: "boolean"
          },
          homepage: {
            type: "string"
          },
          is_template: {
            type: "boolean"
          },
          license_template: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          private: {
            type: "boolean"
          },
          team_id: {
            type: "integer"
          },
          visibility: {
            enum: ["public", "private", "visibility", "internal"],
            type: "string"
          }
        },
        url: "/user/repos"
      },
      createFork: {
        method: "POST",
        params: {
          organization: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/forks"
      },
      createHook: {
        method: "POST",
        params: {
          active: {
            type: "boolean"
          },
          config: {
            required: true,
            type: "object"
          },
          "config.content_type": {
            type: "string"
          },
          "config.insecure_ssl": {
            type: "string"
          },
          "config.secret": {
            type: "string"
          },
          "config.url": {
            required: true,
            type: "string"
          },
          events: {
            type: "string[]"
          },
          name: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/hooks"
      },
      createInOrg: {
        method: "POST",
        params: {
          allow_merge_commit: {
            type: "boolean"
          },
          allow_rebase_merge: {
            type: "boolean"
          },
          allow_squash_merge: {
            type: "boolean"
          },
          auto_init: {
            type: "boolean"
          },
          delete_branch_on_merge: {
            type: "boolean"
          },
          description: {
            type: "string"
          },
          gitignore_template: {
            type: "string"
          },
          has_issues: {
            type: "boolean"
          },
          has_projects: {
            type: "boolean"
          },
          has_wiki: {
            type: "boolean"
          },
          homepage: {
            type: "string"
          },
          is_template: {
            type: "boolean"
          },
          license_template: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          private: {
            type: "boolean"
          },
          team_id: {
            type: "integer"
          },
          visibility: {
            enum: ["public", "private", "visibility", "internal"],
            type: "string"
          }
        },
        url: "/orgs/:org/repos"
      },
      createOrUpdateFile: {
        method: "PUT",
        params: {
          author: {
            type: "object"
          },
          "author.email": {
            required: true,
            type: "string"
          },
          "author.name": {
            required: true,
            type: "string"
          },
          branch: {
            type: "string"
          },
          committer: {
            type: "object"
          },
          "committer.email": {
            required: true,
            type: "string"
          },
          "committer.name": {
            required: true,
            type: "string"
          },
          content: {
            required: true,
            type: "string"
          },
          message: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          path: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/contents/:path"
      },
      createRelease: {
        method: "POST",
        params: {
          body: {
            type: "string"
          },
          draft: {
            type: "boolean"
          },
          name: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          prerelease: {
            type: "boolean"
          },
          repo: {
            required: true,
            type: "string"
          },
          tag_name: {
            required: true,
            type: "string"
          },
          target_commitish: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases"
      },
      createStatus: {
        method: "POST",
        params: {
          context: {
            type: "string"
          },
          description: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            required: true,
            type: "string"
          },
          state: {
            enum: ["error", "failure", "pending", "success"],
            required: true,
            type: "string"
          },
          target_url: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/statuses/:sha"
      },
      createUsingTemplate: {
        headers: {
          accept: "application/vnd.github.baptiste-preview+json"
        },
        method: "POST",
        params: {
          description: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          owner: {
            type: "string"
          },
          private: {
            type: "boolean"
          },
          template_owner: {
            required: true,
            type: "string"
          },
          template_repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:template_owner/:template_repo/generate"
      },
      declineInvitation: {
        method: "DELETE",
        params: {
          invitation_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/repository_invitations/:invitation_id"
      },
      delete: {
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo"
      },
      deleteCommitComment: {
        method: "DELETE",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/comments/:comment_id"
      },
      deleteDownload: {
        method: "DELETE",
        params: {
          download_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/downloads/:download_id"
      },
      deleteFile: {
        method: "DELETE",
        params: {
          author: {
            type: "object"
          },
          "author.email": {
            type: "string"
          },
          "author.name": {
            type: "string"
          },
          branch: {
            type: "string"
          },
          committer: {
            type: "object"
          },
          "committer.email": {
            type: "string"
          },
          "committer.name": {
            type: "string"
          },
          message: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          path: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/contents/:path"
      },
      deleteHook: {
        method: "DELETE",
        params: {
          hook_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/hooks/:hook_id"
      },
      deleteInvitation: {
        method: "DELETE",
        params: {
          invitation_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/invitations/:invitation_id"
      },
      deleteRelease: {
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          release_id: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/:release_id"
      },
      deleteReleaseAsset: {
        method: "DELETE",
        params: {
          asset_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/assets/:asset_id"
      },
      disableAutomatedSecurityFixes: {
        headers: {
          accept: "application/vnd.github.london-preview+json"
        },
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/automated-security-fixes"
      },
      disablePagesSite: {
        headers: {
          accept: "application/vnd.github.switcheroo-preview+json"
        },
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pages"
      },
      disableVulnerabilityAlerts: {
        headers: {
          accept: "application/vnd.github.dorian-preview+json"
        },
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/vulnerability-alerts"
      },
      enableAutomatedSecurityFixes: {
        headers: {
          accept: "application/vnd.github.london-preview+json"
        },
        method: "PUT",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/automated-security-fixes"
      },
      enablePagesSite: {
        headers: {
          accept: "application/vnd.github.switcheroo-preview+json"
        },
        method: "POST",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          source: {
            type: "object"
          },
          "source.branch": {
            enum: ["master", "gh-pages"],
            type: "string"
          },
          "source.path": {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pages"
      },
      enableVulnerabilityAlerts: {
        headers: {
          accept: "application/vnd.github.dorian-preview+json"
        },
        method: "PUT",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/vulnerability-alerts"
      },
      get: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo"
      },
      getAppsWithAccessToProtectedBranch: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
      },
      getArchiveLink: {
        method: "GET",
        params: {
          archive_format: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/:archive_format/:ref"
      },
      getBranch: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch"
      },
      getBranchProtection: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection"
      },
      getClones: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          per: {
            enum: ["day", "week"],
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/traffic/clones"
      },
      getCodeFrequencyStats: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/stats/code_frequency"
      },
      getCollaboratorPermissionLevel: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/collaborators/:username/permission"
      },
      getCombinedStatusForRef: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:ref/status"
      },
      getCommit: {
        method: "GET",
        params: {
          commit_sha: {
            alias: "ref",
            deprecated: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            alias: "ref",
            deprecated: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:ref"
      },
      getCommitActivityStats: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/stats/commit_activity"
      },
      getCommitComment: {
        method: "GET",
        params: {
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/comments/:comment_id"
      },
      getCommitRefSha: {
        deprecated: "octokit.repos.getCommitRefSha() is deprecated, see https://developer.github.com/v3/repos/commits/#get-a-single-commit",
        headers: {
          accept: "application/vnd.github.v3.sha"
        },
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:ref"
      },
      getContents: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          path: {
            required: true,
            type: "string"
          },
          ref: {
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/contents/:path"
      },
      getContributorsStats: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/stats/contributors"
      },
      getDeployKey: {
        method: "GET",
        params: {
          key_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/keys/:key_id"
      },
      getDeployment: {
        method: "GET",
        params: {
          deployment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/deployments/:deployment_id"
      },
      getDeploymentStatus: {
        method: "GET",
        params: {
          deployment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          status_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/deployments/:deployment_id/statuses/:status_id"
      },
      getDownload: {
        method: "GET",
        params: {
          download_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/downloads/:download_id"
      },
      getHook: {
        method: "GET",
        params: {
          hook_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/hooks/:hook_id"
      },
      getLatestPagesBuild: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pages/builds/latest"
      },
      getLatestRelease: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/latest"
      },
      getPages: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pages"
      },
      getPagesBuild: {
        method: "GET",
        params: {
          build_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pages/builds/:build_id"
      },
      getParticipationStats: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/stats/participation"
      },
      getProtectedBranchAdminEnforcement: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
      },
      getProtectedBranchPullRequestReviewEnforcement: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
      },
      getProtectedBranchRequiredSignatures: {
        headers: {
          accept: "application/vnd.github.zzzax-preview+json"
        },
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
      },
      getProtectedBranchRequiredStatusChecks: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
      },
      getProtectedBranchRestrictions: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions"
      },
      getPunchCardStats: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/stats/punch_card"
      },
      getReadme: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          ref: {
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/readme"
      },
      getRelease: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          release_id: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/:release_id"
      },
      getReleaseAsset: {
        method: "GET",
        params: {
          asset_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/assets/:asset_id"
      },
      getReleaseByTag: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          tag: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/tags/:tag"
      },
      getTeamsWithAccessToProtectedBranch: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
      },
      getTopPaths: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/traffic/popular/paths"
      },
      getTopReferrers: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/traffic/popular/referrers"
      },
      getUsersWithAccessToProtectedBranch: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
      },
      getViews: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          per: {
            enum: ["day", "week"],
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/traffic/views"
      },
      list: {
        method: "GET",
        params: {
          affiliation: {
            type: "string"
          },
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          sort: {
            enum: ["created", "updated", "pushed", "full_name"],
            type: "string"
          },
          type: {
            enum: ["all", "owner", "public", "private", "member"],
            type: "string"
          },
          visibility: {
            enum: ["all", "public", "private"],
            type: "string"
          }
        },
        url: "/user/repos"
      },
      listAppsWithAccessToProtectedBranch: {
        deprecated: "octokit.repos.listAppsWithAccessToProtectedBranch() has been renamed to octokit.repos.getAppsWithAccessToProtectedBranch() (2019-09-13)",
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
      },
      listAssetsForRelease: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          release_id: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/:release_id/assets"
      },
      listBranches: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          protected: {
            type: "boolean"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches"
      },
      listBranchesForHeadCommit: {
        headers: {
          accept: "application/vnd.github.groot-preview+json"
        },
        method: "GET",
        params: {
          commit_sha: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:commit_sha/branches-where-head"
      },
      listCollaborators: {
        method: "GET",
        params: {
          affiliation: {
            enum: ["outside", "direct", "all"],
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/collaborators"
      },
      listCommentsForCommit: {
        method: "GET",
        params: {
          commit_sha: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          ref: {
            alias: "commit_sha",
            deprecated: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:commit_sha/comments"
      },
      listCommitComments: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/comments"
      },
      listCommits: {
        method: "GET",
        params: {
          author: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          path: {
            type: "string"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            type: "string"
          },
          since: {
            type: "string"
          },
          until: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits"
      },
      listContributors: {
        method: "GET",
        params: {
          anon: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/contributors"
      },
      listDeployKeys: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/keys"
      },
      listDeploymentStatuses: {
        method: "GET",
        params: {
          deployment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/deployments/:deployment_id/statuses"
      },
      listDeployments: {
        method: "GET",
        params: {
          environment: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          ref: {
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            type: "string"
          },
          task: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/deployments"
      },
      listDownloads: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/downloads"
      },
      listForOrg: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          sort: {
            enum: ["created", "updated", "pushed", "full_name"],
            type: "string"
          },
          type: {
            enum: ["all", "public", "private", "forks", "sources", "member", "internal"],
            type: "string"
          }
        },
        url: "/orgs/:org/repos"
      },
      listForUser: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          sort: {
            enum: ["created", "updated", "pushed", "full_name"],
            type: "string"
          },
          type: {
            enum: ["all", "owner", "member"],
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/repos"
      },
      listForks: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["newest", "oldest", "stargazers"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/forks"
      },
      listHooks: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/hooks"
      },
      listInvitations: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/invitations"
      },
      listInvitationsForAuthenticatedUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/repository_invitations"
      },
      listLanguages: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/languages"
      },
      listPagesBuilds: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pages/builds"
      },
      listProtectedBranchRequiredStatusChecksContexts: {
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
      },
      listProtectedBranchTeamRestrictions: {
        deprecated: "octokit.repos.listProtectedBranchTeamRestrictions() has been renamed to octokit.repos.getTeamsWithAccessToProtectedBranch() (2019-09-09)",
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
      },
      listProtectedBranchUserRestrictions: {
        deprecated: "octokit.repos.listProtectedBranchUserRestrictions() has been renamed to octokit.repos.getUsersWithAccessToProtectedBranch() (2019-09-09)",
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
      },
      listPublic: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "integer"
          }
        },
        url: "/repositories"
      },
      listPullRequestsAssociatedWithCommit: {
        headers: {
          accept: "application/vnd.github.groot-preview+json"
        },
        method: "GET",
        params: {
          commit_sha: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:commit_sha/pulls"
      },
      listReleases: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases"
      },
      listStatusesForRef: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          ref: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/commits/:ref/statuses"
      },
      listTags: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/tags"
      },
      listTeams: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/teams"
      },
      listTeamsWithAccessToProtectedBranch: {
        deprecated: "octokit.repos.listTeamsWithAccessToProtectedBranch() has been renamed to octokit.repos.getTeamsWithAccessToProtectedBranch() (2019-09-13)",
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
      },
      listTopics: {
        headers: {
          accept: "application/vnd.github.mercy-preview+json"
        },
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/topics"
      },
      listUsersWithAccessToProtectedBranch: {
        deprecated: "octokit.repos.listUsersWithAccessToProtectedBranch() has been renamed to octokit.repos.getUsersWithAccessToProtectedBranch() (2019-09-13)",
        method: "GET",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
      },
      merge: {
        method: "POST",
        params: {
          base: {
            required: true,
            type: "string"
          },
          commit_message: {
            type: "string"
          },
          head: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/merges"
      },
      pingHook: {
        method: "POST",
        params: {
          hook_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/hooks/:hook_id/pings"
      },
      removeBranchProtection: {
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection"
      },
      removeCollaborator: {
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/collaborators/:username"
      },
      removeDeployKey: {
        method: "DELETE",
        params: {
          key_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/keys/:key_id"
      },
      removeProtectedBranchAdminEnforcement: {
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
      },
      removeProtectedBranchAppRestrictions: {
        method: "DELETE",
        params: {
          apps: {
            mapTo: "data",
            required: true,
            type: "string[]"
          },
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
      },
      removeProtectedBranchPullRequestReviewEnforcement: {
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
      },
      removeProtectedBranchRequiredSignatures: {
        headers: {
          accept: "application/vnd.github.zzzax-preview+json"
        },
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
      },
      removeProtectedBranchRequiredStatusChecks: {
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
      },
      removeProtectedBranchRequiredStatusChecksContexts: {
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          contexts: {
            mapTo: "data",
            required: true,
            type: "string[]"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
      },
      removeProtectedBranchRestrictions: {
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions"
      },
      removeProtectedBranchTeamRestrictions: {
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          teams: {
            mapTo: "data",
            required: true,
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
      },
      removeProtectedBranchUserRestrictions: {
        method: "DELETE",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          users: {
            mapTo: "data",
            required: true,
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
      },
      replaceProtectedBranchAppRestrictions: {
        method: "PUT",
        params: {
          apps: {
            mapTo: "data",
            required: true,
            type: "string[]"
          },
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
      },
      replaceProtectedBranchRequiredStatusChecksContexts: {
        method: "PUT",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          contexts: {
            mapTo: "data",
            required: true,
            type: "string[]"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
      },
      replaceProtectedBranchTeamRestrictions: {
        method: "PUT",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          teams: {
            mapTo: "data",
            required: true,
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
      },
      replaceProtectedBranchUserRestrictions: {
        method: "PUT",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          users: {
            mapTo: "data",
            required: true,
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
      },
      replaceTopics: {
        headers: {
          accept: "application/vnd.github.mercy-preview+json"
        },
        method: "PUT",
        params: {
          names: {
            required: true,
            type: "string[]"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/topics"
      },
      requestPageBuild: {
        method: "POST",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pages/builds"
      },
      retrieveCommunityProfileMetrics: {
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/community/profile"
      },
      testPushHook: {
        method: "POST",
        params: {
          hook_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/hooks/:hook_id/tests"
      },
      transfer: {
        method: "POST",
        params: {
          new_owner: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_ids: {
            type: "integer[]"
          }
        },
        url: "/repos/:owner/:repo/transfer"
      },
      update: {
        method: "PATCH",
        params: {
          allow_merge_commit: {
            type: "boolean"
          },
          allow_rebase_merge: {
            type: "boolean"
          },
          allow_squash_merge: {
            type: "boolean"
          },
          archived: {
            type: "boolean"
          },
          default_branch: {
            type: "string"
          },
          delete_branch_on_merge: {
            type: "boolean"
          },
          description: {
            type: "string"
          },
          has_issues: {
            type: "boolean"
          },
          has_projects: {
            type: "boolean"
          },
          has_wiki: {
            type: "boolean"
          },
          homepage: {
            type: "string"
          },
          is_template: {
            type: "boolean"
          },
          name: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          private: {
            type: "boolean"
          },
          repo: {
            required: true,
            type: "string"
          },
          visibility: {
            enum: ["public", "private", "visibility", "internal"],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo"
      },
      updateBranchProtection: {
        method: "PUT",
        params: {
          allow_deletions: {
            type: "boolean"
          },
          allow_force_pushes: {
            allowNull: true,
            type: "boolean"
          },
          branch: {
            required: true,
            type: "string"
          },
          enforce_admins: {
            allowNull: true,
            required: true,
            type: "boolean"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          required_linear_history: {
            type: "boolean"
          },
          required_pull_request_reviews: {
            allowNull: true,
            required: true,
            type: "object"
          },
          "required_pull_request_reviews.dismiss_stale_reviews": {
            type: "boolean"
          },
          "required_pull_request_reviews.dismissal_restrictions": {
            type: "object"
          },
          "required_pull_request_reviews.dismissal_restrictions.teams": {
            type: "string[]"
          },
          "required_pull_request_reviews.dismissal_restrictions.users": {
            type: "string[]"
          },
          "required_pull_request_reviews.require_code_owner_reviews": {
            type: "boolean"
          },
          "required_pull_request_reviews.required_approving_review_count": {
            type: "integer"
          },
          required_status_checks: {
            allowNull: true,
            required: true,
            type: "object"
          },
          "required_status_checks.contexts": {
            required: true,
            type: "string[]"
          },
          "required_status_checks.strict": {
            required: true,
            type: "boolean"
          },
          restrictions: {
            allowNull: true,
            required: true,
            type: "object"
          },
          "restrictions.apps": {
            type: "string[]"
          },
          "restrictions.teams": {
            required: true,
            type: "string[]"
          },
          "restrictions.users": {
            required: true,
            type: "string[]"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection"
      },
      updateCommitComment: {
        method: "PATCH",
        params: {
          body: {
            required: true,
            type: "string"
          },
          comment_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/comments/:comment_id"
      },
      updateFile: {
        deprecated: "octokit.repos.updateFile() has been renamed to octokit.repos.createOrUpdateFile() (2019-06-07)",
        method: "PUT",
        params: {
          author: {
            type: "object"
          },
          "author.email": {
            required: true,
            type: "string"
          },
          "author.name": {
            required: true,
            type: "string"
          },
          branch: {
            type: "string"
          },
          committer: {
            type: "object"
          },
          "committer.email": {
            required: true,
            type: "string"
          },
          "committer.name": {
            required: true,
            type: "string"
          },
          content: {
            required: true,
            type: "string"
          },
          message: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          path: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          sha: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/contents/:path"
      },
      updateHook: {
        method: "PATCH",
        params: {
          active: {
            type: "boolean"
          },
          add_events: {
            type: "string[]"
          },
          config: {
            type: "object"
          },
          "config.content_type": {
            type: "string"
          },
          "config.insecure_ssl": {
            type: "string"
          },
          "config.secret": {
            type: "string"
          },
          "config.url": {
            required: true,
            type: "string"
          },
          events: {
            type: "string[]"
          },
          hook_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          remove_events: {
            type: "string[]"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/hooks/:hook_id"
      },
      updateInformationAboutPagesSite: {
        method: "PUT",
        params: {
          cname: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          source: {
            enum: ['"gh-pages"', '"master"', '"master /docs"'],
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/pages"
      },
      updateInvitation: {
        method: "PATCH",
        params: {
          invitation_id: {
            required: true,
            type: "integer"
          },
          owner: {
            required: true,
            type: "string"
          },
          permissions: {
            enum: ["read", "write", "admin"],
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/invitations/:invitation_id"
      },
      updateProtectedBranchPullRequestReviewEnforcement: {
        method: "PATCH",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          dismiss_stale_reviews: {
            type: "boolean"
          },
          dismissal_restrictions: {
            type: "object"
          },
          "dismissal_restrictions.teams": {
            type: "string[]"
          },
          "dismissal_restrictions.users": {
            type: "string[]"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          require_code_owner_reviews: {
            type: "boolean"
          },
          required_approving_review_count: {
            type: "integer"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
      },
      updateProtectedBranchRequiredStatusChecks: {
        method: "PATCH",
        params: {
          branch: {
            required: true,
            type: "string"
          },
          contexts: {
            type: "string[]"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          strict: {
            type: "boolean"
          }
        },
        url: "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
      },
      updateRelease: {
        method: "PATCH",
        params: {
          body: {
            type: "string"
          },
          draft: {
            type: "boolean"
          },
          name: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          prerelease: {
            type: "boolean"
          },
          release_id: {
            required: true,
            type: "integer"
          },
          repo: {
            required: true,
            type: "string"
          },
          tag_name: {
            type: "string"
          },
          target_commitish: {
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/:release_id"
      },
      updateReleaseAsset: {
        method: "PATCH",
        params: {
          asset_id: {
            required: true,
            type: "integer"
          },
          label: {
            type: "string"
          },
          name: {
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          }
        },
        url: "/repos/:owner/:repo/releases/assets/:asset_id"
      },
      uploadReleaseAsset: {
        method: "POST",
        params: {
          data: {
            mapTo: "data",
            required: true,
            type: "string | object"
          },
          file: {
            alias: "data",
            deprecated: true,
            type: "string | object"
          },
          headers: {
            required: true,
            type: "object"
          },
          "headers.content-length": {
            required: true,
            type: "integer"
          },
          "headers.content-type": {
            required: true,
            type: "string"
          },
          label: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          url: {
            required: true,
            type: "string"
          }
        },
        url: ":url"
      }
    },
    search: {
      code: {
        method: "GET",
        params: {
          order: {
            enum: ["desc", "asc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          q: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["indexed"],
            type: "string"
          }
        },
        url: "/search/code"
      },
      commits: {
        headers: {
          accept: "application/vnd.github.cloak-preview+json"
        },
        method: "GET",
        params: {
          order: {
            enum: ["desc", "asc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          q: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["author-date", "committer-date"],
            type: "string"
          }
        },
        url: "/search/commits"
      },
      issues: {
        deprecated: "octokit.search.issues() has been renamed to octokit.search.issuesAndPullRequests() (2018-12-27)",
        method: "GET",
        params: {
          order: {
            enum: ["desc", "asc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          q: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["comments", "reactions", "reactions-+1", "reactions--1", "reactions-smile", "reactions-thinking_face", "reactions-heart", "reactions-tada", "interactions", "created", "updated"],
            type: "string"
          }
        },
        url: "/search/issues"
      },
      issuesAndPullRequests: {
        method: "GET",
        params: {
          order: {
            enum: ["desc", "asc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          q: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["comments", "reactions", "reactions-+1", "reactions--1", "reactions-smile", "reactions-thinking_face", "reactions-heart", "reactions-tada", "interactions", "created", "updated"],
            type: "string"
          }
        },
        url: "/search/issues"
      },
      labels: {
        method: "GET",
        params: {
          order: {
            enum: ["desc", "asc"],
            type: "string"
          },
          q: {
            required: true,
            type: "string"
          },
          repository_id: {
            required: true,
            type: "integer"
          },
          sort: {
            enum: ["created", "updated"],
            type: "string"
          }
        },
        url: "/search/labels"
      },
      repos: {
        method: "GET",
        params: {
          order: {
            enum: ["desc", "asc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          q: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["stars", "forks", "help-wanted-issues", "updated"],
            type: "string"
          }
        },
        url: "/search/repositories"
      },
      topics: {
        method: "GET",
        params: {
          q: {
            required: true,
            type: "string"
          }
        },
        url: "/search/topics"
      },
      users: {
        method: "GET",
        params: {
          order: {
            enum: ["desc", "asc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          q: {
            required: true,
            type: "string"
          },
          sort: {
            enum: ["followers", "repositories", "joined"],
            type: "string"
          }
        },
        url: "/search/users"
      }
    },
    teams: {
      addMember: {
        deprecated: "octokit.teams.addMember() has been renamed to octokit.teams.addMemberLegacy() (2020-01-16)",
        method: "PUT",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/members/:username"
      },
      addMemberLegacy: {
        deprecated: "octokit.teams.addMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#add-team-member-legacy",
        method: "PUT",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/members/:username"
      },
      addOrUpdateMembership: {
        deprecated: "octokit.teams.addOrUpdateMembership() has been renamed to octokit.teams.addOrUpdateMembershipLegacy() (2020-01-16)",
        method: "PUT",
        params: {
          role: {
            enum: ["member", "maintainer"],
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/memberships/:username"
      },
      addOrUpdateMembershipInOrg: {
        method: "PUT",
        params: {
          org: {
            required: true,
            type: "string"
          },
          role: {
            enum: ["member", "maintainer"],
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/memberships/:username"
      },
      addOrUpdateMembershipLegacy: {
        deprecated: "octokit.teams.addOrUpdateMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#add-or-update-team-membership-legacy",
        method: "PUT",
        params: {
          role: {
            enum: ["member", "maintainer"],
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/memberships/:username"
      },
      addOrUpdateProject: {
        deprecated: "octokit.teams.addOrUpdateProject() has been renamed to octokit.teams.addOrUpdateProjectLegacy() (2020-01-16)",
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "PUT",
        params: {
          permission: {
            enum: ["read", "write", "admin"],
            type: "string"
          },
          project_id: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/projects/:project_id"
      },
      addOrUpdateProjectInOrg: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "PUT",
        params: {
          org: {
            required: true,
            type: "string"
          },
          permission: {
            enum: ["read", "write", "admin"],
            type: "string"
          },
          project_id: {
            required: true,
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/projects/:project_id"
      },
      addOrUpdateProjectLegacy: {
        deprecated: "octokit.teams.addOrUpdateProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#add-or-update-team-project-legacy",
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "PUT",
        params: {
          permission: {
            enum: ["read", "write", "admin"],
            type: "string"
          },
          project_id: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/projects/:project_id"
      },
      addOrUpdateRepo: {
        deprecated: "octokit.teams.addOrUpdateRepo() has been renamed to octokit.teams.addOrUpdateRepoLegacy() (2020-01-16)",
        method: "PUT",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          permission: {
            enum: ["pull", "push", "admin"],
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/repos/:owner/:repo"
      },
      addOrUpdateRepoInOrg: {
        method: "PUT",
        params: {
          org: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          permission: {
            enum: ["pull", "push", "admin"],
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo"
      },
      addOrUpdateRepoLegacy: {
        deprecated: "octokit.teams.addOrUpdateRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#add-or-update-team-repository-legacy",
        method: "PUT",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          permission: {
            enum: ["pull", "push", "admin"],
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/repos/:owner/:repo"
      },
      checkManagesRepo: {
        deprecated: "octokit.teams.checkManagesRepo() has been renamed to octokit.teams.checkManagesRepoLegacy() (2020-01-16)",
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/repos/:owner/:repo"
      },
      checkManagesRepoInOrg: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo"
      },
      checkManagesRepoLegacy: {
        deprecated: "octokit.teams.checkManagesRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#check-if-a-team-manages-a-repository-legacy",
        method: "GET",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/repos/:owner/:repo"
      },
      create: {
        method: "POST",
        params: {
          description: {
            type: "string"
          },
          maintainers: {
            type: "string[]"
          },
          name: {
            required: true,
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          parent_team_id: {
            type: "integer"
          },
          permission: {
            enum: ["pull", "push", "admin"],
            type: "string"
          },
          privacy: {
            enum: ["secret", "closed"],
            type: "string"
          },
          repo_names: {
            type: "string[]"
          }
        },
        url: "/orgs/:org/teams"
      },
      createDiscussion: {
        deprecated: "octokit.teams.createDiscussion() has been renamed to octokit.teams.createDiscussionLegacy() (2020-01-16)",
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          private: {
            type: "boolean"
          },
          team_id: {
            required: true,
            type: "integer"
          },
          title: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/discussions"
      },
      createDiscussionComment: {
        deprecated: "octokit.teams.createDiscussionComment() has been renamed to octokit.teams.createDiscussionCommentLegacy() (2020-01-16)",
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments"
      },
      createDiscussionCommentInOrg: {
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments"
      },
      createDiscussionCommentLegacy: {
        deprecated: "octokit.teams.createDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#create-a-comment-legacy",
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments"
      },
      createDiscussionInOrg: {
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          private: {
            type: "boolean"
          },
          team_slug: {
            required: true,
            type: "string"
          },
          title: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions"
      },
      createDiscussionLegacy: {
        deprecated: "octokit.teams.createDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#create-a-discussion-legacy",
        method: "POST",
        params: {
          body: {
            required: true,
            type: "string"
          },
          private: {
            type: "boolean"
          },
          team_id: {
            required: true,
            type: "integer"
          },
          title: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/discussions"
      },
      delete: {
        deprecated: "octokit.teams.delete() has been renamed to octokit.teams.deleteLegacy() (2020-01-16)",
        method: "DELETE",
        params: {
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id"
      },
      deleteDiscussion: {
        deprecated: "octokit.teams.deleteDiscussion() has been renamed to octokit.teams.deleteDiscussionLegacy() (2020-01-16)",
        method: "DELETE",
        params: {
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number"
      },
      deleteDiscussionComment: {
        deprecated: "octokit.teams.deleteDiscussionComment() has been renamed to octokit.teams.deleteDiscussionCommentLegacy() (2020-01-16)",
        method: "DELETE",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
      },
      deleteDiscussionCommentInOrg: {
        method: "DELETE",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number"
      },
      deleteDiscussionCommentLegacy: {
        deprecated: "octokit.teams.deleteDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#delete-a-comment-legacy",
        method: "DELETE",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
      },
      deleteDiscussionInOrg: {
        method: "DELETE",
        params: {
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number"
      },
      deleteDiscussionLegacy: {
        deprecated: "octokit.teams.deleteDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#delete-a-discussion-legacy",
        method: "DELETE",
        params: {
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number"
      },
      deleteInOrg: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug"
      },
      deleteLegacy: {
        deprecated: "octokit.teams.deleteLegacy() is deprecated, see https://developer.github.com/v3/teams/#delete-team-legacy",
        method: "DELETE",
        params: {
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id"
      },
      get: {
        deprecated: "octokit.teams.get() has been renamed to octokit.teams.getLegacy() (2020-01-16)",
        method: "GET",
        params: {
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id"
      },
      getByName: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug"
      },
      getDiscussion: {
        deprecated: "octokit.teams.getDiscussion() has been renamed to octokit.teams.getDiscussionLegacy() (2020-01-16)",
        method: "GET",
        params: {
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number"
      },
      getDiscussionComment: {
        deprecated: "octokit.teams.getDiscussionComment() has been renamed to octokit.teams.getDiscussionCommentLegacy() (2020-01-16)",
        method: "GET",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
      },
      getDiscussionCommentInOrg: {
        method: "GET",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number"
      },
      getDiscussionCommentLegacy: {
        deprecated: "octokit.teams.getDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#get-a-single-comment-legacy",
        method: "GET",
        params: {
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
      },
      getDiscussionInOrg: {
        method: "GET",
        params: {
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number"
      },
      getDiscussionLegacy: {
        deprecated: "octokit.teams.getDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#get-a-single-discussion-legacy",
        method: "GET",
        params: {
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number"
      },
      getLegacy: {
        deprecated: "octokit.teams.getLegacy() is deprecated, see https://developer.github.com/v3/teams/#get-team-legacy",
        method: "GET",
        params: {
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id"
      },
      getMember: {
        deprecated: "octokit.teams.getMember() has been renamed to octokit.teams.getMemberLegacy() (2020-01-16)",
        method: "GET",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/members/:username"
      },
      getMemberLegacy: {
        deprecated: "octokit.teams.getMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#get-team-member-legacy",
        method: "GET",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/members/:username"
      },
      getMembership: {
        deprecated: "octokit.teams.getMembership() has been renamed to octokit.teams.getMembershipLegacy() (2020-01-16)",
        method: "GET",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/memberships/:username"
      },
      getMembershipInOrg: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/memberships/:username"
      },
      getMembershipLegacy: {
        deprecated: "octokit.teams.getMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#get-team-membership-legacy",
        method: "GET",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/memberships/:username"
      },
      list: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/orgs/:org/teams"
      },
      listChild: {
        deprecated: "octokit.teams.listChild() has been renamed to octokit.teams.listChildLegacy() (2020-01-16)",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/teams"
      },
      listChildInOrg: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/teams"
      },
      listChildLegacy: {
        deprecated: "octokit.teams.listChildLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-child-teams-legacy",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/teams"
      },
      listDiscussionComments: {
        deprecated: "octokit.teams.listDiscussionComments() has been renamed to octokit.teams.listDiscussionCommentsLegacy() (2020-01-16)",
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments"
      },
      listDiscussionCommentsInOrg: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments"
      },
      listDiscussionCommentsLegacy: {
        deprecated: "octokit.teams.listDiscussionCommentsLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#list-comments-legacy",
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments"
      },
      listDiscussions: {
        deprecated: "octokit.teams.listDiscussions() has been renamed to octokit.teams.listDiscussionsLegacy() (2020-01-16)",
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions"
      },
      listDiscussionsInOrg: {
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions"
      },
      listDiscussionsLegacy: {
        deprecated: "octokit.teams.listDiscussionsLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#list-discussions-legacy",
        method: "GET",
        params: {
          direction: {
            enum: ["asc", "desc"],
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions"
      },
      listForAuthenticatedUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/teams"
      },
      listMembers: {
        deprecated: "octokit.teams.listMembers() has been renamed to octokit.teams.listMembersLegacy() (2020-01-16)",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          role: {
            enum: ["member", "maintainer", "all"],
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/members"
      },
      listMembersInOrg: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          role: {
            enum: ["member", "maintainer", "all"],
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/members"
      },
      listMembersLegacy: {
        deprecated: "octokit.teams.listMembersLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#list-team-members-legacy",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          role: {
            enum: ["member", "maintainer", "all"],
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/members"
      },
      listPendingInvitations: {
        deprecated: "octokit.teams.listPendingInvitations() has been renamed to octokit.teams.listPendingInvitationsLegacy() (2020-01-16)",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/invitations"
      },
      listPendingInvitationsInOrg: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/invitations"
      },
      listPendingInvitationsLegacy: {
        deprecated: "octokit.teams.listPendingInvitationsLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#list-pending-team-invitations-legacy",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/invitations"
      },
      listProjects: {
        deprecated: "octokit.teams.listProjects() has been renamed to octokit.teams.listProjectsLegacy() (2020-01-16)",
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/projects"
      },
      listProjectsInOrg: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/projects"
      },
      listProjectsLegacy: {
        deprecated: "octokit.teams.listProjectsLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-team-projects-legacy",
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/projects"
      },
      listRepos: {
        deprecated: "octokit.teams.listRepos() has been renamed to octokit.teams.listReposLegacy() (2020-01-16)",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/repos"
      },
      listReposInOrg: {
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/repos"
      },
      listReposLegacy: {
        deprecated: "octokit.teams.listReposLegacy() is deprecated, see https://developer.github.com/v3/teams/#list-team-repos-legacy",
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/repos"
      },
      removeMember: {
        deprecated: "octokit.teams.removeMember() has been renamed to octokit.teams.removeMemberLegacy() (2020-01-16)",
        method: "DELETE",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/members/:username"
      },
      removeMemberLegacy: {
        deprecated: "octokit.teams.removeMemberLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#remove-team-member-legacy",
        method: "DELETE",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/members/:username"
      },
      removeMembership: {
        deprecated: "octokit.teams.removeMembership() has been renamed to octokit.teams.removeMembershipLegacy() (2020-01-16)",
        method: "DELETE",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/memberships/:username"
      },
      removeMembershipInOrg: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/memberships/:username"
      },
      removeMembershipLegacy: {
        deprecated: "octokit.teams.removeMembershipLegacy() is deprecated, see https://developer.github.com/v3/teams/members/#remove-team-membership-legacy",
        method: "DELETE",
        params: {
          team_id: {
            required: true,
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/teams/:team_id/memberships/:username"
      },
      removeProject: {
        deprecated: "octokit.teams.removeProject() has been renamed to octokit.teams.removeProjectLegacy() (2020-01-16)",
        method: "DELETE",
        params: {
          project_id: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/projects/:project_id"
      },
      removeProjectInOrg: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          project_id: {
            required: true,
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/projects/:project_id"
      },
      removeProjectLegacy: {
        deprecated: "octokit.teams.removeProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#remove-team-project-legacy",
        method: "DELETE",
        params: {
          project_id: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/projects/:project_id"
      },
      removeRepo: {
        deprecated: "octokit.teams.removeRepo() has been renamed to octokit.teams.removeRepoLegacy() (2020-01-16)",
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/repos/:owner/:repo"
      },
      removeRepoInOrg: {
        method: "DELETE",
        params: {
          org: {
            required: true,
            type: "string"
          },
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/repos/:owner/:repo"
      },
      removeRepoLegacy: {
        deprecated: "octokit.teams.removeRepoLegacy() is deprecated, see https://developer.github.com/v3/teams/#remove-team-repository-legacy",
        method: "DELETE",
        params: {
          owner: {
            required: true,
            type: "string"
          },
          repo: {
            required: true,
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/repos/:owner/:repo"
      },
      reviewProject: {
        deprecated: "octokit.teams.reviewProject() has been renamed to octokit.teams.reviewProjectLegacy() (2020-01-16)",
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          project_id: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/projects/:project_id"
      },
      reviewProjectInOrg: {
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          org: {
            required: true,
            type: "string"
          },
          project_id: {
            required: true,
            type: "integer"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/projects/:project_id"
      },
      reviewProjectLegacy: {
        deprecated: "octokit.teams.reviewProjectLegacy() is deprecated, see https://developer.github.com/v3/teams/#review-a-team-project-legacy",
        headers: {
          accept: "application/vnd.github.inertia-preview+json"
        },
        method: "GET",
        params: {
          project_id: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/projects/:project_id"
      },
      update: {
        deprecated: "octokit.teams.update() has been renamed to octokit.teams.updateLegacy() (2020-01-16)",
        method: "PATCH",
        params: {
          description: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          parent_team_id: {
            type: "integer"
          },
          permission: {
            enum: ["pull", "push", "admin"],
            type: "string"
          },
          privacy: {
            enum: ["secret", "closed"],
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id"
      },
      updateDiscussion: {
        deprecated: "octokit.teams.updateDiscussion() has been renamed to octokit.teams.updateDiscussionLegacy() (2020-01-16)",
        method: "PATCH",
        params: {
          body: {
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          },
          title: {
            type: "string"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number"
      },
      updateDiscussionComment: {
        deprecated: "octokit.teams.updateDiscussionComment() has been renamed to octokit.teams.updateDiscussionCommentLegacy() (2020-01-16)",
        method: "PATCH",
        params: {
          body: {
            required: true,
            type: "string"
          },
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
      },
      updateDiscussionCommentInOrg: {
        method: "PATCH",
        params: {
          body: {
            required: true,
            type: "string"
          },
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number/comments/:comment_number"
      },
      updateDiscussionCommentLegacy: {
        deprecated: "octokit.teams.updateDiscussionCommentLegacy() is deprecated, see https://developer.github.com/v3/teams/discussion_comments/#edit-a-comment-legacy",
        method: "PATCH",
        params: {
          body: {
            required: true,
            type: "string"
          },
          comment_number: {
            required: true,
            type: "integer"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
      },
      updateDiscussionInOrg: {
        method: "PATCH",
        params: {
          body: {
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          org: {
            required: true,
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          },
          title: {
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug/discussions/:discussion_number"
      },
      updateDiscussionLegacy: {
        deprecated: "octokit.teams.updateDiscussionLegacy() is deprecated, see https://developer.github.com/v3/teams/discussions/#edit-a-discussion-legacy",
        method: "PATCH",
        params: {
          body: {
            type: "string"
          },
          discussion_number: {
            required: true,
            type: "integer"
          },
          team_id: {
            required: true,
            type: "integer"
          },
          title: {
            type: "string"
          }
        },
        url: "/teams/:team_id/discussions/:discussion_number"
      },
      updateInOrg: {
        method: "PATCH",
        params: {
          description: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          org: {
            required: true,
            type: "string"
          },
          parent_team_id: {
            type: "integer"
          },
          permission: {
            enum: ["pull", "push", "admin"],
            type: "string"
          },
          privacy: {
            enum: ["secret", "closed"],
            type: "string"
          },
          team_slug: {
            required: true,
            type: "string"
          }
        },
        url: "/orgs/:org/teams/:team_slug"
      },
      updateLegacy: {
        deprecated: "octokit.teams.updateLegacy() is deprecated, see https://developer.github.com/v3/teams/#edit-team-legacy",
        method: "PATCH",
        params: {
          description: {
            type: "string"
          },
          name: {
            required: true,
            type: "string"
          },
          parent_team_id: {
            type: "integer"
          },
          permission: {
            enum: ["pull", "push", "admin"],
            type: "string"
          },
          privacy: {
            enum: ["secret", "closed"],
            type: "string"
          },
          team_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/teams/:team_id"
      }
    },
    users: {
      addEmails: {
        method: "POST",
        params: {
          emails: {
            required: true,
            type: "string[]"
          }
        },
        url: "/user/emails"
      },
      block: {
        method: "PUT",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/user/blocks/:username"
      },
      checkBlocked: {
        method: "GET",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/user/blocks/:username"
      },
      checkFollowing: {
        method: "GET",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/user/following/:username"
      },
      checkFollowingForUser: {
        method: "GET",
        params: {
          target_user: {
            required: true,
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/following/:target_user"
      },
      createGpgKey: {
        method: "POST",
        params: {
          armored_public_key: {
            type: "string"
          }
        },
        url: "/user/gpg_keys"
      },
      createPublicKey: {
        method: "POST",
        params: {
          key: {
            type: "string"
          },
          title: {
            type: "string"
          }
        },
        url: "/user/keys"
      },
      deleteEmails: {
        method: "DELETE",
        params: {
          emails: {
            required: true,
            type: "string[]"
          }
        },
        url: "/user/emails"
      },
      deleteGpgKey: {
        method: "DELETE",
        params: {
          gpg_key_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/gpg_keys/:gpg_key_id"
      },
      deletePublicKey: {
        method: "DELETE",
        params: {
          key_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/keys/:key_id"
      },
      follow: {
        method: "PUT",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/user/following/:username"
      },
      getAuthenticated: {
        method: "GET",
        params: {},
        url: "/user"
      },
      getByUsername: {
        method: "GET",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username"
      },
      getContextForUser: {
        method: "GET",
        params: {
          subject_id: {
            type: "string"
          },
          subject_type: {
            enum: ["organization", "repository", "issue", "pull_request"],
            type: "string"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/hovercard"
      },
      getGpgKey: {
        method: "GET",
        params: {
          gpg_key_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/gpg_keys/:gpg_key_id"
      },
      getPublicKey: {
        method: "GET",
        params: {
          key_id: {
            required: true,
            type: "integer"
          }
        },
        url: "/user/keys/:key_id"
      },
      list: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          since: {
            type: "string"
          }
        },
        url: "/users"
      },
      listBlocked: {
        method: "GET",
        params: {},
        url: "/user/blocks"
      },
      listEmails: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/emails"
      },
      listFollowersForAuthenticatedUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/followers"
      },
      listFollowersForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/followers"
      },
      listFollowingForAuthenticatedUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/following"
      },
      listFollowingForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/following"
      },
      listGpgKeys: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/gpg_keys"
      },
      listGpgKeysForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/gpg_keys"
      },
      listPublicEmails: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/public_emails"
      },
      listPublicKeys: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          }
        },
        url: "/user/keys"
      },
      listPublicKeysForUser: {
        method: "GET",
        params: {
          page: {
            type: "integer"
          },
          per_page: {
            type: "integer"
          },
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/users/:username/keys"
      },
      togglePrimaryEmailVisibility: {
        method: "PATCH",
        params: {
          email: {
            required: true,
            type: "string"
          },
          visibility: {
            required: true,
            type: "string"
          }
        },
        url: "/user/email/visibility"
      },
      unblock: {
        method: "DELETE",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/user/blocks/:username"
      },
      unfollow: {
        method: "DELETE",
        params: {
          username: {
            required: true,
            type: "string"
          }
        },
        url: "/user/following/:username"
      },
      updateAuthenticated: {
        method: "PATCH",
        params: {
          bio: {
            type: "string"
          },
          blog: {
            type: "string"
          },
          company: {
            type: "string"
          },
          email: {
            type: "string"
          },
          hireable: {
            type: "boolean"
          },
          location: {
            type: "string"
          },
          name: {
            type: "string"
          }
        },
        url: "/user"
      }
    }
  };
  var VERSION = "2.4.0";
  function registerEndpoints(octokit, routes) {
    Object.keys(routes).forEach((namespaceName) => {
      if (!octokit[namespaceName]) {
        octokit[namespaceName] = {};
      }
      Object.keys(routes[namespaceName]).forEach((apiName) => {
        const apiOptions = routes[namespaceName][apiName];
        const endpointDefaults = ["method", "url", "headers"].reduce((map, key) => {
          if (typeof apiOptions[key] !== "undefined") {
            map[key] = apiOptions[key];
          }
          return map;
        }, {});
        endpointDefaults.request = {
          validate: apiOptions.params
        };
        let request = octokit.request.defaults(endpointDefaults);
        const hasDeprecatedParam = Object.keys(apiOptions.params || {}).find((key) => apiOptions.params[key].deprecated);
        if (hasDeprecatedParam) {
          const patch = patchForDeprecation.bind(null, octokit, apiOptions);
          request = patch(octokit.request.defaults(endpointDefaults), `.${namespaceName}.${apiName}()`);
          request.endpoint = patch(request.endpoint, `.${namespaceName}.${apiName}.endpoint()`);
          request.endpoint.merge = patch(request.endpoint.merge, `.${namespaceName}.${apiName}.endpoint.merge()`);
        }
        if (apiOptions.deprecated) {
          octokit[namespaceName][apiName] = Object.assign(function deprecatedEndpointMethod() {
            octokit.log.warn(new deprecation.Deprecation(`[@octokit/rest] ${apiOptions.deprecated}`));
            octokit[namespaceName][apiName] = request;
            return request.apply(null, arguments);
          }, request);
          return;
        }
        octokit[namespaceName][apiName] = request;
      });
    });
  }
  function patchForDeprecation(octokit, apiOptions, method, methodName) {
    const patchedMethod = (options) => {
      options = Object.assign({}, options);
      Object.keys(options).forEach((key) => {
        if (apiOptions.params[key] && apiOptions.params[key].deprecated) {
          const aliasKey = apiOptions.params[key].alias;
          octokit.log.warn(new deprecation.Deprecation(`[@octokit/rest] "${key}" parameter is deprecated for "${methodName}". Use "${aliasKey}" instead`));
          if (!(aliasKey in options)) {
            options[aliasKey] = options[key];
          }
          delete options[key];
        }
      });
      return method(options);
    };
    Object.keys(method).forEach((key) => {
      patchedMethod[key] = method[key];
    });
    return patchedMethod;
  }
  function restEndpointMethods(octokit) {
    octokit.registerEndpoints = registerEndpoints.bind(null, octokit);
    registerEndpoints(octokit, endpointsByScope);
    [["gitdata", "git"], ["authorization", "oauthAuthorizations"], ["pullRequests", "pulls"]].forEach(([deprecatedScope, scope]) => {
      Object.defineProperty(octokit, deprecatedScope, {
        get() {
          octokit.log.warn(new deprecation.Deprecation(`[@octokit/plugin-rest-endpoint-methods] "octokit.${deprecatedScope}.*" methods are deprecated, use "octokit.${scope}.*" instead`));
          return octokit[scope];
        }
      });
    });
    return {};
  }
  restEndpointMethods.VERSION = VERSION;
  exports2.restEndpointMethods = restEndpointMethods;
});

// node_modules/before-after-hook/lib/register.js
var require_register = __commonJS((exports2, module2) => {
  module2.exports = register;
  function register(state, name, method, options) {
    if (typeof method !== "function") {
      throw new Error("method for before hook must be a function");
    }
    if (!options) {
      options = {};
    }
    if (Array.isArray(name)) {
      return name.reverse().reduce(function(callback, name2) {
        return register.bind(null, state, name2, callback, options);
      }, method)();
    }
    return Promise.resolve().then(function() {
      if (!state.registry[name]) {
        return method(options);
      }
      return state.registry[name].reduce(function(method2, registered) {
        return registered.hook.bind(null, method2, options);
      }, method)();
    });
  }
});

// node_modules/before-after-hook/lib/add.js
var require_add = __commonJS((exports2, module2) => {
  module2.exports = addHook;
  function addHook(state, kind, name, hook) {
    var orig = hook;
    if (!state.registry[name]) {
      state.registry[name] = [];
    }
    if (kind === "before") {
      hook = function(method, options) {
        return Promise.resolve().then(orig.bind(null, options)).then(method.bind(null, options));
      };
    }
    if (kind === "after") {
      hook = function(method, options) {
        var result;
        return Promise.resolve().then(method.bind(null, options)).then(function(result_) {
          result = result_;
          return orig(result, options);
        }).then(function() {
          return result;
        });
      };
    }
    if (kind === "error") {
      hook = function(method, options) {
        return Promise.resolve().then(method.bind(null, options)).catch(function(error2) {
          return orig(error2, options);
        });
      };
    }
    state.registry[name].push({
      hook,
      orig
    });
  }
});

// node_modules/before-after-hook/lib/remove.js
var require_remove = __commonJS((exports2, module2) => {
  module2.exports = removeHook;
  function removeHook(state, name, method) {
    if (!state.registry[name]) {
      return;
    }
    var index = state.registry[name].map(function(registered) {
      return registered.orig;
    }).indexOf(method);
    if (index === -1) {
      return;
    }
    state.registry[name].splice(index, 1);
  }
});

// node_modules/before-after-hook/index.js
var require_before_after_hook = __commonJS((exports2, module2) => {
  var register = require_register();
  var addHook = require_add();
  var removeHook = require_remove();
  var bind = Function.bind;
  var bindable = bind.bind(bind);
  function bindApi(hook, state, name) {
    var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state]);
    hook.api = {remove: removeHookRef};
    hook.remove = removeHookRef;
    ["before", "error", "after", "wrap"].forEach(function(kind) {
      var args = name ? [state, kind, name] : [state, kind];
      hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args);
    });
  }
  function HookSingular() {
    var singularHookName = "h";
    var singularHookState = {
      registry: {}
    };
    var singularHook = register.bind(null, singularHookState, singularHookName);
    bindApi(singularHook, singularHookState, singularHookName);
    return singularHook;
  }
  function HookCollection() {
    var state = {
      registry: {}
    };
    var hook = register.bind(null, state);
    bindApi(hook, state);
    return hook;
  }
  var collectionHookDeprecationMessageDisplayed = false;
  function Hook() {
    if (!collectionHookDeprecationMessageDisplayed) {
      console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4');
      collectionHookDeprecationMessageDisplayed = true;
    }
    return HookCollection();
  }
  Hook.Singular = HookSingular.bind();
  Hook.Collection = HookCollection.bind();
  module2.exports = Hook;
  module2.exports.Hook = Hook;
  module2.exports.Singular = Hook.Singular;
  module2.exports.Collection = Hook.Collection;
});

// node_modules/macos-release/index.js
var require_macos_release = __commonJS((exports2, module2) => {
  "use strict";
  var os = require("os");
  var nameMap = new Map([
    [20, ["Big Sur", "11"]],
    [19, ["Catalina", "10.15"]],
    [18, ["Mojave", "10.14"]],
    [17, ["High Sierra", "10.13"]],
    [16, ["Sierra", "10.12"]],
    [15, ["El Capitan", "10.11"]],
    [14, ["Yosemite", "10.10"]],
    [13, ["Mavericks", "10.9"]],
    [12, ["Mountain Lion", "10.8"]],
    [11, ["Lion", "10.7"]],
    [10, ["Snow Leopard", "10.6"]],
    [9, ["Leopard", "10.5"]],
    [8, ["Tiger", "10.4"]],
    [7, ["Panther", "10.3"]],
    [6, ["Jaguar", "10.2"]],
    [5, ["Puma", "10.1"]]
  ]);
  var macosRelease = (release) => {
    release = Number((release || os.release()).split(".")[0]);
    const [name, version] = nameMap.get(release);
    return {
      name,
      version
    };
  };
  module2.exports = macosRelease;
  module2.exports.default = macosRelease;
});

// node_modules/nice-try/src/index.js
var require_src = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = function(fn) {
    try {
      return fn();
    } catch (e) {
    }
  };
});

// node_modules/isexe/windows.js
var require_windows = __commonJS((exports2, module2) => {
  module2.exports = isexe;
  isexe.sync = sync;
  var fs = require("fs");
  function checkPathExt(path, options) {
    var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0; i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();
      if (p && path.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  }
  function checkStat(stat, path, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path, options);
  }
  function isexe(path, options, cb) {
    fs.stat(path, function(er, stat) {
      cb(er, er ? false : checkStat(stat, path, options));
    });
  }
  function sync(path, options) {
    return checkStat(fs.statSync(path), path, options);
  }
});

// node_modules/isexe/mode.js
var require_mode = __commonJS((exports2, module2) => {
  module2.exports = isexe;
  isexe.sync = sync;
  var fs = require("fs");
  function isexe(path, options, cb) {
    fs.stat(path, function(er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }
  function sync(path, options) {
    return checkStat(fs.statSync(path), options);
  }
  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }
  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  }
});

// node_modules/isexe/index.js
var require_isexe = __commonJS((exports2, module2) => {
  var fs = require("fs");
  var core2;
  if (process.platform === "win32" || global.TESTING_WINDOWS) {
    core2 = require_windows();
  } else {
    core2 = require_mode();
  }
  module2.exports = isexe;
  isexe.sync = sync;
  function isexe(path, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    if (!cb) {
      if (typeof Promise !== "function") {
        throw new TypeError("callback not provided");
      }
      return new Promise(function(resolve, reject) {
        isexe(path, options || {}, function(er, is) {
          if (er) {
            reject(er);
          } else {
            resolve(is);
          }
        });
      });
    }
    core2(path, options || {}, function(er, is) {
      if (er) {
        if (er.code === "EACCES" || options && options.ignoreErrors) {
          er = null;
          is = false;
        }
      }
      cb(er, is);
    });
  }
  function sync(path, options) {
    try {
      return core2.sync(path, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || er.code === "EACCES") {
        return false;
      } else {
        throw er;
      }
    }
  }
});

// node_modules/which/which.js
var require_which = __commonJS((exports2, module2) => {
  module2.exports = which;
  which.sync = whichSync;
  var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
  var path = require("path");
  var COLON = isWindows ? ";" : ":";
  var isexe = require_isexe();
  function getNotFoundError(cmd) {
    var er = new Error("not found: " + cmd);
    er.code = "ENOENT";
    return er;
  }
  function getPathInfo(cmd, opt) {
    var colon = opt.colon || COLON;
    var pathEnv = opt.path || process.env.PATH || "";
    var pathExt = [""];
    pathEnv = pathEnv.split(colon);
    var pathExtExe = "";
    if (isWindows) {
      pathEnv.unshift(process.cwd());
      pathExtExe = opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM";
      pathExt = pathExtExe.split(colon);
      if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
        pathExt.unshift("");
    }
    if (cmd.match(/\//) || isWindows && cmd.match(/\\/))
      pathEnv = [""];
    return {
      env: pathEnv,
      ext: pathExt,
      extExe: pathExtExe
    };
  }
  function which(cmd, opt, cb) {
    if (typeof opt === "function") {
      cb = opt;
      opt = {};
    }
    var info2 = getPathInfo(cmd, opt);
    var pathEnv = info2.env;
    var pathExt = info2.ext;
    var pathExtExe = info2.extExe;
    var found = [];
    (function F(i, l) {
      if (i === l) {
        if (opt.all && found.length)
          return cb(null, found);
        else
          return cb(getNotFoundError(cmd));
      }
      var pathPart = pathEnv[i];
      if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
        pathPart = pathPart.slice(1, -1);
      var p = path.join(pathPart, cmd);
      if (!pathPart && /^\.[\\\/]/.test(cmd)) {
        p = cmd.slice(0, 2) + p;
      }
      ;
      (function E(ii, ll) {
        if (ii === ll)
          return F(i + 1, l);
        var ext = pathExt[ii];
        isexe(p + ext, {pathExt: pathExtExe}, function(er, is) {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return cb(null, p + ext);
          }
          return E(ii + 1, ll);
        });
      })(0, pathExt.length);
    })(0, pathEnv.length);
  }
  function whichSync(cmd, opt) {
    opt = opt || {};
    var info2 = getPathInfo(cmd, opt);
    var pathEnv = info2.env;
    var pathExt = info2.ext;
    var pathExtExe = info2.extExe;
    var found = [];
    for (var i = 0, l = pathEnv.length; i < l; i++) {
      var pathPart = pathEnv[i];
      if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
        pathPart = pathPart.slice(1, -1);
      var p = path.join(pathPart, cmd);
      if (!pathPart && /^\.[\\\/]/.test(cmd)) {
        p = cmd.slice(0, 2) + p;
      }
      for (var j = 0, ll = pathExt.length; j < ll; j++) {
        var cur = p + pathExt[j];
        var is;
        try {
          is = isexe.sync(cur, {pathExt: pathExtExe});
          if (is) {
            if (opt.all)
              found.push(cur);
            else
              return cur;
          }
        } catch (ex) {
        }
      }
    }
    if (opt.all && found.length)
      return found;
    if (opt.nothrow)
      return null;
    throw getNotFoundError(cmd);
  }
});

// node_modules/path-key/index.js
var require_path_key = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (opts) => {
    opts = opts || {};
    const env = opts.env || process.env;
    const platform = opts.platform || process.platform;
    if (platform !== "win32") {
      return "PATH";
    }
    return Object.keys(env).find((x) => x.toUpperCase() === "PATH") || "Path";
  };
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS((exports2, module2) => {
  "use strict";
  var path = require("path");
  var which = require_which();
  var pathKey = require_path_key()();
  function resolveCommandAttempt(parsed, withoutPathExt) {
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    if (hasCustomCwd) {
      try {
        process.chdir(parsed.options.cwd);
      } catch (err) {
      }
    }
    let resolved;
    try {
      resolved = which.sync(parsed.command, {
        path: (parsed.options.env || process.env)[pathKey],
        pathExt: withoutPathExt ? path.delimiter : void 0
      });
    } catch (e) {
    } finally {
      process.chdir(cwd);
    }
    if (resolved) {
      resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
    }
    return resolved;
  }
  function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
  }
  module2.exports = resolveCommand;
});

// node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS((exports2, module2) => {
  "use strict";
  var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
  function escapeCommand(arg) {
    arg = arg.replace(metaCharsRegExp, "^$1");
    return arg;
  }
  function escapeArgument(arg, doubleEscapeMetaChars) {
    arg = `${arg}`;
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');
    arg = arg.replace(/(\\*)$/, "$1$1");
    arg = `"${arg}"`;
    arg = arg.replace(metaCharsRegExp, "^$1");
    if (doubleEscapeMetaChars) {
      arg = arg.replace(metaCharsRegExp, "^$1");
    }
    return arg;
  }
  module2.exports.command = escapeCommand;
  module2.exports.argument = escapeArgument;
});

// node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = /^#!.*/;
});

// node_modules/shebang-command/index.js
var require_shebang_command = __commonJS((exports2, module2) => {
  "use strict";
  var shebangRegex = require_shebang_regex();
  module2.exports = function(str) {
    var match = str.match(shebangRegex);
    if (!match) {
      return null;
    }
    var arr = match[0].replace(/#! ?/, "").split(" ");
    var bin = arr[0].split("/").pop();
    var arg = arr[1];
    return bin === "env" ? arg : bin + (arg ? " " + arg : "");
  };
});

// node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var shebangCommand = require_shebang_command();
  function readShebang(command) {
    const size = 150;
    let buffer;
    if (Buffer.alloc) {
      buffer = Buffer.alloc(size);
    } else {
      buffer = new Buffer(size);
      buffer.fill(0);
    }
    let fd;
    try {
      fd = fs.openSync(command, "r");
      fs.readSync(fd, buffer, 0, size, 0);
      fs.closeSync(fd);
    } catch (e) {
    }
    return shebangCommand(buffer.toString());
  }
  module2.exports = readShebang;
});

// node_modules/semver/semver.js
var require_semver = __commonJS((exports2, module2) => {
  exports2 = module2.exports = SemVer;
  var debug2;
  if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
    debug2 = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift("SEMVER");
      console.log.apply(console, args);
    };
  } else {
    debug2 = function() {
    };
  }
  exports2.SEMVER_SPEC_VERSION = "2.0.0";
  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
  var MAX_SAFE_COMPONENT_LENGTH = 16;
  var re = exports2.re = [];
  var src = exports2.src = [];
  var R = 0;
  var NUMERICIDENTIFIER = R++;
  src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
  var NUMERICIDENTIFIERLOOSE = R++;
  src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
  var NONNUMERICIDENTIFIER = R++;
  src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
  var MAINVERSION = R++;
  src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
  var MAINVERSIONLOOSE = R++;
  src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
  var PRERELEASEIDENTIFIER = R++;
  src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
  var PRERELEASEIDENTIFIERLOOSE = R++;
  src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
  var PRERELEASE = R++;
  src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
  var PRERELEASELOOSE = R++;
  src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
  var BUILDIDENTIFIER = R++;
  src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
  var BUILD = R++;
  src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
  var FULL = R++;
  var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
  src[FULL] = "^" + FULLPLAIN + "$";
  var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
  var LOOSE = R++;
  src[LOOSE] = "^" + LOOSEPLAIN + "$";
  var GTLT = R++;
  src[GTLT] = "((?:<|>)?=?)";
  var XRANGEIDENTIFIERLOOSE = R++;
  src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
  var XRANGEIDENTIFIER = R++;
  src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
  var XRANGEPLAIN = R++;
  src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
  var XRANGEPLAINLOOSE = R++;
  src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
  var XRANGE = R++;
  src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
  var XRANGELOOSE = R++;
  src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
  var COERCE = R++;
  src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
  var LONETILDE = R++;
  src[LONETILDE] = "(?:~>?)";
  var TILDETRIM = R++;
  src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
  re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
  var tildeTrimReplace = "$1~";
  var TILDE = R++;
  src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
  var TILDELOOSE = R++;
  src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
  var LONECARET = R++;
  src[LONECARET] = "(?:\\^)";
  var CARETTRIM = R++;
  src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
  re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
  var caretTrimReplace = "$1^";
  var CARET = R++;
  src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
  var CARETLOOSE = R++;
  src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
  var COMPARATORLOOSE = R++;
  src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
  var COMPARATOR = R++;
  src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
  var COMPARATORTRIM = R++;
  src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
  re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
  var comparatorTrimReplace = "$1$2$3";
  var HYPHENRANGE = R++;
  src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
  var HYPHENRANGELOOSE = R++;
  src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
  var STAR = R++;
  src[STAR] = "(<|>)?=?\\s*\\*";
  for (var i = 0; i < R; i++) {
    debug2(i, src[i]);
    if (!re[i]) {
      re[i] = new RegExp(src[i]);
    }
  }
  exports2.parse = parse;
  function parse(version, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version instanceof SemVer) {
      return version;
    }
    if (typeof version !== "string") {
      return null;
    }
    if (version.length > MAX_LENGTH) {
      return null;
    }
    var r = options.loose ? re[LOOSE] : re[FULL];
    if (!r.test(version)) {
      return null;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      return null;
    }
  }
  exports2.valid = valid;
  function valid(version, options) {
    var v = parse(version, options);
    return v ? v.version : null;
  }
  exports2.clean = clean;
  function clean(version, options) {
    var s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  }
  exports2.SemVer = SemVer;
  function SemVer(version, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version instanceof SemVer) {
      if (version.loose === options.loose) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError("Invalid Version: " + version);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
    }
    if (!(this instanceof SemVer)) {
      return new SemVer(version, options);
    }
    debug2("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);
    if (!m) {
      throw new TypeError("Invalid Version: " + version);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map(function(id) {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  SemVer.prototype.format = function() {
    this.version = this.major + "." + this.minor + "." + this.patch;
    if (this.prerelease.length) {
      this.version += "-" + this.prerelease.join(".");
    }
    return this.version;
  };
  SemVer.prototype.toString = function() {
    return this.version;
  };
  SemVer.prototype.compare = function(other) {
    debug2("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return this.compareMain(other) || this.comparePre(other);
  };
  SemVer.prototype.compareMain = function(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  };
  SemVer.prototype.comparePre = function(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    var i2 = 0;
    do {
      var a = this.prerelease[i2];
      var b = other.prerelease[i2];
      debug2("prerelease compare", i2, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i2);
  };
  SemVer.prototype.inc = function(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          var i2 = this.prerelease.length;
          while (--i2 >= 0) {
            if (typeof this.prerelease[i2] === "number") {
              this.prerelease[i2]++;
              i2 = -2;
            }
          }
          if (i2 === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error("invalid increment argument: " + release);
    }
    this.format();
    this.raw = this.version;
    return this;
  };
  exports2.inc = inc;
  function inc(version, release, loose, identifier) {
    if (typeof loose === "string") {
      identifier = loose;
      loose = void 0;
    }
    try {
      return new SemVer(version, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }
  exports2.diff = diff;
  function diff(version1, version2) {
    if (eq(version1, version2)) {
      return null;
    } else {
      var v1 = parse(version1);
      var v2 = parse(version2);
      var prefix = "";
      if (v1.prerelease.length || v2.prerelease.length) {
        prefix = "pre";
        var defaultResult = "prerelease";
      }
      for (var key in v1) {
        if (key === "major" || key === "minor" || key === "patch") {
          if (v1[key] !== v2[key]) {
            return prefix + key;
          }
        }
      }
      return defaultResult;
    }
  }
  exports2.compareIdentifiers = compareIdentifiers;
  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  }
  exports2.rcompareIdentifiers = rcompareIdentifiers;
  function rcompareIdentifiers(a, b) {
    return compareIdentifiers(b, a);
  }
  exports2.major = major;
  function major(a, loose) {
    return new SemVer(a, loose).major;
  }
  exports2.minor = minor;
  function minor(a, loose) {
    return new SemVer(a, loose).minor;
  }
  exports2.patch = patch;
  function patch(a, loose) {
    return new SemVer(a, loose).patch;
  }
  exports2.compare = compare;
  function compare(a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
  }
  exports2.compareLoose = compareLoose;
  function compareLoose(a, b) {
    return compare(a, b, true);
  }
  exports2.rcompare = rcompare;
  function rcompare(a, b, loose) {
    return compare(b, a, loose);
  }
  exports2.sort = sort;
  function sort(list, loose) {
    return list.sort(function(a, b) {
      return exports2.compare(a, b, loose);
    });
  }
  exports2.rsort = rsort;
  function rsort(list, loose) {
    return list.sort(function(a, b) {
      return exports2.rcompare(a, b, loose);
    });
  }
  exports2.gt = gt;
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }
  exports2.lt = lt;
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }
  exports2.eq = eq;
  function eq(a, b, loose) {
    return compare(a, b, loose) === 0;
  }
  exports2.neq = neq;
  function neq(a, b, loose) {
    return compare(a, b, loose) !== 0;
  }
  exports2.gte = gte;
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }
  exports2.lte = lte;
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }
  exports2.cmp = cmp;
  function cmp(a, op, b, loose) {
    switch (op) {
      case "===":
        if (typeof a === "object")
          a = a.version;
        if (typeof b === "object")
          b = b.version;
        return a === b;
      case "!==":
        if (typeof a === "object")
          a = a.version;
        if (typeof b === "object")
          b = b.version;
        return a !== b;
      case "":
      case "=":
      case "==":
        return eq(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError("Invalid operator: " + op);
    }
  }
  exports2.Comparator = Comparator;
  function Comparator(comp, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    if (!(this instanceof Comparator)) {
      return new Comparator(comp, options);
    }
    debug2("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
    debug2("comp", this);
  }
  var ANY = {};
  Comparator.prototype.parse = function(comp) {
    var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var m = comp.match(r);
    if (!m) {
      throw new TypeError("Invalid comparator: " + comp);
    }
    this.operator = m[1];
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m[2]) {
      this.semver = ANY;
    } else {
      this.semver = new SemVer(m[2], this.options.loose);
    }
  };
  Comparator.prototype.toString = function() {
    return this.value;
  };
  Comparator.prototype.test = function(version) {
    debug2("Comparator.test", version, this.options.loose);
    if (this.semver === ANY) {
      return true;
    }
    if (typeof version === "string") {
      version = new SemVer(version, this.options);
    }
    return cmp(version, this.operator, this.semver, this.options);
  };
  Comparator.prototype.intersects = function(comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError("a Comparator is required");
    }
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    var rangeTmp;
    if (this.operator === "") {
      rangeTmp = new Range(comp.value, options);
      return satisfies(this.value, rangeTmp, options);
    } else if (comp.operator === "") {
      rangeTmp = new Range(this.value, options);
      return satisfies(comp.semver, rangeTmp, options);
    }
    var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
    var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
    var sameSemVer = this.semver.version === comp.semver.version;
    var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
    var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
    var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  };
  exports2.Range = Range;
  function Range(range, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (range instanceof Range) {
      if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
        return range;
      } else {
        return new Range(range.raw, options);
      }
    }
    if (range instanceof Comparator) {
      return new Range(range.value, options);
    }
    if (!(this instanceof Range)) {
      return new Range(range, options);
    }
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
      return this.parseRange(range2.trim());
    }, this).filter(function(c) {
      return c.length;
    });
    if (!this.set.length) {
      throw new TypeError("Invalid SemVer Range: " + range);
    }
    this.format();
  }
  Range.prototype.format = function() {
    this.range = this.set.map(function(comps) {
      return comps.join(" ").trim();
    }).join("||").trim();
    return this.range;
  };
  Range.prototype.toString = function() {
    return this.range;
  };
  Range.prototype.parseRange = function(range) {
    var loose = this.options.loose;
    range = range.trim();
    var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug2("hyphen replace", range);
    range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
    debug2("comparator trim", range, re[COMPARATORTRIM]);
    range = range.replace(re[TILDETRIM], tildeTrimReplace);
    range = range.replace(re[CARETTRIM], caretTrimReplace);
    range = range.split(/\s+/).join(" ");
    var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var set = range.split(" ").map(function(comp) {
      return parseComparator(comp, this.options);
    }, this).join(" ").split(/\s+/);
    if (this.options.loose) {
      set = set.filter(function(comp) {
        return !!comp.match(compRe);
      });
    }
    set = set.map(function(comp) {
      return new Comparator(comp, this.options);
    }, this);
    return set;
  };
  Range.prototype.intersects = function(range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some(function(thisComparators) {
      return thisComparators.every(function(thisComparator) {
        return range.set.some(function(rangeComparators) {
          return rangeComparators.every(function(rangeComparator) {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  };
  exports2.toComparators = toComparators;
  function toComparators(range, options) {
    return new Range(range, options).set.map(function(comp) {
      return comp.map(function(c) {
        return c.value;
      }).join(" ").trim().split(" ");
    });
  }
  function parseComparator(comp, options) {
    debug2("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug2("caret", comp);
    comp = replaceTildes(comp, options);
    debug2("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug2("xrange", comp);
    comp = replaceStars(comp, options);
    debug2("stars", comp);
    return comp;
  }
  function isX(id) {
    return !id || id.toLowerCase() === "x" || id === "*";
  }
  function replaceTildes(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp2) {
      return replaceTilde(comp2, options);
    }).join(" ");
  }
  function replaceTilde(comp, options) {
    var r = options.loose ? re[TILDELOOSE] : re[TILDE];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug2("tilde", comp, _, M, m, p, pr);
      var ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (isX(p)) {
        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
      } else if (pr) {
        debug2("replaceTilde pr", pr);
        ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
      } else {
        ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
      }
      debug2("tilde return", ret);
      return ret;
    });
  }
  function replaceCarets(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp2) {
      return replaceCaret(comp2, options);
    }).join(" ");
  }
  function replaceCaret(comp, options) {
    debug2("caret", comp, options);
    var r = options.loose ? re[CARETLOOSE] : re[CARET];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug2("caret", comp, _, M, m, p, pr);
      var ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (isX(p)) {
        if (M === "0") {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
        }
      } else if (pr) {
        debug2("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
          }
        } else {
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
        }
      } else {
        debug2("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
          }
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
        }
      }
      debug2("caret return", ret);
      return ret;
    });
  }
  function replaceXRanges(comp, options) {
    debug2("replaceXRanges", comp, options);
    return comp.split(/\s+/).map(function(comp2) {
      return replaceXRange(comp2, options);
    }).join(" ");
  }
  function replaceXRange(comp, options) {
    comp = comp.trim();
    var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
    return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
      debug2("xRange", comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M);
      var xm = xM || isX(m);
      var xp = xm || isX(p);
      var anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        ret = gtlt + M + "." + m + "." + p;
      } else if (xm) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (xp) {
        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
      }
      debug2("xRange return", ret);
      return ret;
    });
  }
  function replaceStars(comp, options) {
    debug2("replaceStars", comp, options);
    return comp.trim().replace(re[STAR], "");
  }
  function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = ">=" + fM + ".0.0";
    } else if (isX(fp)) {
      from = ">=" + fM + "." + fm + ".0";
    } else {
      from = ">=" + from;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = "<" + (+tM + 1) + ".0.0";
    } else if (isX(tp)) {
      to = "<" + tM + "." + (+tm + 1) + ".0";
    } else if (tpr) {
      to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
    } else {
      to = "<=" + to;
    }
    return (from + " " + to).trim();
  }
  Range.prototype.test = function(version) {
    if (!version) {
      return false;
    }
    if (typeof version === "string") {
      version = new SemVer(version, this.options);
    }
    for (var i2 = 0; i2 < this.set.length; i2++) {
      if (testSet(this.set[i2], version, this.options)) {
        return true;
      }
    }
    return false;
  };
  function testSet(set, version, options) {
    for (var i2 = 0; i2 < set.length; i2++) {
      if (!set[i2].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      for (i2 = 0; i2 < set.length; i2++) {
        debug2(set[i2].semver);
        if (set[i2].semver === ANY) {
          continue;
        }
        if (set[i2].semver.prerelease.length > 0) {
          var allowed = set[i2].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  }
  exports2.satisfies = satisfies;
  function satisfies(version, range, options) {
    try {
      range = new Range(range, options);
    } catch (er) {
      return false;
    }
    return range.test(version);
  }
  exports2.maxSatisfying = maxSatisfying;
  function maxSatisfying(versions, range, options) {
    var max = null;
    var maxSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(function(v) {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v;
          maxSV = new SemVer(max, options);
        }
      }
    });
    return max;
  }
  exports2.minSatisfying = minSatisfying;
  function minSatisfying(versions, range, options) {
    var min = null;
    var minSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(function(v) {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v;
          minSV = new SemVer(min, options);
        }
      }
    });
    return min;
  }
  exports2.minVersion = minVersion;
  function minVersion(range, loose) {
    range = new Range(range, loose);
    var minver = new SemVer("0.0.0");
    if (range.test(minver)) {
      return minver;
    }
    minver = new SemVer("0.0.0-0");
    if (range.test(minver)) {
      return minver;
    }
    minver = null;
    for (var i2 = 0; i2 < range.set.length; ++i2) {
      var comparators = range.set[i2];
      comparators.forEach(function(comparator) {
        var compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
          case ">":
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
          case "":
          case ">=":
            if (!minver || gt(minver, compver)) {
              minver = compver;
            }
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error("Unexpected operation: " + comparator.operator);
        }
      });
    }
    if (minver && range.test(minver)) {
      return minver;
    }
    return null;
  }
  exports2.validRange = validRange;
  function validRange(range, options) {
    try {
      return new Range(range, options).range || "*";
    } catch (er) {
      return null;
    }
  }
  exports2.ltr = ltr;
  function ltr(version, range, options) {
    return outside(version, range, "<", options);
  }
  exports2.gtr = gtr;
  function gtr(version, range, options) {
    return outside(version, range, ">", options);
  }
  exports2.outside = outside;
  function outside(version, range, hilo, options) {
    version = new SemVer(version, options);
    range = new Range(range, options);
    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = ">";
        ecomp = ">=";
        break;
      case "<":
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = "<";
        ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version, range, options)) {
      return false;
    }
    for (var i2 = 0; i2 < range.set.length; ++i2) {
      var comparators = range.set[i2];
      var high = null;
      var low = null;
      comparators.forEach(function(comparator) {
        if (comparator.semver === ANY) {
          comparator = new Comparator(">=0.0.0");
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, options)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, options)) {
          low = comparator;
        }
      });
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  }
  exports2.prerelease = prerelease;
  function prerelease(version, options) {
    var parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  }
  exports2.intersects = intersects;
  function intersects(r1, r2, options) {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2);
  }
  exports2.coerce = coerce;
  function coerce(version) {
    if (version instanceof SemVer) {
      return version;
    }
    if (typeof version !== "string") {
      return null;
    }
    var match = version.match(re[COERCE]);
    if (match == null) {
      return null;
    }
    return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
  }
});

// node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS((exports2, module2) => {
  "use strict";
  var path = require("path");
  var niceTry = require_src();
  var resolveCommand = require_resolveCommand();
  var escape = require_escape();
  var readShebang = require_readShebang();
  var semver = require_semver();
  var isWin = process.platform === "win32";
  var isExecutableRegExp = /\.(?:com|exe)$/i;
  var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  var supportsShellOption = niceTry(() => semver.satisfies(process.version, "^4.8.0 || ^5.7.0 || >= 6.0.0", true)) || false;
  function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);
    const shebang = parsed.file && readShebang(parsed.file);
    if (shebang) {
      parsed.args.unshift(parsed.file);
      parsed.command = shebang;
      return resolveCommand(parsed);
    }
    return parsed.file;
  }
  function parseNonShell(parsed) {
    if (!isWin) {
      return parsed;
    }
    const commandFile = detectShebang(parsed);
    const needsShell = !isExecutableRegExp.test(commandFile);
    if (parsed.options.forceShell || needsShell) {
      const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
      parsed.command = path.normalize(parsed.command);
      parsed.command = escape.command(parsed.command);
      parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
      const shellCommand = [parsed.command].concat(parsed.args).join(" ");
      parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
      parsed.command = process.env.comspec || "cmd.exe";
      parsed.options.windowsVerbatimArguments = true;
    }
    return parsed;
  }
  function parseShell(parsed) {
    if (supportsShellOption) {
      return parsed;
    }
    const shellCommand = [parsed.command].concat(parsed.args).join(" ");
    if (isWin) {
      parsed.command = typeof parsed.options.shell === "string" ? parsed.options.shell : process.env.comspec || "cmd.exe";
      parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
      parsed.options.windowsVerbatimArguments = true;
    } else {
      if (typeof parsed.options.shell === "string") {
        parsed.command = parsed.options.shell;
      } else if (process.platform === "android") {
        parsed.command = "/system/bin/sh";
      } else {
        parsed.command = "/bin/sh";
      }
      parsed.args = ["-c", shellCommand];
    }
    return parsed;
  }
  function parse(command, args, options) {
    if (args && !Array.isArray(args)) {
      options = args;
      args = null;
    }
    args = args ? args.slice(0) : [];
    options = Object.assign({}, options);
    const parsed = {
      command,
      args,
      options,
      file: void 0,
      original: {
        command,
        args
      }
    };
    return options.shell ? parseShell(parsed) : parseNonShell(parsed);
  }
  module2.exports = parse;
});

// node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS((exports2, module2) => {
  "use strict";
  var isWin = process.platform === "win32";
  function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${syscall} ${original.command}`,
      path: original.command,
      spawnargs: original.args
    });
  }
  function hookChildProcess(cp, parsed) {
    if (!isWin) {
      return;
    }
    const originalEmit = cp.emit;
    cp.emit = function(name, arg1) {
      if (name === "exit") {
        const err = verifyENOENT(arg1, parsed, "spawn");
        if (err) {
          return originalEmit.call(cp, "error", err);
        }
      }
      return originalEmit.apply(cp, arguments);
    };
  }
  function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawn");
    }
    return null;
  }
  function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawnSync");
    }
    return null;
  }
  module2.exports = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError
  };
});

// node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS((exports2, module2) => {
  "use strict";
  var cp = require("child_process");
  var parse = require_parse();
  var enoent = require_enoent();
  function spawn(command, args, options) {
    const parsed = parse(command, args, options);
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
    enoent.hookChildProcess(spawned, parsed);
    return spawned;
  }
  function spawnSync(command, args, options) {
    const parsed = parse(command, args, options);
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
    return result;
  }
  module2.exports = spawn;
  module2.exports.spawn = spawn;
  module2.exports.sync = spawnSync;
  module2.exports._parse = parse;
  module2.exports._enoent = enoent;
});

// node_modules/strip-eof/index.js
var require_strip_eof = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = function(x) {
    var lf = typeof x === "string" ? "\n" : "\n".charCodeAt();
    var cr = typeof x === "string" ? "\r" : "\r".charCodeAt();
    if (x[x.length - 1] === lf) {
      x = x.slice(0, x.length - 1);
    }
    if (x[x.length - 1] === cr) {
      x = x.slice(0, x.length - 1);
    }
    return x;
  };
});

// node_modules/npm-run-path/index.js
var require_npm_run_path = __commonJS((exports2, module2) => {
  "use strict";
  var path = require("path");
  var pathKey = require_path_key();
  module2.exports = (opts) => {
    opts = Object.assign({
      cwd: process.cwd(),
      path: process.env[pathKey()]
    }, opts);
    let prev;
    let pth = path.resolve(opts.cwd);
    const ret = [];
    while (prev !== pth) {
      ret.push(path.join(pth, "node_modules/.bin"));
      prev = pth;
      pth = path.resolve(pth, "..");
    }
    ret.push(path.dirname(process.execPath));
    return ret.concat(opts.path).join(path.delimiter);
  };
  module2.exports.env = (opts) => {
    opts = Object.assign({
      env: process.env
    }, opts);
    const env = Object.assign({}, opts.env);
    const path2 = pathKey({env});
    opts.path = env[path2];
    env[path2] = module2.exports(opts);
    return env;
  };
});

// node_modules/is-stream/index.js
var require_is_stream = __commonJS((exports2, module2) => {
  "use strict";
  var isStream = module2.exports = function(stream) {
    return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
  };
  isStream.writable = function(stream) {
    return isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
  };
  isStream.readable = function(stream) {
    return isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
  };
  isStream.duplex = function(stream) {
    return isStream.writable(stream) && isStream.readable(stream);
  };
  isStream.transform = function(stream) {
    return isStream.duplex(stream) && typeof stream._transform === "function" && typeof stream._transformState === "object";
  };
});

// node_modules/end-of-stream/index.js
var require_end_of_stream = __commonJS((exports2, module2) => {
  var once = require_once();
  var noop = function() {
  };
  var isRequest = function(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  };
  var isChildProcess = function(stream) {
    return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
  };
  var eos = function(stream, opts, callback) {
    if (typeof opts === "function")
      return eos(stream, null, opts);
    if (!opts)
      opts = {};
    callback = once(callback || noop);
    var ws = stream._writableState;
    var rs = stream._readableState;
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var cancelled = false;
    var onlegacyfinish = function() {
      if (!stream.writable)
        onfinish();
    };
    var onfinish = function() {
      writable = false;
      if (!readable)
        callback.call(stream);
    };
    var onend = function() {
      readable = false;
      if (!writable)
        callback.call(stream);
    };
    var onexit = function(exitCode) {
      callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
    };
    var onerror = function(err) {
      callback.call(stream, err);
    };
    var onclose = function() {
      process.nextTick(onclosenexttick);
    };
    var onclosenexttick = function() {
      if (cancelled)
        return;
      if (readable && !(rs && (rs.ended && !rs.destroyed)))
        return callback.call(stream, new Error("premature close"));
      if (writable && !(ws && (ws.ended && !ws.destroyed)))
        return callback.call(stream, new Error("premature close"));
    };
    var onrequest = function() {
      stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
      stream.on("complete", onfinish);
      stream.on("abort", onclose);
      if (stream.req)
        onrequest();
      else
        stream.on("request", onrequest);
    } else if (writable && !ws) {
      stream.on("end", onlegacyfinish);
      stream.on("close", onlegacyfinish);
    }
    if (isChildProcess(stream))
      stream.on("exit", onexit);
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false)
      stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
      cancelled = true;
      stream.removeListener("complete", onfinish);
      stream.removeListener("abort", onclose);
      stream.removeListener("request", onrequest);
      if (stream.req)
        stream.req.removeListener("finish", onfinish);
      stream.removeListener("end", onlegacyfinish);
      stream.removeListener("close", onlegacyfinish);
      stream.removeListener("finish", onfinish);
      stream.removeListener("exit", onexit);
      stream.removeListener("end", onend);
      stream.removeListener("error", onerror);
      stream.removeListener("close", onclose);
    };
  };
  module2.exports = eos;
});

// node_modules/pump/index.js
var require_pump = __commonJS((exports2, module2) => {
  var once = require_once();
  var eos = require_end_of_stream();
  var fs = require("fs");
  var noop = function() {
  };
  var ancient = /^v?\.0/.test(process.version);
  var isFn = function(fn) {
    return typeof fn === "function";
  };
  var isFS = function(stream) {
    if (!ancient)
      return false;
    if (!fs)
      return false;
    return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close);
  };
  var isRequest = function(stream) {
    return stream.setHeader && isFn(stream.abort);
  };
  var destroyer = function(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on("close", function() {
      closed = true;
    });
    eos(stream, {readable: reading, writable: writing}, function(err) {
      if (err)
        return callback(err);
      closed = true;
      callback();
    });
    var destroyed = false;
    return function(err) {
      if (closed)
        return;
      if (destroyed)
        return;
      destroyed = true;
      if (isFS(stream))
        return stream.close(noop);
      if (isRequest(stream))
        return stream.abort();
      if (isFn(stream.destroy))
        return stream.destroy();
      callback(err || new Error("stream was destroyed"));
    };
  };
  var call = function(fn) {
    fn();
  };
  var pipe = function(from, to) {
    return from.pipe(to);
  };
  var pump = function() {
    var streams = Array.prototype.slice.call(arguments);
    var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
    if (Array.isArray(streams[0]))
      streams = streams[0];
    if (streams.length < 2)
      throw new Error("pump requires two streams per minimum");
    var error2;
    var destroys = streams.map(function(stream, i) {
      var reading = i < streams.length - 1;
      var writing = i > 0;
      return destroyer(stream, reading, writing, function(err) {
        if (!error2)
          error2 = err;
        if (err)
          destroys.forEach(call);
        if (reading)
          return;
        destroys.forEach(call);
        callback(error2);
      });
    });
    return streams.reduce(pipe);
  };
  module2.exports = pump;
});

// node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS((exports2, module2) => {
  "use strict";
  var {PassThrough} = require("stream");
  module2.exports = (options) => {
    options = Object.assign({}, options);
    const {array} = options;
    let {encoding} = options;
    const buffer = encoding === "buffer";
    let objectMode = false;
    if (array) {
      objectMode = !(encoding || buffer);
    } else {
      encoding = encoding || "utf8";
    }
    if (buffer) {
      encoding = null;
    }
    let len = 0;
    const ret = [];
    const stream = new PassThrough({objectMode});
    if (encoding) {
      stream.setEncoding(encoding);
    }
    stream.on("data", (chunk) => {
      ret.push(chunk);
      if (objectMode) {
        len = ret.length;
      } else {
        len += chunk.length;
      }
    });
    stream.getBufferedValue = () => {
      if (array) {
        return ret;
      }
      return buffer ? Buffer.concat(ret, len) : ret.join("");
    };
    stream.getBufferedLength = () => len;
    return stream;
  };
});

// node_modules/get-stream/index.js
var require_get_stream = __commonJS((exports2, module2) => {
  "use strict";
  var pump = require_pump();
  var bufferStream = require_buffer_stream();
  var MaxBufferError = class extends Error {
    constructor() {
      super("maxBuffer exceeded");
      this.name = "MaxBufferError";
    }
  };
  function getStream(inputStream, options) {
    if (!inputStream) {
      return Promise.reject(new Error("Expected a stream"));
    }
    options = Object.assign({maxBuffer: Infinity}, options);
    const {maxBuffer} = options;
    let stream;
    return new Promise((resolve, reject) => {
      const rejectPromise = (error2) => {
        if (error2) {
          error2.bufferedData = stream.getBufferedValue();
        }
        reject(error2);
      };
      stream = pump(inputStream, bufferStream(options), (error2) => {
        if (error2) {
          rejectPromise(error2);
          return;
        }
        resolve();
      });
      stream.on("data", () => {
        if (stream.getBufferedLength() > maxBuffer) {
          rejectPromise(new MaxBufferError());
        }
      });
    }).then(() => stream.getBufferedValue());
  }
  module2.exports = getStream;
  module2.exports.buffer = (stream, options) => getStream(stream, Object.assign({}, options, {encoding: "buffer"}));
  module2.exports.array = (stream, options) => getStream(stream, Object.assign({}, options, {array: true}));
  module2.exports.MaxBufferError = MaxBufferError;
});

// node_modules/p-finally/index.js
var require_p_finally = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (promise, onFinally) => {
    onFinally = onFinally || (() => {
    });
    return promise.then((val) => new Promise((resolve) => {
      resolve(onFinally());
    }).then(() => val), (err) => new Promise((resolve) => {
      resolve(onFinally());
    }).then(() => {
      throw err;
    }));
  };
});

// node_modules/signal-exit/signals.js
var require_signals = __commonJS((exports2, module2) => {
  module2.exports = [
    "SIGABRT",
    "SIGALRM",
    "SIGHUP",
    "SIGINT",
    "SIGTERM"
  ];
  if (process.platform !== "win32") {
    module2.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
  }
  if (process.platform === "linux") {
    module2.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
  }
});

// node_modules/signal-exit/index.js
var require_signal_exit = __commonJS((exports2, module2) => {
  var assert = require("assert");
  var signals = require_signals();
  var isWin = /^win/i.test(process.platform);
  var EE = require("events");
  if (typeof EE !== "function") {
    EE = EE.EventEmitter;
  }
  var emitter;
  if (process.__signal_exit_emitter__) {
    emitter = process.__signal_exit_emitter__;
  } else {
    emitter = process.__signal_exit_emitter__ = new EE();
    emitter.count = 0;
    emitter.emitted = {};
  }
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }
  module2.exports = function(cb, opts) {
    assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
    if (loaded === false) {
      load();
    }
    var ev = "exit";
    if (opts && opts.alwaysLast) {
      ev = "afterexit";
    }
    var remove = function() {
      emitter.removeListener(ev, cb);
      if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
        unload();
      }
    };
    emitter.on(ev, cb);
    return remove;
  };
  module2.exports.unload = unload;
  function unload() {
    if (!loaded) {
      return;
    }
    loaded = false;
    signals.forEach(function(sig) {
      try {
        process.removeListener(sig, sigListeners[sig]);
      } catch (er) {
      }
    });
    process.emit = originalProcessEmit;
    process.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  }
  function emit(event, code, signal) {
    if (emitter.emitted[event]) {
      return;
    }
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  }
  var sigListeners = {};
  signals.forEach(function(sig) {
    sigListeners[sig] = function listener() {
      var listeners = process.listeners(sig);
      if (listeners.length === emitter.count) {
        unload();
        emit("exit", null, sig);
        emit("afterexit", null, sig);
        if (isWin && sig === "SIGHUP") {
          sig = "SIGINT";
        }
        process.kill(process.pid, sig);
      }
    };
  });
  module2.exports.signals = function() {
    return signals;
  };
  module2.exports.load = load;
  var loaded = false;
  function load() {
    if (loaded) {
      return;
    }
    loaded = true;
    emitter.count += 1;
    signals = signals.filter(function(sig) {
      try {
        process.on(sig, sigListeners[sig]);
        return true;
      } catch (er) {
        return false;
      }
    });
    process.emit = processEmit;
    process.reallyExit = processReallyExit;
  }
  var originalProcessReallyExit = process.reallyExit;
  function processReallyExit(code) {
    process.exitCode = code || 0;
    emit("exit", process.exitCode, null);
    emit("afterexit", process.exitCode, null);
    originalProcessReallyExit.call(process, process.exitCode);
  }
  var originalProcessEmit = process.emit;
  function processEmit(ev, arg) {
    if (ev === "exit") {
      if (arg !== void 0) {
        process.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      emit("exit", process.exitCode, null);
      emit("afterexit", process.exitCode, null);
      return ret;
    } else {
      return originalProcessEmit.apply(this, arguments);
    }
  }
});

// node_modules/execa/lib/errname.js
var require_errname = __commonJS((exports2, module2) => {
  "use strict";
  var util = require("util");
  var uv;
  if (typeof util.getSystemErrorName === "function") {
    module2.exports = util.getSystemErrorName;
  } else {
    try {
      uv = process.binding("uv");
      if (typeof uv.errname !== "function") {
        throw new TypeError("uv.errname is not a function");
      }
    } catch (err) {
      console.error("execa/lib/errname: unable to establish process.binding('uv')", err);
      uv = null;
    }
    module2.exports = (code) => errname(uv, code);
  }
  module2.exports.__test__ = errname;
  function errname(uv2, code) {
    if (uv2) {
      return uv2.errname(code);
    }
    if (!(code < 0)) {
      throw new Error("err >= 0");
    }
    return `Unknown system error ${code}`;
  }
});

// node_modules/execa/lib/stdio.js
var require_stdio = __commonJS((exports2, module2) => {
  "use strict";
  var alias = ["stdin", "stdout", "stderr"];
  var hasAlias = (opts) => alias.some((x) => Boolean(opts[x]));
  module2.exports = (opts) => {
    if (!opts) {
      return null;
    }
    if (opts.stdio && hasAlias(opts)) {
      throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${alias.map((x) => `\`${x}\``).join(", ")}`);
    }
    if (typeof opts.stdio === "string") {
      return opts.stdio;
    }
    const stdio = opts.stdio || [];
    if (!Array.isArray(stdio)) {
      throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
    }
    const result = [];
    const len = Math.max(stdio.length, alias.length);
    for (let i = 0; i < len; i++) {
      let value = null;
      if (stdio[i] !== void 0) {
        value = stdio[i];
      } else if (opts[alias[i]] !== void 0) {
        value = opts[alias[i]];
      }
      result[i] = value;
    }
    return result;
  };
});

// node_modules/execa/index.js
var require_execa = __commonJS((exports2, module2) => {
  "use strict";
  var path = require("path");
  var childProcess = require("child_process");
  var crossSpawn = require_cross_spawn();
  var stripEof = require_strip_eof();
  var npmRunPath = require_npm_run_path();
  var isStream = require_is_stream();
  var _getStream = require_get_stream();
  var pFinally = require_p_finally();
  var onExit = require_signal_exit();
  var errname = require_errname();
  var stdio = require_stdio();
  var TEN_MEGABYTES = 1e3 * 1e3 * 10;
  function handleArgs(cmd, args, opts) {
    let parsed;
    opts = Object.assign({
      extendEnv: true,
      env: {}
    }, opts);
    if (opts.extendEnv) {
      opts.env = Object.assign({}, process.env, opts.env);
    }
    if (opts.__winShell === true) {
      delete opts.__winShell;
      parsed = {
        command: cmd,
        args,
        options: opts,
        file: cmd,
        original: {
          cmd,
          args
        }
      };
    } else {
      parsed = crossSpawn._parse(cmd, args, opts);
    }
    opts = Object.assign({
      maxBuffer: TEN_MEGABYTES,
      buffer: true,
      stripEof: true,
      preferLocal: true,
      localDir: parsed.options.cwd || process.cwd(),
      encoding: "utf8",
      reject: true,
      cleanup: true
    }, parsed.options);
    opts.stdio = stdio(opts);
    if (opts.preferLocal) {
      opts.env = npmRunPath.env(Object.assign({}, opts, {cwd: opts.localDir}));
    }
    if (opts.detached) {
      opts.cleanup = false;
    }
    if (process.platform === "win32" && path.basename(parsed.command) === "cmd.exe") {
      parsed.args.unshift("/q");
    }
    return {
      cmd: parsed.command,
      args: parsed.args,
      opts,
      parsed
    };
  }
  function handleInput(spawned, input) {
    if (input === null || input === void 0) {
      return;
    }
    if (isStream(input)) {
      input.pipe(spawned.stdin);
    } else {
      spawned.stdin.end(input);
    }
  }
  function handleOutput(opts, val) {
    if (val && opts.stripEof) {
      val = stripEof(val);
    }
    return val;
  }
  function handleShell(fn, cmd, opts) {
    let file = "/bin/sh";
    let args = ["-c", cmd];
    opts = Object.assign({}, opts);
    if (process.platform === "win32") {
      opts.__winShell = true;
      file = process.env.comspec || "cmd.exe";
      args = ["/s", "/c", `"${cmd}"`];
      opts.windowsVerbatimArguments = true;
    }
    if (opts.shell) {
      file = opts.shell;
      delete opts.shell;
    }
    return fn(file, args, opts);
  }
  function getStream(process2, stream, {encoding, buffer, maxBuffer}) {
    if (!process2[stream]) {
      return null;
    }
    let ret;
    if (!buffer) {
      ret = new Promise((resolve, reject) => {
        process2[stream].once("end", resolve).once("error", reject);
      });
    } else if (encoding) {
      ret = _getStream(process2[stream], {
        encoding,
        maxBuffer
      });
    } else {
      ret = _getStream.buffer(process2[stream], {maxBuffer});
    }
    return ret.catch((err) => {
      err.stream = stream;
      err.message = `${stream} ${err.message}`;
      throw err;
    });
  }
  function makeError(result, options) {
    const {stdout, stderr} = result;
    let err = result.error;
    const {code, signal} = result;
    const {parsed, joinedCmd} = options;
    const timedOut = options.timedOut || false;
    if (!err) {
      let output = "";
      if (Array.isArray(parsed.opts.stdio)) {
        if (parsed.opts.stdio[2] !== "inherit") {
          output += output.length > 0 ? stderr : `
${stderr}`;
        }
        if (parsed.opts.stdio[1] !== "inherit") {
          output += `
${stdout}`;
        }
      } else if (parsed.opts.stdio !== "inherit") {
        output = `
${stderr}${stdout}`;
      }
      err = new Error(`Command failed: ${joinedCmd}${output}`);
      err.code = code < 0 ? errname(code) : code;
    }
    err.stdout = stdout;
    err.stderr = stderr;
    err.failed = true;
    err.signal = signal || null;
    err.cmd = joinedCmd;
    err.timedOut = timedOut;
    return err;
  }
  function joinCmd(cmd, args) {
    let joinedCmd = cmd;
    if (Array.isArray(args) && args.length > 0) {
      joinedCmd += " " + args.join(" ");
    }
    return joinedCmd;
  }
  module2.exports = (cmd, args, opts) => {
    const parsed = handleArgs(cmd, args, opts);
    const {encoding, buffer, maxBuffer} = parsed.opts;
    const joinedCmd = joinCmd(cmd, args);
    let spawned;
    try {
      spawned = childProcess.spawn(parsed.cmd, parsed.args, parsed.opts);
    } catch (err) {
      return Promise.reject(err);
    }
    let removeExitHandler;
    if (parsed.opts.cleanup) {
      removeExitHandler = onExit(() => {
        spawned.kill();
      });
    }
    let timeoutId = null;
    let timedOut = false;
    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (removeExitHandler) {
        removeExitHandler();
      }
    };
    if (parsed.opts.timeout > 0) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        timedOut = true;
        spawned.kill(parsed.opts.killSignal);
      }, parsed.opts.timeout);
    }
    const processDone = new Promise((resolve) => {
      spawned.on("exit", (code, signal) => {
        cleanup();
        resolve({code, signal});
      });
      spawned.on("error", (err) => {
        cleanup();
        resolve({error: err});
      });
      if (spawned.stdin) {
        spawned.stdin.on("error", (err) => {
          cleanup();
          resolve({error: err});
        });
      }
    });
    function destroy() {
      if (spawned.stdout) {
        spawned.stdout.destroy();
      }
      if (spawned.stderr) {
        spawned.stderr.destroy();
      }
    }
    const handlePromise = () => pFinally(Promise.all([
      processDone,
      getStream(spawned, "stdout", {encoding, buffer, maxBuffer}),
      getStream(spawned, "stderr", {encoding, buffer, maxBuffer})
    ]).then((arr) => {
      const result = arr[0];
      result.stdout = arr[1];
      result.stderr = arr[2];
      if (result.error || result.code !== 0 || result.signal !== null) {
        const err = makeError(result, {
          joinedCmd,
          parsed,
          timedOut
        });
        err.killed = err.killed || spawned.killed;
        if (!parsed.opts.reject) {
          return err;
        }
        throw err;
      }
      return {
        stdout: handleOutput(parsed.opts, result.stdout),
        stderr: handleOutput(parsed.opts, result.stderr),
        code: 0,
        failed: false,
        killed: false,
        signal: null,
        cmd: joinedCmd,
        timedOut: false
      };
    }), destroy);
    crossSpawn._enoent.hookChildProcess(spawned, parsed.parsed);
    handleInput(spawned, parsed.opts.input);
    spawned.then = (onfulfilled, onrejected) => handlePromise().then(onfulfilled, onrejected);
    spawned.catch = (onrejected) => handlePromise().catch(onrejected);
    return spawned;
  };
  module2.exports.stdout = (...args) => module2.exports(...args).then((x) => x.stdout);
  module2.exports.stderr = (...args) => module2.exports(...args).then((x) => x.stderr);
  module2.exports.shell = (cmd, opts) => handleShell(module2.exports, cmd, opts);
  module2.exports.sync = (cmd, args, opts) => {
    const parsed = handleArgs(cmd, args, opts);
    const joinedCmd = joinCmd(cmd, args);
    if (isStream(parsed.opts.input)) {
      throw new TypeError("The `input` option cannot be a stream in sync mode");
    }
    const result = childProcess.spawnSync(parsed.cmd, parsed.args, parsed.opts);
    result.code = result.status;
    if (result.error || result.status !== 0 || result.signal !== null) {
      const err = makeError(result, {
        joinedCmd,
        parsed
      });
      if (!parsed.opts.reject) {
        return err;
      }
      throw err;
    }
    return {
      stdout: handleOutput(parsed.opts, result.stdout),
      stderr: handleOutput(parsed.opts, result.stderr),
      code: 0,
      failed: false,
      signal: null,
      cmd: joinedCmd,
      timedOut: false
    };
  };
  module2.exports.shellSync = (cmd, opts) => handleShell(module2.exports.sync, cmd, opts);
});

// node_modules/windows-release/index.js
var require_windows_release = __commonJS((exports2, module2) => {
  "use strict";
  var os = require("os");
  var execa = require_execa();
  var names = new Map([
    ["10.0", "10"],
    ["6.3", "8.1"],
    ["6.2", "8"],
    ["6.1", "7"],
    ["6.0", "Vista"],
    ["5.2", "Server 2003"],
    ["5.1", "XP"],
    ["5.0", "2000"],
    ["4.9", "ME"],
    ["4.1", "98"],
    ["4.0", "95"]
  ]);
  var windowsRelease = (release) => {
    const version = /\d+\.\d/.exec(release || os.release());
    if (release && !version) {
      throw new Error("`release` argument doesn't match `n.n`");
    }
    const ver = (version || [])[0];
    if ((!release || release === os.release()) && ["6.1", "6.2", "6.3", "10.0"].includes(ver)) {
      let stdout;
      try {
        stdout = execa.sync("wmic", ["os", "get", "Caption"]).stdout || "";
      } catch (_) {
        stdout = execa.sync("powershell", ["(Get-CimInstance -ClassName Win32_OperatingSystem).caption"]).stdout || "";
      }
      const year = (stdout.match(/2008|2012|2016|2019/) || [])[0];
      if (year) {
        return `Server ${year}`;
      }
    }
    return names.get(ver);
  };
  module2.exports = windowsRelease;
});

// node_modules/os-name/index.js
var require_os_name = __commonJS((exports2, module2) => {
  "use strict";
  var os = require("os");
  var macosRelease = require_macos_release();
  var winRelease = require_windows_release();
  var osName = (platform, release) => {
    if (!platform && release) {
      throw new Error("You can't specify a `release` without specifying `platform`");
    }
    platform = platform || os.platform();
    let id;
    if (platform === "darwin") {
      if (!release && os.platform() === "darwin") {
        release = os.release();
      }
      const prefix = release ? Number(release.split(".")[0]) > 15 ? "macOS" : "OS X" : "macOS";
      id = release ? macosRelease(release).name : "";
      return prefix + (id ? " " + id : "");
    }
    if (platform === "linux") {
      if (!release && os.platform() === "linux") {
        release = os.release();
      }
      id = release ? release.replace(/^(\d+\.\d+).*/, "$1") : "";
      return "Linux" + (id ? " " + id : "");
    }
    if (platform === "win32") {
      if (!release && os.platform() === "win32") {
        release = os.release();
      }
      id = release ? winRelease(release) : "";
      return "Windows" + (id ? " " + id : "");
    }
    return platform;
  };
  module2.exports = osName;
});

// node_modules/@octokit/rest/node_modules/universal-user-agent/dist-node/index.js
var require_dist_node9 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var osName = _interopDefault(require_os_name());
  function getUserAgent() {
    try {
      return `Node.js/${process.version.substr(1)} (${osName()}; ${process.arch})`;
    } catch (error2) {
      if (/wmic os get Caption/.test(error2.message)) {
        return "Windows <version undetectable>";
      }
      throw error2;
    }
  }
  exports2.getUserAgent = getUserAgent;
});

// node_modules/@octokit/rest/package.json
var require_package = __commonJS((exports2, module2) => {
  module2.exports = {
    name: "@octokit/rest",
    version: "16.43.2",
    publishConfig: {
      access: "public"
    },
    description: "GitHub REST API client for Node.js",
    keywords: [
      "octokit",
      "github",
      "rest",
      "api-client"
    ],
    author: "Gregor Martynus (https://github.com/gr2m)",
    contributors: [
      {
        name: "Mike de Boer",
        email: "info@mikedeboer.nl"
      },
      {
        name: "Fabian Jakobs",
        email: "fabian@c9.io"
      },
      {
        name: "Joe Gallo",
        email: "joe@brassafrax.com"
      },
      {
        name: "Gregor Martynus",
        url: "https://github.com/gr2m"
      }
    ],
    repository: "https://github.com/octokit/rest.js",
    dependencies: {
      "@octokit/auth-token": "^2.4.0",
      "@octokit/plugin-paginate-rest": "^1.1.1",
      "@octokit/plugin-request-log": "^1.0.0",
      "@octokit/plugin-rest-endpoint-methods": "2.4.0",
      "@octokit/request": "^5.2.0",
      "@octokit/request-error": "^1.0.2",
      "atob-lite": "^2.0.0",
      "before-after-hook": "^2.0.0",
      "btoa-lite": "^1.0.0",
      deprecation: "^2.0.0",
      "lodash.get": "^4.4.2",
      "lodash.set": "^4.3.2",
      "lodash.uniq": "^4.5.0",
      "octokit-pagination-methods": "^1.1.0",
      once: "^1.4.0",
      "universal-user-agent": "^4.0.0"
    },
    devDependencies: {
      "@gimenete/type-writer": "^0.1.3",
      "@octokit/auth": "^1.1.1",
      "@octokit/fixtures-server": "^5.0.6",
      "@octokit/graphql": "^4.2.0",
      "@types/node": "^13.1.0",
      bundlesize: "^0.18.0",
      chai: "^4.1.2",
      "compression-webpack-plugin": "^3.1.0",
      cypress: "^4.0.0",
      glob: "^7.1.2",
      "http-proxy-agent": "^4.0.0",
      "lodash.camelcase": "^4.3.0",
      "lodash.merge": "^4.6.1",
      "lodash.upperfirst": "^4.3.1",
      lolex: "^6.0.0",
      mkdirp: "^1.0.0",
      mocha: "^7.0.1",
      mustache: "^4.0.0",
      nock: "^11.3.3",
      "npm-run-all": "^4.1.2",
      nyc: "^15.0.0",
      prettier: "^1.14.2",
      proxy: "^1.0.0",
      "semantic-release": "^17.0.0",
      sinon: "^8.0.0",
      "sinon-chai": "^3.0.0",
      "sort-keys": "^4.0.0",
      "string-to-arraybuffer": "^1.0.0",
      "string-to-jsdoc-comment": "^1.0.0",
      typescript: "^3.3.1",
      webpack: "^4.0.0",
      "webpack-bundle-analyzer": "^3.0.0",
      "webpack-cli": "^3.0.0"
    },
    types: "index.d.ts",
    scripts: {
      coverage: "nyc report --reporter=html && open coverage/index.html",
      lint: "prettier --check '{lib,plugins,scripts,test}/**/*.{js,json,ts}' 'docs/*.{js,json}' 'docs/src/**/*' index.js README.md package.json",
      "lint:fix": "prettier --write '{lib,plugins,scripts,test}/**/*.{js,json,ts}' 'docs/*.{js,json}' 'docs/src/**/*' index.js README.md package.json",
      pretest: "npm run -s lint",
      test: 'nyc mocha test/mocha-node-setup.js "test/*/**/*-test.js"',
      "test:browser": "cypress run --browser chrome",
      build: "npm-run-all build:*",
      "build:ts": "npm run -s update-endpoints:typescript",
      "prebuild:browser": "mkdirp dist/",
      "build:browser": "npm-run-all build:browser:*",
      "build:browser:development": "webpack --mode development --entry . --output-library=Octokit --output=./dist/octokit-rest.js --profile --json > dist/bundle-stats.json",
      "build:browser:production": "webpack --mode production --entry . --plugin=compression-webpack-plugin --output-library=Octokit --output-path=./dist --output-filename=octokit-rest.min.js --devtool source-map",
      "generate-bundle-report": "webpack-bundle-analyzer dist/bundle-stats.json --mode=static --no-open --report dist/bundle-report.html",
      "update-endpoints": "npm-run-all update-endpoints:*",
      "update-endpoints:fetch-json": "node scripts/update-endpoints/fetch-json",
      "update-endpoints:typescript": "node scripts/update-endpoints/typescript",
      "prevalidate:ts": "npm run -s build:ts",
      "validate:ts": "tsc --target es6 --noImplicitAny index.d.ts",
      "postvalidate:ts": "tsc --noEmit --target es6 test/typescript-validate.ts",
      "start-fixtures-server": "octokit-fixtures-server"
    },
    license: "MIT",
    files: [
      "index.js",
      "index.d.ts",
      "lib",
      "plugins"
    ],
    nyc: {
      ignore: [
        "test"
      ]
    },
    release: {
      publish: [
        "@semantic-release/npm",
        {
          path: "@semantic-release/github",
          assets: [
            "dist/*",
            "!dist/*.map.gz"
          ]
        }
      ]
    },
    bundlesize: [
      {
        path: "./dist/octokit-rest.min.js.gz",
        maxSize: "33 kB"
      }
    ]
  };
});

// node_modules/@octokit/rest/lib/parse-client-options.js
var require_parse_client_options = __commonJS((exports2, module2) => {
  module2.exports = parseOptions;
  var {Deprecation} = require_dist_node3();
  var {getUserAgent} = require_dist_node9();
  var once = require_once();
  var pkg = require_package();
  var deprecateOptionsTimeout = once((log, deprecation) => log.warn(deprecation));
  var deprecateOptionsAgent = once((log, deprecation) => log.warn(deprecation));
  var deprecateOptionsHeaders = once((log, deprecation) => log.warn(deprecation));
  function parseOptions(options, log, hook) {
    if (options.headers) {
      options.headers = Object.keys(options.headers).reduce((newObj, key) => {
        newObj[key.toLowerCase()] = options.headers[key];
        return newObj;
      }, {});
    }
    const clientDefaults = {
      headers: options.headers || {},
      request: options.request || {},
      mediaType: {
        previews: [],
        format: ""
      }
    };
    if (options.baseUrl) {
      clientDefaults.baseUrl = options.baseUrl;
    }
    if (options.userAgent) {
      clientDefaults.headers["user-agent"] = options.userAgent;
    }
    if (options.previews) {
      clientDefaults.mediaType.previews = options.previews;
    }
    if (options.timeZone) {
      clientDefaults.headers["time-zone"] = options.timeZone;
    }
    if (options.timeout) {
      deprecateOptionsTimeout(log, new Deprecation("[@octokit/rest] new Octokit({timeout}) is deprecated. Use {request: {timeout}} instead. See https://github.com/octokit/request.js#request"));
      clientDefaults.request.timeout = options.timeout;
    }
    if (options.agent) {
      deprecateOptionsAgent(log, new Deprecation("[@octokit/rest] new Octokit({agent}) is deprecated. Use {request: {agent}} instead. See https://github.com/octokit/request.js#request"));
      clientDefaults.request.agent = options.agent;
    }
    if (options.headers) {
      deprecateOptionsHeaders(log, new Deprecation("[@octokit/rest] new Octokit({headers}) is deprecated. Use {userAgent, previews} instead. See https://github.com/octokit/request.js#request"));
    }
    const userAgentOption = clientDefaults.headers["user-agent"];
    const defaultUserAgent = `octokit.js/${pkg.version} ${getUserAgent()}`;
    clientDefaults.headers["user-agent"] = [userAgentOption, defaultUserAgent].filter(Boolean).join(" ");
    clientDefaults.request.hook = hook.bind(null, "request");
    return clientDefaults;
  }
});

// node_modules/@octokit/rest/lib/constructor.js
var require_constructor = __commonJS((exports2, module2) => {
  module2.exports = Octokit;
  var {request} = require_dist_node5();
  var Hook = require_before_after_hook();
  var parseClientOptions = require_parse_client_options();
  function Octokit(plugins, options) {
    options = options || {};
    const hook = new Hook.Collection();
    const log = Object.assign({
      debug: () => {
      },
      info: () => {
      },
      warn: console.warn,
      error: console.error
    }, options && options.log);
    const api = {
      hook,
      log,
      request: request.defaults(parseClientOptions(options, log, hook))
    };
    plugins.forEach((pluginFunction) => pluginFunction(api, options));
    return api;
  }
});

// node_modules/@octokit/rest/lib/register-plugin.js
var require_register_plugin = __commonJS((exports2, module2) => {
  module2.exports = registerPlugin;
  var factory = require_factory();
  function registerPlugin(plugins, pluginFunction) {
    return factory(plugins.includes(pluginFunction) ? plugins : plugins.concat(pluginFunction));
  }
});

// node_modules/@octokit/rest/lib/factory.js
var require_factory = __commonJS((exports2, module2) => {
  module2.exports = factory;
  var Octokit = require_constructor();
  var registerPlugin = require_register_plugin();
  function factory(plugins) {
    const Api = Octokit.bind(null, plugins || []);
    Api.plugin = registerPlugin.bind(null, plugins || []);
    return Api;
  }
});

// node_modules/@octokit/rest/lib/core.js
var require_core2 = __commonJS((exports2, module2) => {
  var factory = require_factory();
  module2.exports = factory();
});

// node_modules/@octokit/auth-token/dist-node/index.js
var require_dist_node10 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function auth(token) {
    return __async(this, null, function* () {
      const tokenType = token.split(/\./).length === 3 ? "app" : /^v\d+\./.test(token) ? "installation" : "oauth";
      return {
        type: "token",
        token,
        tokenType
      };
    });
  }
  function withAuthorizationPrefix(token) {
    if (token.split(/\./).length === 3) {
      return `bearer ${token}`;
    }
    return `token ${token}`;
  }
  function hook(token, request, route, parameters) {
    return __async(this, null, function* () {
      const endpoint = request.endpoint.merge(route, parameters);
      endpoint.headers.authorization = withAuthorizationPrefix(token);
      return request(endpoint);
    });
  }
  var createTokenAuth = function createTokenAuth2(token) {
    if (!token) {
      throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
    }
    if (typeof token !== "string") {
      throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
    }
    token = token.replace(/^(token|bearer) +/i, "");
    return Object.assign(auth.bind(null, token), {
      hook: hook.bind(null, token)
    });
  };
  exports2.createTokenAuth = createTokenAuth;
});

// node_modules/btoa-lite/btoa-node.js
var require_btoa_node = __commonJS((exports2, module2) => {
  module2.exports = function btoa(str) {
    return new Buffer(str).toString("base64");
  };
});

// node_modules/atob-lite/atob-node.js
var require_atob_node = __commonJS((exports2, module2) => {
  module2.exports = function atob(str) {
    return Buffer.from(str, "base64").toString("binary");
  };
});

// node_modules/@octokit/rest/plugins/authentication/with-authorization-prefix.js
var require_with_authorization_prefix = __commonJS((exports2, module2) => {
  module2.exports = withAuthorizationPrefix;
  var atob = require_atob_node();
  var REGEX_IS_BASIC_AUTH = /^[\w-]+:/;
  function withAuthorizationPrefix(authorization) {
    if (/^(basic|bearer|token) /i.test(authorization)) {
      return authorization;
    }
    try {
      if (REGEX_IS_BASIC_AUTH.test(atob(authorization))) {
        return `basic ${authorization}`;
      }
    } catch (error2) {
    }
    if (authorization.split(/\./).length === 3) {
      return `bearer ${authorization}`;
    }
    return `token ${authorization}`;
  }
});

// node_modules/@octokit/rest/plugins/authentication/before-request.js
var require_before_request = __commonJS((exports2, module2) => {
  module2.exports = authenticationBeforeRequest;
  var btoa = require_btoa_node();
  var withAuthorizationPrefix = require_with_authorization_prefix();
  function authenticationBeforeRequest(state, options) {
    if (typeof state.auth === "string") {
      options.headers.authorization = withAuthorizationPrefix(state.auth);
      return;
    }
    if (state.auth.username) {
      const hash = btoa(`${state.auth.username}:${state.auth.password}`);
      options.headers.authorization = `Basic ${hash}`;
      if (state.otp) {
        options.headers["x-github-otp"] = state.otp;
      }
      return;
    }
    if (state.auth.clientId) {
      if (/\/applications\/:?[\w_]+\/tokens\/:?[\w_]+($|\?)/.test(options.url)) {
        const hash = btoa(`${state.auth.clientId}:${state.auth.clientSecret}`);
        options.headers.authorization = `Basic ${hash}`;
        return;
      }
      options.url += options.url.indexOf("?") === -1 ? "?" : "&";
      options.url += `client_id=${state.auth.clientId}&client_secret=${state.auth.clientSecret}`;
      return;
    }
    return Promise.resolve().then(() => {
      return state.auth();
    }).then((authorization) => {
      options.headers.authorization = withAuthorizationPrefix(authorization);
    });
  }
});

// node_modules/@octokit/rest/node_modules/@octokit/request-error/dist-node/index.js
var require_dist_node11 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var deprecation = require_dist_node3();
  var once = _interopDefault(require_once());
  var logOnce = once((deprecation2) => console.warn(deprecation2));
  var RequestError = class extends Error {
    constructor(message, statusCode, options) {
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "HttpError";
      this.status = statusCode;
      Object.defineProperty(this, "code", {
        get() {
          logOnce(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
          return statusCode;
        }
      });
      this.headers = options.headers || {};
      const requestCopy = Object.assign({}, options.request);
      if (options.request.headers.authorization) {
        requestCopy.headers = Object.assign({}, options.request.headers, {
          authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
        });
      }
      requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
      this.request = requestCopy;
    }
  };
  exports2.RequestError = RequestError;
});

// node_modules/@octokit/rest/plugins/authentication/request-error.js
var require_request_error = __commonJS((exports2, module2) => {
  module2.exports = authenticationRequestError;
  var {RequestError} = require_dist_node11();
  function authenticationRequestError(state, error2, options) {
    if (!error2.headers)
      throw error2;
    const otpRequired = /required/.test(error2.headers["x-github-otp"] || "");
    if (error2.status !== 401 || !otpRequired) {
      throw error2;
    }
    if (error2.status === 401 && otpRequired && error2.request && error2.request.headers["x-github-otp"]) {
      if (state.otp) {
        delete state.otp;
      } else {
        throw new RequestError("Invalid one-time password for two-factor authentication", 401, {
          headers: error2.headers,
          request: options
        });
      }
    }
    if (typeof state.auth.on2fa !== "function") {
      throw new RequestError("2FA required, but options.on2fa is not a function. See https://github.com/octokit/rest.js#authentication", 401, {
        headers: error2.headers,
        request: options
      });
    }
    return Promise.resolve().then(() => {
      return state.auth.on2fa();
    }).then((oneTimePassword) => {
      const newOptions = Object.assign(options, {
        headers: Object.assign(options.headers, {
          "x-github-otp": oneTimePassword
        })
      });
      return state.octokit.request(newOptions).then((response) => {
        state.otp = oneTimePassword;
        return response;
      });
    });
  }
});

// node_modules/@octokit/rest/plugins/authentication/validate.js
var require_validate = __commonJS((exports2, module2) => {
  module2.exports = validateAuth;
  function validateAuth(auth) {
    if (typeof auth === "string") {
      return;
    }
    if (typeof auth === "function") {
      return;
    }
    if (auth.username && auth.password) {
      return;
    }
    if (auth.clientId && auth.clientSecret) {
      return;
    }
    throw new Error(`Invalid "auth" option: ${JSON.stringify(auth)}`);
  }
});

// node_modules/@octokit/rest/plugins/authentication/index.js
var require_authentication = __commonJS((exports2, module2) => {
  module2.exports = authenticationPlugin;
  var {createTokenAuth} = require_dist_node10();
  var {Deprecation} = require_dist_node3();
  var once = require_once();
  var beforeRequest = require_before_request();
  var requestError = require_request_error();
  var validate = require_validate();
  var withAuthorizationPrefix = require_with_authorization_prefix();
  var deprecateAuthBasic = once((log, deprecation) => log.warn(deprecation));
  var deprecateAuthObject = once((log, deprecation) => log.warn(deprecation));
  function authenticationPlugin(octokit, options) {
    if (options.authStrategy) {
      const auth = options.authStrategy(options.auth);
      octokit.hook.wrap("request", auth.hook);
      octokit.auth = auth;
      return;
    }
    if (!options.auth) {
      octokit.auth = () => Promise.resolve({
        type: "unauthenticated"
      });
      return;
    }
    const isBasicAuthString = typeof options.auth === "string" && /^basic/.test(withAuthorizationPrefix(options.auth));
    if (typeof options.auth === "string" && !isBasicAuthString) {
      const auth = createTokenAuth(options.auth);
      octokit.hook.wrap("request", auth.hook);
      octokit.auth = auth;
      return;
    }
    const [deprecationMethod, deprecationMessapge] = isBasicAuthString ? [
      deprecateAuthBasic,
      'Setting the "new Octokit({ auth })" option to a Basic Auth string is deprecated. Use https://github.com/octokit/auth-basic.js instead. See (https://octokit.github.io/rest.js/#authentication)'
    ] : [
      deprecateAuthObject,
      'Setting the "new Octokit({ auth })" option to an object without also setting the "authStrategy" option is deprecated and will be removed in v17. See (https://octokit.github.io/rest.js/#authentication)'
    ];
    deprecationMethod(octokit.log, new Deprecation("[@octokit/rest] " + deprecationMessapge));
    octokit.auth = () => Promise.resolve({
      type: "deprecated",
      message: deprecationMessapge
    });
    validate(options.auth);
    const state = {
      octokit,
      auth: options.auth
    };
    octokit.hook.before("request", beforeRequest.bind(null, state));
    octokit.hook.error("request", requestError.bind(null, state));
  }
});

// node_modules/@octokit/rest/plugins/authentication-deprecated/authenticate.js
var require_authenticate = __commonJS((exports2, module2) => {
  module2.exports = authenticate;
  var {Deprecation} = require_dist_node3();
  var once = require_once();
  var deprecateAuthenticate = once((log, deprecation) => log.warn(deprecation));
  function authenticate(state, options) {
    deprecateAuthenticate(state.octokit.log, new Deprecation('[@octokit/rest] octokit.authenticate() is deprecated. Use "auth" constructor option instead.'));
    if (!options) {
      state.auth = false;
      return;
    }
    switch (options.type) {
      case "basic":
        if (!options.username || !options.password) {
          throw new Error("Basic authentication requires both a username and password to be set");
        }
        break;
      case "oauth":
        if (!options.token && !(options.key && options.secret)) {
          throw new Error("OAuth2 authentication requires a token or key & secret to be set");
        }
        break;
      case "token":
      case "app":
        if (!options.token) {
          throw new Error("Token authentication requires a token to be set");
        }
        break;
      default:
        throw new Error("Invalid authentication type, must be 'basic', 'oauth', 'token' or 'app'");
    }
    state.auth = options;
  }
});

// node_modules/lodash.uniq/index.js
var require_lodash = __commonJS((exports2, module2) => {
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var INFINITY = 1 / 0;
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  function arrayIncludes(array, value) {
    var length = array ? array.length : 0;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }
  function arrayIncludesWith(array, value, comparator) {
    var index = -1, length = array ? array.length : 0;
    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return baseFindIndex(array, baseIsNaN, fromIndex);
    }
    var index = fromIndex - 1, length = array.length;
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
  function baseIsNaN(value) {
    return value !== value;
  }
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result = !!(value + "");
      } catch (e) {
      }
    }
    return result;
  }
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var arrayProto = Array.prototype;
  var funcProto = Function.prototype;
  var objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  var splice = arrayProto.splice;
  var Map2 = getNative(root, "Map");
  var Set = getNative(root, "Set");
  var nativeCreate = getNative(Object, "create");
  function Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
  }
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.__data__ = {
      hash: new Hash(),
      map: new (Map2 || ListCache)(),
      string: new Hash()
    };
  }
  function mapCacheDelete(key) {
    return getMapData(this, key)["delete"](key);
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function SetCache(values) {
    var index = -1, length = values ? values.length : 0;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseUniq(array, iteratee, comparator) {
    var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
    if (comparator) {
      isCommon = false;
      includes = arrayIncludesWith;
    } else if (length >= LARGE_ARRAY_SIZE) {
      var set = iteratee ? null : createSet(array);
      if (set) {
        return setToArray(set);
      }
      isCommon = false;
      includes = cacheHas;
      seen = new SetCache();
    } else {
      seen = iteratee ? [] : result;
    }
    outer:
      while (++index < length) {
        var value = array[index], computed = iteratee ? iteratee(value) : value;
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        } else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
    return result;
  }
  var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values) {
    return new Set(values);
  };
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function uniq(array) {
    return array && array.length ? baseUniq(array) : [];
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function noop() {
  }
  module2.exports = uniq;
});

// node_modules/@octokit/rest/plugins/authentication-deprecated/before-request.js
var require_before_request2 = __commonJS((exports2, module2) => {
  module2.exports = authenticationBeforeRequest;
  var btoa = require_btoa_node();
  var uniq = require_lodash();
  function authenticationBeforeRequest(state, options) {
    if (!state.auth.type) {
      return;
    }
    if (state.auth.type === "basic") {
      const hash = btoa(`${state.auth.username}:${state.auth.password}`);
      options.headers.authorization = `Basic ${hash}`;
      return;
    }
    if (state.auth.type === "token") {
      options.headers.authorization = `token ${state.auth.token}`;
      return;
    }
    if (state.auth.type === "app") {
      options.headers.authorization = `Bearer ${state.auth.token}`;
      const acceptHeaders = options.headers.accept.split(",").concat("application/vnd.github.machine-man-preview+json");
      options.headers.accept = uniq(acceptHeaders).filter(Boolean).join(",");
      return;
    }
    options.url += options.url.indexOf("?") === -1 ? "?" : "&";
    if (state.auth.token) {
      options.url += `access_token=${encodeURIComponent(state.auth.token)}`;
      return;
    }
    const key = encodeURIComponent(state.auth.key);
    const secret = encodeURIComponent(state.auth.secret);
    options.url += `client_id=${key}&client_secret=${secret}`;
  }
});

// node_modules/@octokit/rest/plugins/authentication-deprecated/request-error.js
var require_request_error2 = __commonJS((exports2, module2) => {
  module2.exports = authenticationRequestError;
  var {RequestError} = require_dist_node11();
  function authenticationRequestError(state, error2, options) {
    if (!error2.headers)
      throw error2;
    const otpRequired = /required/.test(error2.headers["x-github-otp"] || "");
    if (error2.status !== 401 || !otpRequired) {
      throw error2;
    }
    if (error2.status === 401 && otpRequired && error2.request && error2.request.headers["x-github-otp"]) {
      throw new RequestError("Invalid one-time password for two-factor authentication", 401, {
        headers: error2.headers,
        request: options
      });
    }
    if (typeof state.auth.on2fa !== "function") {
      throw new RequestError("2FA required, but options.on2fa is not a function. See https://github.com/octokit/rest.js#authentication", 401, {
        headers: error2.headers,
        request: options
      });
    }
    return Promise.resolve().then(() => {
      return state.auth.on2fa();
    }).then((oneTimePassword) => {
      const newOptions = Object.assign(options, {
        headers: Object.assign({"x-github-otp": oneTimePassword}, options.headers)
      });
      return state.octokit.request(newOptions);
    });
  }
});

// node_modules/@octokit/rest/plugins/authentication-deprecated/index.js
var require_authentication_deprecated = __commonJS((exports2, module2) => {
  module2.exports = authenticationPlugin;
  var {Deprecation} = require_dist_node3();
  var once = require_once();
  var deprecateAuthenticate = once((log, deprecation) => log.warn(deprecation));
  var authenticate = require_authenticate();
  var beforeRequest = require_before_request2();
  var requestError = require_request_error2();
  function authenticationPlugin(octokit, options) {
    if (options.auth) {
      octokit.authenticate = () => {
        deprecateAuthenticate(octokit.log, new Deprecation('[@octokit/rest] octokit.authenticate() is deprecated and has no effect when "auth" option is set on Octokit constructor'));
      };
      return;
    }
    const state = {
      octokit,
      auth: false
    };
    octokit.authenticate = authenticate.bind(null, state);
    octokit.hook.before("request", beforeRequest.bind(null, state));
    octokit.hook.error("request", requestError.bind(null, state));
  }
});

// node_modules/@octokit/plugin-paginate-rest/dist-node/index.js
var require_dist_node12 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var VERSION = "1.1.2";
  var REGEX = [/^\/search\//, /^\/repos\/[^/]+\/[^/]+\/commits\/[^/]+\/(check-runs|check-suites)([^/]|$)/, /^\/installation\/repositories([^/]|$)/, /^\/user\/installations([^/]|$)/, /^\/repos\/[^/]+\/[^/]+\/actions\/secrets([^/]|$)/, /^\/repos\/[^/]+\/[^/]+\/actions\/workflows(\/[^/]+\/runs)?([^/]|$)/, /^\/repos\/[^/]+\/[^/]+\/actions\/runs(\/[^/]+\/(artifacts|jobs))?([^/]|$)/];
  function normalizePaginatedListResponse(octokit, url, response) {
    const path = url.replace(octokit.request.endpoint.DEFAULTS.baseUrl, "");
    const responseNeedsNormalization = REGEX.find((regex) => regex.test(path));
    if (!responseNeedsNormalization)
      return;
    const incompleteResults = response.data.incomplete_results;
    const repositorySelection = response.data.repository_selection;
    const totalCount = response.data.total_count;
    delete response.data.incomplete_results;
    delete response.data.repository_selection;
    delete response.data.total_count;
    const namespaceKey = Object.keys(response.data)[0];
    const data = response.data[namespaceKey];
    response.data = data;
    if (typeof incompleteResults !== "undefined") {
      response.data.incomplete_results = incompleteResults;
    }
    if (typeof repositorySelection !== "undefined") {
      response.data.repository_selection = repositorySelection;
    }
    response.data.total_count = totalCount;
    Object.defineProperty(response.data, namespaceKey, {
      get() {
        octokit.log.warn(`[@octokit/paginate-rest] "response.data.${namespaceKey}" is deprecated for "GET ${path}". Get the results directly from "response.data"`);
        return Array.from(data);
      }
    });
  }
  function iterator(octokit, route, parameters) {
    const options = octokit.request.endpoint(route, parameters);
    const method = options.method;
    const headers = options.headers;
    let url = options.url;
    return {
      [Symbol.asyncIterator]: () => ({
        next() {
          if (!url) {
            return Promise.resolve({
              done: true
            });
          }
          return octokit.request({
            method,
            url,
            headers
          }).then((response) => {
            normalizePaginatedListResponse(octokit, url, response);
            url = ((response.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
            return {
              value: response
            };
          });
        }
      })
    };
  }
  function paginate(octokit, route, parameters, mapFn) {
    if (typeof parameters === "function") {
      mapFn = parameters;
      parameters = void 0;
    }
    return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
  }
  function gather(octokit, results, iterator2, mapFn) {
    return iterator2.next().then((result) => {
      if (result.done) {
        return results;
      }
      let earlyExit = false;
      function done() {
        earlyExit = true;
      }
      results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);
      if (earlyExit) {
        return results;
      }
      return gather(octokit, results, iterator2, mapFn);
    });
  }
  function paginateRest(octokit) {
    return {
      paginate: Object.assign(paginate.bind(null, octokit), {
        iterator: iterator.bind(null, octokit)
      })
    };
  }
  paginateRest.VERSION = VERSION;
  exports2.paginateRest = paginateRest;
});

// node_modules/@octokit/rest/plugins/pagination/index.js
var require_pagination = __commonJS((exports2, module2) => {
  module2.exports = paginatePlugin;
  var {paginateRest} = require_dist_node12();
  function paginatePlugin(octokit) {
    Object.assign(octokit, paginateRest(octokit));
  }
});

// node_modules/lodash.get/index.js
var require_lodash2 = __commonJS((exports2, module2) => {
  var FUNC_ERROR_TEXT = "Expected a function";
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var INFINITY = 1 / 0;
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var symbolTag = "[object Symbol]";
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
  var reIsPlainProp = /^\w*$/;
  var reLeadingDot = /^\./;
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reEscapeChar = /\\(\\)?/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result = !!(value + "");
      } catch (e) {
      }
    }
    return result;
  }
  var arrayProto = Array.prototype;
  var funcProto = Function.prototype;
  var objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  var Symbol2 = root.Symbol;
  var splice = arrayProto.splice;
  var Map2 = getNative(root, "Map");
  var nativeCreate = getNative(Object, "create");
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
  var symbolToString = symbolProto ? symbolProto.toString : void 0;
  function Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
  }
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.__data__ = {
      hash: new Hash(),
      map: new (Map2 || ListCache)(),
      string: new Hash()
    };
  }
  function mapCacheDelete(key) {
    return getMapData(this, key)["delete"](key);
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseGet(object, path) {
    path = isKey(path, object) ? [path] : castPath(path);
    var index = 0, length = path.length;
    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return index && index == length ? object : void 0;
  }
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function castPath(value) {
    return isArray(value) ? value : stringToPath(value);
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var stringToPath = memoize(function(string) {
    string = toString(string);
    var result = [];
    if (reLeadingDot.test(string)) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, string2) {
      result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result);
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var isArray = Array.isArray;
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function get(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet(object, path);
    return result === void 0 ? defaultValue : result;
  }
  module2.exports = get;
});

// node_modules/lodash.set/index.js
var require_lodash3 = __commonJS((exports2, module2) => {
  var FUNC_ERROR_TEXT = "Expected a function";
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var INFINITY = 1 / 0;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var symbolTag = "[object Symbol]";
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
  var reIsPlainProp = /^\w*$/;
  var reLeadingDot = /^\./;
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reEscapeChar = /\\(\\)?/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result = !!(value + "");
      } catch (e) {
      }
    }
    return result;
  }
  var arrayProto = Array.prototype;
  var funcProto = Function.prototype;
  var objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  var Symbol2 = root.Symbol;
  var splice = arrayProto.splice;
  var Map2 = getNative(root, "Map");
  var nativeCreate = getNative(Object, "create");
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
  var symbolToString = symbolProto ? symbolProto.toString : void 0;
  function Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
  }
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.__data__ = {
      hash: new Hash(),
      map: new (Map2 || ListCache)(),
      string: new Hash()
    };
  }
  function mapCacheDelete(key) {
    return getMapData(this, key)["delete"](key);
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      object[key] = value;
    }
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object;
    }
    path = isKey(path, object) ? [path] : castPath(path);
    var index = -1, length = path.length, lastIndex = length - 1, nested = object;
    while (nested != null && ++index < length) {
      var key = toKey(path[index]), newValue = value;
      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : void 0;
        if (newValue === void 0) {
          newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function castPath(value) {
    return isArray(value) ? value : stringToPath(value);
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var stringToPath = memoize(function(string) {
    string = toString(string);
    var result = [];
    if (reLeadingDot.test(string)) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, string2) {
      result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result);
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var isArray = Array.isArray;
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
  }
  module2.exports = set;
});

// node_modules/@octokit/rest/plugins/validate/validate.js
var require_validate2 = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = validate;
  var {RequestError} = require_dist_node11();
  var get = require_lodash2();
  var set = require_lodash3();
  function validate(octokit, options) {
    if (!options.request.validate) {
      return;
    }
    const {validate: params} = options.request;
    Object.keys(params).forEach((parameterName) => {
      const parameter = get(params, parameterName);
      const expectedType = parameter.type;
      let parentParameterName;
      let parentValue;
      let parentParamIsPresent = true;
      let parentParameterIsArray = false;
      if (/\./.test(parameterName)) {
        parentParameterName = parameterName.replace(/\.[^.]+$/, "");
        parentParameterIsArray = parentParameterName.slice(-2) === "[]";
        if (parentParameterIsArray) {
          parentParameterName = parentParameterName.slice(0, -2);
        }
        parentValue = get(options, parentParameterName);
        parentParamIsPresent = parentParameterName === "headers" || typeof parentValue === "object" && parentValue !== null;
      }
      const values = parentParameterIsArray ? (get(options, parentParameterName) || []).map((value) => value[parameterName.split(/\./).pop()]) : [get(options, parameterName)];
      values.forEach((value, i) => {
        const valueIsPresent = typeof value !== "undefined";
        const valueIsNull = value === null;
        const currentParameterName = parentParameterIsArray ? parameterName.replace(/\[\]/, `[${i}]`) : parameterName;
        if (!parameter.required && !valueIsPresent) {
          return;
        }
        if (!parentParamIsPresent) {
          return;
        }
        if (parameter.allowNull && valueIsNull) {
          return;
        }
        if (!parameter.allowNull && valueIsNull) {
          throw new RequestError(`'${currentParameterName}' cannot be null`, 400, {
            request: options
          });
        }
        if (parameter.required && !valueIsPresent) {
          throw new RequestError(`Empty value for parameter '${currentParameterName}': ${JSON.stringify(value)}`, 400, {
            request: options
          });
        }
        if (expectedType === "integer") {
          const unparsedValue = value;
          value = parseInt(value, 10);
          if (isNaN(value)) {
            throw new RequestError(`Invalid value for parameter '${currentParameterName}': ${JSON.stringify(unparsedValue)} is NaN`, 400, {
              request: options
            });
          }
        }
        if (parameter.enum && parameter.enum.indexOf(String(value)) === -1) {
          throw new RequestError(`Invalid value for parameter '${currentParameterName}': ${JSON.stringify(value)}`, 400, {
            request: options
          });
        }
        if (parameter.validation) {
          const regex = new RegExp(parameter.validation);
          if (!regex.test(value)) {
            throw new RequestError(`Invalid value for parameter '${currentParameterName}': ${JSON.stringify(value)}`, 400, {
              request: options
            });
          }
        }
        if (expectedType === "object" && typeof value === "string") {
          try {
            value = JSON.parse(value);
          } catch (exception) {
            throw new RequestError(`JSON parse error of value for parameter '${currentParameterName}': ${JSON.stringify(value)}`, 400, {
              request: options
            });
          }
        }
        set(options, parameter.mapTo || currentParameterName, value);
      });
    });
    return options;
  }
});

// node_modules/@octokit/rest/plugins/validate/index.js
var require_validate3 = __commonJS((exports2, module2) => {
  module2.exports = octokitValidate;
  var validate = require_validate2();
  function octokitValidate(octokit) {
    octokit.hook.before("request", validate.bind(null, octokit));
  }
});

// node_modules/octokit-pagination-methods/lib/deprecate.js
var require_deprecate = __commonJS((exports2, module2) => {
  module2.exports = deprecate;
  var loggedMessages = {};
  function deprecate(message) {
    if (loggedMessages[message]) {
      return;
    }
    console.warn(`DEPRECATED (@octokit/rest): ${message}`);
    loggedMessages[message] = 1;
  }
});

// node_modules/octokit-pagination-methods/lib/get-page-links.js
var require_get_page_links = __commonJS((exports2, module2) => {
  module2.exports = getPageLinks;
  function getPageLinks(link) {
    link = link.link || link.headers.link || "";
    const links = {};
    link.replace(/<([^>]*)>;\s*rel="([\w]*)"/g, (m, uri, type) => {
      links[type] = uri;
    });
    return links;
  }
});

// node_modules/octokit-pagination-methods/lib/http-error.js
var require_http_error = __commonJS((exports2, module2) => {
  module2.exports = class HttpError extends Error {
    constructor(message, code, headers) {
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "HttpError";
      this.code = code;
      this.headers = headers;
    }
  };
});

// node_modules/octokit-pagination-methods/lib/get-page.js
var require_get_page = __commonJS((exports2, module2) => {
  module2.exports = getPage;
  var deprecate = require_deprecate();
  var getPageLinks = require_get_page_links();
  var HttpError = require_http_error();
  function getPage(octokit, link, which, headers) {
    deprecate(`octokit.get${which.charAt(0).toUpperCase() + which.slice(1)}Page() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
    const url = getPageLinks(link)[which];
    if (!url) {
      const urlError = new HttpError(`No ${which} page found`, 404);
      return Promise.reject(urlError);
    }
    const requestOptions = {
      url,
      headers: applyAcceptHeader(link, headers)
    };
    const promise = octokit.request(requestOptions);
    return promise;
  }
  function applyAcceptHeader(res, headers) {
    const previous = res.headers && res.headers["x-github-media-type"];
    if (!previous || headers && headers.accept) {
      return headers;
    }
    headers = headers || {};
    headers.accept = "application/vnd." + previous.replace("; param=", ".").replace("; format=", "+");
    return headers;
  }
});

// node_modules/octokit-pagination-methods/lib/get-first-page.js
var require_get_first_page = __commonJS((exports2, module2) => {
  module2.exports = getFirstPage;
  var getPage = require_get_page();
  function getFirstPage(octokit, link, headers) {
    return getPage(octokit, link, "first", headers);
  }
});

// node_modules/octokit-pagination-methods/lib/get-last-page.js
var require_get_last_page = __commonJS((exports2, module2) => {
  module2.exports = getLastPage;
  var getPage = require_get_page();
  function getLastPage(octokit, link, headers) {
    return getPage(octokit, link, "last", headers);
  }
});

// node_modules/octokit-pagination-methods/lib/get-next-page.js
var require_get_next_page = __commonJS((exports2, module2) => {
  module2.exports = getNextPage;
  var getPage = require_get_page();
  function getNextPage(octokit, link, headers) {
    return getPage(octokit, link, "next", headers);
  }
});

// node_modules/octokit-pagination-methods/lib/get-previous-page.js
var require_get_previous_page = __commonJS((exports2, module2) => {
  module2.exports = getPreviousPage;
  var getPage = require_get_page();
  function getPreviousPage(octokit, link, headers) {
    return getPage(octokit, link, "prev", headers);
  }
});

// node_modules/octokit-pagination-methods/lib/has-first-page.js
var require_has_first_page = __commonJS((exports2, module2) => {
  module2.exports = hasFirstPage;
  var deprecate = require_deprecate();
  var getPageLinks = require_get_page_links();
  function hasFirstPage(link) {
    deprecate(`octokit.hasFirstPage() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
    return getPageLinks(link).first;
  }
});

// node_modules/octokit-pagination-methods/lib/has-last-page.js
var require_has_last_page = __commonJS((exports2, module2) => {
  module2.exports = hasLastPage;
  var deprecate = require_deprecate();
  var getPageLinks = require_get_page_links();
  function hasLastPage(link) {
    deprecate(`octokit.hasLastPage() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
    return getPageLinks(link).last;
  }
});

// node_modules/octokit-pagination-methods/lib/has-next-page.js
var require_has_next_page = __commonJS((exports2, module2) => {
  module2.exports = hasNextPage;
  var deprecate = require_deprecate();
  var getPageLinks = require_get_page_links();
  function hasNextPage(link) {
    deprecate(`octokit.hasNextPage() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
    return getPageLinks(link).next;
  }
});

// node_modules/octokit-pagination-methods/lib/has-previous-page.js
var require_has_previous_page = __commonJS((exports2, module2) => {
  module2.exports = hasPreviousPage;
  var deprecate = require_deprecate();
  var getPageLinks = require_get_page_links();
  function hasPreviousPage(link) {
    deprecate(`octokit.hasPreviousPage() \u2013 You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`);
    return getPageLinks(link).prev;
  }
});

// node_modules/octokit-pagination-methods/index.js
var require_octokit_pagination_methods = __commonJS((exports2, module2) => {
  module2.exports = paginationMethodsPlugin;
  function paginationMethodsPlugin(octokit) {
    octokit.getFirstPage = require_get_first_page().bind(null, octokit);
    octokit.getLastPage = require_get_last_page().bind(null, octokit);
    octokit.getNextPage = require_get_next_page().bind(null, octokit);
    octokit.getPreviousPage = require_get_previous_page().bind(null, octokit);
    octokit.hasFirstPage = require_has_first_page();
    octokit.hasLastPage = require_has_last_page();
    octokit.hasNextPage = require_has_next_page();
    octokit.hasPreviousPage = require_has_previous_page();
  }
});

// node_modules/@octokit/rest/index.js
var require_rest = __commonJS((exports2, module2) => {
  var {requestLog} = require_dist_node7();
  var {
    restEndpointMethods
  } = require_dist_node8();
  var Core = require_core2();
  var CORE_PLUGINS = [
    require_authentication(),
    require_authentication_deprecated(),
    requestLog,
    require_pagination(),
    restEndpointMethods,
    require_validate3(),
    require_octokit_pagination_methods()
  ];
  var OctokitRest = Core.plugin(CORE_PLUGINS);
  function DeprecatedOctokit(options) {
    const warn = options && options.log && options.log.warn ? options.log.warn : console.warn;
    warn('[@octokit/rest] `const Octokit = require("@octokit/rest")` is deprecated. Use `const { Octokit } = require("@octokit/rest")` instead');
    return new OctokitRest(options);
  }
  var Octokit = Object.assign(DeprecatedOctokit, {
    Octokit: OctokitRest
  });
  Object.keys(OctokitRest).forEach((key) => {
    if (OctokitRest.hasOwnProperty(key)) {
      Octokit[key] = OctokitRest[key];
    }
  });
  module2.exports = Octokit;
});

// node_modules/@actions/github/lib/context.js
var require_context = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs_1 = require("fs");
  var os_1 = require("os");
  var Context = class {
    constructor() {
      this.payload = {};
      if (process.env.GITHUB_EVENT_PATH) {
        if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
          this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, {encoding: "utf8"}));
        } else {
          const path = process.env.GITHUB_EVENT_PATH;
          process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
        }
      }
      this.eventName = process.env.GITHUB_EVENT_NAME;
      this.sha = process.env.GITHUB_SHA;
      this.ref = process.env.GITHUB_REF;
      this.workflow = process.env.GITHUB_WORKFLOW;
      this.action = process.env.GITHUB_ACTION;
      this.actor = process.env.GITHUB_ACTOR;
    }
    get issue() {
      const payload = this.payload;
      return Object.assign(Object.assign({}, this.repo), {number: (payload.issue || payload.pull_request || payload).number});
    }
    get repo() {
      if (process.env.GITHUB_REPOSITORY) {
        const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
        return {owner, repo};
      }
      if (this.payload.repository) {
        return {
          owner: this.payload.repository.owner.login,
          repo: this.payload.repository.name
        };
      }
      throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
    }
  };
  exports2.Context = Context;
});

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var url = require("url");
  function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === "https:";
    let proxyUrl;
    if (checkBypass(reqUrl)) {
      return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
      proxyVar = process.env["https_proxy"] || process.env["HTTPS_PROXY"];
    } else {
      proxyVar = process.env["http_proxy"] || process.env["HTTP_PROXY"];
    }
    if (proxyVar) {
      proxyUrl = url.parse(proxyVar);
    }
    return proxyUrl;
  }
  exports2.getProxyUrl = getProxyUrl;
  function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
      return false;
    }
    let noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
    if (!noProxy) {
      return false;
    }
    let reqPort;
    if (reqUrl.port) {
      reqPort = Number(reqUrl.port);
    } else if (reqUrl.protocol === "http:") {
      reqPort = 80;
    } else if (reqUrl.protocol === "https:") {
      reqPort = 443;
    }
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === "number") {
      upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    for (let upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
      if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
        return true;
      }
    }
    return false;
  }
  exports2.checkBypass = checkBypass;
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS((exports2) => {
  "use strict";
  var net = require("net");
  var tls = require("tls");
  var http = require("http");
  var https = require("https");
  var events = require("events");
  var assert = require("assert");
  var util = require("util");
  exports2.httpOverHttp = httpOverHttp;
  exports2.httpsOverHttp = httpsOverHttp;
  exports2.httpOverHttps = httpOverHttps;
  exports2.httpsOverHttps = httpsOverHttps;
  function httpOverHttp(options) {
    var agent = new TunnelingAgent(options);
    agent.request = http.request;
    return agent;
  }
  function httpsOverHttp(options) {
    var agent = new TunnelingAgent(options);
    agent.request = http.request;
    agent.createSocket = createSecureSocket;
    agent.defaultPort = 443;
    return agent;
  }
  function httpOverHttps(options) {
    var agent = new TunnelingAgent(options);
    agent.request = https.request;
    return agent;
  }
  function httpsOverHttps(options) {
    var agent = new TunnelingAgent(options);
    agent.request = https.request;
    agent.createSocket = createSecureSocket;
    agent.defaultPort = 443;
    return agent;
  }
  function TunnelingAgent(options) {
    var self2 = this;
    self2.options = options || {};
    self2.proxyOptions = self2.options.proxy || {};
    self2.maxSockets = self2.options.maxSockets || http.Agent.defaultMaxSockets;
    self2.requests = [];
    self2.sockets = [];
    self2.on("free", function onFree(socket, host, port, localAddress) {
      var options2 = toOptions(host, port, localAddress);
      for (var i = 0, len = self2.requests.length; i < len; ++i) {
        var pending = self2.requests[i];
        if (pending.host === options2.host && pending.port === options2.port) {
          self2.requests.splice(i, 1);
          pending.request.onSocket(socket);
          return;
        }
      }
      socket.destroy();
      self2.removeSocket(socket);
    });
  }
  util.inherits(TunnelingAgent, events.EventEmitter);
  TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
    var self2 = this;
    var options = mergeOptions({request: req}, self2.options, toOptions(host, port, localAddress));
    if (self2.sockets.length >= this.maxSockets) {
      self2.requests.push(options);
      return;
    }
    self2.createSocket(options, function(socket) {
      socket.on("free", onFree);
      socket.on("close", onCloseOrRemove);
      socket.on("agentRemove", onCloseOrRemove);
      req.onSocket(socket);
      function onFree() {
        self2.emit("free", socket, options);
      }
      function onCloseOrRemove(err) {
        self2.removeSocket(socket);
        socket.removeListener("free", onFree);
        socket.removeListener("close", onCloseOrRemove);
        socket.removeListener("agentRemove", onCloseOrRemove);
      }
    });
  };
  TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
    var self2 = this;
    var placeholder = {};
    self2.sockets.push(placeholder);
    var connectOptions = mergeOptions({}, self2.proxyOptions, {
      method: "CONNECT",
      path: options.host + ":" + options.port,
      agent: false,
      headers: {
        host: options.host + ":" + options.port
      }
    });
    if (options.localAddress) {
      connectOptions.localAddress = options.localAddress;
    }
    if (connectOptions.proxyAuth) {
      connectOptions.headers = connectOptions.headers || {};
      connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
    }
    debug2("making CONNECT request");
    var connectReq = self2.request(connectOptions);
    connectReq.useChunkedEncodingByDefault = false;
    connectReq.once("response", onResponse);
    connectReq.once("upgrade", onUpgrade);
    connectReq.once("connect", onConnect);
    connectReq.once("error", onError);
    connectReq.end();
    function onResponse(res) {
      res.upgrade = true;
    }
    function onUpgrade(res, socket, head) {
      process.nextTick(function() {
        onConnect(res, socket, head);
      });
    }
    function onConnect(res, socket, head) {
      connectReq.removeAllListeners();
      socket.removeAllListeners();
      if (res.statusCode !== 200) {
        debug2("tunneling socket could not be established, statusCode=%d", res.statusCode);
        socket.destroy();
        var error2 = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
        error2.code = "ECONNRESET";
        options.request.emit("error", error2);
        self2.removeSocket(placeholder);
        return;
      }
      if (head.length > 0) {
        debug2("got illegal response body from proxy");
        socket.destroy();
        var error2 = new Error("got illegal response body from proxy");
        error2.code = "ECONNRESET";
        options.request.emit("error", error2);
        self2.removeSocket(placeholder);
        return;
      }
      debug2("tunneling connection has established");
      self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
      return cb(socket);
    }
    function onError(cause) {
      connectReq.removeAllListeners();
      debug2("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
      var error2 = new Error("tunneling socket could not be established, cause=" + cause.message);
      error2.code = "ECONNRESET";
      options.request.emit("error", error2);
      self2.removeSocket(placeholder);
    }
  };
  TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
    var pos = this.sockets.indexOf(socket);
    if (pos === -1) {
      return;
    }
    this.sockets.splice(pos, 1);
    var pending = this.requests.shift();
    if (pending) {
      this.createSocket(pending, function(socket2) {
        pending.request.onSocket(socket2);
      });
    }
  };
  function createSecureSocket(options, cb) {
    var self2 = this;
    TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
      var hostHeader = options.request.getHeader("host");
      var tlsOptions = mergeOptions({}, self2.options, {
        socket,
        servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
      });
      var secureSocket = tls.connect(0, tlsOptions);
      self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
      cb(secureSocket);
    });
  }
  function toOptions(host, port, localAddress) {
    if (typeof host === "string") {
      return {
        host,
        port,
        localAddress
      };
    }
    return host;
  }
  function mergeOptions(target) {
    for (var i = 1, len = arguments.length; i < len; ++i) {
      var overrides = arguments[i];
      if (typeof overrides === "object") {
        var keys = Object.keys(overrides);
        for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
          var k = keys[j];
          if (overrides[k] !== void 0) {
            target[k] = overrides[k];
          }
        }
      }
    }
    return target;
  }
  var debug2;
  if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
    debug2 = function() {
      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === "string") {
        args[0] = "TUNNEL: " + args[0];
      } else {
        args.unshift("TUNNEL:");
      }
      console.error.apply(console, args);
    };
  } else {
    debug2 = function() {
    };
  }
  exports2.debug = debug2;
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS((exports2, module2) => {
  module2.exports = require_tunnel();
});

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var url = require("url");
  var http = require("http");
  var https = require("https");
  var pm = require_proxy();
  var tunnel;
  var HttpCodes;
  (function(HttpCodes2) {
    HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
    HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
    HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
    HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
    HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
    HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
    HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
    HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
    HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
    HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
    HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
  })(HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {}));
  var Headers;
  (function(Headers2) {
    Headers2["Accept"] = "accept";
    Headers2["ContentType"] = "content-type";
  })(Headers = exports2.Headers || (exports2.Headers = {}));
  var MediaTypes;
  (function(MediaTypes2) {
    MediaTypes2["ApplicationJson"] = "application/json";
  })(MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {}));
  function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(url.parse(serverUrl));
    return proxyUrl ? proxyUrl.href : "";
  }
  exports2.getProxyUrl = getProxyUrl;
  var HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
  ];
  var HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
  ];
  var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
  var ExponentialBackoffCeiling = 10;
  var ExponentialBackoffTimeSlice = 5;
  var HttpClientResponse = class {
    constructor(message) {
      this.message = message;
    }
    readBody() {
      return new Promise((resolve, reject) => __async(this, null, function* () {
        let output = Buffer.alloc(0);
        this.message.on("data", (chunk) => {
          output = Buffer.concat([output, chunk]);
        });
        this.message.on("end", () => {
          resolve(output.toString());
        });
      }));
    }
  };
  exports2.HttpClientResponse = HttpClientResponse;
  function isHttps(requestUrl) {
    let parsedUrl = url.parse(requestUrl);
    return parsedUrl.protocol === "https:";
  }
  exports2.isHttps = isHttps;
  var HttpClient = class {
    constructor(userAgent, handlers, requestOptions) {
      this._ignoreSslError = false;
      this._allowRedirects = true;
      this._allowRedirectDowngrade = false;
      this._maxRedirects = 50;
      this._allowRetries = false;
      this._maxRetries = 1;
      this._keepAlive = false;
      this._disposed = false;
      this.userAgent = userAgent;
      this.handlers = handlers || [];
      this.requestOptions = requestOptions;
      if (requestOptions) {
        if (requestOptions.ignoreSslError != null) {
          this._ignoreSslError = requestOptions.ignoreSslError;
        }
        this._socketTimeout = requestOptions.socketTimeout;
        if (requestOptions.allowRedirects != null) {
          this._allowRedirects = requestOptions.allowRedirects;
        }
        if (requestOptions.allowRedirectDowngrade != null) {
          this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
        }
        if (requestOptions.maxRedirects != null) {
          this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
        }
        if (requestOptions.keepAlive != null) {
          this._keepAlive = requestOptions.keepAlive;
        }
        if (requestOptions.allowRetries != null) {
          this._allowRetries = requestOptions.allowRetries;
        }
        if (requestOptions.maxRetries != null) {
          this._maxRetries = requestOptions.maxRetries;
        }
      }
    }
    options(requestUrl, additionalHeaders) {
      return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
      return this.request("GET", requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
      return this.request("DELETE", requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
      return this.request("POST", requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
      return this.request("PATCH", requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
      return this.request("PUT", requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
      return this.request("HEAD", requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
      return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    getJson(_0) {
      return __async(this, arguments, function* (requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = yield this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    postJson(_0, _1) {
      return __async(this, arguments, function* (requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = yield this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    putJson(_0, _1) {
      return __async(this, arguments, function* (requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = yield this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    patchJson(_0, _1) {
      return __async(this, arguments, function* (requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = yield this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    request(verb, requestUrl, data, headers) {
      return __async(this, null, function* () {
        if (this._disposed) {
          throw new Error("Client has already been disposed.");
        }
        let parsedUrl = url.parse(requestUrl);
        let info2 = this._prepareRequest(verb, parsedUrl, headers);
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
          response = yield this.requestRaw(info2, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (let i = 0; i < this.handlers.length; i++) {
              if (this.handlers[i].canHandleAuthentication(response)) {
                authenticationHandler = this.handlers[i];
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info2, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
            const redirectUrl = response.message.headers["location"];
            if (!redirectUrl) {
              break;
            }
            let parsedRedirectUrl = url.parse(redirectUrl);
            if (parsedUrl.protocol == "https:" && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            }
            yield response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (let header in headers) {
                if (header.toLowerCase() === "authorization") {
                  delete headers[header];
                }
              }
            }
            info2 = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = yield this.requestRaw(info2, data);
            redirectsRemaining--;
          }
          if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            yield response.readBody();
            yield this._performExponentialBackoff(numTries);
          }
        }
        return response;
      });
    }
    dispose() {
      if (this._agent) {
        this._agent.destroy();
      }
      this._disposed = true;
    }
    requestRaw(info2, data) {
      return new Promise((resolve, reject) => {
        let callbackForResult = function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        };
        this.requestRawWithCallback(info2, data, callbackForResult);
      });
    }
    requestRawWithCallback(info2, data, onResult) {
      let socket;
      if (typeof data === "string") {
        info2.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
      }
      let callbackCalled = false;
      let handleResult = (err, res) => {
        if (!callbackCalled) {
          callbackCalled = true;
          onResult(err, res);
        }
      };
      let req = info2.httpModule.request(info2.options, (msg) => {
        let res = new HttpClientResponse(msg);
        handleResult(null, res);
      });
      req.on("socket", (sock) => {
        socket = sock;
      });
      req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
        if (socket) {
          socket.end();
        }
        handleResult(new Error("Request timeout: " + info2.options.path), null);
      });
      req.on("error", function(err) {
        handleResult(err, null);
      });
      if (data && typeof data === "string") {
        req.write(data, "utf8");
      }
      if (data && typeof data !== "string") {
        data.on("close", function() {
          req.end();
        });
        data.pipe(req);
      } else {
        req.end();
      }
    }
    getAgent(serverUrl) {
      let parsedUrl = url.parse(serverUrl);
      return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
      const info2 = {};
      info2.parsedUrl = requestUrl;
      const usingSsl = info2.parsedUrl.protocol === "https:";
      info2.httpModule = usingSsl ? https : http;
      const defaultPort = usingSsl ? 443 : 80;
      info2.options = {};
      info2.options.host = info2.parsedUrl.hostname;
      info2.options.port = info2.parsedUrl.port ? parseInt(info2.parsedUrl.port) : defaultPort;
      info2.options.path = (info2.parsedUrl.pathname || "") + (info2.parsedUrl.search || "");
      info2.options.method = method;
      info2.options.headers = this._mergeHeaders(headers);
      if (this.userAgent != null) {
        info2.options.headers["user-agent"] = this.userAgent;
      }
      info2.options.agent = this._getAgent(info2.parsedUrl);
      if (this.handlers) {
        this.handlers.forEach((handler) => {
          handler.prepareRequest(info2.options);
        });
      }
      return info2;
    }
    _mergeHeaders(headers) {
      const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
      if (this.requestOptions && this.requestOptions.headers) {
        return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
      }
      return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
      const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
      let clientHeader;
      if (this.requestOptions && this.requestOptions.headers) {
        clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
      }
      return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
      let agent;
      let proxyUrl = pm.getProxyUrl(parsedUrl);
      let useProxy = proxyUrl && proxyUrl.hostname;
      if (this._keepAlive && useProxy) {
        agent = this._proxyAgent;
      }
      if (this._keepAlive && !useProxy) {
        agent = this._agent;
      }
      if (!!agent) {
        return agent;
      }
      const usingSsl = parsedUrl.protocol === "https:";
      let maxSockets = 100;
      if (!!this.requestOptions) {
        maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
      }
      if (useProxy) {
        if (!tunnel) {
          tunnel = require_tunnel2();
        }
        const agentOptions = {
          maxSockets,
          keepAlive: this._keepAlive,
          proxy: {
            proxyAuth: proxyUrl.auth,
            host: proxyUrl.hostname,
            port: proxyUrl.port
          }
        };
        let tunnelAgent;
        const overHttps = proxyUrl.protocol === "https:";
        if (usingSsl) {
          tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
        } else {
          tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
        }
        agent = tunnelAgent(agentOptions);
        this._proxyAgent = agent;
      }
      if (this._keepAlive && !agent) {
        const options = {keepAlive: this._keepAlive, maxSockets};
        agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
        this._agent = agent;
      }
      if (!agent) {
        agent = usingSsl ? https.globalAgent : http.globalAgent;
      }
      if (usingSsl && this._ignoreSslError) {
        agent.options = Object.assign(agent.options || {}, {
          rejectUnauthorized: false
        });
      }
      return agent;
    }
    _performExponentialBackoff(retryNumber) {
      retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
      const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
      return new Promise((resolve) => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
      if (typeof value === "string") {
        let a = new Date(value);
        if (!isNaN(a.valueOf())) {
          return a;
        }
      }
      return value;
    }
    _processResponse(res, options) {
      return __async(this, null, function* () {
        return new Promise((resolve, reject) => __async(this, null, function* () {
          const statusCode = res.message.statusCode;
          const response = {
            statusCode,
            result: null,
            headers: {}
          };
          if (statusCode == HttpCodes.NotFound) {
            resolve(response);
          }
          let obj;
          let contents;
          try {
            contents = yield res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {
          }
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = "Failed request: (" + statusCode + ")";
            }
            let err = new Error(msg);
            err["statusCode"] = statusCode;
            if (response.result) {
              err["result"] = response.result;
            }
            reject(err);
          } else {
            resolve(response);
          }
        }));
      });
    }
  };
  exports2.HttpClient = HttpClient;
});

// node_modules/@actions/github/lib/github.js
var require_github = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var graphql_1 = require_dist_node6();
  var rest_1 = require_rest();
  var Context = __importStar(require_context());
  var httpClient = __importStar(require_http_client());
  rest_1.Octokit.prototype = new rest_1.Octokit();
  exports2.context = new Context.Context();
  var GitHub2 = class extends rest_1.Octokit {
    constructor(token, opts) {
      super(GitHub2.getOctokitOptions(GitHub2.disambiguate(token, opts)));
      this.graphql = GitHub2.getGraphQL(GitHub2.disambiguate(token, opts));
    }
    static disambiguate(token, opts) {
      return [
        typeof token === "string" ? token : "",
        typeof token === "object" ? token : opts || {}
      ];
    }
    static getOctokitOptions(args) {
      const token = args[0];
      const options = Object.assign({}, args[1]);
      options.baseUrl = options.baseUrl || this.getApiBaseUrl();
      const auth = GitHub2.getAuthString(token, options);
      if (auth) {
        options.auth = auth;
      }
      const agent = GitHub2.getProxyAgent(options.baseUrl, options);
      if (agent) {
        options.request = options.request ? Object.assign({}, options.request) : {};
        options.request.agent = agent;
      }
      return options;
    }
    static getGraphQL(args) {
      const defaults = {};
      defaults.baseUrl = this.getGraphQLBaseUrl();
      const token = args[0];
      const options = args[1];
      const auth = this.getAuthString(token, options);
      if (auth) {
        defaults.headers = {
          authorization: auth
        };
      }
      const agent = GitHub2.getProxyAgent(defaults.baseUrl, options);
      if (agent) {
        defaults.request = {agent};
      }
      return graphql_1.graphql.defaults(defaults);
    }
    static getAuthString(token, options) {
      if (!token && !options.auth) {
        throw new Error("Parameter token or opts.auth is required");
      } else if (token && options.auth) {
        throw new Error("Parameters token and opts.auth may not both be specified");
      }
      return typeof options.auth === "string" ? options.auth : `token ${token}`;
    }
    static getProxyAgent(destinationUrl, options) {
      var _a;
      if (!((_a = options.request) === null || _a === void 0 ? void 0 : _a.agent)) {
        if (httpClient.getProxyUrl(destinationUrl)) {
          const hc = new httpClient.HttpClient();
          return hc.getAgent(destinationUrl);
        }
      }
      return void 0;
    }
    static getApiBaseUrl() {
      return process.env["GITHUB_API_URL"] || "https://api.github.com";
    }
    static getGraphQLBaseUrl() {
      let url = process.env["GITHUB_GRAPHQL_URL"] || "https://api.github.com/graphql";
      if (url.endsWith("/")) {
        url = url.substr(0, url.length - 1);
      }
      if (url.toUpperCase().endsWith("/GRAPHQL")) {
        url = url.substr(0, url.length - "/graphql".length);
      }
      return url;
    }
  };
  exports2.GitHub = GitHub2;
});

// src/check-base-branch.ts
var core = __toModule(require_core());
var github = __toModule(require_github());
var getPR = () => {
  return github.context.payload.pull_request;
};
var getProtectedBranches = () => {
  const branches = core.getInput("protected-branches", {required: true});
  return branches.split(",").map((b) => b.trim());
};
function run() {
  return __async(this, null, function* () {
    const pr = getPR();
    if (!pr) {
      core.debug("Could not get pull request from context. Skipping.");
      return;
    }
    try {
      const protectedBranches = getProtectedBranches();
      const updateBranch = core.getInput("update-branch");
      const defaultBranch = core.getInput("default-branch", {
        required: updateBranch !== "true"
      });
      const token = core.getInput("repo-token", {
        required: updateBranch !== "true"
      });
      core.debug(`Checking base branch for PR #${pr.number}`);
      if (protectedBranches.includes(pr.base.ref)) {
        if (updateBranch === "true") {
          core.debug(`Updating base branch '${pr.data.base.ref}' to '${defaultBranch}'.`);
          const oktokit = new github.GitHub(token);
          const payload = {
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            pull_number: pr.number
          };
          yield oktokit.pulls.update(__assign(__assign({}, payload), {
            base: defaultBranch
          }));
          core.info(`Branch updated from '${pr.data.base.ref}' to '${defaultBranch}'.`);
        } else {
          core.setFailed(`Base branch set to protected branch '${pr.data.base.ref}'`);
          return;
        }
      } else {
        core.debug(`Base branch is ${pr.base.ref}. Skipping.`);
      }
    } catch (err) {
      core.error(err);
      core.setFailed(`Error occurred while validating base branch: ${err.message}`);
    }
  });
}
run();
