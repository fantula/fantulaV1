import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$2(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$2(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode$1;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode$1(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode$1(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode$1(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$2(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function getDistinctCookieKey(name, opts) {
  return [name, opts.domain || "", opts.path || "/"].join(";");
}

function parseCookies(event) {
  return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$2(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize$1(object1) === serialize$1(object2)) {
    return true;
  }
  return false;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "f8972843-0c4a-4c6d-8269-570140ca48bc",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "apiBase": "http://127.0.0.1:54321",
    "appName": "凡图拉",
    "siteUrl": "http://localhost:3000"
  },
  "apiSecret": ""
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await import('../_/error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const plugins = [
  
];

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-jUhgsmxRe/VkFEpgPvimcd8E64A\"",
    "mtime": "2026-01-24T12:15:19.043Z",
    "size": 8196,
    "path": "../public/.DS_Store"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"165-GBfRpms4IUM1tBGOZ2X4MFBUU0Y\"",
    "mtime": "2026-01-24T12:15:19.043Z",
    "size": 357,
    "path": "../public/robots.txt"
  },
  "/sitemap.xml": {
    "type": "application/xml",
    "etag": "\"456-zef+gC+ZO4JZYO3b8Epwei6+eNk\"",
    "mtime": "2026-01-24T12:15:19.043Z",
    "size": 1110,
    "path": "../public/sitemap.xml"
  },
  "/_mgmt_9Xfa3/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/index.html"
  },
  "/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"15165-s5mYkx/isbUXSSDBRr8CH9cXgGI\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 86373,
    "path": "../public/index.html"
  },
  "/cart/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1207e-xGQOT/rxh+doaGVWFc/w9AeXe7E\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 73854,
    "path": "../public/cart/index.html"
  },
  "/about-us/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1257c-r/lySiWXbXZ+dqQj2cBfgmqksSQ\"",
    "mtime": "2026-01-24T12:15:18.521Z",
    "size": 75132,
    "path": "../public/about-us/index.html"
  },
  "/about/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"10abe-TQNhrrSorxZ0DU5q0Aa3BxIz1uI\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 68286,
    "path": "../public/about/index.html"
  },
  "/company/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"11f1c-NksivSxHEGB788NSncaRRLQla7k\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 73500,
    "path": "../public/company/index.html"
  },
  "/contact/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"10ac0-82gyxXcCNU5cQsNou5KigesUDxo\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 68288,
    "path": "../public/contact/index.html"
  },
  "/community/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"11f7c-cdcGjeWX5jGQIiGMDzymrXK+/JE\"",
    "mtime": "2026-01-24T12:15:18.521Z",
    "size": 73596,
    "path": "../public/community/index.html"
  },
  "/disclaimer/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"12a66-RKCjONaQizO2ikIku3W0TDHRvEM\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 76390,
    "path": "../public/disclaimer/index.html"
  },
  "/_nuxt/-KsJubj4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2417-ces1rtYOSoJ0R5BCJPK8dRfpdN4\"",
    "mtime": "2026-01-24T12:15:19.026Z",
    "size": 9239,
    "path": "../public/_nuxt/-KsJubj4.js"
  },
  "/_nuxt/-hFHDZB9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b-Ot9KGlHRwEKJWOLDD9ER1IylAww\"",
    "mtime": "2026-01-24T12:15:19.026Z",
    "size": 107,
    "path": "../public/_nuxt/-hFHDZB9.js"
  },
  "/_nuxt/3oOdQUi5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"58-j8/Th8DSPj1xEwTultO7eRT5vj4\"",
    "mtime": "2026-01-24T12:15:19.003Z",
    "size": 88,
    "path": "../public/_nuxt/3oOdQUi5.js"
  },
  "/_nuxt/1A56VrIH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"117f-QL2AulnbBTknusAeSlRiUKzTZBA\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 4479,
    "path": "../public/_nuxt/1A56VrIH.js"
  },
  "/_nuxt/4SJAG9xH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e15-fNu2wuFo0L0MVKtv8hQIbjejOp0\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 3605,
    "path": "../public/_nuxt/4SJAG9xH.js"
  },
  "/_nuxt/-Y6qSOfY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d3b-QdMjet0A+h2Teb8ghQhR/MHOPx4\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 3387,
    "path": "../public/_nuxt/-Y6qSOfY.js"
  },
  "/faq/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"128de-Ikc7UvhqRHnZ9GOvHH1s8tUh4YY\"",
    "mtime": "2026-01-24T12:15:18.521Z",
    "size": 75998,
    "path": "../public/faq/index.html"
  },
  "/_nuxt/6mWW6bDg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"308-zcJvJTRj9XpLluab0n5Jz/LE5d4\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 776,
    "path": "../public/_nuxt/6mWW6bDg.js"
  },
  "/_nuxt/92s3wAHG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27b-Oc2ygvqpas9pE/Ut+y21cdqlEoM\"",
    "mtime": "2026-01-24T12:15:19.003Z",
    "size": 635,
    "path": "../public/_nuxt/92s3wAHG.js"
  },
  "/_nuxt/4DuTF3Mq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5ab2-CsFAYkOmJ178KdPw/aus4ASYuxM\"",
    "mtime": "2026-01-24T12:15:19.003Z",
    "size": 23218,
    "path": "../public/_nuxt/4DuTF3Mq.js"
  },
  "/_nuxt/9N0sxF3G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a4e-oDMGv9qDcqMC8YwNBLkTpKeGQQo\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 6734,
    "path": "../public/_nuxt/9N0sxF3G.js"
  },
  "/_nuxt/9gc2yt-n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a0e-9QnD7yCWhviR+p47iL4rrpSbHSQ\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 6670,
    "path": "../public/_nuxt/9gc2yt-n.js"
  },
  "/_nuxt/97-vZjNt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"325-k3hePXUFnnBgMfLoUf+nfeBvHFo\"",
    "mtime": "2026-01-24T12:15:19.003Z",
    "size": 805,
    "path": "../public/_nuxt/97-vZjNt.js"
  },
  "/_nuxt/AdminDataDialog.t4wd-jOm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"31-TbYCggg1rQifdSmjqT4NYt8Sk7c\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 49,
    "path": "../public/_nuxt/AdminDataDialog.t4wd-jOm.css"
  },
  "/_nuxt/AdminActionCard.p_gWMTdv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"27a-dEgn0P4pHlK7YhHnVc0IXDjE9AA\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 634,
    "path": "../public/_nuxt/AdminActionCard.p_gWMTdv.css"
  },
  "/_nuxt/AdminImagePicker.s9ki-e3e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4a5-P3QPs4+eHqlIXKeDK6ShK/QZwZg\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 1189,
    "path": "../public/_nuxt/AdminImagePicker.s9ki-e3e.css"
  },
  "/_nuxt/AdminDataTable.D248Rcjh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c7-ucgNHxnaDk057fLAEcCU5MTiQmQ\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 199,
    "path": "../public/_nuxt/AdminDataTable.D248Rcjh.css"
  },
  "/_nuxt/AdminImageSelector.BciHfoR8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5d8-Yr0Ij3j6pziwGeBHRagIlQhnXQo\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 1496,
    "path": "../public/_nuxt/AdminImageSelector.BciHfoR8.css"
  },
  "/_nuxt/AdminModuleLayout.P0lWmUp9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"42f-sJabzk6I/gJCU/PDHSanv5qaAN8\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 1071,
    "path": "../public/_nuxt/AdminModuleLayout.P0lWmUp9.css"
  },
  "/_nuxt/ArlG8wtU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49f-Bo6X1/afmekBmssIHf6oetL3iBQ\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 1183,
    "path": "../public/_nuxt/ArlG8wtU.js"
  },
  "/_nuxt/B-HL1GwU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"117b-xN/GT4y+3w+xpeCAnaUyU35UOts\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 4475,
    "path": "../public/_nuxt/B-HL1GwU.js"
  },
  "/_nuxt/B-Ix60ut.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e03-RDnFesrAlf4g0Gvxv404j/Qz7zs\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 3587,
    "path": "../public/_nuxt/B-Ix60ut.js"
  },
  "/_nuxt/B-bm30D5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1410-k+zPQASHFidcTW0z7YK0bQNamFI\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 5136,
    "path": "../public/_nuxt/B-bm30D5.js"
  },
  "/_nuxt/B1dP6phB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"577-2+HIF2p5GuiyuzbC3W4OBzKfQXM\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 1399,
    "path": "../public/_nuxt/B1dP6phB.js"
  },
  "/_nuxt/B6YmYHDh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48a-+WXPfyGvE/NDo2U2MS0DlnkK79A\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 1162,
    "path": "../public/_nuxt/B6YmYHDh.js"
  },
  "/_nuxt/B2zn1tZ1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a00-crIrbVY0uU4T0FTlVSQcCI9P2/M\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 14848,
    "path": "../public/_nuxt/B2zn1tZ1.js"
  },
  "/_nuxt/B7gllBKh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25af-7AQKVwBRD/1o4wnGM2Z7p4xu1ZU\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 9647,
    "path": "../public/_nuxt/B7gllBKh.js"
  },
  "/_nuxt/B202OUrf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f8-Bl9osEBPKD22cd/fMrXhf71vfXY\"",
    "mtime": "2026-01-24T12:15:19.004Z",
    "size": 248,
    "path": "../public/_nuxt/B202OUrf.js"
  },
  "/_nuxt/B9rQ-1qN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1355-NikuQw+Ih2c1tQNT9sa/gI6pBvU\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 4949,
    "path": "../public/_nuxt/B9rQ-1qN.js"
  },
  "/_nuxt/B77-r_qQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1293f-eegcbodMDppI9vBk8Ep9EtItYSE\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 76095,
    "path": "../public/_nuxt/B77-r_qQ.js"
  },
  "/_nuxt/BB_Ol6Sd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f-gamgNs2AQKgsByqfCsJm9YkDFJE\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 79,
    "path": "../public/_nuxt/BB_Ol6Sd.js"
  },
  "/_nuxt/BC9Y1jC9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1577-NR/qd5jJzZtgv5uzLWJoAQf9ABs\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 5495,
    "path": "../public/_nuxt/BC9Y1jC9.js"
  },
  "/_nuxt/BBw4tCXR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a8e9-7bmqMiryF8H3Uvc/3pdjE1lN3vs\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 43241,
    "path": "../public/_nuxt/BBw4tCXR.js"
  },
  "/_nuxt/BCllKHMW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34c4-hsSH4U7XGgUKN2torTGDTgn/DM0\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 13508,
    "path": "../public/_nuxt/BCllKHMW.js"
  },
  "/_nuxt/BDHz1zLY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4fb7-TQQj7SO/u9YJARSSz/K90+tRxxk\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 20407,
    "path": "../public/_nuxt/BDHz1zLY.js"
  },
  "/_nuxt/BEfgmRf1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2414-3a0wVduBHcFVMp5F4kIucdrltlI\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 9236,
    "path": "../public/_nuxt/BEfgmRf1.js"
  },
  "/_nuxt/BGf2p78X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"139b-VTTZQdRuV1AqEdOmVXDgwa9/0xc\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 5019,
    "path": "../public/_nuxt/BGf2p78X.js"
  },
  "/_nuxt/BFh-Jurl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d25f-dg+q5fLVU/NjMoYWUCoCa6n0e/I\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 184927,
    "path": "../public/_nuxt/BFh-Jurl.js"
  },
  "/_nuxt/BHHTv4u8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c6d-XYA7LcfqK1fjmRtQ9/b5P08yuI0\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 11373,
    "path": "../public/_nuxt/BHHTv4u8.js"
  },
  "/_nuxt/BHVEHnqj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"94a1-qmMkzv3dNr8ArRhFbHZjzDpU4G0\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 38049,
    "path": "../public/_nuxt/BHVEHnqj.js"
  },
  "/_nuxt/BHzRGIbi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ef1-ChGJr6DvyZEKGyWKz3YnR6icncM\"",
    "mtime": "2026-01-24T12:15:19.005Z",
    "size": 7921,
    "path": "../public/_nuxt/BHzRGIbi.js"
  },
  "/_nuxt/BOUQDXLJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c8c-2k1ytJkhgvoC8KP2mSJ89ksPi2M\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 11404,
    "path": "../public/_nuxt/BOUQDXLJ.js"
  },
  "/_nuxt/BPNWzUpD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63f-LkJusQHgUaedV8CsZT/d2YOhzrs\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 1599,
    "path": "../public/_nuxt/BPNWzUpD.js"
  },
  "/_nuxt/BPYXJYQz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a5a-jLFswgJJnCjo5AN1OvxKCMkLTsM\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 6746,
    "path": "../public/_nuxt/BPYXJYQz.js"
  },
  "/_nuxt/BQ1WhVJv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fa-yvxrHTULZFtnFzA06pTwTOtor5w\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 250,
    "path": "../public/_nuxt/BQ1WhVJv.js"
  },
  "/_nuxt/BSp69RIM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21c-wZas6APirxrVyt7KsYGMlhPhWkM\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 540,
    "path": "../public/_nuxt/BSp69RIM.js"
  },
  "/_nuxt/BKJfr31c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1546-pJauvxgAEAwxhZVrwyTRN0FOsrY\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 5446,
    "path": "../public/_nuxt/BKJfr31c.js"
  },
  "/_nuxt/BQwRClwp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22d3-Z+wKs4Oxyv4GA1l01rDVmXSamlY\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 8915,
    "path": "../public/_nuxt/BQwRClwp.js"
  },
  "/_nuxt/BTKFVfca.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"81c-bQbxWDH+hQfy21nRpiBoQQqm1qQ\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 2076,
    "path": "../public/_nuxt/BTKFVfca.js"
  },
  "/_nuxt/BTu1gOqH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26b3-z+490cN+JKskdxuUSgtjn2tsZLs\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 9907,
    "path": "../public/_nuxt/BTu1gOqH.js"
  },
  "/_nuxt/BV_QTDOQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12d1-FzcDPhh6BzF9KtoTXb3Y0kAXuXg\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 4817,
    "path": "../public/_nuxt/BV_QTDOQ.js"
  },
  "/_nuxt/B_7HZhJl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"217-q/0bVaL6Kj2lHWHD7WgstNWDTxQ\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 535,
    "path": "../public/_nuxt/B_7HZhJl.js"
  },
  "/_nuxt/BZhjgjIz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c9e-+Hu8JO08xCYfJ1GV4E1j+a0JLUI\"",
    "mtime": "2026-01-24T12:15:19.006Z",
    "size": 7326,
    "path": "../public/_nuxt/BZhjgjIz.js"
  },
  "/_nuxt/BU1aYbpV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16a99-ilPn9LJvtL/bqvJty/xdxGiaMg8\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 92825,
    "path": "../public/_nuxt/BU1aYbpV.js"
  },
  "/_nuxt/BaseConfirmModal.s8JNzWkT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"486-4kD+wrlPn2SVX7rzpZaNPdAmuJw\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 1158,
    "path": "../public/_nuxt/BaseConfirmModal.s8JNzWkT.css"
  },
  "/_nuxt/BaseFormModal.rdJLO7xC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c0-H7TsUzstSW0G92+KaVLS/UjUlhg\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 192,
    "path": "../public/_nuxt/BaseFormModal.rdJLO7xC.css"
  },
  "/_nuxt/BaseCouponTicket.CP45C8um.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1033-d2BazODbrJw63CXbsTDjldrlxhg\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 4147,
    "path": "../public/_nuxt/BaseCouponTicket.CP45C8um.css"
  },
  "/_nuxt/Bf7J-tp3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6cd-QApZIXaXl2lJb8yoeo3sqezZX0k\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 1741,
    "path": "../public/_nuxt/Bf7J-tp3.js"
  },
  "/_nuxt/Bh6H2ams.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"55b-eot9TIHEm2RQvojrqyoru3JfFrs\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 1371,
    "path": "../public/_nuxt/Bh6H2ams.js"
  },
  "/_nuxt/BgFvNPpk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b75-f2TSNIWb16dtRIOvyD0Tf20RMZw\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 7029,
    "path": "../public/_nuxt/BgFvNPpk.js"
  },
  "/_nuxt/BdfiTe35.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38f3-zcF2JDiudYOHf63jgHfvlwIvZd0\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 14579,
    "path": "../public/_nuxt/BdfiTe35.js"
  },
  "/_nuxt/BiPd7zai.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"354-H3C/GGk4RMsOS2Qkwc+egY1+4uA\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 852,
    "path": "../public/_nuxt/BiPd7zai.js"
  },
  "/_nuxt/BjTUguCk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2cf-eUSbJIkhHCctqog2W88QJbk1WCw\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 719,
    "path": "../public/_nuxt/BjTUguCk.js"
  },
  "/_nuxt/Bks769LS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27b1-zjF6N6+e2enAjT/Pr0s+hkN+kTw\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 10161,
    "path": "../public/_nuxt/Bks769LS.js"
  },
  "/_nuxt/BjbJQEzT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9e57-obtXAil1RTCmI34oJs7wSjnuDx8\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 40535,
    "path": "../public/_nuxt/BjbJQEzT.js"
  },
  "/_nuxt/BseQnKvR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"117f-WHJZo+lrbygI24tbiyRwpCxu0kU\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 4479,
    "path": "../public/_nuxt/BseQnKvR.js"
  },
  "/_nuxt/Bn1Ypmqm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b9d-gTLMImQVjBNjFcwFa6UlztqIURc\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 7069,
    "path": "../public/_nuxt/Bn1Ypmqm.js"
  },
  "/_nuxt/Bp0JaYz2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e81-nRiOx4VKhjwvOk2jVamgt9uu1SA\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 11905,
    "path": "../public/_nuxt/Bp0JaYz2.js"
  },
  "/_nuxt/BuS8Q2A-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ccb-UklahBPhNjWdEVOdJCK3joF7fbo\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 11467,
    "path": "../public/_nuxt/BuS8Q2A-.js"
  },
  "/_nuxt/BrE0JoK1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12d5-b/gUcb/8jGWazzOeFEJ/uFTjpJg\"",
    "mtime": "2026-01-24T12:15:19.007Z",
    "size": 4821,
    "path": "../public/_nuxt/BrE0JoK1.js"
  },
  "/_nuxt/BulkActionBar.DWrIK7wP.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"114-buqz9v7G6fzF2axard8d6x7hiIU\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 276,
    "path": "../public/_nuxt/BulkActionBar.DWrIK7wP.css"
  },
  "/_nuxt/BshxmKU8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1058-0A3Vp2btvXYsxQg3CZLSrb3Du8A\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 4184,
    "path": "../public/_nuxt/BshxmKU8.js"
  },
  "/_nuxt/Bvds5jDy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8f8-2yRtHMIfpYE0l8hBK1aNfchBzoQ\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 2296,
    "path": "../public/_nuxt/Bvds5jDy.js"
  },
  "/_nuxt/Bvw9Df5z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20ea-tXT1Tg/dfxxQnxEvQiZpnmeeffo\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 8426,
    "path": "../public/_nuxt/Bvw9Df5z.js"
  },
  "/_nuxt/BwKxoJlH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e32-7oTcLqqgy4LIVha9y2R09OY+Drg\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 3634,
    "path": "../public/_nuxt/BwKxoJlH.js"
  },
  "/_nuxt/BwZnyoG1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ca8-RMsp/+/tyhL3GMhwQVnXwpWt2ng\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 15528,
    "path": "../public/_nuxt/BwZnyoG1.js"
  },
  "/_nuxt/ByqilF2g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e57-d++2QLkvmUNkPb1d/67b9yEqzso\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 20055,
    "path": "../public/_nuxt/ByqilF2g.js"
  },
  "/_nuxt/BzZM8Et6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"498-l+3TQ+9I0SxCqi5NB2QlWVMdE08\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 1176,
    "path": "../public/_nuxt/BzZM8Et6.js"
  },
  "/_nuxt/C-2dxbDp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1beb-pbwCp9muvaK0StiS3yn07FqbFDk\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 7147,
    "path": "../public/_nuxt/C-2dxbDp.js"
  },
  "/_nuxt/C-bgKWEs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a5b-KYkPspsj3A+rTa1WeTZPTY2AOYo\"",
    "mtime": "2026-01-24T12:15:19.008Z",
    "size": 6747,
    "path": "../public/_nuxt/C-bgKWEs.js"
  },
  "/_nuxt/C0nQE134.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cab-lMySUmDKLeSRni9tqSoi2yptO1g\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 7339,
    "path": "../public/_nuxt/C0nQE134.js"
  },
  "/_nuxt/C6m5ANi3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15f-97VtEPOQgmgsLXV28U3J6Q2jToQ\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 351,
    "path": "../public/_nuxt/C6m5ANi3.js"
  },
  "/_nuxt/C736FqOh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"381d-zWbYB1FT43dEarDxQ5RUDXqYAfU\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 14365,
    "path": "../public/_nuxt/C736FqOh.js"
  },
  "/_nuxt/C7QSzEzh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"168b-Wlya6tERW1KCCLuxWULFfdmt8MQ\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 5771,
    "path": "../public/_nuxt/C7QSzEzh.js"
  },
  "/_nuxt/C8eidSEG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d43-/7rP99ZqZxh+R4VezKI3vKp9JzA\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 3395,
    "path": "../public/_nuxt/C8eidSEG.js"
  },
  "/_nuxt/C8qY6pvp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d54-ciFaCao1fH9Yx412DqWW2wwBVNo\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 3412,
    "path": "../public/_nuxt/C8qY6pvp.js"
  },
  "/_nuxt/CAmF8OjQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d73-yCKn79RdYW22uRylyeFVREBcbaE\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 3443,
    "path": "../public/_nuxt/CAmF8OjQ.js"
  },
  "/_nuxt/CAt24aya.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"267-/RTty9Y4T+pV7kvv9vIJDKCA5fc\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 615,
    "path": "../public/_nuxt/CAt24aya.js"
  },
  "/_nuxt/CChPPi86.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"41b-Efp5HDgjoSM3PVdHT5PuFiqBAOM\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 1051,
    "path": "../public/_nuxt/CChPPi86.js"
  },
  "/_nuxt/CCDBlmbt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1296-o0FDtxaUd1rCTF2tdmvfjy5owUM\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 4758,
    "path": "../public/_nuxt/CCDBlmbt.js"
  },
  "/_nuxt/CCoZ80-G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"266-axcYGlLn63DvA3GflVAtVL/7a4Q\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 614,
    "path": "../public/_nuxt/CCoZ80-G.js"
  },
  "/_nuxt/CD0nM_pJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15c0-l/SaXmW0M5aeFoqubVhGU3JVB4I\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 5568,
    "path": "../public/_nuxt/CD0nM_pJ.js"
  },
  "/_nuxt/CF4fpXnX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"631-3pqJqO6g52QORUrDMqzpgCLSX7U\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 1585,
    "path": "../public/_nuxt/CF4fpXnX.js"
  },
  "/_nuxt/CB_o0Cdi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae-iyKrHNwHOHGcCAziNHBgKTOikms\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 174,
    "path": "../public/_nuxt/CB_o0Cdi.js"
  },
  "/_nuxt/CG15IVLF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b92-bS7j1ofh3Do0py4nYCXcK0oqONU\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 7058,
    "path": "../public/_nuxt/CG15IVLF.js"
  },
  "/_nuxt/CLZwwZ3e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30b-O7LyIvcm5aCv5JSefWFyGMZd8Qo\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 779,
    "path": "../public/_nuxt/CLZwwZ3e.js"
  },
  "/_nuxt/CNB71x25.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"548-zUbk/dEIVRV/E6kNeYGyaE5hj0E\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 1352,
    "path": "../public/_nuxt/CNB71x25.js"
  },
  "/_nuxt/CNYNJsmX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1de5-UX8ovaie/JlSeHYzAJWBjvhoj1E\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 7653,
    "path": "../public/_nuxt/CNYNJsmX.js"
  },
  "/_nuxt/CJbGb46n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1091c-aH2tpzD2tyBophJEkd5jEgigAkQ\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 67868,
    "path": "../public/_nuxt/CJbGb46n.js"
  },
  "/_nuxt/CMVelmCn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1047-K52SyAapJzj5z7e9HW6U26EYxhQ\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 4167,
    "path": "../public/_nuxt/CMVelmCn.js"
  },
  "/_nuxt/CP47LeNR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2406-bwMXJ6Nfo42kkh4EoMZJZbjEc4E\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 9222,
    "path": "../public/_nuxt/CP47LeNR.js"
  },
  "/_nuxt/CRKKFZAQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dbf-B9TrDPSPJhIR6RgkHsCF2yqDYjo\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 3519,
    "path": "../public/_nuxt/CRKKFZAQ.js"
  },
  "/_nuxt/CRWHP3jh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e8-8Bn8+7GPoS4MUOd3Ox8l5RD52GU\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 488,
    "path": "../public/_nuxt/CRWHP3jh.js"
  },
  "/_nuxt/CF94jjoq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45d-1d9pNAeLv2ZCbILnVcEs1u9scig\"",
    "mtime": "2026-01-24T12:15:19.009Z",
    "size": 1117,
    "path": "../public/_nuxt/CF94jjoq.js"
  },
  "/_nuxt/CQfdgs3a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1942-+Ykai7sKu87v/adNecntayvdBcM\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 6466,
    "path": "../public/_nuxt/CQfdgs3a.js"
  },
  "/_nuxt/CRYDGWf-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7d6-AkQfOQMo0gjrVYFJ7Pbr2Ykk9PU\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 2006,
    "path": "../public/_nuxt/CRYDGWf-.js"
  },
  "/_nuxt/CVqY52cz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"88fc-qbTjjppAib991qf6ie05FvlGJ6o\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 35068,
    "path": "../public/_nuxt/CVqY52cz.js"
  },
  "/_nuxt/CWj4yxaE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17e0-FizlYaUG0Pv0OXPMRaBuVXfL1p4\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 6112,
    "path": "../public/_nuxt/CWj4yxaE.js"
  },
  "/_nuxt/CXRxotb2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38b-V2JBUb7MUFhXhyEusDKVFr7g2oQ\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 907,
    "path": "../public/_nuxt/CXRxotb2.js"
  },
  "/_nuxt/CXSfLi3R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f5-13qCCMp5PstLbjilMU66QO8uVf8\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 245,
    "path": "../public/_nuxt/CXSfLi3R.js"
  },
  "/_nuxt/CY9SEgCX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b4d-tN7RiA9dT4zmj+DseH4f0pDcvjc\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 6989,
    "path": "../public/_nuxt/CY9SEgCX.js"
  },
  "/_nuxt/CYoIHthX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3bf3-KU6eI95E3GMOQwGNHZ/e8BaFY+U\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 15347,
    "path": "../public/_nuxt/CYoIHthX.js"
  },
  "/_nuxt/CEI0siaN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9a867-Sz3JaePzCtsh62fe/rX4lm1wbaE\"",
    "mtime": "2026-01-24T12:15:19.010Z",
    "size": 632935,
    "path": "../public/_nuxt/CEI0siaN.js"
  },
  "/_nuxt/CZLDLz6s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49f-c2olz/gxQwKHU1ipJiruv/iaQrY\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 1183,
    "path": "../public/_nuxt/CZLDLz6s.js"
  },
  "/_nuxt/Ca6tJr_l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1993-8qdbuqdiCiZ8zBmOLqZeuX3IZB0\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 6547,
    "path": "../public/_nuxt/Ca6tJr_l.js"
  },
  "/_nuxt/CcjaQXgW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11e8-pAF6M9D9WABOOEM784JNiD/wOP8\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 4584,
    "path": "../public/_nuxt/CcjaQXgW.js"
  },
  "/_nuxt/CdkListByType.B98iFsge.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"311-vlQlsVJ26V/ToERImQS9FeLphIw\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 785,
    "path": "../public/_nuxt/CdkListByType.B98iFsge.css"
  },
  "/_nuxt/Ce6k4emn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a87-VamKuwzlPdzvYGxM8IwYzcEYZMg\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 2695,
    "path": "../public/_nuxt/Ce6k4emn.js"
  },
  "/_nuxt/CcXw7os5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a9-qFTBjD+cNw5BkdSEHNn1NlndaEI\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 937,
    "path": "../public/_nuxt/CcXw7os5.js"
  },
  "/_nuxt/CgQ-l74f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"122b-D/XDNguKurCCfyebEOlU6YweO9w\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 4651,
    "path": "../public/_nuxt/CgQ-l74f.js"
  },
  "/_nuxt/Ckf5llYz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fc-1lMsDxV82QR6jOEkMMs/I60Dn88\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 252,
    "path": "../public/_nuxt/Ckf5llYz.js"
  },
  "/_nuxt/CmG9FMVi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c6-a/MRhvokZbn04wkMDmyPwq+goSc\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 1222,
    "path": "../public/_nuxt/CmG9FMVi.js"
  },
  "/_nuxt/ClIUVBla.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6958-sEByuFXmF9bWESqKik8wS4+Mrhc\"",
    "mtime": "2026-01-24T12:15:19.011Z",
    "size": 26968,
    "path": "../public/_nuxt/ClIUVBla.js"
  },
  "/_nuxt/CouponSelectorModal.m5sQuG3S.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b8f-B6yA17WXoIHPPcSElqi+qNVLaB0\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 7055,
    "path": "../public/_nuxt/CouponSelectorModal.m5sQuG3S.css"
  },
  "/_nuxt/Cp1EI20B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5e1-3Jy+axPwBDZw3VtfFmxyWZNJjwU\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 1505,
    "path": "../public/_nuxt/Cp1EI20B.js"
  },
  "/_nuxt/CouponCodeEditor.WaWxWoTG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"41b-kWsNXRlA9lcSsjh7vVgKOTFrm4s\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 1051,
    "path": "../public/_nuxt/CouponCodeEditor.WaWxWoTG.css"
  },
  "/_nuxt/CoJKtQsI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4d75-Ljh4B7LbujarPkWqk8UhPEGices\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 19829,
    "path": "../public/_nuxt/CoJKtQsI.js"
  },
  "/_nuxt/CoAo9xwI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1356-1xx31vc6T1StEVrdqfEbnXR/diA\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 4950,
    "path": "../public/_nuxt/CoAo9xwI.js"
  },
  "/_nuxt/Cq9Fpw4b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f-/e18qrfrka5tu1+QKay9M4OlZOo\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 159,
    "path": "../public/_nuxt/Cq9Fpw4b.js"
  },
  "/_nuxt/D-7LAYt0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2744-FmSSdkpgkikaIPcFybpD2d1Rik4\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 10052,
    "path": "../public/_nuxt/D-7LAYt0.js"
  },
  "/_nuxt/Ct1yoKpA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3119-gFWa18BfYtvDlpUAciyOnv7UyGo\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 12569,
    "path": "../public/_nuxt/Ct1yoKpA.js"
  },
  "/_nuxt/D1_WYtmj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4db-H66lwD2lgl93ur9cSswXcAwRrs0\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 1243,
    "path": "../public/_nuxt/D1_WYtmj.js"
  },
  "/_nuxt/D1BRSvh-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27e8-JWpvwcsihlv0Sfyh5okxJYbFprY\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 10216,
    "path": "../public/_nuxt/D1BRSvh-.js"
  },
  "/_nuxt/CpnU9iLh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"431b-gVfduddlGwISbzw10XjmuW4/tWo\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 17179,
    "path": "../public/_nuxt/CpnU9iLh.js"
  },
  "/_nuxt/D1o91Uqd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f9d-dfdaqRoVjLqJj5xh0Q+9gkvwDCA\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 8093,
    "path": "../public/_nuxt/D1o91Uqd.js"
  },
  "/_nuxt/D3anY9JJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1427-5jH6YJ9T4kGwxyd0FaNN5Yx/vw8\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 5159,
    "path": "../public/_nuxt/D3anY9JJ.js"
  },
  "/_nuxt/D2n2RcOH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b05-k4C4627OtXrw4E/wOrpgqJBczCI\"",
    "mtime": "2026-01-24T12:15:19.012Z",
    "size": 2821,
    "path": "../public/_nuxt/D2n2RcOH.js"
  },
  "/_nuxt/D3fv97Ds.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11fd-ZMQIP02z+/ehpxFxu0zzYLKvjLk\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 4605,
    "path": "../public/_nuxt/D3fv97Ds.js"
  },
  "/_nuxt/D6oFj94W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a0c-UGMrQAJUU8Ck4NNnTFHf49bwFLM\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 6668,
    "path": "../public/_nuxt/D6oFj94W.js"
  },
  "/_nuxt/D6FW0B1r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f-QBSY1lPXbirKYATyRw0AIKu0ex4\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 63,
    "path": "../public/_nuxt/D6FW0B1r.js"
  },
  "/_nuxt/DB7JGTAC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"885-lBTEnjwwBgHoflE+4A+zIc5/lt0\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 2181,
    "path": "../public/_nuxt/DB7JGTAC.js"
  },
  "/_nuxt/DAglDhSg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1728-8mDamjYsSdkS8TdNnWD6FwWB5+w\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 5928,
    "path": "../public/_nuxt/DAglDhSg.js"
  },
  "/_nuxt/DCP3zBTZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"730-ORP/RCVF5kluGvGSpS+vII11xHI\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 1840,
    "path": "../public/_nuxt/DCP3zBTZ.js"
  },
  "/_nuxt/DAIghOY5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e15-Nm8Vk6eKZfY4hUwrMaMY0oD434w\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 11797,
    "path": "../public/_nuxt/DAIghOY5.js"
  },
  "/_nuxt/DC_bmF7B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8f3-nsb793dQ2gnPJNSWF4tXAu1u6GM\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 2291,
    "path": "../public/_nuxt/DC_bmF7B.js"
  },
  "/_nuxt/DE5qJ7kT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"56e-KF9J65ZLS+NmBW5dCV+3kB13obs\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 1390,
    "path": "../public/_nuxt/DE5qJ7kT.js"
  },
  "/_nuxt/DCxqynjs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"387-bnlg3oVOIEWO5IMTOPa3tf6LBx4\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 903,
    "path": "../public/_nuxt/DCxqynjs.js"
  },
  "/_nuxt/DFGJDSn8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18b-6ql5D1K7kf4t+LtdFthI+liFQPw\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 395,
    "path": "../public/_nuxt/DFGJDSn8.js"
  },
  "/_nuxt/DJwBMevv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"573-JvkYWIBYgj3MT/S8FDHSUj7Sw1g\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 1395,
    "path": "../public/_nuxt/DJwBMevv.js"
  },
  "/_nuxt/DIhsiPve.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7792-ta1+GcuTwoVlm7wHn/EZ0ShQ9p4\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 30610,
    "path": "../public/_nuxt/DIhsiPve.js"
  },
  "/_nuxt/DK8Ou2Tk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1013-gmPWuQ1YwcG8tV0fAWdo3xxxwJE\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 4115,
    "path": "../public/_nuxt/DK8Ou2Tk.js"
  },
  "/_nuxt/DK_by8XV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"60f-Iu/03OpPKMGSgKpS8d1CxUJnMo4\"",
    "mtime": "2026-01-24T12:15:19.013Z",
    "size": 1551,
    "path": "../public/_nuxt/DK_by8XV.js"
  },
  "/_nuxt/DKpIDlwo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17ee-Hd+x/YnmrQiGD0Gnw60LCGTXwPA\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 6126,
    "path": "../public/_nuxt/DKpIDlwo.js"
  },
  "/_nuxt/DKuaWdIw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10b5-l3yvB9OK49NPYt2MCEL/z57DFK4\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 4277,
    "path": "../public/_nuxt/DKuaWdIw.js"
  },
  "/_nuxt/DM6bhfPd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e85-N7Lo/0/INTODn5fuJalb5GglatU\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 3717,
    "path": "../public/_nuxt/DM6bhfPd.js"
  },
  "/_nuxt/DPAWbF9L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a62-JBkjCRFhP2yndOh8mNQi77rkF8Q\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 6754,
    "path": "../public/_nuxt/DPAWbF9L.js"
  },
  "/_nuxt/DSDiIrcR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13d2-GIcqVkzSpYzwAreIDGj+2yLJsTc\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 5074,
    "path": "../public/_nuxt/DSDiIrcR.js"
  },
  "/_nuxt/DRTkZFhg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a2-sYDMi+OOSGS9i2+Bw540oPS1yZs\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 930,
    "path": "../public/_nuxt/DRTkZFhg.js"
  },
  "/_nuxt/DU9PW-MM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1675-yLazJJF5LHuWEBdUEkE3+BGKZqQ\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 5749,
    "path": "../public/_nuxt/DU9PW-MM.js"
  },
  "/_nuxt/DU9K-Ae6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2da-cm1OTuADUYrOwgrmEnsCfixTxhI\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 730,
    "path": "../public/_nuxt/DU9K-Ae6.js"
  },
  "/_nuxt/DW0_wk9g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"83-fGxxZjtAlX6CJIUPRPkyIIURD1M\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 131,
    "path": "../public/_nuxt/DW0_wk9g.js"
  },
  "/_nuxt/DUxG_Oco.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11a1-gUqZV9uW/s62lYqQhz5KmP+TVfI\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 4513,
    "path": "../public/_nuxt/DUxG_Oco.js"
  },
  "/_nuxt/DWqLRvnA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c87-ypNRNKEjGFC3bvjC/qGvR61xRcI\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 7303,
    "path": "../public/_nuxt/DWqLRvnA.js"
  },
  "/_nuxt/DZBneOGj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c2-QA8Ymry7KXS/61RP3ugwMFGduaQ\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 450,
    "path": "../public/_nuxt/DZBneOGj.js"
  },
  "/_nuxt/DZQx4-5u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"685-In2mnHn0FDrkvOXlt57pv8xKNKY\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 1669,
    "path": "../public/_nuxt/DZQx4-5u.js"
  },
  "/_nuxt/DbnPh7Gp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14dc-w4F3SxIjyCc+SYvBTH4MjTTz/zE\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 5340,
    "path": "../public/_nuxt/DbnPh7Gp.js"
  },
  "/_nuxt/DcAryAeI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c0-hiUZGiKXw7ymngQgTs+arsQv1v8\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 1472,
    "path": "../public/_nuxt/DcAryAeI.js"
  },
  "/_nuxt/DdwEgIsB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14b4-B30Mp60SBb25jhrCTQSVIz0sCJA\"",
    "mtime": "2026-01-24T12:15:19.014Z",
    "size": 5300,
    "path": "../public/_nuxt/DdwEgIsB.js"
  },
  "/_nuxt/Demiahkb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"43-AUcw8qTFQw8CKt+Tqjha4jC6/8E\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 67,
    "path": "../public/_nuxt/Demiahkb.js"
  },
  "/_nuxt/DgMG35os.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"42d-C3vqhTtYotcXERnHjsFjRq4OG/0\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 1069,
    "path": "../public/_nuxt/DgMG35os.js"
  },
  "/_nuxt/DmGixRc_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1012-EPPrluT5q3cDVMwl3cJMETjomtg\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 4114,
    "path": "../public/_nuxt/DmGixRc_.js"
  },
  "/_nuxt/Dnj8X3EN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"57-PZqMcBA8QLP3AL7rMaOmsN1GFRE\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 87,
    "path": "../public/_nuxt/Dnj8X3EN.js"
  },
  "/_nuxt/Dml4co78.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b54-ENXGnfSwUUb5xSzMONuNbVIsUTs\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 2900,
    "path": "../public/_nuxt/Dml4co78.js"
  },
  "/_nuxt/DqBrY_lx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b6-WZpK9oqLb8qb6/MkPV4nxiyXcZE\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 1206,
    "path": "../public/_nuxt/DqBrY_lx.js"
  },
  "/_nuxt/DoKkTQgc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b75-90hmdrzzpimMUsrY2q9XZZsiUHM\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 7029,
    "path": "../public/_nuxt/DoKkTQgc.js"
  },
  "/_nuxt/DlsCrpOk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ec7e-m9+cUJ3qplHkDVhM2vCoYPUJkwQ\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 126078,
    "path": "../public/_nuxt/DlsCrpOk.js"
  },
  "/_nuxt/DwL2e8cc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1469-jmrKyduufDajJsWJ/rX7Z44D3LM\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 5225,
    "path": "../public/_nuxt/DwL2e8cc.js"
  },
  "/_nuxt/DvsxNcts.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47a4-4MiKQl40peo8LODF1u4mU3hET5c\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 18340,
    "path": "../public/_nuxt/DvsxNcts.js"
  },
  "/_nuxt/DwbobqWH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ba2-OMAkvgwXA2bWBG7b0PzUULgDGIw\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 2978,
    "path": "../public/_nuxt/DwbobqWH.js"
  },
  "/_nuxt/DxNR5PDn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33b-Y/JEaFm3p/qShuvOu43Fsl3lN4o\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 827,
    "path": "../public/_nuxt/DxNR5PDn.js"
  },
  "/_nuxt/Eu8zRIf2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1200-68pU0VTR1+weUiHTuqAUB+e7PdM\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 4608,
    "path": "../public/_nuxt/Eu8zRIf2.js"
  },
  "/_nuxt/GQfnVzpg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c53-HEmhGHhh9WT3YtL6e1PYH4MYrX0\"",
    "mtime": "2026-01-24T12:15:19.015Z",
    "size": 7251,
    "path": "../public/_nuxt/GQfnVzpg.js"
  },
  "/_nuxt/FSriod3s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b47-n86LNKk+x2qUO7IOxfyZJyOWjto\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 15175,
    "path": "../public/_nuxt/FSriod3s.js"
  },
  "/_nuxt/HXzPRHgr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d66-KTOjUUvZBD/7CCDaS7j9QNHZiPQ\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 7526,
    "path": "../public/_nuxt/HXzPRHgr.js"
  },
  "/_nuxt/IHtRfjtZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a7ca-yYfmKY3sLC73tM8atXPrfko6KyE\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 42954,
    "path": "../public/_nuxt/IHtRfjtZ.js"
  },
  "/_nuxt/IibC-tXt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35a-lp7f5VhMwtrCPL4/ieFcCHdO3Rk\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 858,
    "path": "../public/_nuxt/IibC-tXt.js"
  },
  "/_nuxt/Jf5bIUYa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24a-CsHXWD2L0w4tuXRocDHbrIyCExs\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 586,
    "path": "../public/_nuxt/Jf5bIUYa.js"
  },
  "/_nuxt/MYY8HZ7o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13bf-kBcDqW7QR3WazZEek6PgIQDlxc8\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 5055,
    "path": "../public/_nuxt/MYY8HZ7o.js"
  },
  "/_nuxt/NJqReoSi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bf-V+3or9pebrUagZaNCC7MLpglUuM\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 447,
    "path": "../public/_nuxt/NJqReoSi.js"
  },
  "/_nuxt/OrderItemCell.DEgD48Lw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"30c-NvJoRg2T74VaSOeil29CNtVXw2g\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 780,
    "path": "../public/_nuxt/OrderItemCell.DEgD48Lw.css"
  },
  "/_nuxt/OwHC_0Ap.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"471-pwQYp2VKO6aQgaVpA4QfpSVGChw\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 1137,
    "path": "../public/_nuxt/OwHC_0Ap.js"
  },
  "/_nuxt/P1m_XfLR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17e9-PNkwjVkxQ0kQiOpsnJ1jniKV+oY\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 6121,
    "path": "../public/_nuxt/P1m_XfLR.js"
  },
  "/_nuxt/PageTipHeader.B13Ts7nI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5a-FklAzDpd6qfB0p4Ec3MLZI32tQg\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 90,
    "path": "../public/_nuxt/PageTipHeader.B13Ts7nI.css"
  },
  "/_nuxt/PbH8IyH8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37d-ttg7hYA+NAmLgZ+EQVaL6VkBukk\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 893,
    "path": "../public/_nuxt/PbH8IyH8.js"
  },
  "/_nuxt/SkuEditor.Cmv7wiST.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8d8-rx0AoJCfEb0rDXV4U/uXP7TnkkA\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 2264,
    "path": "../public/_nuxt/SkuEditor.Cmv7wiST.css"
  },
  "/_nuxt/StickyFormHeader.gTyPjVh3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"39b-VMllNiklHZo3chz+TXlQo3eDmyA\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 923,
    "path": "../public/_nuxt/StickyFormHeader.gTyPjVh3.css"
  },
  "/_nuxt/TagInputGroup.BzZA8HKV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"85-uUvr4sxjm5K08sOu95rlj3R/bhU\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 133,
    "path": "../public/_nuxt/TagInputGroup.BzZA8HKV.css"
  },
  "/_nuxt/UBDufaM8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b3-Ig3kK9NGKMtvABae9+EMCLHrDoA\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 947,
    "path": "../public/_nuxt/UBDufaM8.js"
  },
  "/_nuxt/TicketChatModal.gfTxz3L4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f97-dyBKFGC8Qogvq21sEpLgsv5J0jg\"",
    "mtime": "2026-01-24T12:15:19.016Z",
    "size": 3991,
    "path": "../public/_nuxt/TicketChatModal.gfTxz3L4.css"
  },
  "/_nuxt/UsSaLK58.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1842-Fc+il96mSALF2O1DMbwgJG7UaQw\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 6210,
    "path": "../public/_nuxt/UsSaLK58.js"
  },
  "/_nuxt/WalletRechargeModal.CBSTiOkX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1249-87axu0OCagEwCElyw7ideINm9zc\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 4681,
    "path": "../public/_nuxt/WalletRechargeModal.CBSTiOkX.css"
  },
  "/_nuxt/WhJpyUYz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cb2-e/Q/YXA9h/YBnRBpgCioWb91K04\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 7346,
    "path": "../public/_nuxt/WhJpyUYz.js"
  },
  "/_nuxt/XxCE4bMO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27d4-gfr+a9h+VtAUpN2zEvwxjVNGabI\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 10196,
    "path": "../public/_nuxt/XxCE4bMO.js"
  },
  "/_nuxt/Zi8pc7L8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"627-yA25+dsi2CwnWtvnAEsACRqZyT8\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 1575,
    "path": "../public/_nuxt/Zi8pc7L8.js"
  },
  "/_nuxt/_QnKWrBX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19d3-xyffGnc9OxRM0wriAvEvdTlrP1E\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 6611,
    "path": "../public/_nuxt/_QnKWrBX.js"
  },
  "/_nuxt/_id_.BAlcB7Il.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e03-kTzTqhmH2yeVUEI0jaEh/UXyUOs\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 11779,
    "path": "../public/_nuxt/_id_.BAlcB7Il.css"
  },
  "/_nuxt/_id_.BLlrFQHm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4cf-2GUxXc9V2c8WTR7H/rflmlZFkGY\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 1231,
    "path": "../public/_nuxt/_id_.BLlrFQHm.css"
  },
  "/_nuxt/_id_.BVQ3FqkB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d04-rywJAut1Md4xkT/yYwxpwXd9WH0\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 11524,
    "path": "../public/_nuxt/_id_.BVQ3FqkB.css"
  },
  "/_nuxt/_id_.CUHA3xMz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e6b-wGVXIiYi+D9RZ1NBcOrXcLMjZ8E\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 11883,
    "path": "../public/_nuxt/_id_.CUHA3xMz.css"
  },
  "/_nuxt/_id_.DpZX4vA6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c98-CPfEl5xjucVRPGskow6boP4uvnY\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 3224,
    "path": "../public/_nuxt/_id_.DpZX4vA6.css"
  },
  "/_nuxt/_id_.D5X1kdGx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8771-SnsXdP0l+BWRYbkl5/lwra+zWps\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 34673,
    "path": "../public/_nuxt/_id_.D5X1kdGx.css"
  },
  "/_nuxt/_id_.DyQ3rdo5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c30-0Ogd2/flJ4TIbBBMIJdLJkjNJ/E\"",
    "mtime": "2026-01-24T12:15:19.017Z",
    "size": 3120,
    "path": "../public/_nuxt/_id_.DyQ3rdo5.css"
  },
  "/_nuxt/_mgmt_9Xfa3.CgdmRf4Z.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6cf2-J/DhZJbdHALprNMr5lekvY6GKDc\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 27890,
    "path": "../public/_nuxt/_mgmt_9Xfa3.CgdmRf4Z.css"
  },
  "/_nuxt/a-ipGHYl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29eb-BvT/yymk3p5UVKFmItmMpAYPsP0\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 10731,
    "path": "../public/_nuxt/a-ipGHYl.js"
  },
  "/_nuxt/aSYcAdI9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18e-cppfr5kbYjWoDsv+tIBb5w/lZGk\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 398,
    "path": "../public/_nuxt/aSYcAdI9.js"
  },
  "/_nuxt/aU3tz_xb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b0f-sSjMy/hMFS85OMcqxN6nzCACqNg\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 6927,
    "path": "../public/_nuxt/aU3tz_xb.js"
  },
  "/_nuxt/about-us.H04ZifLS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ba0-p5EpZp6Pz5k9wtBnDOjvonIRx7M\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 2976,
    "path": "../public/_nuxt/about-us.H04ZifLS.css"
  },
  "/_nuxt/about.DE6oHkIs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"87-5JvXhNOhO31RE/2ZkVeHmsjyTqg\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 135,
    "path": "../public/_nuxt/about.DE6oHkIs.css"
  },
  "/_nuxt/article-categories.DPo8n0SR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ac-ww+YRSv6Vr9p5qThORBmHAuI2fg\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 172,
    "path": "../public/_nuxt/article-categories.DPo8n0SR.css"
  },
  "/_nuxt/articles.ByoDRCdR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"109-7tG3M2fMoOh0CJ5JzVM08z57qF8\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 265,
    "path": "../public/_nuxt/articles.ByoDRCdR.css"
  },
  "/_nuxt/b7hvKMAc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1435-UraFim3YKqFLl+QWyHrkRW4Fg/4\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 5173,
    "path": "../public/_nuxt/b7hvKMAc.js"
  },
  "/_nuxt/bDjhns33.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f52-uRHu9wkGG+y0f+63NIo820Bxg5g\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 3922,
    "path": "../public/_nuxt/bDjhns33.js"
  },
  "/_nuxt/bAK5vGBC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4944-eLhjJNngB5SPNZGfGPbRGkSplOc\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 18756,
    "path": "../public/_nuxt/bAK5vGBC.js"
  },
  "/_nuxt/banners.DlWPTzmO.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"51d-/7hlmgcU0G5VmKja7KuLTnCgKMU\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 1309,
    "path": "../public/_nuxt/banners.DlWPTzmO.css"
  },
  "/_nuxt/cB6us9YF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"162-SZOtm9og/J3RJbemtKGpCL1hVpM\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 354,
    "path": "../public/_nuxt/cB6us9YF.js"
  },
  "/_nuxt/cart.GgHjqiwt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"cbf-wFwvi364aZwAC6w3UVEWowANrt0\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 3263,
    "path": "../public/_nuxt/cart.GgHjqiwt.css"
  },
  "/_nuxt/categories.C1KdHYKh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17c-PIbp6OJlrZmVTGiyfDaulbWfRvc\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 380,
    "path": "../public/_nuxt/categories.C1KdHYKh.css"
  },
  "/_nuxt/categories.CpWtuCPm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"134-8sDuHBwWUZjK4n0BIIB3bV3TvKk\"",
    "mtime": "2026-01-24T12:15:19.018Z",
    "size": 308,
    "path": "../public/_nuxt/categories.CpWtuCPm.css"
  },
  "/_nuxt/cdks.Do9wGEGG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"23a-7BvdSekPJ8TV0Gm695aTv+DM2cI\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 570,
    "path": "../public/_nuxt/cdks.Do9wGEGG.css"
  },
  "/_nuxt/community.IeZZa6US.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1130-5lZGBcKlA0MASzTLXiuiYxBhnPk\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 4400,
    "path": "../public/_nuxt/community.IeZZa6US.css"
  },
  "/_nuxt/company.DGWig0Sv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9ca-IB0n8q04DEqoMaDEGUYr13HMnfs\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 2506,
    "path": "../public/_nuxt/company.DGWig0Sv.css"
  },
  "/_nuxt/contact.q9IG2p1K.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"87-ti6eCOJrSOFofwl5YEBeTVMWHE4\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 135,
    "path": "../public/_nuxt/contact.q9IG2p1K.css"
  },
  "/_nuxt/create.oX6yG_Mi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ce8-a1tCs3IxycVFyidZZBNTwiYsUaw\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 3304,
    "path": "../public/_nuxt/create.oX6yG_Mi.css"
  },
  "/_nuxt/detail.BkEqJH0i.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"78-Q0Upkfety3kTwPNFwrE21hHPkJA\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 120,
    "path": "../public/_nuxt/detail.BkEqJH0i.css"
  },
  "/_nuxt/detail.CfiloDHU.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"78-RoTDcKa5MWPbHeWAzygjGV79Z1I\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 120,
    "path": "../public/_nuxt/detail.CfiloDHU.css"
  },
  "/_nuxt/detail.Dz3-9tOj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"78-/6vLCjOda5FpzZeeXiOh63B2Aqk\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 120,
    "path": "../public/_nuxt/detail.Dz3-9tOj.css"
  },
  "/_nuxt/disclaimer.Y0QR5Ist.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dbc-R5Y/EknrmPxA2ELOPZuXU147gLc\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 3516,
    "path": "../public/_nuxt/disclaimer.Y0QR5Ist.css"
  },
  "/_nuxt/eZ5cxvkg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17e1-CXpzPdBh1O705ZqF9G8kszlgZYs\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 6113,
    "path": "../public/_nuxt/eZ5cxvkg.js"
  },
  "/_nuxt/el-alert.G57rL0jl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d84-LIn6pfLRDt+3xIWNSGzZFrF7PVs\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 3460,
    "path": "../public/_nuxt/el-alert.G57rL0jl.css"
  },
  "/_nuxt/el-avatar.BmRr_O8d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36e-cWB3FYKRlmRMpEMmJ6Xdr7MimAY\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 878,
    "path": "../public/_nuxt/el-avatar.BmRr_O8d.css"
  },
  "/_nuxt/el-button.C18MJXp0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c62-fXNB2YOIPMVykC2sjgzAl8wtgvY\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 15458,
    "path": "../public/_nuxt/el-button.C18MJXp0.css"
  },
  "/_nuxt/el-card.BfnAzceq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"397-t6raPemIm3hsNzAOYpRfhcPELRE\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 919,
    "path": "../public/_nuxt/el-card.BfnAzceq.css"
  },
  "/_nuxt/el-checkbox.kru21oEy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1973-hJ2XOCwC1thzUhOFEHaLyCdeXfg\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 6515,
    "path": "../public/_nuxt/el-checkbox.kru21oEy.css"
  },
  "/_nuxt/el-color-picker-panel.NjQqztfJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c3a-26H/WvwSc58N+xG+fqtzNYjRpY4\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 7226,
    "path": "../public/_nuxt/el-color-picker-panel.NjQqztfJ.css"
  },
  "/_nuxt/el-date-picker-panel.DfJdag8h.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6efb-s/7rCaLKUeCImlMT5ix8ath9VQE\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 28411,
    "path": "../public/_nuxt/el-date-picker-panel.DfJdag8h.css"
  },
  "/_nuxt/el-descriptions.CfS05pcB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d59-bZsPlNDX3rd9X4dxf8vWffDHOVc\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 3417,
    "path": "../public/_nuxt/el-descriptions.CfS05pcB.css"
  },
  "/_nuxt/el-dialog.e3ftD6vW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de7-vmBktn0Piz8e6cHjDSPY2nBVQTQ\"",
    "mtime": "2026-01-24T12:15:19.019Z",
    "size": 3559,
    "path": "../public/_nuxt/el-dialog.e3ftD6vW.css"
  },
  "/_nuxt/el-divider.BUtF_RGI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c2-aZTwdFAd2kjucv4FlePPXYHT5f4\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 706,
    "path": "../public/_nuxt/el-divider.BUtF_RGI.css"
  },
  "/_nuxt/el-drawer.Dz7gZKs3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e05-n29rPgE6sX60ntjrSqUSYPhoiAY\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 3589,
    "path": "../public/_nuxt/el-drawer.Dz7gZKs3.css"
  },
  "/_nuxt/el-empty.DZHWrHdf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"484-yurRL7B+PlJy/JxzNr5vT+5tG9I\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 1156,
    "path": "../public/_nuxt/el-empty.DZHWrHdf.css"
  },
  "/_nuxt/el-form.C6L7Wndp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1280-KbRbFU/6m4geTL5t1Q4/q0nGtdk\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 4736,
    "path": "../public/_nuxt/el-form.C6L7Wndp.css"
  },
  "/_nuxt/el-image-viewer.BnNgdT0R.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a44-cRqbt6CZZPBQpACVL2OHnpsMliM\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 2628,
    "path": "../public/_nuxt/el-image-viewer.BnNgdT0R.css"
  },
  "/_nuxt/el-input-number.Bu7TZO0p.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10db-ozAB9NJNkbuxjFYt2j8GRuFv1YI\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 4315,
    "path": "../public/_nuxt/el-input-number.Bu7TZO0p.css"
  },
  "/_nuxt/el-input.CzSQoayR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29f0-PIaX4M2hnsymvhie74CVBIsizNg\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 10736,
    "path": "../public/_nuxt/el-input.CzSQoayR.css"
  },
  "/_nuxt/el-loading.bpKhqqQq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"635-O1A6c6tgtvj5/SRzWCS5wNSWMVs\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 1589,
    "path": "../public/_nuxt/el-loading.bpKhqqQq.css"
  },
  "/_nuxt/el-message-box.CJOz_J0r.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1279-qwgnQ8k26DdtshvXMLUlX0hGzzw\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 4729,
    "path": "../public/_nuxt/el-message-box.CJOz_J0r.css"
  },
  "/_nuxt/el-popover.Dx7EGtyB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f7-l+qAF6F3xG2qUE+zVxNounUH3Gw\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 1527,
    "path": "../public/_nuxt/el-popover.Dx7EGtyB.css"
  },
  "/_nuxt/el-overlay.Db7iXMEX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a2-CiH2pRl8uf+7/CNQFdqMX+6IXvE\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 162,
    "path": "../public/_nuxt/el-overlay.Db7iXMEX.css"
  },
  "/_nuxt/el-pagination.R3dw6MKB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1af4-z+kDNkUzF8vxuXS28TvOSyOAypQ\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 6900,
    "path": "../public/_nuxt/el-pagination.R3dw6MKB.css"
  },
  "/_nuxt/el-popper.DJ3OI_Cw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"965-K4ykt9xZjF1gLEeCp0vDRME8dno\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 2405,
    "path": "../public/_nuxt/el-popper.DJ3OI_Cw.css"
  },
  "/_nuxt/el-progress.DebJDDRi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"375a-HtkQb0bYz2ewLOKuttf1Pltrnzo\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 14170,
    "path": "../public/_nuxt/el-progress.DebJDDRi.css"
  },
  "/_nuxt/el-radio-button.BeOTx1oy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c6c-ZF4oKA2fSQT8i24T7KpGjgMP7iU\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 3180,
    "path": "../public/_nuxt/el-radio-button.BeOTx1oy.css"
  },
  "/_nuxt/el-radio-group.B0bauIRR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1123-hGBcVwqrx+CFrYvmFL/sZF/epPw\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 4387,
    "path": "../public/_nuxt/el-radio-group.B0bauIRR.css"
  },
  "/_nuxt/el-scrollbar.BWxh-h6K.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"52f-GGYkEyguhSa81PVnYeGqExThuso\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 1327,
    "path": "../public/_nuxt/el-scrollbar.BWxh-h6K.css"
  },
  "/_nuxt/el-select.BKzWW-QJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"235f-2Aw+3DtB9Ej9+MAqRjiZ4fIpYbA\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 9055,
    "path": "../public/_nuxt/el-select.BKzWW-QJ.css"
  },
  "/_nuxt/el-row.CsbxBLOD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9902-XFtsI2+JxgbJ7YvA+3NSnMkAnpA\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 39170,
    "path": "../public/_nuxt/el-row.CsbxBLOD.css"
  },
  "/_nuxt/el-skeleton.DGI0JmWj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"62c-w9DE3Q38d0gx8Euw3LRuXPM/zOA\"",
    "mtime": "2026-01-24T12:15:19.020Z",
    "size": 1580,
    "path": "../public/_nuxt/el-skeleton.DGI0JmWj.css"
  },
  "/_nuxt/el-statistic.Bt0nnCWz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"34e-X3bsiein/tQP2Ulx9W2ZeIYSXQM\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 846,
    "path": "../public/_nuxt/el-statistic.Bt0nnCWz.css"
  },
  "/_nuxt/el-switch.BLBNcSVp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f44-x8jEO5hlX5dUEchLfP2kqmdK2JQ\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 3908,
    "path": "../public/_nuxt/el-switch.BLBNcSVp.css"
  },
  "/_nuxt/el-table.ZhXwq-LN.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4b1a-9HvlBscLMDyetYSA36m8+BePxxA\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 19226,
    "path": "../public/_nuxt/el-table.ZhXwq-LN.css"
  },
  "/_nuxt/el-tabs.BGBs9Wmx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3a0e-5mDFTYt8dImvyyBsxRBGVn14Wqw\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 14862,
    "path": "../public/_nuxt/el-tabs.BGBs9Wmx.css"
  },
  "/_nuxt/el-tag.CIs2GBS3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"165c-B1vUGzHzWWqoKv3rR3m/YaBl/SM\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 5724,
    "path": "../public/_nuxt/el-tag.CIs2GBS3.css"
  },
  "/_nuxt/el-tooltip.tn0RQdqM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2026-01-24T12:15:00.654Z",
    "size": 0,
    "path": "../public/_nuxt/el-tooltip.tn0RQdqM.css"
  },
  "/_nuxt/error-404.CYUhy3y9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dca-005xQIrTNdE7LUqKJ7YOCC8lzEw\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 3530,
    "path": "../public/_nuxt/error-404.CYUhy3y9.css"
  },
  "/_nuxt/entry.CxLesyFg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c559-MCZyTs35MiwDMTmgiM7RCQPLvuE\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 50521,
    "path": "../public/_nuxt/entry.CxLesyFg.css"
  },
  "/_nuxt/error-500.CVLkTsZM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75a-W5VxOFBjAs2NvcF8lJBDWJ0iI/o\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 1882,
    "path": "../public/_nuxt/error-500.CVLkTsZM.css"
  },
  "/_nuxt/exchange.D3WX_MC6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13c6-MKR4OoAnnZJfaMRwFTQXWabS1R4\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 5062,
    "path": "../public/_nuxt/exchange.D3WX_MC6.css"
  },
  "/_nuxt/fDfJdqRg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d38-n8ruGtlurkOV6K23hpxpUODSQps\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 3384,
    "path": "../public/_nuxt/fDfJdqRg.js"
  },
  "/_nuxt/faq-categories.Bm1FYbog.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f1-BiFZgvX47nFfpA3/6ky0jkiuDVo\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 241,
    "path": "../public/_nuxt/faq-categories.Bm1FYbog.css"
  },
  "/_nuxt/faq.C5yRKl1-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17d7-vcSTqRNC+V+cSY5OePZE+YAsMZE\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 6103,
    "path": "../public/_nuxt/faq.C5yRKl1-.css"
  },
  "/_nuxt/favorites._Amd8LX2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1467-JSqKQdWjvLLWW4ZxoMLLsj2GkRA\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 5223,
    "path": "../public/_nuxt/favorites._Amd8LX2.css"
  },
  "/_nuxt/images.Dn6IBwgb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1272-R7welHmSMPgrniR7dudJwm4Yovk\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 4722,
    "path": "../public/_nuxt/images.Dn6IBwgb.css"
  },
  "/_nuxt/index.8Kih4236.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"765-R+3lskOBiHiRDpqQU4nGaYNZsmE\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 1893,
    "path": "../public/_nuxt/index.8Kih4236.css"
  },
  "/_nuxt/index.9iD4jYbS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"465-XKtadpo4o+SuQNo158Si50dxa5I\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 1125,
    "path": "../public/_nuxt/index.9iD4jYbS.css"
  },
  "/_nuxt/fcI2nkVr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"60f-atww7obIHMM/oQFQA57Cv916U90\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 1551,
    "path": "../public/_nuxt/fcI2nkVr.js"
  },
  "/_nuxt/gSkaBnqT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"60d-QYb4plAD43hHtl4tOpNIADRRfRg\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 1549,
    "path": "../public/_nuxt/gSkaBnqT.js"
  },
  "/_nuxt/hs4dPNZ2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"905-QXYKchvB1E6SQ3g3hgtbtJphbZ0\"",
    "mtime": "2026-01-24T12:15:19.021Z",
    "size": 2309,
    "path": "../public/_nuxt/hs4dPNZ2.js"
  },
  "/_nuxt/index.BE9wINvq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43a-o6KS+ROt2HlsHfZbumR50PY2Hto\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 1082,
    "path": "../public/_nuxt/index.BE9wINvq.css"
  },
  "/_nuxt/index.BSFP3-h1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4abe-BXAPF5uJVlWgxPbZyHUhIt9Khk4\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 19134,
    "path": "../public/_nuxt/index.BSFP3-h1.css"
  },
  "/_nuxt/index.Bh1RJifZ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"252-ygPuwFYM8fjbafdYyYHPZr+izqA\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 594,
    "path": "../public/_nuxt/index.Bh1RJifZ.css"
  },
  "/_nuxt/index.BhTRlNdV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"93-aCq2AGW93351IF8xkKjXlnDmfCw\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 147,
    "path": "../public/_nuxt/index.BhTRlNdV.css"
  },
  "/_nuxt/index.Bu7aniDf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e51-xmRGl8QTWL2oFZJ/TGcgW1GKf18\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 7761,
    "path": "../public/_nuxt/index.Bu7aniDf.css"
  },
  "/_nuxt/index.C4A67DAD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"285-oGfaH4meIvROcvfe8WRQm+QKjUs\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 645,
    "path": "../public/_nuxt/index.C4A67DAD.css"
  },
  "/_nuxt/index.BzJSwEai.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"321-ft9OilebTYDMMOaTCMtLz/skI5I\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 801,
    "path": "../public/_nuxt/index.BzJSwEai.css"
  },
  "/_nuxt/index.C6HcPte3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5ef-fksST1Y8asTrN5VNH0khLUKmhDw\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 1519,
    "path": "../public/_nuxt/index.C6HcPte3.css"
  },
  "/_nuxt/index.CgIFiLQc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29e-wbgOBZATc8PvAKT2hniOzBlKT4c\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 670,
    "path": "../public/_nuxt/index.CgIFiLQc.css"
  },
  "/_nuxt/index.CurW-ZgW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"321-SVU7nSqSGdbN20QJHC1Uc653SZs\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 801,
    "path": "../public/_nuxt/index.CurW-ZgW.css"
  },
  "/_nuxt/index.DBSzsetL.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"592-S1tyJfuC369pFUeoJmEvN1m15zQ\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 1426,
    "path": "../public/_nuxt/index.DBSzsetL.css"
  },
  "/_nuxt/index.DS6yraUP.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"31-b8foFzyAvXn9B5+OTjPseYx2494\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 49,
    "path": "../public/_nuxt/index.DS6yraUP.css"
  },
  "/_nuxt/index.DSCwiAPj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2cf-x/G2Anr1UVtBlulX6MJ5iSceGXw\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 719,
    "path": "../public/_nuxt/index.DSCwiAPj.css"
  },
  "/_nuxt/index.DVro3iIr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b41-dVuIweBUZpO1UMwPoMPWDnABI+U\"",
    "mtime": "2026-01-24T12:15:19.022Z",
    "size": 2881,
    "path": "../public/_nuxt/index.DVro3iIr.css"
  },
  "/_nuxt/index.DXh4ep5r.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5a6-IPWdhs07iZedYzR0jT3QoFdltTo\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 1446,
    "path": "../public/_nuxt/index.DXh4ep5r.css"
  },
  "/_nuxt/index.Dim5fwiW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a9-+aFJEBxI7wf9IvKGumsJopAr82U\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 1961,
    "path": "../public/_nuxt/index.Dim5fwiW.css"
  },
  "/_nuxt/index.DqKvmme3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"34c4-jgo1qL9+tW/X4/enMGvGc/FBHDc\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 13508,
    "path": "../public/_nuxt/index.DqKvmme3.css"
  },
  "/_nuxt/index.GOiDEjTt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"cf-zOH8Lv7JVmXmI35r1sO35ofL77g\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 207,
    "path": "../public/_nuxt/index.GOiDEjTt.css"
  },
  "/_nuxt/index.QWEAunr6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"77-h2JPiF6OWKbzyA2VntV8uOyEUss\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 119,
    "path": "../public/_nuxt/index.QWEAunr6.css"
  },
  "/_nuxt/index.Wbkfjv_d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"23d-V8aPMtAcgleV2qIb34KWjjLsAgQ\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 573,
    "path": "../public/_nuxt/index.Wbkfjv_d.css"
  },
  "/_nuxt/index.YaRlAAYs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b1-0O57RdVejMU9buJCDgEnXq51bMY\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 1457,
    "path": "../public/_nuxt/index.YaRlAAYs.css"
  },
  "/_nuxt/index._Tavdr7K.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1fb-t5mbJHBXvj3yflE5itVEB7MK5Gs\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 507,
    "path": "../public/_nuxt/index._Tavdr7K.css"
  },
  "/_nuxt/index.jHv6_fmr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f0-fCoCZ3QF6sTMrOevwo/7Z/pMP1s\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 496,
    "path": "../public/_nuxt/index.jHv6_fmr.css"
  },
  "/_nuxt/index.oMO9CK5T.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"77-1+G+Q3rmx/qeqqo5mFYcGoYV85E\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 119,
    "path": "../public/_nuxt/index.oMO9CK5T.css"
  },
  "/_nuxt/index.wVCyNYCn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ea-EyUey0RKUGfqSBKlhZzFYEdjt7Q\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 490,
    "path": "../public/_nuxt/index.wVCyNYCn.css"
  },
  "/_nuxt/jWYXtKgl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1912-QJm9FgXjQai194MWnXjrzhCcoIY\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 6418,
    "path": "../public/_nuxt/jWYXtKgl.js"
  },
  "/_nuxt/k5_FaFiI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24e-L7Ui2Pb8b4EmA9P6nNvivlAMVZk\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 590,
    "path": "../public/_nuxt/k5_FaFiI.js"
  },
  "/_nuxt/login.BTsX2Whp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"23b-s2cE34t8AOTrXDsDy3QU6wZrOqM\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 571,
    "path": "../public/_nuxt/login.BTsX2Whp.css"
  },
  "/_nuxt/messages.BPAbULRN.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1172-lo7pJhZRs31+AVF2qjT1u1Voj+4\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 4466,
    "path": "../public/_nuxt/messages.BPAbULRN.css"
  },
  "/_nuxt/orders.DETPOTrc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28-UDTc0HvnHGktE4jzqjBFXyJv6Qo\"",
    "mtime": "2026-01-24T12:15:19.023Z",
    "size": 40,
    "path": "../public/_nuxt/orders.DETPOTrc.css"
  },
  "/_nuxt/policy.CNZ_s9xk.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1504-vUvWMnpzSs7J2vlw3Wn1lT3CTyk\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 5380,
    "path": "../public/_nuxt/policy.CNZ_s9xk.css"
  },
  "/_nuxt/p53fltmq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b-Ot9KGlHRwEKJWOLDD9ER1IylAww\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 107,
    "path": "../public/_nuxt/p53fltmq.js"
  },
  "/_nuxt/post.044q0QVY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4dc-HRI/h42y+WJ9zGTOeIaOjpRK1S4\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 1244,
    "path": "../public/_nuxt/post.044q0QVY.css"
  },
  "/_nuxt/post.BA1VNE61.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"171e-KOLHuy9iMd8WT0AZ/cNXUt54fgw\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 5918,
    "path": "../public/_nuxt/post.BA1VNE61.css"
  },
  "/_nuxt/post.BUFsD42D.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6fa-4ZmyezBU5F45ijaTr+mqUCD03bw\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 1786,
    "path": "../public/_nuxt/post.BUFsD42D.css"
  },
  "/_nuxt/post.BjCkjuIT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6fa-t/PXU99S/X6nK8z1xflkZYXBV2g\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 1786,
    "path": "../public/_nuxt/post.BjCkjuIT.css"
  },
  "/_nuxt/post.BtE1kFeS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6d0-jqC+twR8IBJ1W5NRHwjquU1TciI\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 1744,
    "path": "../public/_nuxt/post.BtE1kFeS.css"
  },
  "/_nuxt/post.CeY-a_ad.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2842-ZWN123rtPsRcAYhb2KWl7JAqVgo\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 10306,
    "path": "../public/_nuxt/post.CeY-a_ad.css"
  },
  "/_nuxt/post.D4D45D13.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b9-Vuu9NVdmqcMOstUGT8WycH4gh2U\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 697,
    "path": "../public/_nuxt/post.D4D45D13.css"
  },
  "/_nuxt/privacy.DF34kCD6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"19f5-/1hYHD1mhtEHxffx9IXn0OnkRZ8\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 6645,
    "path": "../public/_nuxt/privacy.DF34kCD6.css"
  },
  "/_nuxt/profile.BZawJNWJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f8c-IwLO5254gyAXtw512d/HjfFPEfI\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 8076,
    "path": "../public/_nuxt/profile.BZawJNWJ.css"
  },
  "/_nuxt/referral.DY_82wub.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fe9-NY/yNcSTOalLatV+1E6ajxWFlyQ\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 4073,
    "path": "../public/_nuxt/referral.DY_82wub.css"
  },
  "/_nuxt/refund.CUGsF1Xu.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11fa-pbRNADACd+PkfZ9UXmXI/Mlathw\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 4602,
    "path": "../public/_nuxt/refund.CUGsF1Xu.css"
  },
  "/_nuxt/scheduler.BPkk3cb3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6dc-3aR6aRPwXht2p7N66HgqcjmIlR8\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 1756,
    "path": "../public/_nuxt/scheduler.BPkk3cb3.css"
  },
  "/_nuxt/post.BmvEN13d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6e2-LvGFk6+F+KUpjZ8zxOeQroAZ7X8\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 1762,
    "path": "../public/_nuxt/post.BmvEN13d.css"
  },
  "/_nuxt/shared-sku.B9ReYh_H.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"34e-Q1LtQnRcBamSon1EdtMfknGDgRg\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 846,
    "path": "../public/_nuxt/shared-sku.B9ReYh_H.css"
  },
  "/_nuxt/rgcIl52W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4fb-dz5mukFckR5uyIwKrDAcD4qVTbI\"",
    "mtime": "2026-01-24T12:15:19.024Z",
    "size": 1275,
    "path": "../public/_nuxt/rgcIl52W.js"
  },
  "/_nuxt/sHGdv3x9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33cc-KFyBBoBdfNqwQukfYfbuBZv+JhE\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 13260,
    "path": "../public/_nuxt/sHGdv3x9.js"
  },
  "/_nuxt/skus.Ch-V3FOe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2da-zDUNEig0QgFRaWyzV7qKQfCQzTQ\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 730,
    "path": "../public/_nuxt/skus.Ch-V3FOe.css"
  },
  "/_nuxt/sthhDNTi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b-Ot9KGlHRwEKJWOLDD9ER1IylAww\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 107,
    "path": "../public/_nuxt/sthhDNTi.js"
  },
  "/_nuxt/storage.B98ZGnu2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13e-UtemucBmrIdXeq/gyhVew9sHtsU\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 318,
    "path": "../public/_nuxt/storage.B98ZGnu2.css"
  },
  "/_nuxt/tE-fQquF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2713-fN2EYxwMUsjIv48H+SW+elif2Vk\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 10003,
    "path": "../public/_nuxt/tE-fQquF.js"
  },
  "/_nuxt/tbxUD7ww.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54-2005ADu+ZzjtXaMDyRaQMsZndzY\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 84,
    "path": "../public/_nuxt/tbxUD7ww.js"
  },
  "/_nuxt/tickets.CHWjhNvF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e1d-zhnylcOeBC3V+yPy4OgLR47MYYE\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 7709,
    "path": "../public/_nuxt/tickets.CHWjhNvF.css"
  },
  "/_nuxt/tiers.D0wfXBMB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"cb-UY1wk50wPe1OviaWCrBSVhCLiIk\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 203,
    "path": "../public/_nuxt/tiers.D0wfXBMB.css"
  },
  "/_nuxt/uZ_KtR8H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4d9-nIVkDUixZz7rAXHUPXnKSIywSPg\"",
    "mtime": "2026-01-24T12:15:19.026Z",
    "size": 1241,
    "path": "../public/_nuxt/uZ_KtR8H.js"
  },
  "/_nuxt/v1LGHGlD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eab-BVzSrh5zIoLZfeJleCPxbquiCzI\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 3755,
    "path": "../public/_nuxt/v1LGHGlD.js"
  },
  "/_nuxt/wVnq5BSo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1dc-2BInrt4Ye1EO/yS/uduuOi0BNHY\"",
    "mtime": "2026-01-24T12:15:19.026Z",
    "size": 476,
    "path": "../public/_nuxt/wVnq5BSo.js"
  },
  "/_nuxt/wallet.CrHoiDI0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"16d9-1uLgco0+DZYruSnNp3tvufZh518\"",
    "mtime": "2026-01-24T12:15:19.025Z",
    "size": 5849,
    "path": "../public/_nuxt/wallet.CrHoiDI0.css"
  },
  "/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3804-H1DHRu8OlJ3rHl4F1SjAGmxDvdA\"",
    "mtime": "2026-01-24T12:15:19.034Z",
    "size": 14340,
    "path": "../public/images/.DS_Store"
  },
  "/images/.gitkeep": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1-uFjLKCYX+wlW2WAhXI6E0cz5CcY\"",
    "mtime": "2026-01-24T12:15:19.035Z",
    "size": 1,
    "path": "../public/images/.gitkeep"
  },
  "/privacy/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"15d33-dxCNMMCppRntQPXgp8j7OM5XUm4\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 89395,
    "path": "../public/privacy/index.html"
  },
  "/profile/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1bac8-pTXJtf6Z0Pk3bZBFtHKXpq39Utw\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 113352,
    "path": "../public/profile/index.html"
  },
  "/policy/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"16169-NccmJ5wfAGe43t1m2QHxnd8WNyo\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 90473,
    "path": "../public/policy/index.html"
  },
  "/_mgmt_9Xfa3/article/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/article/index.html"
  },
  "/service/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"109ab-gP5+N+78GgkjUHQjR5ZjxKJz6DU\"",
    "mtime": "2026-01-24T12:15:18.521Z",
    "size": 68011,
    "path": "../public/service/index.html"
  },
  "/refund/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"14664-hRYlTy4Gk+8sWGPC/6BdH1PIF3c\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 83556,
    "path": "../public/refund/index.html"
  },
  "/_mgmt_9Xfa3/backend-settings/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/backend-settings/index.html"
  },
  "/_mgmt_9Xfa3/coupons/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/coupons/index.html"
  },
  "/_mgmt_9Xfa3/banners/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/banners/index.html"
  },
  "/_mgmt_9Xfa3/help-center/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.912Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/help-center/index.html"
  },
  "/_mgmt_9Xfa3/login/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"12e70-mAVvBdGv6xlye3dfAthlTvR5g6U\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 77424,
    "path": "../public/_mgmt_9Xfa3/login/index.html"
  },
  "/_mgmt_9Xfa3/media/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/media/index.html"
  },
  "/_mgmt_9Xfa3/cdk/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/cdk/index.html"
  },
  "/_mgmt_9Xfa3/images/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/images/index.html"
  },
  "/_mgmt_9Xfa3/messages/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/messages/index.html"
  },
  "/_mgmt_9Xfa3/orders/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/index.html"
  },
  "/_mgmt_9Xfa3/products/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/products/index.html"
  },
  "/_mgmt_9Xfa3/recharge/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/recharge/index.html"
  },
  "/_mgmt_9Xfa3/tickets/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/tickets/index.html"
  },
  "/_mgmt_9Xfa3/users/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/users/index.html"
  },
  "/_mgmt_9Xfa3/refunds/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/refunds/index.html"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-T33h7Joo/DI9i0kt1kIyDpyhWHA\"",
    "mtime": "2026-01-24T12:15:18.973Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/images/modal/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-80avadns+zma1dIvdnpWuC8Ujq4\"",
    "mtime": "2026-01-24T12:15:19.043Z",
    "size": 8196,
    "path": "../public/images/modal/.DS_Store"
  },
  "/images/client/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2804-FrrhK2SEuVTD9xNHwxVenzPfz98\"",
    "mtime": "2026-01-24T12:15:19.034Z",
    "size": 10244,
    "path": "../public/images/client/.DS_Store"
  },
  "/images/shared/logo.png": {
    "type": "image/png",
    "etag": "\"86b-VYpDUXN23nROjZUxFyTXad8FlEE\"",
    "mtime": "2026-01-24T12:15:19.034Z",
    "size": 2155,
    "path": "../public/images/shared/logo.png"
  },
  "/images/shared/oauth-github.png": {
    "type": "image/png",
    "etag": "\"995-83npvvkLFuN8mqoM4LVIBVMFznM\"",
    "mtime": "2026-01-24T12:15:19.035Z",
    "size": 2453,
    "path": "../public/images/shared/oauth-github.png"
  },
  "/images/shared/oauth-facebook.png": {
    "type": "image/png",
    "etag": "\"7fa-9y597WwYhAf8u+jY44RTwuqV/VY\"",
    "mtime": "2026-01-24T12:15:19.035Z",
    "size": 2042,
    "path": "../public/images/shared/oauth-facebook.png"
  },
  "/images/shared/oauth-google.png": {
    "type": "image/png",
    "etag": "\"1126-PFrlnwemHmK6hv4CqCyiHqYVsgU\"",
    "mtime": "2026-01-24T12:15:19.036Z",
    "size": 4390,
    "path": "../public/images/shared/oauth-google.png"
  },
  "/images/theme/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2026-01-24T12:15:19.036Z",
    "size": 6148,
    "path": "../public/images/theme/.DS_Store"
  },
  "/profile/exchange/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"168f3-yfzfOmKMCHvFzTQKGZkqo57DhYQ\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 92403,
    "path": "../public/profile/exchange/index.html"
  },
  "/images/shared/logo_v2.png": {
    "type": "image/png",
    "etag": "\"61281-ZCbx++ztEvi+l4qGavx2IdJ+r80\"",
    "mtime": "2026-01-24T12:15:19.035Z",
    "size": 397953,
    "path": "../public/images/shared/logo_v2.png"
  },
  "/images/shared/logo_v3.png": {
    "type": "image/png",
    "etag": "\"5c9ab-mfTjwDQP0bORYbS2xru40ut0i4w\"",
    "mtime": "2026-01-24T12:15:19.036Z",
    "size": 379307,
    "path": "../public/images/shared/logo_v3.png"
  },
  "/profile/favorites/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"172cd-B3uyr35pDPXLLPdTyqXjIhpVRek\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 94925,
    "path": "../public/profile/favorites/index.html"
  },
  "/profile/messages/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"16975-Z81zEQmIl59Z4Mevz8ybqIpeJws\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 92533,
    "path": "../public/profile/messages/index.html"
  },
  "/profile/order/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"16d4b-uTQpTfpE2W9+dgZm2QMP/VhDAF8\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 93515,
    "path": "../public/profile/order/index.html"
  },
  "/profile/referral/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"165db-yO1WQFyFY329kB4bTZzoui34aWo\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 91611,
    "path": "../public/profile/referral/index.html"
  },
  "/profile/tickets/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"16b77-15u9yxe1k4PqNN7u/3BcFkMle30\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 93047,
    "path": "../public/profile/tickets/index.html"
  },
  "/profile/wallet/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1717b-+On5kt5hpJaxwWYIzkaiYfnxLUU\"",
    "mtime": "2026-01-24T12:15:18.737Z",
    "size": 94587,
    "path": "../public/profile/wallet/index.html"
  },
  "/_mgmt_9Xfa3/article/categories/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/article/categories/index.html"
  },
  "/images/theme/ambassador.png": {
    "type": "image/png",
    "etag": "\"d0a33-VA3VWJV1Kyqbp3EVZghNVjmnsok\"",
    "mtime": "2026-01-24T12:15:19.035Z",
    "size": 854579,
    "path": "../public/images/theme/ambassador.png"
  },
  "/_mgmt_9Xfa3/article/post/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/article/post/index.html"
  },
  "/_mgmt_9Xfa3/backend-settings/scheduler/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/backend-settings/scheduler/index.html"
  },
  "/_mgmt_9Xfa3/backend-settings/storage/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/backend-settings/storage/index.html"
  },
  "/_mgmt_9Xfa3/coupons/flat/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.912Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/coupons/flat/index.html"
  },
  "/_mgmt_9Xfa3/coupons/balance/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/coupons/balance/index.html"
  },
  "/_mgmt_9Xfa3/coupons/product/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/coupons/product/index.html"
  },
  "/_mgmt_9Xfa3/coupons/stats/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.912Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/coupons/stats/index.html"
  },
  "/_mgmt_9Xfa3/cdk/cdks/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/cdk/cdks/index.html"
  },
  "/_mgmt_9Xfa3/cdk/accounts/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/cdk/accounts/index.html"
  },
  "/_mgmt_9Xfa3/cdk/keys/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/cdk/keys/index.html"
  },
  "/_mgmt_9Xfa3/cdk/debug/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/cdk/debug/index.html"
  },
  "/_mgmt_9Xfa3/cdk/post/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/cdk/post/index.html"
  },
  "/_mgmt_9Xfa3/cdk/virtual/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.736Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/cdk/virtual/index.html"
  },
  "/_mgmt_9Xfa3/help-center/article-categories/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.957Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/help-center/article-categories/index.html"
  },
  "/_mgmt_9Xfa3/help-center/faq/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.915Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/help-center/faq/index.html"
  },
  "/_mgmt_9Xfa3/help-center/articles/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.912Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/help-center/articles/index.html"
  },
  "/_mgmt_9Xfa3/help-center/faq-categories/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.915Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/help-center/faq-categories/index.html"
  },
  "/_mgmt_9Xfa3/media/banners/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/media/banners/index.html"
  },
  "/_mgmt_9Xfa3/media/images/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/media/images/index.html"
  },
  "/_mgmt_9Xfa3/orders/cancelled-refunds/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/cancelled-refunds/index.html"
  },
  "/_mgmt_9Xfa3/orders/cdkey/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/cdkey/index.html"
  },
  "/_mgmt_9Xfa3/orders/preorders/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/preorders/index.html"
  },
  "/_mgmt_9Xfa3/orders/recharge/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/recharge/index.html"
  },
  "/_mgmt_9Xfa3/orders/refund/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/refund/index.html"
  },
  "/_mgmt_9Xfa3/orders/share/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/share/index.html"
  },
  "/_mgmt_9Xfa3/products/categories/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.957Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/products/categories/index.html"
  },
  "/_mgmt_9Xfa3/products/post/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/products/post/index.html"
  },
  "/_mgmt_9Xfa3/products/skus/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.957Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/products/skus/index.html"
  },
  "/_mgmt_9Xfa3/recharge/orders/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.912Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/recharge/orders/index.html"
  },
  "/_mgmt_9Xfa3/products/shared-sku/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.957Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/products/shared-sku/index.html"
  },
  "/_mgmt_9Xfa3/recharge/tiers/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.912Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/recharge/tiers/index.html"
  },
  "/_mgmt_9Xfa3/users/accounts/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/users/accounts/index.html"
  },
  "/_mgmt_9Xfa3/users/departments/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/users/departments/index.html"
  },
  "/_nuxt/builds/meta/dev.json": {
    "type": "application/json",
    "etag": "\"6a-wNS12kHy9ZeL5FRPsK4G00U0+yU\"",
    "mtime": "2026-01-24T12:15:18.972Z",
    "size": 106,
    "path": "../public/_nuxt/builds/meta/dev.json"
  },
  "/_nuxt/builds/meta/f8972843-0c4a-4c6d-8269-570140ca48bc.json": {
    "type": "application/json",
    "etag": "\"8b-8Isi2PWwDSVAIgnaBGO0w6C+5jU\"",
    "mtime": "2026-01-24T12:15:18.972Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/f8972843-0c4a-4c6d-8269-570140ca48bc.json"
  },
  "/images/client/mobile/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2026-01-24T12:15:19.035Z",
    "size": 6148,
    "path": "../public/images/client/mobile/.DS_Store"
  },
  "/images/client/pc/kefuweinxin1.png": {
    "type": "image/png",
    "etag": "\"310-C2vG8SiXrbZ0Yunb9KXW+l22rzY\"",
    "mtime": "2026-01-24T12:15:19.035Z",
    "size": 784,
    "path": "../public/images/client/pc/kefuweinxin1.png"
  },
  "/images/client/pc/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2804-AlQy3K6s/ROIChESGBoHmNJ8RIo\"",
    "mtime": "2026-01-24T12:15:19.036Z",
    "size": 10244,
    "path": "../public/images/client/pc/.DS_Store"
  },
  "/images/client/pc/link1.png": {
    "type": "image/png",
    "etag": "\"2d1-5xnlL9qsHSGxF/F8MrjgHGSWto0\"",
    "mtime": "2026-01-24T12:15:19.038Z",
    "size": 721,
    "path": "../public/images/client/pc/link1.png"
  },
  "/images/client/pc/zhifu2.png": {
    "type": "image/png",
    "etag": "\"49ce5-yRLhQVcpUb0zN/uXRyThPhcYx6I\"",
    "mtime": "2026-01-24T12:15:19.040Z",
    "size": 302309,
    "path": "../public/images/client/pc/zhifu2.png"
  },
  "/images/client/pc/weixin.png": {
    "type": "image/png",
    "etag": "\"54de2-aBD5CyFkJfpdCutIZb6zn5IU3KE\"",
    "mtime": "2026-01-24T12:15:19.040Z",
    "size": 347618,
    "path": "../public/images/client/pc/weixin.png"
  },
  "/images/client/pc/zhifu2_副本.png": {
    "type": "image/png",
    "etag": "\"3d2-DOt3da8id4lW/XkVBoXWAPgSkpw\"",
    "mtime": "2026-01-24T12:15:19.038Z",
    "size": 978,
    "path": "../public/images/client/pc/zhifu2_副本.png"
  },
  "/support/refund/create/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"122a3-SabiGEdVgEOz78OnbDWa6o68HV0\"",
    "mtime": "2026-01-24T12:15:18.959Z",
    "size": 74403,
    "path": "../public/support/refund/create/index.html"
  },
  "/_mgmt_9Xfa3/coupons/balance/post/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.951Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/coupons/balance/post/index.html"
  },
  "/images/modal/pc/mascot_02.png": {
    "type": "image/png",
    "etag": "\"7bf59-qOoSUm1yvk0AlzER0CxR4r5sBqI\"",
    "mtime": "2026-01-24T12:15:19.044Z",
    "size": 507737,
    "path": "../public/images/modal/pc/mascot_02.png"
  },
  "/_mgmt_9Xfa3/coupons/flat/post/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/coupons/flat/post/index.html"
  },
  "/_mgmt_9Xfa3/coupons/product/post/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.952Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/coupons/product/post/index.html"
  },
  "/images/modal/pc/mascot_01.png": {
    "type": "image/png",
    "etag": "\"9df97-UkSnzbvWZnqNNap7uaOdIsG6x9E\"",
    "mtime": "2026-01-24T12:15:19.043Z",
    "size": 647063,
    "path": "../public/images/modal/pc/mascot_01.png"
  },
  "/_mgmt_9Xfa3/help-center/faq/post/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/help-center/faq/post/index.html"
  },
  "/_mgmt_9Xfa3/orders/cdkey/detail/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.951Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/cdkey/detail/index.html"
  },
  "/_mgmt_9Xfa3/help-center/articles/post/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.958Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/help-center/articles/post/index.html"
  },
  "/_mgmt_9Xfa3/orders/recharge/detail/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.911Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/recharge/detail/index.html"
  },
  "/_mgmt_9Xfa3/orders/share/detail/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.952Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/orders/share/detail/index.html"
  },
  "/_mgmt_9Xfa3/tickets/components/TicketChatModal/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"68-LmS8bJShzCTaweogWhe3/mf27QE\"",
    "mtime": "2026-01-24T12:15:18.959Z",
    "size": 104,
    "path": "../public/_mgmt_9Xfa3/tickets/components/TicketChatModal/index.html"
  },
  "/images/client/pc/avatars/avatar-bear.png": {
    "type": "image/png",
    "etag": "\"4f858-R8+HbEoP6YY0LY8LOc4q9qLUv5U\"",
    "mtime": "2026-01-24T12:15:19.043Z",
    "size": 325720,
    "path": "../public/images/client/pc/avatars/avatar-bear.png"
  },
  "/images/client/pc/avatars/avatar-bunny.png": {
    "type": "image/png",
    "etag": "\"53cce-wuU5ttLtsV7io+3xE2oT13RNaF8\"",
    "mtime": "2026-01-24T12:15:19.042Z",
    "size": 343246,
    "path": "../public/images/client/pc/avatars/avatar-bunny.png"
  },
  "/images/client/pc/avatars/avatar-cat.png": {
    "type": "image/png",
    "etag": "\"52be1-yzPOlUeJptsQEx98oFmobAupjQ0\"",
    "mtime": "2026-01-24T12:15:19.039Z",
    "size": 338913,
    "path": "../public/images/client/pc/avatars/avatar-cat.png"
  },
  "/images/client/pc/avatars/avatar-frog.png": {
    "type": "image/png",
    "etag": "\"4c8c9-BgJB5/7fhMwWe6RbGx1hRtUGYBk\"",
    "mtime": "2026-01-24T12:15:19.042Z",
    "size": 313545,
    "path": "../public/images/client/pc/avatars/avatar-frog.png"
  },
  "/images/client/pc/avatars/avatar-owl.png": {
    "type": "image/png",
    "etag": "\"510e6-ibOK4pJ7yntjS0Pv+pCQTwzvTpk\"",
    "mtime": "2026-01-24T12:15:19.042Z",
    "size": 332006,
    "path": "../public/images/client/pc/avatars/avatar-owl.png"
  },
  "/images/client/pc/avatars/avatar-penguin.png": {
    "type": "image/png",
    "etag": "\"60417-VOdMBDplAjF5KCe1KqJtZULcrIg\"",
    "mtime": "2026-01-24T12:15:19.043Z",
    "size": 394263,
    "path": "../public/images/client/pc/avatars/avatar-penguin.png"
  },
  "/images/client/pc/avatars/avatar-2.png": {
    "type": "image/png",
    "etag": "\"95699-eiVh8dZqZKiNb+KP5I4PEnHE6Z0\"",
    "mtime": "2026-01-24T12:15:19.042Z",
    "size": 611993,
    "path": "../public/images/client/pc/avatars/avatar-2.png"
  },
  "/images/client/pc/avatars/avatar-1.png": {
    "type": "image/png",
    "etag": "\"974b2-Dz/F5gMzZoCRA97yng3+ai8F0n4\"",
    "mtime": "2026-01-24T12:15:19.036Z",
    "size": 619698,
    "path": "../public/images/client/pc/avatars/avatar-1.png"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _2qpWSd = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_8EFkQE = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _2qpWSd, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_8EFkQE, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_8EFkQE, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, createRouter$1 as A, defu as B, setCookie as C, getCookie as D, deleteCookie as E, nodeServer as F, getRouteRules as a, useNitroApp as b, createError$1 as c, defineRenderHandler as d, getResponseStatusText as e, getResponseStatus as f, getQuery as g, hasProtocol as h, isScriptProtocol as i, joinRelativeURL as j, joinURL as k, getContext as l, withTrailingSlash as m, withoutTrailingSlash as n, destr as o, parseQuery as p, klona as q, createHooks as r, sanitizeStatusCode as s, executeAsync as t, useRuntimeConfig as u, parse as v, withQuery as w, getRequestHeader as x, isEqual as y, toRouteMatcher as z };
//# sourceMappingURL=nitro.mjs.map
