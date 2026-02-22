import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import crypto$1 from 'crypto';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$2, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { toValue } from 'vue';
import { createConsola } from 'consola';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';

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
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
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
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  let match = input.match(PROTOCOL_REGEX);
  if (!match) {
    match = input.match(/^\/{2,}/);
  }
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
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
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
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

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
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

function o$1(n){throw new Error(`${n} is not implemented yet!`)}let i$2 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o$1("Readable.asyncIterator")}iterator(e){throw o$1("Readable.iterator")}map(e,t){throw o$1("Readable.map")}filter(e,t){throw o$1("Readable.filter")}forEach(e,t){throw o$1("Readable.forEach")}reduce(e,t,r){throw o$1("Readable.reduce")}find(e,t){throw o$1("Readable.find")}findIndex(e,t){throw o$1("Readable.findIndex")}some(e,t){throw o$1("Readable.some")}toArray(e){throw o$1("Readable.toArray")}every(e,t){throw o$1("Readable.every")}flatMap(e,t){throw o$1("Readable.flatMap")}drop(e,t){throw o$1("Readable.drop")}take(e,t){throw o$1("Readable.take")}asIndexedPairs(e){throw o$1("Readable.asIndexedPairs")}};let l$2 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$2=class c{allowHalfOpen=true;_destroy;constructor(e=new i$2,t=new l$2){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _$1(){return Object.assign(c$2.prototype,i$2.prototype),Object.assign(c$2.prototype,l$2.prototype),c$2}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_$1();let A$1 = class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}};class y extends i$2{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A$1;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$2{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R$1(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S$1=new Set([101,204,205,304]);async function b$1(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R$1(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S$1.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C$1(n,e,t={}){try{const r=await b$1(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

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
function getMethod(event, defaultMethod = "GET") {
  return (event.node.req.method || defaultMethod).toUpperCase();
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
const getHeader = getRequestHeader;
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
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
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
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
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
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
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
  return parse(event.node.req.headers.cookie || "");
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
const setHeader = setResponseHeader;
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

const s$1=globalThis.Headers,i$1=globalThis.AbortController,l$1=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

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
    return l$1;
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
    return l$1(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController$1 = globalThis.AbortController || i$1;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController: AbortController$1 });
const $fetch$1 = ofetch;

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
function isPrimitive$1(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive$1(value)) {
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
      const entryPath = resolve$2(dir, entry.name);
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
      const entryPath = resolve$2(dir, entry.name);
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
  opts.base = resolve$2(opts.base);
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

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c$1().serialize(o)}const c$1=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize$1(object1) === serialize$1(object2)) {
    return true;
  }
  return false;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r$1="sha256",s="base64url";function digest(t){if(e)return e(r$1,t,s);const o=createHash(r$1).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash$1(input) {
  return digest(serialize$1(input));
}

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
    "buildId": "c13ff7cf-4f7c-496a-8076-7006a14880e9",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/manager_portal/**": {
        "ssr": false
      },
      "/api/**": {
        "cors": true,
        "headers": {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "*",
          "access-control-allow-headers": "*",
          "access-control-max-age": "0"
        }
      },
      "/": {
        "headers": {
          "cache-control": "no-cache"
        }
      },
      "/pc": {
        "headers": {
          "cache-control": "no-cache"
        }
      },
      "/mobile": {
        "headers": {
          "cache-control": "no-cache"
        }
      },
      "/pc/product/**": {
        "swr": 600,
        "cache": {
          "swr": true,
          "maxAge": 600
        }
      },
      "/mobile/product/**": {
        "swr": 600,
        "cache": {
          "swr": true,
          "maxAge": 600
        }
      },
      "/pc/article/**": {
        "swr": 3600,
        "cache": {
          "swr": true,
          "maxAge": 3600
        }
      },
      "/mobile/article/**": {
        "swr": 3600,
        "cache": {
          "swr": true,
          "maxAge": 3600
        }
      },
      "/pc/profile/**": {
        "ssr": false
      },
      "/mobile/profile/**": {
        "ssr": false
      },
      "/pc/checkout/**": {
        "ssr": false
      },
      "/mobile/checkout/**": {
        "ssr": false
      },
      "/__sitemap__/style.xsl": {
        "headers": {
          "Content-Type": "application/xslt+xml"
        }
      },
      "/sitemap.xml": {},
      "/_nuxt": {
        "robots": "noindex",
        "headers": {
          "X-Robots-Tag": "noindex"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable",
          "X-Robots-Tag": "noindex"
        },
        "robots": "noindex"
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
      }
    }
  },
  "public": {
    "apiBase": "http://127.0.0.1:54321",
    "appName": "凡图拉",
    "siteUrl": "https://www.fantula.com",
    "wechatAppid": "wxc2042fae927b28b8",
    "supabaseUrl": "http://127.0.0.1:54321",
    "supabaseAnonKey": "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH",
    "schedulerUrl": "/api/admin/scheduler",
    "nuxt-robots": {
      "version": "5.7.0",
      "isNuxtContentV2": false,
      "debug": false,
      "credits": true,
      "groups": [
        {
          "comment": [],
          "disallow": [],
          "allow": [
            "/",
            "/community",
            "/article/*",
            "/about-us",
            "/service",
            "/faq"
          ],
          "userAgent": [
            "*"
          ],
          "contentUsage": [],
          "contentSignal": [],
          "_indexable": true,
          "_rules": [
            {
              "pattern": "/",
              "allow": true
            },
            {
              "pattern": "/community",
              "allow": true
            },
            {
              "pattern": "/article/*",
              "allow": true
            },
            {
              "pattern": "/about-us",
              "allow": true
            },
            {
              "pattern": "/service",
              "allow": true
            },
            {
              "pattern": "/faq",
              "allow": true
            }
          ],
          "_normalized": true
        }
      ],
      "sitemap": [
        "http://localhost:3000/sitemap.xml",
        "/sitemap.xml"
      ],
      "header": true,
      "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      "robotsDisabledValue": "noindex, nofollow",
      "cacheControl": "max-age=14400, must-revalidate",
      "botDetection": true,
      "pageMetaRobots": {}
    }
  },
  "apiSecret": "",
  "supabaseKey": "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH",
  "supabaseServiceKey": "sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz",
  "wechatPayMchid": "1716074381",
  "wechatPayAppid": "wxc2042fae927b28b8",
  "wechatPayApiV3Key": "lWm9tNYwCIDsnzhedfqz1QVvK4pmAoBb",
  "wechatPaySerialNo": "53245181B4BB24F7AC58047FED958C04057735F9",
  "wechatPayPrivateKey": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMTogoAZexax27\\nMxWMyhMfFf6Vnc1kUJMHv0FTNDddobb7kVBgEMIDtsAB/zE9M8f5cWWKfrFR0dYr\\njaMyUCJE/PO9THno6/M9W2wesjDnezP3zCVqy0/dIFsvWK+811RbBNOndGxZ+9Eg\\nNGVdukHaorFNRWjuNz8WwvnyVYnVWgP8j6Q16b+KDI6+DGhObBLxWB8VikG5Nh7I\\n9GVz8QN7XfO2SDFcE9hakkLkf+olDI4hC7PpYpOy/w54tKeuKaGifKwwsEaB1By1\\nD31t/l2IS75831cuG2u9prz5knud86JuCSgb234jUoF5BPwc1GFJDMKaTXVsi+rY\\nHDYZLgaVAgMBAAECggEAMCk/DXc6pBclHhDvvo2QLl7H8csONNyNnGDobE2903Og\\np/LcaJjqs2dsIcxfdhbzyAiEMD6nXCtD+mZcFysuuOaMKo6RmmesokUf2qiUwKyZ\\nVouoMmGVBQJwnFuiqbh06TPdFPdr51ZmONpBHvQePAToGNgI4Ubit2Hk+8xQPpua\\nrNL8ivHL0k57y6acC1qN8+vW0K9Grd3ZQeVYUxu6s7frqhucBDrn2sE3rEIHCMZL\\nEXtU/auWGw/RLE6ZusErCZ+tqybXUIrtwzDyKMJZBTaBRG6eJbd/m0xa8L4+1SU0\\nXn6FIE1E29r6NGyQ5bUvGq/Sq8T/XW3kbF98yzeuwQKBgQDv4FpemUNdnV1W8FtA\\nX40e3YqkoC//ym5JuylQJ2Nj6hExX4cA4L6ixpRjEU7urh5LgfxKREG0xcc2gBZf\\nmLUpZh5bMjK+mhW4Ckr6ZpibuTF8oIly/6xSGZDRp/s9n9JiT4lBGy6jKiv0Doy1\\n2Wh2t8p7w3IAFmxoNkpg1bjEJQKBgQDaCh5ZP9DGLN/Er1gtOECdow8zsWtvbvIi\\nk1v9achvidUt0M89Pmugw0AALfhnvZDjIN45IEnajszCnAqz5zU9UGP2TkUEaSgP\\nKRctUFVF3igV91B/C48ChzyblEBeh+5JhQpn+ZfO12pbx7d4OCbzzKY5luqmwnUu\\n2LQAzKv1sQKBgQCZocF/UP3aWU1Mv0hSZGBH4nBHm+jiFM6qHlsJYRDBD0rPqnUW\\n1NqD+ldTU+SP7aith6UEE89Zbkp213Z855sv1p2envntJVa/tqfq1AbtxaCyR0eB\\nBctiEcm03beF8nSWToaD0lr+WaYo+6CXX5UOZAwlVDoRYEsyO4NLndZmmQKBgBPg\\n7klmxwr6VmBhOCHPShzVG/Kzjz72l37NfoqJFWwN3fCyY+KKiVd71Z7ukgIrR0Vd\\n3sTIi9MwR7zKazNhtfnkFWkEU8iGKc/QCDvqYgvfqDnwdVdP33b0i3MHviKgM/ph\\n9cPq/osuGpVJjRGZ1PtPQixn9PbFLdfai/aysk7RAoGAcg4IyQkEsMwBfstMoxHc\\nv9OEvpV8I3FxVZTmcSpud/Vsn8XFNCt5L0MuFV3EEKSgB2GKAzfCVcUNORWguxFg\\nOLxc12Rz6UncsrRyGCGhetxUJpKMi1ByBqR8A6G3y7JdKUGFNt72BTa6oOZbn8HS\\nqaapcC5n2bY7cKyXTpGKUlw=\\n-----END PRIVATE KEY-----",
  "wechatPayNotifyUrl": "https://www.fantula.com/api/wechat/notify",
  "wechatAppSecret": "521970d6155d6f7ee3045f05b7cc3eb3",
  "schedulerInternalUrl": "http://127.0.0.1:3001",
  "sitemap": {
    "isI18nMapped": false,
    "sitemapName": "sitemap.xml",
    "isMultiSitemap": false,
    "excludeAppSources": [],
    "cacheMaxAgeSeconds": 600,
    "autoLastmod": false,
    "defaultSitemapsChunkSize": 1000,
    "minify": false,
    "sortEntries": true,
    "debug": false,
    "discoverImages": true,
    "discoverVideos": true,
    "sitemapsPathPrefix": "/__sitemap__/",
    "isNuxtContentDocumentDriven": false,
    "xsl": "/__sitemap__/style.xsl",
    "xslTips": true,
    "xslColumns": [
      {
        "label": "URL",
        "width": "50%"
      },
      {
        "label": "Images",
        "width": "25%",
        "select": "count(image:image)"
      },
      {
        "label": "Last Updated",
        "width": "25%",
        "select": "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"
      }
    ],
    "credits": true,
    "version": "7.6.0",
    "sitemaps": {
      "sitemap.xml": {
        "sitemapName": "sitemap.xml",
        "route": "sitemap.xml",
        "defaults": {},
        "include": [],
        "exclude": [
          "/_**",
          "/_nuxt/**"
        ],
        "includeAppSources": true
      }
    }
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "name": "nuxt-frontend",
        "env": "production"
      },
      {
        "_context": "package.json",
        "_priority": -10,
        "name": "fantula-frontend",
        "description": "凡图拉 - Nuxt 3 SSR前端项目"
      },
      {
        "_priority": -3,
        "_context": "nuxt-site-config:config",
        "url": "https://www.fantula.com"
      }
    ],
    "version": "3.2.19",
    "debug": false,
    "multiTenancy": []
  },
  "nuxt-robots": {
    "version": "5.7.0",
    "isNuxtContentV2": false,
    "debug": false,
    "credits": true,
    "groups": [
      {
        "comment": [],
        "disallow": [],
        "allow": [
          "/",
          "/community",
          "/article/*",
          "/about-us",
          "/service",
          "/faq"
        ],
        "userAgent": [
          "*"
        ],
        "contentUsage": [],
        "contentSignal": [],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "/",
            "allow": true
          },
          {
            "pattern": "/community",
            "allow": true
          },
          {
            "pattern": "/article/*",
            "allow": true
          },
          {
            "pattern": "/about-us",
            "allow": true
          },
          {
            "pattern": "/service",
            "allow": true
          },
          {
            "pattern": "/faq",
            "allow": true
          }
        ],
        "_normalized": true
      }
    ],
    "sitemap": [
      "http://localhost:3000/sitemap.xml",
      "/sitemap.xml"
    ],
    "header": true,
    "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "robotsDisabledValue": "noindex, nofollow",
    "cacheControl": "max-age=14400, must-revalidate",
    "botDetection": true,
    "pageMetaRobots": {}
  },
  "ipx": {
    "modifiers": {
      "format": "webp",
      "quality": 80
    },
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
  }
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

/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	// If the client specifically requests HTML, then avoid classifying as JSON.
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
		// let Nitro handle JSON errors
		return;
	}
	// invoke default Nitro error handler (which will log appropriately if required)
	const defaultRes = await defaultHandler(error, event, { json: true });
	// let Nitro handle redirect if appropriate
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	// remove proto/hostname/port from URL
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	// add default server message (keep sanitized for unhandled errors)
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	// we will be rendering this error internally so we can pass along the error.data safely
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	// Access request headers
	const reqHeaders = getRequestHeaders(event);
	// Detect to avoid recursion in SSR rendering of errors
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	// HTML response (via SSR)
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	// Fallback to static rendered error page
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

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  if (typeof config.trailingSlash !== "undefined" && !config.trailingSlash)
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(String(config.url), { acceptRelative: true, strict: false }))
    config.url = withHttps(String(config.url));
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0) {
      return () => {
      };
    }
    if (!input._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2]?.split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      input._context = lastFunctionName;
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = val;
    }
    if (Object.keys(entry).filter((k) => !k.startsWith("_")).length === 0) {
      return () => {
      };
    }
    stack.push(entry);
    return () => {
      const idx = stack.indexOf(entry);
      if (idx !== -1)
        stack.splice(idx, 1);
    };
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    siteConfig._priority = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined" && val !== "") {
          siteConfig[k] = val;
          if (typeof stack[o]._priority !== "undefined" && stack[o]._priority !== -1) {
            siteConfig._priority[key] = stack[o]._priority;
          }
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

function envSiteConfig(env = {}) {
  return Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith("NUXT_SITE_") || k.startsWith("NUXT_PUBLIC_SITE_")).map(([k, v]) => [
    k.replace(/^NUXT_(PUBLIC_)?SITE_/, "").split("_").map((s, i) => i === 0 ? s.toLowerCase() : s[0]?.toUpperCase() + s.slice(1).toLowerCase()).join(""),
    v
  ]));
}

function getSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu(_options, useRuntimeConfig(e)["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

const _mZNsXmtfF43G05db5E7lnFrvESG8Xgqt4t4joSasPRc = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(getSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

const KNOWN_SEARCH_BOTS = [
  {
    pattern: "googlebot",
    name: "googlebot",
    secondaryPatterns: ["google.com/bot.html"]
  },
  {
    pattern: "bingbot",
    name: "bingbot",
    secondaryPatterns: ["msnbot"]
  },
  {
    pattern: "yandexbot",
    name: "yandexbot"
  },
  {
    pattern: "baiduspider",
    name: "baiduspider",
    secondaryPatterns: ["baidu.com"]
  },
  {
    pattern: "duckduckbot",
    name: "duckduckbot",
    secondaryPatterns: ["duckduckgo.com"]
  },
  {
    pattern: "slurp",
    name: "yahoo"
  },
  {
    pattern: "applebot",
    name: "applebot",
    secondaryPatterns: ["apple.com/go/applebot"]
  }
];
const SOCIAL_BOTS = [
  {
    pattern: "twitterbot",
    name: "twitter",
    secondaryPatterns: ["twitter"]
  },
  {
    pattern: "facebookexternalhit",
    name: "facebook",
    secondaryPatterns: ["facebook.com"]
  },
  {
    pattern: "linkedinbot",
    name: "linkedin",
    secondaryPatterns: ["linkedin"]
  },
  {
    pattern: "pinterestbot",
    name: "pinterest",
    secondaryPatterns: ["pinterest"]
  },
  {
    pattern: "discordbot",
    name: "discord",
    secondaryPatterns: ["discordapp"]
  }
];
const SEO_BOTS = [
  {
    pattern: "mj12bot",
    name: "majestic12",
    secondaryPatterns: ["majestic12.co.uk/bot"]
  },
  {
    pattern: "ahrefsbot",
    name: "ahrefs",
    secondaryPatterns: ["ahrefs.com"]
  },
  {
    pattern: "semrushbot",
    name: "semrush",
    secondaryPatterns: ["semrush.com/bot"]
  },
  {
    pattern: "screaming frog",
    name: "screaming-frog",
    secondaryPatterns: ["screamingfrog.co.uk"]
  },
  {
    pattern: "rogerbot",
    name: "moz"
  }
];
const AI_BOTS = [
  {
    pattern: "anthropic",
    name: "anthropic"
  },
  {
    pattern: "claude",
    name: "claude"
  },
  {
    pattern: "gptbot",
    name: "gpt",
    secondaryPatterns: ["openai.com"]
  },
  {
    pattern: "google-extended",
    name: "google-extended"
  },
  {
    pattern: "applebot-extended",
    name: "applebot-extended"
  },
  {
    pattern: "bytespider",
    name: "bytespider"
  },
  {
    pattern: "diffbot",
    name: "diffbot"
  },
  {
    pattern: "googlebot-news",
    name: "google-news"
  },
  {
    pattern: "cohere",
    name: "cohere",
    secondaryPatterns: ["cohere.com"]
  },
  {
    pattern: "ccbot",
    name: "commoncrawl",
    secondaryPatterns: ["commoncrawl.org"]
  },
  {
    pattern: "perplexitybot",
    name: "perplexity",
    secondaryPatterns: ["perplexity.ai"]
  }
];
const HTTP_TOOL_BOTS = [
  {
    pattern: "python-requests",
    name: "requests",
    secondaryPatterns: ["python"]
  },
  {
    pattern: "wget",
    name: "wget"
  },
  {
    pattern: "curl",
    name: "curl",
    secondaryPatterns: ["curl"]
  }
];
const SECURITY_SCANNING_BOTS = [
  {
    pattern: "zgrab",
    name: "zgrab"
  },
  {
    pattern: "masscan",
    name: "masscan"
  },
  {
    pattern: "nmap",
    name: "nmap",
    secondaryPatterns: ["insecure.org"]
  },
  {
    pattern: "nikto",
    name: "nikto"
  },
  {
    pattern: "wpscan",
    name: "wpscan"
  }
];
const SCRAPING_BOTS = [
  {
    pattern: "scrapy",
    name: "scrapy",
    secondaryPatterns: ["scrapy.org"]
  }
];
const AUTOMATION_BOTS = [
  {
    pattern: "phantomjs",
    name: "phantomjs"
  },
  {
    pattern: "headless",
    name: "headless-browser"
  },
  {
    pattern: "playwright",
    name: "playwright"
  },
  {
    pattern: "selenium",
    name: "selenium",
    secondaryPatterns: ["webdriver"]
  },
  {
    pattern: "puppeteer",
    name: "puppeteer",
    secondaryPatterns: ["headless"]
  }
];
const GENERIC_BOTS = [
  {
    pattern: "bot",
    name: "generic-bot"
  },
  {
    pattern: "spider",
    name: "generic-spider"
  },
  {
    pattern: "crawler",
    name: "generic-crawler"
  },
  {
    pattern: "scraper",
    name: "generic-scraper"
  }
];
const BOT_MAP = [
  {
    type: "search-engine",
    bots: KNOWN_SEARCH_BOTS,
    trusted: true
  },
  {
    type: "social",
    bots: SOCIAL_BOTS,
    trusted: true
  },
  {
    type: "seo",
    bots: SEO_BOTS,
    trusted: true
  },
  {
    type: "ai",
    bots: AI_BOTS,
    trusted: true
  },
  {
    type: "generic",
    bots: GENERIC_BOTS,
    trusted: false
  },
  {
    type: "automation",
    bots: AUTOMATION_BOTS,
    trusted: false
  },
  {
    type: "http-tool",
    bots: HTTP_TOOL_BOTS,
    trusted: false
  },
  {
    type: "security-scanner",
    bots: SECURITY_SCANNING_BOTS,
    trusted: false
  },
  {
    type: "scraping",
    bots: SCRAPING_BOTS,
    trusted: false
  }
];

const ROBOT_DIRECTIVE_VALUES = {
  // Standard directives
  enabled: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  disabled: "noindex, nofollow",
  index: "index",
  noindex: "noindex",
  follow: "follow",
  nofollow: "nofollow",
  none: "none",
  all: "all",
  // Non-standard directives (not part of official robots spec)
  noai: "noai",
  noimageai: "noimageai"
};
function formatMaxImagePreview(value) {
  return `max-image-preview:${value}`;
}
function formatMaxSnippet(value) {
  return `max-snippet:${value}`;
}
function formatMaxVideoPreview(value) {
  return `max-video-preview:${value}`;
}
function matches(pattern, path) {
  const pathLength = path.length;
  const patternLength = pattern.length;
  const matchingLengths = Array.from({ length: pathLength + 1 }).fill(0);
  let numMatchingLengths = 1;
  let p = 0;
  while (p < patternLength) {
    if (pattern[p] === "$" && p + 1 === patternLength) {
      return matchingLengths[numMatchingLengths - 1] === pathLength;
    }
    if (pattern[p] === "*") {
      numMatchingLengths = pathLength - matchingLengths[0] + 1;
      for (let i = 1; i < numMatchingLengths; i++) {
        matchingLengths[i] = matchingLengths[i - 1] + 1;
      }
    } else {
      let numMatches = 0;
      for (let i = 0; i < numMatchingLengths; i++) {
        const matchLength = matchingLengths[i];
        if (matchLength < pathLength && path[matchLength] === pattern[p]) {
          matchingLengths[numMatches++] = matchLength + 1;
        }
      }
      if (numMatches === 0) {
        return false;
      }
      numMatchingLengths = numMatches;
    }
    p++;
  }
  return true;
}
function matchPathToRule(path, _rules) {
  let matchedRule = null;
  const rules = _rules.filter(Boolean);
  const rulesLength = rules.length;
  let i = 0;
  while (i < rulesLength) {
    const rule = rules[i];
    if (!rule || !matches(rule.pattern, path)) {
      i++;
      continue;
    }
    if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
      matchedRule = rule;
    } else if (rule.pattern.length === matchedRule.pattern.length && rule.allow && !matchedRule.allow) {
      matchedRule = rule;
    }
    i++;
  }
  return matchedRule;
}
function asArray(v) {
  return typeof v === "undefined" ? [] : Array.isArray(v) ? v : [v];
}
function contentUsageToString(prefs) {
  return Object.entries(prefs).filter(([_, value]) => value !== void 0).map(([key, value]) => `${key}=${value}`).join(", ");
}
function normalizeContentPreferences(value) {
  if (!value)
    return [];
  if (Array.isArray(value))
    return value.filter((rule) => Boolean(rule));
  if (typeof value === "object" && !Array.isArray(value)) {
    const str = contentUsageToString(value);
    return str ? [str] : [];
  }
  if (typeof value === "string")
    return value ? [value] : [];
  return [];
}
function normalizeGroup(group) {
  if (group._normalized) {
    const resolvedGroup = group;
    const disallow2 = asArray(resolvedGroup.disallow);
    resolvedGroup._indexable = !disallow2.includes("/");
    resolvedGroup._rules = [
      ...resolvedGroup.disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...resolvedGroup.allow.map((r) => ({ pattern: r, allow: true }))
    ];
    return resolvedGroup;
  }
  const disallow = asArray(group.disallow);
  const allow = asArray(group.allow).filter((rule) => Boolean(rule));
  const contentUsage = normalizeContentPreferences(group.contentUsage);
  const contentSignal = normalizeContentPreferences(group.contentSignal);
  return {
    ...group,
    userAgent: group.userAgent ? asArray(group.userAgent) : ["*"],
    disallow,
    allow,
    contentUsage,
    contentSignal,
    _indexable: !disallow.includes("/"),
    _rules: [
      ...disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...allow.map((r) => ({ pattern: r, allow: true }))
    ],
    _normalized: true
  };
}
function generateRobotsTxt({ groups, sitemaps }) {
  const lines = [];
  for (const group of groups) {
    for (const comment of group.comment || [])
      lines.push(`# ${comment}`);
    for (const userAgent of group.userAgent || ["*"])
      lines.push(`User-agent: ${userAgent}`);
    for (const allow of group.allow || [])
      lines.push(`Allow: ${allow}`);
    for (const disallow of group.disallow || [])
      lines.push(`Disallow: ${disallow}`);
    for (const cleanParam of group.cleanParam || [])
      lines.push(`Clean-param: ${cleanParam}`);
    for (const contentUsage of group.contentUsage || [])
      lines.push(`Content-Usage: ${contentUsage}`);
    for (const contentSignal of group.contentSignal || [])
      lines.push(`Content-Signal: ${contentSignal}`);
    lines.push("");
  }
  for (const sitemap of sitemaps)
    lines.push(`Sitemap: ${sitemap}`);
  return lines.join("\n");
}
function createPatternMap() {
  const patternMap = /* @__PURE__ */ new Map();
  for (const def of BOT_MAP) {
    for (const bot of def.bots) {
      const patterns = [bot.pattern, ...bot.secondaryPatterns || []];
      for (const pattern of patterns) {
        patternMap.set(pattern.toLowerCase(), {
          botName: bot.name,
          botCategory: def.type,
          trusted: def.trusted
        });
      }
    }
  }
  return patternMap;
}
function normaliseRobotsRouteRule(config) {
  let allow;
  if (typeof config.robots === "boolean")
    allow = config.robots;
  else if (typeof config.robots === "object" && "indexable" in config.robots && typeof config.robots.indexable !== "undefined")
    allow = config.robots.indexable;
  let rule;
  if (typeof config.robots === "object" && config.robots !== null) {
    if ("rule" in config.robots && typeof config.robots.rule !== "undefined") {
      rule = config.robots.rule;
    } else if (!("indexable" in config.robots)) {
      const directives = [];
      for (const [key, value] of Object.entries(config.robots)) {
        if (value === false || value === null || value === void 0)
          continue;
        if (key in ROBOT_DIRECTIVE_VALUES && typeof value === "boolean" && value) {
          directives.push(ROBOT_DIRECTIVE_VALUES[key]);
        } else if (key === "max-image-preview" && typeof value === "string") {
          directives.push(formatMaxImagePreview(value));
        } else if (key === "max-snippet" && typeof value === "number") {
          directives.push(formatMaxSnippet(value));
        } else if (key === "max-video-preview" && typeof value === "number") {
          directives.push(formatMaxVideoPreview(value));
        }
      }
      if (directives.length > 0) {
        rule = directives.join(", ");
      }
    }
  } else if (typeof config.robots === "string") {
    rule = config.robots;
  }
  if (rule && typeof allow === "undefined") {
    const disallowIndicators = ["none", "noindex", "noai", "noimageai"];
    allow = !disallowIndicators.some(
      (indicator) => rule === indicator || rule.split(",").some((part) => part.trim() === indicator)
    );
  }
  if (typeof allow === "undefined" && typeof rule === "undefined")
    return;
  return {
    allow,
    rule
  };
}

function useRuntimeConfigNuxtRobots(event) {
  return useRuntimeConfig(event)["nuxt-robots"];
}

const logger$1 = createConsola({
  defaults: { tag: "@nuxtjs/robots" }
});

async function resolveRobotsTxtContext(e, nitro = useNitroApp()) {
  const { groups, sitemap: sitemaps } = useRuntimeConfigNuxtRobots(e);
  const generateRobotsTxtCtx = {
    event: e,
    context: e ? "robots.txt" : "init",
    ...JSON.parse(JSON.stringify({ groups, sitemaps }))
  };
  await nitro.hooks.callHook("robots:config", generateRobotsTxtCtx);
  generateRobotsTxtCtx.groups = generateRobotsTxtCtx.groups.map(normalizeGroup);
  nitro._robots.ctx = generateRobotsTxtCtx;
  return generateRobotsTxtCtx;
}

const _nM0M79OmNj5ses6jqX12vkPkw5GMoSsYizdVQJTVA = defineNitroPlugin(async (nitroApp) => {
  const { isNuxtContentV2, robotsDisabledValue, botDetection } = useRuntimeConfigNuxtRobots();
  if (botDetection !== false) {
    nitroApp._robotsPatternMap = createPatternMap();
  }
  nitroApp._robots = {};
  await resolveRobotsTxtContext(void 0, nitroApp);
  const nuxtContentUrls = /* @__PURE__ */ new Set();
  if (isNuxtContentV2) {
    let urls;
    try {
      urls = await (await nitroApp.localFetch("/__robots__/nuxt-content.json", {})).json();
    } catch (e) {
      logger$1.error("Failed to read robot rules from content files.", e);
    }
    if (urls && Array.isArray(urls) && urls.length) {
      urls.forEach((url) => nuxtContentUrls.add(withoutTrailingSlash(url)));
    }
  }
  if (nuxtContentUrls.size) {
    nitroApp._robots.nuxtContentUrls = nuxtContentUrls;
  }
});

const plugins = [
  _mZNsXmtfF43G05db5E7lnFrvESG8Xgqt4t4joSasPRc,
_nM0M79OmNj5ses6jqX12vkPkw5GMoSsYizdVQJTVA
];

const assets = {
  "/MP_verify_PPieTbksUNhjGksV.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"11-hMoxJ8El5QIO4cZ28MtZJrQIlrg\"",
    "mtime": "2026-02-22T12:10:09.776Z",
    "size": 17,
    "path": "../public/MP_verify_PPieTbksUNhjGksV.txt"
  },
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-fbI88lHVV8i7xTsX6f3u0roZa+M\"",
    "mtime": "2026-02-22T12:10:09.776Z",
    "size": 8196,
    "path": "../public/.DS_Store"
  },
  "/sitemap.xml": {
    "type": "application/xml",
    "etag": "\"456-zef+gC+ZO4JZYO3b8Epwei6+eNk\"",
    "mtime": "2026-02-22T12:10:09.776Z",
    "size": 1110,
    "path": "../public/sitemap.xml"
  },
  "/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"4804-3ElyD/VsZeN5KcNCKpk9ZM44xpU\"",
    "mtime": "2026-02-22T12:10:09.765Z",
    "size": 18436,
    "path": "../public/images/.DS_Store"
  },
  "/images/.gitkeep": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1-uFjLKCYX+wlW2WAhXI6E0cz5CcY\"",
    "mtime": "2026-02-22T12:10:09.768Z",
    "size": 1,
    "path": "../public/images/.gitkeep"
  },
  "/faq/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"10162-c0O2JAsPdgpE91BLpIdXhnENTOs\"",
    "mtime": "2026-02-22T12:10:09.622Z",
    "size": 65890,
    "path": "../public/faq/index.html"
  },
  "/_robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"145-SSVD4uYI8QRdutNfWBLNMhiSe+A\"",
    "mtime": "2026-02-22T12:10:09.776Z",
    "size": 325,
    "path": "../public/_robots.txt"
  },
  "/about-us/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"f47f-T9dnHimuznJjujrpR/JUOPEe7iM\"",
    "mtime": "2026-02-22T12:10:09.622Z",
    "size": 62591,
    "path": "../public/about-us/index.html"
  },
  "/_nuxt/0TuUNHT8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"134d-ld7w7LmrBYzGyjrTC+pPDr5hfbM\"",
    "mtime": "2026-02-22T12:10:09.689Z",
    "size": 4941,
    "path": "../public/_nuxt/0TuUNHT8.js"
  },
  "/_nuxt/0UNnHsWs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"109a-6+cXuaCFtwXp4PlAK18h6X6Go0o\"",
    "mtime": "2026-02-22T12:10:09.689Z",
    "size": 4250,
    "path": "../public/_nuxt/0UNnHsWs.js"
  },
  "/_nuxt/-TPNXH-f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ab1-b/9g/Uqb9oFgFjTN+Tn/KkUSM00\"",
    "mtime": "2026-02-22T12:10:09.751Z",
    "size": 2737,
    "path": "../public/_nuxt/-TPNXH-f.js"
  },
  "/_nuxt/2xcOVVnw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cc0-h9HmFv/vO85Xq0mj66Y68wB+Wzw\"",
    "mtime": "2026-02-22T12:10:09.690Z",
    "size": 7360,
    "path": "../public/_nuxt/2xcOVVnw.js"
  },
  "/_nuxt/0p3c9LYQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"199a-Wz/6Eof7QJ9P240KUWXLph/zvJA\"",
    "mtime": "2026-02-22T12:10:09.689Z",
    "size": 6554,
    "path": "../public/_nuxt/0p3c9LYQ.js"
  },
  "/_nuxt/1PWTDNLU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"362b-HfAUNDqiq2aj7ZWjkCeyxHFQZb0\"",
    "mtime": "2026-02-22T12:10:09.690Z",
    "size": 13867,
    "path": "../public/_nuxt/1PWTDNLU.js"
  },
  "/_nuxt/3wa-pH_9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"52e-nxoT1GADrQusH5tl8V3qAjiIMtc\"",
    "mtime": "2026-02-22T12:10:09.690Z",
    "size": 1326,
    "path": "../public/_nuxt/3wa-pH_9.js"
  },
  "/_nuxt/5qIpvM68.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"111f-7MHgqo6rFl9jspZPi7TCoHznmX4\"",
    "mtime": "2026-02-22T12:10:09.690Z",
    "size": 4383,
    "path": "../public/_nuxt/5qIpvM68.js"
  },
  "/_nuxt/3DUT0tZn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64a-hbxZLjAifyIv0FdNpz4Z8VZXw9k\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 1610,
    "path": "../public/_nuxt/3DUT0tZn.js"
  },
  "/_nuxt/8vj2_lcz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ea8-y6cEbVDgvvZhjQZ3WHGOIfAC7kU\"",
    "mtime": "2026-02-22T12:10:09.690Z",
    "size": 3752,
    "path": "../public/_nuxt/8vj2_lcz.js"
  },
  "/_nuxt/3fH9yQ7t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18c8-8YLw11OFg8D8gSbftjrXebH75HM\"",
    "mtime": "2026-02-22T12:10:09.689Z",
    "size": 6344,
    "path": "../public/_nuxt/3fH9yQ7t.js"
  },
  "/_nuxt/9cOpzTXM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b5-AikNX9SG7mI/NCfzKL/4wsXMt+U\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 2229,
    "path": "../public/_nuxt/9cOpzTXM.js"
  },
  "/images/support-qr.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c144-2/Ghws0BBvE/CRZxrCdKn3SBSUY\"",
    "mtime": "2026-02-22T12:10:09.768Z",
    "size": 180548,
    "path": "../public/images/support-qr.jpg"
  },
  "/_nuxt/ATu0uyz0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d9b-qemN6B9tyLIK3nSOBMPKuM5A5lQ\"",
    "mtime": "2026-02-22T12:10:09.690Z",
    "size": 3483,
    "path": "../public/_nuxt/ATu0uyz0.js"
  },
  "/_nuxt/AboutSection.D2iuel_R.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"611-1Y1ZV4ZMnyW0+jjl1+QbyVBe6MU\"",
    "mtime": "2026-02-22T12:10:09.690Z",
    "size": 1553,
    "path": "../public/_nuxt/AboutSection.D2iuel_R.css"
  },
  "/_nuxt/AYDb9v1O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"42d-+ABxoce/cXzY9Si1HwvV3CQKZTs\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 1069,
    "path": "../public/_nuxt/AYDb9v1O.js"
  },
  "/_nuxt/AdminActionCard.p_gWMTdv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"27a-dEgn0P4pHlK7YhHnVc0IXDjE9AA\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 634,
    "path": "../public/_nuxt/AdminActionCard.p_gWMTdv.css"
  },
  "/_nuxt/AdminDataTable.D248Rcjh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c7-ucgNHxnaDk057fLAEcCU5MTiQmQ\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 199,
    "path": "../public/_nuxt/AdminDataTable.D248Rcjh.css"
  },
  "/_nuxt/AdminImagePicker.BjfXapWt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"918-45S77vCC7/2ypgEzqhZ/wtkGEpA\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 2328,
    "path": "../public/_nuxt/AdminImagePicker.BjfXapWt.css"
  },
  "/_nuxt/AdminDataDialog.t4wd-jOm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"31-TbYCggg1rQifdSmjqT4NYt8Sk7c\"",
    "mtime": "2026-02-22T12:10:09.690Z",
    "size": 49,
    "path": "../public/_nuxt/AdminDataDialog.t4wd-jOm.css"
  },
  "/_nuxt/AdminImageSelector.DWoAwdMC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5d8-ZGZ7Vi0GTUFbZQuiKGwf9i/mMpg\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 1496,
    "path": "../public/_nuxt/AdminImageSelector.DWoAwdMC.css"
  },
  "/_nuxt/AdminModuleLayout.ITFx4zzH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e-kqpM6jzIyNctTPRXc0Ti6UPVpfk\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 126,
    "path": "../public/_nuxt/AdminModuleLayout.ITFx4zzH.css"
  },
  "/_nuxt/AdminPageSkeleton.BAdfGqmx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1d0-J6M60Wf0OQMg/VbglhlJ8wwKZQI\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 464,
    "path": "../public/_nuxt/AdminPageSkeleton.BAdfGqmx.css"
  },
  "/_nuxt/AdminUserCell.BIxuZhas.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3bf-OMkkk4zRuHI/b6DIbxAiTwMH8yY\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 959,
    "path": "../public/_nuxt/AdminUserCell.BIxuZhas.css"
  },
  "/_nuxt/B0J-YJM_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"67d-8p+PdnRxwN6szcw3aNBLujqvjzM\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 1661,
    "path": "../public/_nuxt/B0J-YJM_.js"
  },
  "/_nuxt/B0mh1Ewr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2996-7W2Z+fg/884judf/Y/WXr6r9Ro8\"",
    "mtime": "2026-02-22T12:10:09.691Z",
    "size": 10646,
    "path": "../public/_nuxt/B0mh1Ewr.js"
  },
  "/_nuxt/B1Z98k9e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1734-FBIxGsKAL5ngWyZPSvABSKuaN7g\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 5940,
    "path": "../public/_nuxt/B1Z98k9e.js"
  },
  "/_nuxt/B4JY4W7d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"573-aAXSYjMigZ+hBXwrmGI/cLCEaTk\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 1395,
    "path": "../public/_nuxt/B4JY4W7d.js"
  },
  "/_nuxt/B78OFSAA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"185a-eEoIcaLbrly/GyMqqpy55tlVbVs\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 6234,
    "path": "../public/_nuxt/B78OFSAA.js"
  },
  "/_nuxt/B1LJSBIw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"aa60-n25fYxvBkGVRTX/5MbRJUljzclE\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 43616,
    "path": "../public/_nuxt/B1LJSBIw.js"
  },
  "/_nuxt/B7T7ihdN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63b-D1nJeLPSh5+8zPrkMX37wf+GBiE\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 1595,
    "path": "../public/_nuxt/B7T7ihdN.js"
  },
  "/_nuxt/B1tTm4hg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"320-UdkTnZhPLvnxvmy+8H078Qo8NJQ\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 800,
    "path": "../public/_nuxt/B1tTm4hg.js"
  },
  "/_nuxt/B7hJpnZW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b3e-cQFKSzSMz05MJ63NrIpG3ZMrAPk\"",
    "mtime": "2026-02-22T12:10:09.692Z",
    "size": 2878,
    "path": "../public/_nuxt/B7hJpnZW.js"
  },
  "/_nuxt/B7o_HXff.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1819-eYvu6yeI9lrrZkUNwC1jhA2kqoE\"",
    "mtime": "2026-02-22T12:10:09.694Z",
    "size": 6169,
    "path": "../public/_nuxt/B7o_HXff.js"
  },
  "/_nuxt/B8he0tse.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"505-7FBiJhei7rSDzDFp0P84F7h0B+o\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 1285,
    "path": "../public/_nuxt/B8he0tse.js"
  },
  "/_nuxt/BBjJ7cTw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16e6-FtNGsLAm2PCmp4TuXjp+zEEtxjY\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 5862,
    "path": "../public/_nuxt/BBjJ7cTw.js"
  },
  "/_nuxt/BB_Ol6Sd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f-gamgNs2AQKgsByqfCsJm9YkDFJE\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 79,
    "path": "../public/_nuxt/BB_Ol6Sd.js"
  },
  "/_nuxt/BEbTna-8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"449f-sBblj3lksrzB8/KhcMRvSeAKVzI\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 17567,
    "path": "../public/_nuxt/BEbTna-8.js"
  },
  "/_nuxt/BEbtghWy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"145f-Ai4a+5/vNl2s42+WDTRS53brBL0\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 5215,
    "path": "../public/_nuxt/BEbtghWy.js"
  },
  "/_nuxt/B8ewovE0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25f8-cI5wRruTinmZGPnWu71em+xhSeg\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 9720,
    "path": "../public/_nuxt/B8ewovE0.js"
  },
  "/_nuxt/BAYsN12K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47f-Ec1lY3+jK6Q6/BIomzw0JebAzZE\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 1151,
    "path": "../public/_nuxt/BAYsN12K.js"
  },
  "/_nuxt/BEiSxpJZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d52-a2sPoiZ+e/OSjxufc6H8MTwGI8Q\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 3410,
    "path": "../public/_nuxt/BEiSxpJZ.js"
  },
  "/_nuxt/BF1Tm89W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"486-/q0NYWOCh2kXWT14i6xRY2cTPNE\"",
    "mtime": "2026-02-22T12:10:09.693Z",
    "size": 1158,
    "path": "../public/_nuxt/BF1Tm89W.js"
  },
  "/_nuxt/BFA2nrCV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11a-KW51FydmbYu6otqCt+2lWC2MtSQ\"",
    "mtime": "2026-02-22T12:10:09.694Z",
    "size": 282,
    "path": "../public/_nuxt/BFA2nrCV.js"
  },
  "/_nuxt/BFHJLneY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cc8-scZkUCkNRNMr1UspcR4g2IHAbQ8\"",
    "mtime": "2026-02-22T12:10:09.694Z",
    "size": 7368,
    "path": "../public/_nuxt/BFHJLneY.js"
  },
  "/_nuxt/BGyyR-l4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"211c-QAdRejRn9Z6SNcjkYozYq+gaP60\"",
    "mtime": "2026-02-22T12:10:09.694Z",
    "size": 8476,
    "path": "../public/_nuxt/BGyyR-l4.js"
  },
  "/_nuxt/BHMVUitV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1259-Oiq8Z1czpF2xMKPZMeOuuWPZe38\"",
    "mtime": "2026-02-22T12:10:09.694Z",
    "size": 4697,
    "path": "../public/_nuxt/BHMVUitV.js"
  },
  "/_nuxt/BJZMhCeS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"975-+YRhIIbiNzuZMbqeFikGuETcGQs\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 2421,
    "path": "../public/_nuxt/BJZMhCeS.js"
  },
  "/_nuxt/BLhIUUC_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7ab-oV0XcPxLuW8lxtPyTy64/bq4utU\"",
    "mtime": "2026-02-22T12:10:09.694Z",
    "size": 1963,
    "path": "../public/_nuxt/BLhIUUC_.js"
  },
  "/_nuxt/BM2ybxko.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b7-Yowt6MbCybvQAO9dOOev7kjD4Yk\"",
    "mtime": "2026-02-22T12:10:09.694Z",
    "size": 695,
    "path": "../public/_nuxt/BM2ybxko.js"
  },
  "/_nuxt/BPl8D8Dz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2aa-2LwX2Hz9iJeoMEHLMNTWH0AbQMU\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 682,
    "path": "../public/_nuxt/BPl8D8Dz.js"
  },
  "/_nuxt/BS1AET_E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c4e-8TR7Dxa6b9m+UCXJoZOtvKsQiXQ\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 7246,
    "path": "../public/_nuxt/BS1AET_E.js"
  },
  "/_nuxt/BQyWw27w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1421-ttsfKSV2dPF5t23kQYkGiNQjX/4\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 5153,
    "path": "../public/_nuxt/BQyWw27w.js"
  },
  "/_nuxt/BQg7lXt4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7f0-SUz9p3ATDnqNjT1mzrJsGiOLxMA\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 2032,
    "path": "../public/_nuxt/BQg7lXt4.js"
  },
  "/_nuxt/BTl40Usu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e0-Ll23sOxmY1Tbx2I7BjMi63NWKeo\"",
    "mtime": "2026-02-22T12:10:09.694Z",
    "size": 5600,
    "path": "../public/_nuxt/BTl40Usu.js"
  },
  "/_nuxt/BTsIeYIo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4848-3eSxT8PfjZ50GY1GAj1E1Jm2K/k\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 18504,
    "path": "../public/_nuxt/BTsIeYIo.js"
  },
  "/_nuxt/BU_Tkk-8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b68-K9G5ykEaZbrJKcZiQNr1LIAbPI4\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 2920,
    "path": "../public/_nuxt/BU_Tkk-8.js"
  },
  "/_nuxt/BUpyE-1T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"243-87RiK1yiK/DggNJq6g2BZd+VDHk\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 579,
    "path": "../public/_nuxt/BUpyE-1T.js"
  },
  "/_nuxt/BVJRCKao.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5d0-hX/WRRXOuhelUN8CY+tby4TkLkQ\"",
    "mtime": "2026-02-22T12:10:09.696Z",
    "size": 1488,
    "path": "../public/_nuxt/BVJRCKao.js"
  },
  "/_nuxt/BWYoHPga.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bc2-AX/v2Liqircr4/Wy/vgDFvV4Dd4\"",
    "mtime": "2026-02-22T12:10:09.696Z",
    "size": 3010,
    "path": "../public/_nuxt/BWYoHPga.js"
  },
  "/_nuxt/BYQDm0nY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17d-tnQtgJQqRgqRHNT7bk5xSmwtErQ\"",
    "mtime": "2026-02-22T12:10:09.695Z",
    "size": 381,
    "path": "../public/_nuxt/BYQDm0nY.js"
  },
  "/_nuxt/B_0uGzkP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e27-Zw/CoFlTWQ0BR0QEQltkvRGr1sY\"",
    "mtime": "2026-02-22T12:10:09.696Z",
    "size": 3623,
    "path": "../public/_nuxt/B_0uGzkP.js"
  },
  "/_nuxt/BYzqU57a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eb86-1vWRZVfs4kcFRpBJtr16gs7FZPQ\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 60294,
    "path": "../public/_nuxt/BYzqU57a.js"
  },
  "/_nuxt/BaseButton.DjZhUt7D.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1070-XhXMvJYZdEkR1blidVXyoVnCLSk\"",
    "mtime": "2026-02-22T12:10:09.696Z",
    "size": 4208,
    "path": "../public/_nuxt/BaseButton.DjZhUt7D.css"
  },
  "/_nuxt/B_wkKZpw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49da-03dRNKW3vs3bDCToCuWrTo+lffg\"",
    "mtime": "2026-02-22T12:10:09.696Z",
    "size": 18906,
    "path": "../public/_nuxt/B_wkKZpw.js"
  },
  "/_nuxt/BaseConfirmModal.3LPMK_Az.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"486-d88IU/zFpMWmzT+80NTp6s9KtFA\"",
    "mtime": "2026-02-22T12:10:09.696Z",
    "size": 1158,
    "path": "../public/_nuxt/BaseConfirmModal.3LPMK_Az.css"
  },
  "/_nuxt/BaseCouponTicket.nIF6R8u8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"df5-D1NGbvy88ARyFipSGEx1IB+x6a0\"",
    "mtime": "2026-02-22T12:10:09.696Z",
    "size": 3573,
    "path": "../public/_nuxt/BaseCouponTicket.nIF6R8u8.css"
  },
  "/_nuxt/BaseFormModal.B_0ME0Tz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c0-T90z5K/WHn6k5iK0wy5GEkBrxZ8\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 192,
    "path": "../public/_nuxt/BaseFormModal.B_0ME0Tz.css"
  },
  "/_nuxt/BaseInfiniteList.oUWXlxO6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"536-aY893f/Clrn84liiuG5EstPL6e4\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 1334,
    "path": "../public/_nuxt/BaseInfiniteList.oUWXlxO6.css"
  },
  "/_nuxt/BaseModal.DME-721c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"15e8-C18kMgb/dE6jg1r97aCM1cRu4Y0\"",
    "mtime": "2026-02-22T12:10:09.696Z",
    "size": 5608,
    "path": "../public/_nuxt/BaseModal.DME-721c.css"
  },
  "/_nuxt/BbYR028O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"694-IZsLYpHZYTj3Zdqcb5YmyPhGO+4\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 1684,
    "path": "../public/_nuxt/BbYR028O.js"
  },
  "/_nuxt/Bcbrs9MI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28e-8Sot1UD8lukA6+A00gL74+X2Rrw\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 654,
    "path": "../public/_nuxt/Bcbrs9MI.js"
  },
  "/_nuxt/BesCdh78.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"df9-PoLVdQoGh1n4LODRfYQBG2IpXhc\"",
    "mtime": "2026-02-22T12:10:09.698Z",
    "size": 3577,
    "path": "../public/_nuxt/BesCdh78.js"
  },
  "/_nuxt/Bev6uYXV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38b-29oTDaqoO6tdh4ZBTf59fwuczVE\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 907,
    "path": "../public/_nuxt/Bev6uYXV.js"
  },
  "/_nuxt/Bfq2eem3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27b-tFnTIXbrbLk5GACZqdMd+LJvCDA\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 635,
    "path": "../public/_nuxt/Bfq2eem3.js"
  },
  "/_nuxt/BdkLePxM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1edd-baR83W3Uibo79WZG00JAeUjhtWo\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 7901,
    "path": "../public/_nuxt/BdkLePxM.js"
  },
  "/_nuxt/Bh631gVK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10eb-9iZMt5tGIMISzty/M4yGgjZPrbo\"",
    "mtime": "2026-02-22T12:10:09.698Z",
    "size": 4331,
    "path": "../public/_nuxt/Bh631gVK.js"
  },
  "/_nuxt/BhqPeVUK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8f3-gQUNNjZtLToLFEbDMYdhpR+KX38\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 2291,
    "path": "../public/_nuxt/BhqPeVUK.js"
  },
  "/_nuxt/BhvpcEyJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c9-hgEqyn1jKToz4yv+p4MSABgdEpE\"",
    "mtime": "2026-02-22T12:10:09.698Z",
    "size": 457,
    "path": "../public/_nuxt/BhvpcEyJ.js"
  },
  "/_nuxt/BiGp95HE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"243-MWQDkrkJ2uo0XPtNvKW2i3pCwI8\"",
    "mtime": "2026-02-22T12:10:09.698Z",
    "size": 579,
    "path": "../public/_nuxt/BiGp95HE.js"
  },
  "/_nuxt/Bh6H2ams.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"55b-eot9TIHEm2RQvojrqyoru3JfFrs\"",
    "mtime": "2026-02-22T12:10:09.697Z",
    "size": 1371,
    "path": "../public/_nuxt/Bh6H2ams.js"
  },
  "/_nuxt/BkH7MkLA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17a-OSaGVJYT50yw34fF/br3sGsMPRs\"",
    "mtime": "2026-02-22T12:10:09.699Z",
    "size": 378,
    "path": "../public/_nuxt/BkH7MkLA.js"
  },
  "/_nuxt/BjKCd5ch.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"210-OPowFSJQq3SB9efKuy2deH1OhIA\"",
    "mtime": "2026-02-22T12:10:09.698Z",
    "size": 528,
    "path": "../public/_nuxt/BjKCd5ch.js"
  },
  "/_nuxt/Bm3J8EcS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b86-SHpfzNKnb32orVgOtKauQMtu0RQ\"",
    "mtime": "2026-02-22T12:10:09.698Z",
    "size": 7046,
    "path": "../public/_nuxt/Bm3J8EcS.js"
  },
  "/_nuxt/BoLTkknu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1193-rczSKs/DAkp6Un7ApgujdHyDn64\"",
    "mtime": "2026-02-22T12:10:09.699Z",
    "size": 4499,
    "path": "../public/_nuxt/BoLTkknu.js"
  },
  "/_nuxt/BoTH8E1A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"546-TiLF9sdRrzMG3ZB3vM488o+XZlY\"",
    "mtime": "2026-02-22T12:10:09.698Z",
    "size": 1350,
    "path": "../public/_nuxt/BoTH8E1A.js"
  },
  "/_nuxt/BovGEFB-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d7-j7WlU8dAdw3Pqhm+CKxMPNx2Ciw\"",
    "mtime": "2026-02-22T12:10:09.699Z",
    "size": 471,
    "path": "../public/_nuxt/BovGEFB-.js"
  },
  "/_nuxt/Bp3YSIOJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d-XTRk/a8dZSvGUfYTL7csKBNSuhc\"",
    "mtime": "2026-02-22T12:10:09.699Z",
    "size": 29,
    "path": "../public/_nuxt/Bp3YSIOJ.js"
  },
  "/_nuxt/BpjoRjq7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1303-urbbXtwaY90mH47TVUzOyuGbeXU\"",
    "mtime": "2026-02-22T12:10:09.699Z",
    "size": 4867,
    "path": "../public/_nuxt/BpjoRjq7.js"
  },
  "/_nuxt/BpvIezR-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"582-vDr5FaIrTsY+BxdDMYlVwXhCDtc\"",
    "mtime": "2026-02-22T12:10:09.701Z",
    "size": 1410,
    "path": "../public/_nuxt/BpvIezR-.js"
  },
  "/_nuxt/Br-lkYwm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18cc-S6oyoa4+/a9MBSTGjwo8P+cnFww\"",
    "mtime": "2026-02-22T12:10:09.699Z",
    "size": 6348,
    "path": "../public/_nuxt/Br-lkYwm.js"
  },
  "/_nuxt/Bj3h8UXQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"81d39-JtXKshW8nuY8VxFB16AUHPyJamk\"",
    "mtime": "2026-02-22T12:10:09.700Z",
    "size": 531769,
    "path": "../public/_nuxt/Bj3h8UXQ.js"
  },
  "/_nuxt/BrS9vI_s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a97-Yi9VlMPcYb8Mn3x3LVBMFOv5x/g\"",
    "mtime": "2026-02-22T12:10:09.699Z",
    "size": 6807,
    "path": "../public/_nuxt/BrS9vI_s.js"
  },
  "/_nuxt/BrbASfhU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"490-qzYY9hr2Wxy87D9l5x3tY3TaWZE\"",
    "mtime": "2026-02-22T12:10:09.699Z",
    "size": 1168,
    "path": "../public/_nuxt/BrbASfhU.js"
  },
  "/_nuxt/BrcB9M3o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"266-S3MqY5mKC0rnC6ce/3JCLySz2GY\"",
    "mtime": "2026-02-22T12:10:09.700Z",
    "size": 614,
    "path": "../public/_nuxt/BrcB9M3o.js"
  },
  "/_nuxt/BsK9nqvP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1664-QKWNepCJMr3T6ReTRAWbsFvySjA\"",
    "mtime": "2026-02-22T12:10:09.700Z",
    "size": 5732,
    "path": "../public/_nuxt/BsK9nqvP.js"
  },
  "/_nuxt/BsO20tpn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34d-gFt15PeKVqgtRhak+Yd+xYg1LGw\"",
    "mtime": "2026-02-22T12:10:09.700Z",
    "size": 845,
    "path": "../public/_nuxt/BsO20tpn.js"
  },
  "/_nuxt/BseGM5ji.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"894-2iqRpME1UhvV7FLr4J53crDYARg\"",
    "mtime": "2026-02-22T12:10:09.700Z",
    "size": 2196,
    "path": "../public/_nuxt/BseGM5ji.js"
  },
  "/_nuxt/Bsz3mjX7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2cbb-uLu7+YaNSYhWzu75GKGSPX+A90Q\"",
    "mtime": "2026-02-22T12:10:09.700Z",
    "size": 11451,
    "path": "../public/_nuxt/Bsz3mjX7.js"
  },
  "/_nuxt/Bt7cmeH2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b8a-4me7rZRm+5UoDCz3B98O89cHOLc\"",
    "mtime": "2026-02-22T12:10:09.700Z",
    "size": 7050,
    "path": "../public/_nuxt/Bt7cmeH2.js"
  },
  "/_nuxt/BuSoO0_C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"287-9XWwMCbdxhKvsldsd4TBl3JOXQo\"",
    "mtime": "2026-02-22T12:10:09.701Z",
    "size": 647,
    "path": "../public/_nuxt/BuSoO0_C.js"
  },
  "/_nuxt/BulkActionBar.DWrIK7wP.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"114-buqz9v7G6fzF2axard8d6x7hiIU\"",
    "mtime": "2026-02-22T12:10:09.701Z",
    "size": 276,
    "path": "../public/_nuxt/BulkActionBar.DWrIK7wP.css"
  },
  "/_nuxt/Bu7u0DvS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5bb-TuuKeExh8J1Wyp5SxSarDmyxr/o\"",
    "mtime": "2026-02-22T12:10:09.700Z",
    "size": 1467,
    "path": "../public/_nuxt/Bu7u0DvS.js"
  },
  "/_nuxt/Bv4z6bAw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"140-tmsDr1XlxqDGgnktq66In3/9yRM\"",
    "mtime": "2026-02-22T12:10:09.701Z",
    "size": 320,
    "path": "../public/_nuxt/Bv4z6bAw.js"
  },
  "/_nuxt/BvxCyuKq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156-3i3x7HF1j5oAtRqyNlm8Tn7pAYA\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 342,
    "path": "../public/_nuxt/BvxCyuKq.js"
  },
  "/_nuxt/BxOrRPcO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5d2-FzY+r63BlUf1Z1RVbzrY/CbyJ90\"",
    "mtime": "2026-02-22T12:10:09.701Z",
    "size": 1490,
    "path": "../public/_nuxt/BxOrRPcO.js"
  },
  "/_nuxt/ByN6_RVy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f54-svWb0znrlDOaJUzqQ4dJoaFfTug\"",
    "mtime": "2026-02-22T12:10:09.701Z",
    "size": 8020,
    "path": "../public/_nuxt/ByN6_RVy.js"
  },
  "/_nuxt/BzQ32aC_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"568-+f4tfHFuJhR3mqd+2p8swvoLApk\"",
    "mtime": "2026-02-22T12:10:09.701Z",
    "size": 1384,
    "path": "../public/_nuxt/BzQ32aC_.js"
  },
  "/_nuxt/C-0Q1UUk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"77f0-qMSmA/s1848GeH9GZIUxX8lQ2Hg\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 30704,
    "path": "../public/_nuxt/C-0Q1UUk.js"
  },
  "/_nuxt/C-bB5fu0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2fd-b9Z+dQ3BJwWBSnAHbET10axm9qw\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 765,
    "path": "../public/_nuxt/C-bB5fu0.js"
  },
  "/_nuxt/C2z7kvbs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"400c-viJ5e4qzg7fQMHIZ4Qr9le1IgtU\"",
    "mtime": "2026-02-22T12:10:09.701Z",
    "size": 16396,
    "path": "../public/_nuxt/C2z7kvbs.js"
  },
  "/_nuxt/C3-_bBwc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d96-gYOOG1gthuH4sYjxwAWawcgPP9w\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 7574,
    "path": "../public/_nuxt/C3-_bBwc.js"
  },
  "/_nuxt/C5At5bCu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"863-MVToctpXNg9/oScR8abczI18g78\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 2147,
    "path": "../public/_nuxt/C5At5bCu.js"
  },
  "/_nuxt/C4qS3tdr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ea-CSWsaVwGHKaNJ5NOXZZPvdC7ZKM\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 1002,
    "path": "../public/_nuxt/C4qS3tdr.js"
  },
  "/_nuxt/C7-80USE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a4c-it2yIfnSYJW38UGCABU6DO9wpFY\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 6732,
    "path": "../public/_nuxt/C7-80USE.js"
  },
  "/_nuxt/C7nzLlUd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a2-q3Klsen4bRAeUSnmpTfV/Q1G+/8\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 930,
    "path": "../public/_nuxt/C7nzLlUd.js"
  },
  "/_nuxt/C7pTY0rV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ab3-VJoi9sTweyllQ7ruNnFDwsk8qm8\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 15027,
    "path": "../public/_nuxt/C7pTY0rV.js"
  },
  "/_nuxt/C7ws1Gif.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"53-IEIsx9vMOhJ0L3bZtjrxXqj24sc\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 83,
    "path": "../public/_nuxt/C7ws1Gif.js"
  },
  "/_nuxt/C9qf-vDE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1054-LMbMce4jSj8UzrSMopDjyTF6MT0\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 4180,
    "path": "../public/_nuxt/C9qf-vDE.js"
  },
  "/_nuxt/C9TbXy6c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7eb5-Tweso22bhKIEF0bRb36a4yf58GY\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 32437,
    "path": "../public/_nuxt/C9TbXy6c.js"
  },
  "/_nuxt/CAdK8zKZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12e2-EQMe0uxIrv4weGsnsTgy6deWdTA\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 4834,
    "path": "../public/_nuxt/CAdK8zKZ.js"
  },
  "/_nuxt/CBFwz4RW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6fe-uXtV9hwtS83XUBoGJ1k+mQtp6dw\"",
    "mtime": "2026-02-22T12:10:09.702Z",
    "size": 1790,
    "path": "../public/_nuxt/CBFwz4RW.js"
  },
  "/_nuxt/CCSBYN2T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21f5-2q6MIZDzQdvg3dM4nEPT6I3sX/Q\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 8693,
    "path": "../public/_nuxt/CCSBYN2T.js"
  },
  "/_nuxt/CFGypz82.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7172-X96+iLQ/Sk74YmpG9E5mwuctZY4\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 29042,
    "path": "../public/_nuxt/CFGypz82.js"
  },
  "/_nuxt/CFHirr-0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae-0Uyf42SBKUhFU1C1I+5y+RSHA0U\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 174,
    "path": "../public/_nuxt/CFHirr-0.js"
  },
  "/_nuxt/CFalUM0f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"87-Sza7pnYSWkHhgNRqWjGRC8B6ifw\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 135,
    "path": "../public/_nuxt/CFalUM0f.js"
  },
  "/_nuxt/CGAyGszK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1095-7KDknuaMYEDYTTU6s4JcfltgW/E\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 4245,
    "path": "../public/_nuxt/CGAyGszK.js"
  },
  "/_nuxt/CH5ia_12.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35a-Os1NjTfG7+Q2ZDx1QyEJ8GIIYdw\"",
    "mtime": "2026-02-22T12:10:09.703Z",
    "size": 858,
    "path": "../public/_nuxt/CH5ia_12.js"
  },
  "/_nuxt/CFxBkBri.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12c59-2HIRGZIBftLJwvT8LRu58a98ho0\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 76889,
    "path": "../public/_nuxt/CFxBkBri.js"
  },
  "/_nuxt/CH9s2pXh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"471-tJuToXY7onZdoSmkHXYhBbCs7cU\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 1137,
    "path": "../public/_nuxt/CH9s2pXh.js"
  },
  "/_nuxt/CK1VnNqE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"768-WTESDkQzgEnBrepx4+z5DD407Bo\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 1896,
    "path": "../public/_nuxt/CK1VnNqE.js"
  },
  "/_nuxt/CJFn7061.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"68de-6fD6KMtVNPulu0z0XFKhmNbx3a8\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 26846,
    "path": "../public/_nuxt/CJFn7061.js"
  },
  "/_nuxt/CL-XLmII.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c36-VAai9uPkc7FtshCCTK1EyjHe4GU\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 3126,
    "path": "../public/_nuxt/CL-XLmII.js"
  },
  "/_nuxt/CKCXbL5d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"276b-ktxLxy3fTQXFNytPf5OKxUL1lKc\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 10091,
    "path": "../public/_nuxt/CKCXbL5d.js"
  },
  "/_nuxt/CIgwF1qI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"55d-S8X8ia1pUXmKUi6p9xG4ffC3b8o\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 1373,
    "path": "../public/_nuxt/CIgwF1qI.js"
  },
  "/_nuxt/CLFV33kD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e80-K5Y4/BQHkrfTBt+wHbJKHNQE4/I\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 7808,
    "path": "../public/_nuxt/CLFV33kD.js"
  },
  "/_nuxt/CLi66EDE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"608-euMEULhkKaChTiRL28qn5LG+HF4\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 1544,
    "path": "../public/_nuxt/CLi66EDE.js"
  },
  "/_nuxt/CLmHi7k6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156d-TY7FSHeDBoVDCJWYDDVL1V+RRTU\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 5485,
    "path": "../public/_nuxt/CLmHi7k6.js"
  },
  "/_nuxt/CMf3FBFf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2484-Xfcy5CFxUSXaSG9mjwHDHvQ50oM\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 9348,
    "path": "../public/_nuxt/CMf3FBFf.js"
  },
  "/_nuxt/COZhV8PV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d4-M8av3rouXpKuKNCo3/1qfPV7wwM\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 468,
    "path": "../public/_nuxt/COZhV8PV.js"
  },
  "/_nuxt/COfragV1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20a7-yXWfUTksvCIq85MUjrjqX2B++/4\"",
    "mtime": "2026-02-22T12:10:09.704Z",
    "size": 8359,
    "path": "../public/_nuxt/COfragV1.js"
  },
  "/_nuxt/CP-O10rz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c56-wXw/b3lhMY4FAExErqP65SbrVjU\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 11350,
    "path": "../public/_nuxt/CP-O10rz.js"
  },
  "/_nuxt/CP6s-KXv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"73b-tQ+AOcdx99OTye9+WIeG13oJCIQ\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 1851,
    "path": "../public/_nuxt/CP6s-KXv.js"
  },
  "/_nuxt/CPLwPeCE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ee-SDpDNkYyAnnPlpOKDUWj5dETxmY\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 494,
    "path": "../public/_nuxt/CPLwPeCE.js"
  },
  "/_nuxt/CRavSR-3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1409-/gDd0fmut6dtrtcYOaw6QhNFvis\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 5129,
    "path": "../public/_nuxt/CRavSR-3.js"
  },
  "/_nuxt/CRqK3KT4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"240-49WlvUCEwh/iAyRDsNlEyyTbreQ\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 576,
    "path": "../public/_nuxt/CRqK3KT4.js"
  },
  "/_nuxt/CSgNzwK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d7f-NCCNKyFsM/ZgjrFskFrY28BDsaI\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 3455,
    "path": "../public/_nuxt/CSgNzwK5.js"
  },
  "/_nuxt/CUCWE89F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19dc-kuxV3a1VblBxx7sq9Oyunx/h/LU\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 6620,
    "path": "../public/_nuxt/CUCWE89F.js"
  },
  "/_nuxt/CX61Fink.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a8-OYxYLQu3RnPR5eDO82c56PDUfhg\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 1192,
    "path": "../public/_nuxt/CX61Fink.js"
  },
  "/_nuxt/CZ2eMwIs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bc0-pOQ8trhAACZvJfnU25JGQB7t+dw\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 7104,
    "path": "../public/_nuxt/CZ2eMwIs.js"
  },
  "/_nuxt/CWGxFn7i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a1c-pT/zCKmWSwCD/9X30FmK3/sr0q4\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 6684,
    "path": "../public/_nuxt/CWGxFn7i.js"
  },
  "/_nuxt/CaBLrSkV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af7-L9Toi7rW6Ra4n7+sB9EGnIU12qk\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 2807,
    "path": "../public/_nuxt/CaBLrSkV.js"
  },
  "/_nuxt/Cb6qJS1K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"639-R/4PVQzHzn3ZIUXh4pAhd5IBppQ\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 1593,
    "path": "../public/_nuxt/Cb6qJS1K.js"
  },
  "/_nuxt/CbyStG31.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6c8-VEpI2abDgFjwQQFvm7CeAfbAR9Q\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 1736,
    "path": "../public/_nuxt/CbyStG31.js"
  },
  "/_nuxt/CdAiT1wN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a8f-jJHMn8CNHYlPSTa1PKgAE+1jGyc\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 6799,
    "path": "../public/_nuxt/CdAiT1wN.js"
  },
  "/_nuxt/CdkListByType.DmCmMc3A.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"311-wXvZQszclqiU8oSI6AuUNvCm5g8\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 785,
    "path": "../public/_nuxt/CdkListByType.DmCmMc3A.css"
  },
  "/_nuxt/CgNWH6EX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d9d-giCekDX5R8naV4N/aJ0eilc2XBY\"",
    "mtime": "2026-02-22T12:10:09.707Z",
    "size": 11677,
    "path": "../public/_nuxt/CgNWH6EX.js"
  },
  "/_nuxt/ChWzG-zI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5a-pdOFK8Nnyrwzez0mayzd5y2CYqk\"",
    "mtime": "2026-02-22T12:10:09.709Z",
    "size": 90,
    "path": "../public/_nuxt/ChWzG-zI.js"
  },
  "/_nuxt/Ch--c13T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14a6-Hb4Li80ErvnjvILzUMq+ngNXPCg\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 5286,
    "path": "../public/_nuxt/Ch--c13T.js"
  },
  "/_nuxt/CUMXHjFJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21f7-mGCZOEeFZsC+MaZH8Q1LVV9bWrs\"",
    "mtime": "2026-02-22T12:10:09.705Z",
    "size": 8695,
    "path": "../public/_nuxt/CUMXHjFJ.js"
  },
  "/_nuxt/Cj-ChQ7c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2021-r0kGDKFzFSisWMnVG0uxu02rcLo\"",
    "mtime": "2026-02-22T12:10:09.707Z",
    "size": 8225,
    "path": "../public/_nuxt/Cj-ChQ7c.js"
  },
  "/_nuxt/ChlLrIcZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3044-DClG5UYWLb06NV0OogjrTGyXVM0\"",
    "mtime": "2026-02-22T12:10:09.706Z",
    "size": 12356,
    "path": "../public/_nuxt/ChlLrIcZ.js"
  },
  "/_nuxt/Cl0TpTUp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"80-33IFz5tGIjGL8oozdX2MrD+BuaM\"",
    "mtime": "2026-02-22T12:10:09.707Z",
    "size": 128,
    "path": "../public/_nuxt/Cl0TpTUp.js"
  },
  "/_nuxt/Ck7xBNDE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33ca-S3f/tC3okWXnYsiM/EwRINnFpbI\"",
    "mtime": "2026-02-22T12:10:09.707Z",
    "size": 13258,
    "path": "../public/_nuxt/Ck7xBNDE.js"
  },
  "/_nuxt/CnQpuk68.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b4e-5NoESY6hmPqw5BtRP9PSZVvaUH4\"",
    "mtime": "2026-02-22T12:10:09.707Z",
    "size": 6990,
    "path": "../public/_nuxt/CnQpuk68.js"
  },
  "/_nuxt/CnSTsOn7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"84d-6+ikE+HTL4zvr2yQVJen63+vZ78\"",
    "mtime": "2026-02-22T12:10:09.707Z",
    "size": 2125,
    "path": "../public/_nuxt/CnSTsOn7.js"
  },
  "/_nuxt/Co37MY7Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25a-nCJDVNT1e8wzObvsln7utr1iViQ\"",
    "mtime": "2026-02-22T12:10:09.710Z",
    "size": 602,
    "path": "../public/_nuxt/Co37MY7Q.js"
  },
  "/_nuxt/CouponCodeEditor.DMI6CKLY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"41b-zS/aZ66ShP/EUDDGPRWzpmU4MfY\"",
    "mtime": "2026-02-22T12:10:09.707Z",
    "size": 1051,
    "path": "../public/_nuxt/CouponCodeEditor.DMI6CKLY.css"
  },
  "/_nuxt/CouponSelectorModal.E3xVOipn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b8f-GSl7ku7USkZ3EC30ne0EGF2/lrM\"",
    "mtime": "2026-02-22T12:10:09.707Z",
    "size": 7055,
    "path": "../public/_nuxt/CouponSelectorModal.E3xVOipn.css"
  },
  "/_nuxt/CqYfAUEH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fa4-4f5vzptdBsZ3D/y13OE7hUqh2wc\"",
    "mtime": "2026-02-22T12:10:09.709Z",
    "size": 8100,
    "path": "../public/_nuxt/CqYfAUEH.js"
  },
  "/_nuxt/CqbG5cn5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2e-reuvEYnXKZSgdmYgoVYGAg/ILjk\"",
    "mtime": "2026-02-22T12:10:09.708Z",
    "size": 3374,
    "path": "../public/_nuxt/CqbG5cn5.js"
  },
  "/_nuxt/Cqbyh-ux.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e00-WZ78cPQIicFiVvVWYqARWW27UGg\"",
    "mtime": "2026-02-22T12:10:09.710Z",
    "size": 3584,
    "path": "../public/_nuxt/Cqbyh-ux.js"
  },
  "/_nuxt/Cq9Fpw4b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f-/e18qrfrka5tu1+QKay9M4OlZOo\"",
    "mtime": "2026-02-22T12:10:09.709Z",
    "size": 159,
    "path": "../public/_nuxt/Cq9Fpw4b.js"
  },
  "/_nuxt/CpoCuCk6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1732-IT6cAcbZ+qw1H0y+0uO/HVj2ICM\"",
    "mtime": "2026-02-22T12:10:09.708Z",
    "size": 5938,
    "path": "../public/_nuxt/CpoCuCk6.js"
  },
  "/_nuxt/CqjclLXC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cad-9j/D4c5fuV4vqH1XBTUKTpfVuQc\"",
    "mtime": "2026-02-22T12:10:09.710Z",
    "size": 3245,
    "path": "../public/_nuxt/CqjclLXC.js"
  },
  "/_nuxt/Cqzf2NaF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"120c-OeRcFmDSZtPd41cgEjg+31YrAj0\"",
    "mtime": "2026-02-22T12:10:09.710Z",
    "size": 4620,
    "path": "../public/_nuxt/Cqzf2NaF.js"
  },
  "/_nuxt/CsIXdTzZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1305-WKK44Qb2WdxOyLlbq72wlnQMLIk\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 4869,
    "path": "../public/_nuxt/CsIXdTzZ.js"
  },
  "/_nuxt/CsKh1rMr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1578-GhvEDuVTq5XGJV09+iLYwWjBz+8\"",
    "mtime": "2026-02-22T12:10:09.710Z",
    "size": 5496,
    "path": "../public/_nuxt/CsKh1rMr.js"
  },
  "/_nuxt/CsqZaIb1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26b-vYsh+kmqA0Lck5ztFUID7ZvQL70\"",
    "mtime": "2026-02-22T12:10:09.710Z",
    "size": 619,
    "path": "../public/_nuxt/CsqZaIb1.js"
  },
  "/_nuxt/CsnuQGnF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63c-d2ldTtuKMXaRXNOVdRwyM3D8QNA\"",
    "mtime": "2026-02-22T12:10:09.710Z",
    "size": 1596,
    "path": "../public/_nuxt/CsnuQGnF.js"
  },
  "/_nuxt/Cuz_viwR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"440-2wd6lqkU/zJtX+z5+Z15RWX1ExY\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 1088,
    "path": "../public/_nuxt/Cuz_viwR.js"
  },
  "/_nuxt/Cti_jNsk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13a5-CjZ7ZhQxofSM3w4rMVPppbg4orA\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 5029,
    "path": "../public/_nuxt/Cti_jNsk.js"
  },
  "/_nuxt/CvxNMMUS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16fd-sieugI2kjjfhuqLtZrbWkWudYLQ\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 5885,
    "path": "../public/_nuxt/CvxNMMUS.js"
  },
  "/_nuxt/Cw8NKaW_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e8b-m4/xa01G5OsGJv0nXpTVEhzgLmI\"",
    "mtime": "2026-02-22T12:10:09.710Z",
    "size": 11915,
    "path": "../public/_nuxt/Cw8NKaW_.js"
  },
  "/_nuxt/CwPcAdSR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fc-LAEbuaXeCxV6MTykrU6siwLPgKE\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 252,
    "path": "../public/_nuxt/CwPcAdSR.js"
  },
  "/_nuxt/CwdbHwad.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"419-zb0uc+4hr45+leohne6WtVEJX5I\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 1049,
    "path": "../public/_nuxt/CwdbHwad.js"
  },
  "/_nuxt/Cx3DXR3k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"207-BVtg80BJwAY8fJPnTE/Xqd+WWQ8\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 519,
    "path": "../public/_nuxt/Cx3DXR3k.js"
  },
  "/_nuxt/CyJubS6G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e08-5Oolq1ayz/SeIP55gV4S2uEzy3o\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 7688,
    "path": "../public/_nuxt/CyJubS6G.js"
  },
  "/_nuxt/CykXFNw8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21ee-2BMbr91aIJy2hRf/aRK69gr+HME\"",
    "mtime": "2026-02-22T12:10:09.711Z",
    "size": 8686,
    "path": "../public/_nuxt/CykXFNw8.js"
  },
  "/_nuxt/CzMdZWED.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c81-gITbQvcwVvPwQ/14ILDkUOuD3mo\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 15489,
    "path": "../public/_nuxt/CzMdZWED.js"
  },
  "/_nuxt/Cyfq7hkd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"352-e+6Q2KOfR2OBOn7fnxUrQQsYAeY\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 850,
    "path": "../public/_nuxt/Cyfq7hkd.js"
  },
  "/_nuxt/CzfBsmtG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14d4-5G5DEMXdJcEQWy++cvHsbXLgb04\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 5332,
    "path": "../public/_nuxt/CzfBsmtG.js"
  },
  "/_nuxt/D09PEGYX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17c0-1gqm32/xW1wGv3qtQULBh/SeeV8\"",
    "mtime": "2026-02-22T12:10:09.713Z",
    "size": 6080,
    "path": "../public/_nuxt/D09PEGYX.js"
  },
  "/_nuxt/D0fjyPtd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"82-/fs2/x/z0ky7G+7K8BHlnZJcuTs\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 130,
    "path": "../public/_nuxt/D0fjyPtd.js"
  },
  "/_nuxt/D1cG5rR8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"32e-/fAWyUZhhLC2brQL/dk88tdASfA\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 814,
    "path": "../public/_nuxt/D1cG5rR8.js"
  },
  "/_nuxt/D2FWP6Da.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"375e-Q4+g1BH8joTFR4i37OFnNO355Ng\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 14174,
    "path": "../public/_nuxt/D2FWP6Da.js"
  },
  "/_nuxt/D4VdoaPQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"321-gOF1kEkHsNxJHV8mSSzJ2KCSNfM\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 801,
    "path": "../public/_nuxt/D4VdoaPQ.js"
  },
  "/_nuxt/D4gp40yN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"634-JqhYOpq+aF5XeSU6VycXxqPr+Ps\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 1588,
    "path": "../public/_nuxt/D4gp40yN.js"
  },
  "/_nuxt/D55Pg8LQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63b-ZpV4md2x2GK7kNTIWekF0SoRGCk\"",
    "mtime": "2026-02-22T12:10:09.713Z",
    "size": 1595,
    "path": "../public/_nuxt/D55Pg8LQ.js"
  },
  "/_nuxt/D6FW0B1r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f-QBSY1lPXbirKYATyRw0AIKu0ex4\"",
    "mtime": "2026-02-22T12:10:09.712Z",
    "size": 63,
    "path": "../public/_nuxt/D6FW0B1r.js"
  },
  "/_nuxt/D8B31ohU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11d-07G8OcLoxVAREX3A33wMk+gCmZM\"",
    "mtime": "2026-02-22T12:10:09.713Z",
    "size": 285,
    "path": "../public/_nuxt/D8B31ohU.js"
  },
  "/_nuxt/D7UGuYxz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"590-4c0UaRjCks5YlB7m3vp5kLSnsik\"",
    "mtime": "2026-02-22T12:10:09.713Z",
    "size": 1424,
    "path": "../public/_nuxt/D7UGuYxz.js"
  },
  "/_nuxt/D2lEcfQr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9fe2-jv6eO811hZ6byDPMf6v8gSDxZ3A\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 40930,
    "path": "../public/_nuxt/D2lEcfQr.js"
  },
  "/_nuxt/D8ILfH9J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24d7-nrsv4vJr9qy2fXOBT5PJ8d/rbk8\"",
    "mtime": "2026-02-22T12:10:09.713Z",
    "size": 9431,
    "path": "../public/_nuxt/D8ILfH9J.js"
  },
  "/_nuxt/D8wHtJaW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"de8-J5/X9f9JLVbgD5vhbOU+yaDLns0\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 3560,
    "path": "../public/_nuxt/D8wHtJaW.js"
  },
  "/_nuxt/D3cKCNxi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b7c5-cE8ESpmqyXPF3pKQCbbvFFA+Vlc\"",
    "mtime": "2026-02-22T12:10:09.713Z",
    "size": 178117,
    "path": "../public/_nuxt/D3cKCNxi.js"
  },
  "/_nuxt/DBAdN1fU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"157a-scgDoNoyPVnJBqhA68wyBrhje+o\"",
    "mtime": "2026-02-22T12:10:09.713Z",
    "size": 5498,
    "path": "../public/_nuxt/DBAdN1fU.js"
  },
  "/_nuxt/DBh2zHJC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d0-Sv7AileO8xpf4fBv1rXeJCeJh60\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 720,
    "path": "../public/_nuxt/DBh2zHJC.js"
  },
  "/_nuxt/DBNzjsz0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c51-QVELUPUTcrAD3vnO6BejqzwI2Zg\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 3153,
    "path": "../public/_nuxt/DBNzjsz0.js"
  },
  "/_nuxt/DD8OMtwC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15c-iJEGysk6iOBAT+Qe3fNggnr2vEw\"",
    "mtime": "2026-02-22T12:10:09.713Z",
    "size": 348,
    "path": "../public/_nuxt/DD8OMtwC.js"
  },
  "/_nuxt/DDGTVOuY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17d3-tB21JCYy8j0yhdVK47hILQrzpfk\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 6099,
    "path": "../public/_nuxt/DDGTVOuY.js"
  },
  "/_nuxt/DE05sHCI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2edb-3c1ikiEX89azP9vJL3Rvq0hXeU0\"",
    "mtime": "2026-02-22T12:10:09.715Z",
    "size": 11995,
    "path": "../public/_nuxt/DE05sHCI.js"
  },
  "/_nuxt/DF1nAEf4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a53-H5mgQaNXc7qB46+0V1rAq8LrBTQ\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 6739,
    "path": "../public/_nuxt/DF1nAEf4.js"
  },
  "/_nuxt/DFD1Z-6a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e6c-9IBnN3LhblTSd1/L9BV9cLPIJjQ\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 15980,
    "path": "../public/_nuxt/DFD1Z-6a.js"
  },
  "/_nuxt/DFGqzCRk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5de-WtMNdktugPWsZn7SQuQ/FJ+5o28\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 1502,
    "path": "../public/_nuxt/DFGqzCRk.js"
  },
  "/_nuxt/DG2lQNye.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b3-+qI3pW/IleKzqTj6pOcIz3C8Y6A\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 1459,
    "path": "../public/_nuxt/DG2lQNye.js"
  },
  "/_nuxt/DGeyXoyH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2488-iWlyb8hmoVoZMkknfySCYZS/3Ak\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 9352,
    "path": "../public/_nuxt/DGeyXoyH.js"
  },
  "/_nuxt/DGvfamV4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9028-gtyLYHQmmv6ef3RfQSIR5RkinGc\"",
    "mtime": "2026-02-22T12:10:09.715Z",
    "size": 36904,
    "path": "../public/_nuxt/DGvfamV4.js"
  },
  "/_nuxt/DHO4qX4c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"102b-MPunNJX6naJJoZug367w6p1O9gs\"",
    "mtime": "2026-02-22T12:10:09.714Z",
    "size": 4139,
    "path": "../public/_nuxt/DHO4qX4c.js"
  },
  "/_nuxt/DJHJfSMy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e4a-o5vOiD0/RkYybBzoqbY6/qxNlGM\"",
    "mtime": "2026-02-22T12:10:09.715Z",
    "size": 3658,
    "path": "../public/_nuxt/DJHJfSMy.js"
  },
  "/_nuxt/DJkwsjsM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"108-iM+UYpTyZc45YuYWn+D3fpr4vzo\"",
    "mtime": "2026-02-22T12:10:09.715Z",
    "size": 264,
    "path": "../public/_nuxt/DJkwsjsM.js"
  },
  "/_nuxt/DK0AyUET.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10bb-6Yf9DxSb7DMGjOJmtGO6bFQMo/U\"",
    "mtime": "2026-02-22T12:10:09.715Z",
    "size": 4283,
    "path": "../public/_nuxt/DK0AyUET.js"
  },
  "/_nuxt/DKQpQDSU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ea3-Jtt2FrFttNzy5G9h9VLhB5eR8wA\"",
    "mtime": "2026-02-22T12:10:09.715Z",
    "size": 7843,
    "path": "../public/_nuxt/DKQpQDSU.js"
  },
  "/_nuxt/DLILBLtg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1566-RJN7Rq+vFiSXxYZidHYC7MV5omw\"",
    "mtime": "2026-02-22T12:10:09.716Z",
    "size": 5478,
    "path": "../public/_nuxt/DLILBLtg.js"
  },
  "/_nuxt/DLXdixFe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1beb-3RGJ9bj8lMpltYwoL1QLY76VpiU\"",
    "mtime": "2026-02-22T12:10:09.716Z",
    "size": 7147,
    "path": "../public/_nuxt/DLXdixFe.js"
  },
  "/_nuxt/DHf1yAPn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"306-9jf1I32H60fvVHvPbv3fTGlwE9o\"",
    "mtime": "2026-02-22T12:10:09.715Z",
    "size": 774,
    "path": "../public/_nuxt/DHf1yAPn.js"
  },
  "/_nuxt/DLuLwyz4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d76-4qxkM3+DoDoTl/1pF4zMR9PObiA\"",
    "mtime": "2026-02-22T12:10:09.716Z",
    "size": 15734,
    "path": "../public/_nuxt/DLuLwyz4.js"
  },
  "/_nuxt/DM5f3RQ4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"627-kBtLgZXUCJ55H0i/fgdxzUm5phc\"",
    "mtime": "2026-02-22T12:10:09.716Z",
    "size": 1575,
    "path": "../public/_nuxt/DM5f3RQ4.js"
  },
  "/_nuxt/DO7Hbsrd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"131f-Ab5v4B07SXDLU3iKoiTXT1VL6DQ\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 4895,
    "path": "../public/_nuxt/DO7Hbsrd.js"
  },
  "/_nuxt/DOyrb7bt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ff4-zNFCPogzAIBDlY/rmxxGa/iGwuM\"",
    "mtime": "2026-02-22T12:10:09.716Z",
    "size": 4084,
    "path": "../public/_nuxt/DOyrb7bt.js"
  },
  "/_nuxt/DP3Dzjq1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a10-5Pg2UxoymGtTc3s7H20Zb+cLvEs\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 6672,
    "path": "../public/_nuxt/DP3Dzjq1.js"
  },
  "/_nuxt/DOqx1_SW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ce-57BgK4dctdfyTJXxIHrgI+P/VgA\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 206,
    "path": "../public/_nuxt/DOqx1_SW.js"
  },
  "/_nuxt/DP9ywFsT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ef7-q0jYrJMadYfnBYaVNGYsslXYF3k\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 3831,
    "path": "../public/_nuxt/DP9ywFsT.js"
  },
  "/_nuxt/DQ6-BDX7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1dc9-bawKWQ3G1NUTvBE8Z49Mb11E5ZM\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 7625,
    "path": "../public/_nuxt/DQ6-BDX7.js"
  },
  "/_nuxt/DPwD-qub.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"92a-yTixXza41vQoFwXMn+yT3HBIV54\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 2346,
    "path": "../public/_nuxt/DPwD-qub.js"
  },
  "/_nuxt/DQ9Y75Rp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cf-0FjOjn9qrF+IXs2EeUFJ3Dnb5RE\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 207,
    "path": "../public/_nuxt/DQ9Y75Rp.js"
  },
  "/_nuxt/DR0Xtgdd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"877-aCRMwWLAFL0kSP8mjn4A+C068+8\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 2167,
    "path": "../public/_nuxt/DR0Xtgdd.js"
  },
  "/_nuxt/DROgIY4t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"275-0A/WUi//thwYcTeHG/TbkkcaBz8\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 629,
    "path": "../public/_nuxt/DROgIY4t.js"
  },
  "/_nuxt/DN2CQFy3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a51d-5vAk0cyO90AdMnyaeIluJ5qyzHo\"",
    "mtime": "2026-02-22T12:10:09.716Z",
    "size": 304413,
    "path": "../public/_nuxt/DN2CQFy3.js"
  },
  "/_nuxt/DSRNFrj3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"803-p8XOOJbNhxLEWCh1hUo7Ns2d4mA\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 2051,
    "path": "../public/_nuxt/DSRNFrj3.js"
  },
  "/_nuxt/DSde6z9j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cfd-3d72r5j4bCYhmuhf1oONxP23UwY\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 7421,
    "path": "../public/_nuxt/DSde6z9j.js"
  },
  "/_nuxt/DTTQG0Va.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1306-5NhRK4mYLbkD/GZ5sgLKNbKgXqE\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 4870,
    "path": "../public/_nuxt/DTTQG0Va.js"
  },
  "/_nuxt/DXMREmPE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1190-QqaHNFtbO8Kur4+lMaW5VXul0Og\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 4496,
    "path": "../public/_nuxt/DXMREmPE.js"
  },
  "/_nuxt/DXlFpak8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1be9-wX85XjBLs6zneN9AQhX85jZvcSg\"",
    "mtime": "2026-02-22T12:10:09.717Z",
    "size": 7145,
    "path": "../public/_nuxt/DXlFpak8.js"
  },
  "/_nuxt/DY4xuVHz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f3e-tggfQkZTUzxMIZYBGHcmsf7EXmE\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 3902,
    "path": "../public/_nuxt/DY4xuVHz.js"
  },
  "/_nuxt/DYsABzcf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"525-7aDGIuejz8dUP2YE/44q1zICM14\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 1317,
    "path": "../public/_nuxt/DYsABzcf.js"
  },
  "/_nuxt/DZS342hX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23a4-7sdgCD052ZZSpcVECoMEPZn5HnY\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 9124,
    "path": "../public/_nuxt/DZS342hX.js"
  },
  "/_nuxt/DZYYPk2j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c0b-PIhHQIPzkwKPHqOdOKRFfaMAYp4\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 7179,
    "path": "../public/_nuxt/DZYYPk2j.js"
  },
  "/_nuxt/DZlfZ7iS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29cb-A8+4iYDKlmEVmYZS98f+w0y2dgA\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 10699,
    "path": "../public/_nuxt/DZlfZ7iS.js"
  },
  "/_nuxt/DZ9G9SdP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9fb8-y/Y05BTNj1BEKIkBy/2ZM4whf7g\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 40888,
    "path": "../public/_nuxt/DZ9G9SdP.js"
  },
  "/_nuxt/D_DGTdYS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b03-Zf4uDgwXJJn55icztY/tswrkUq8\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 11011,
    "path": "../public/_nuxt/D_DGTdYS.js"
  },
  "/_nuxt/D_tng7Zd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"939-y+4OxUZ3AeFOv4W5G8GCok/LWQA\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 2361,
    "path": "../public/_nuxt/D_tng7Zd.js"
  },
  "/_nuxt/DaWZu8wl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27b-4GdUP3ReyQMpfYmncfxFiRvv/Eg\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 635,
    "path": "../public/_nuxt/DaWZu8wl.js"
  },
  "/_nuxt/D_SNzjNb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3598-JzNS9j8TquuOzehRpjzzfnkzCAc\"",
    "mtime": "2026-02-22T12:10:09.718Z",
    "size": 13720,
    "path": "../public/_nuxt/D_SNzjNb.js"
  },
  "/_nuxt/DaqGSa70.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5d5-IKYkpwUA2wnR4hXvf1CecB7iq5M\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 1493,
    "path": "../public/_nuxt/DaqGSa70.js"
  },
  "/_nuxt/DapIZME7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"385f-RVMeXCi/nbi7d5ECXwI45BLh5GY\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 14431,
    "path": "../public/_nuxt/DapIZME7.js"
  },
  "/_nuxt/DaxJQTZn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"40-Nuo2q8rypSlwAVzSQkvDVrPmCg0\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 64,
    "path": "../public/_nuxt/DaxJQTZn.js"
  },
  "/_nuxt/DbcvLlur.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26c1-XILsHTwAxyzXG0u5L4eN9FcPIFY\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 9921,
    "path": "../public/_nuxt/DbcvLlur.js"
  },
  "/_nuxt/DdOoCSxO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"103-hEFi+LizYC4/QkbP1ie9VBQwYWw\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 259,
    "path": "../public/_nuxt/DdOoCSxO.js"
  },
  "/_nuxt/Db9QCCWY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"79b-Y0b+cmUOugfE6HQNaJ0fHhjitdY\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 1947,
    "path": "../public/_nuxt/Db9QCCWY.js"
  },
  "/_nuxt/DeW5bprh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34d-GqKAVzDI2+vqS3ttcyPj0VwrJIg\"",
    "mtime": "2026-02-22T12:10:09.719Z",
    "size": 845,
    "path": "../public/_nuxt/DeW5bprh.js"
  },
  "/_nuxt/DeeSMTl6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6fd-8jFhNeDVNm+XjOWK28CfcupnxxY\"",
    "mtime": "2026-02-22T12:10:09.720Z",
    "size": 1789,
    "path": "../public/_nuxt/DeeSMTl6.js"
  },
  "/_nuxt/De3jBbFa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a3-XnuZx+JpgOYu4CwZJAvJC1yZuZ0\"",
    "mtime": "2026-02-22T12:10:09.720Z",
    "size": 419,
    "path": "../public/_nuxt/De3jBbFa.js"
  },
  "/_nuxt/DfHiyz9z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"50b-Uimgp+ozodSvNRKsn+NcBencvoM\"",
    "mtime": "2026-02-22T12:10:09.723Z",
    "size": 1291,
    "path": "../public/_nuxt/DfHiyz9z.js"
  },
  "/_nuxt/DfYtO3si.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1697-6BQZ/gtr+X4+eq+W4aTacVA+WdU\"",
    "mtime": "2026-02-22T12:10:09.720Z",
    "size": 5783,
    "path": "../public/_nuxt/DfYtO3si.js"
  },
  "/_nuxt/Dfc9Upt1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c51-5JOSaEEOWdKyqalBe0L7r+WcBhw\"",
    "mtime": "2026-02-22T12:10:09.722Z",
    "size": 7249,
    "path": "../public/_nuxt/Dfc9Upt1.js"
  },
  "/_nuxt/DgOBSPvG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f3-CPmHgaexd+Avnd3u5CZfykML2gg\"",
    "mtime": "2026-02-22T12:10:09.723Z",
    "size": 755,
    "path": "../public/_nuxt/DgOBSPvG.js"
  },
  "/_nuxt/DhFobeAz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47d-Sm/3fp+Pq5XWcLvHVv6Iltpz1Is\"",
    "mtime": "2026-02-22T12:10:09.722Z",
    "size": 1149,
    "path": "../public/_nuxt/DhFobeAz.js"
  },
  "/_nuxt/DiFH82eq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a0e-SpZO+qNKaGkQqTNJlSrgxta++mc\"",
    "mtime": "2026-02-22T12:10:09.723Z",
    "size": 6670,
    "path": "../public/_nuxt/DiFH82eq.js"
  },
  "/_nuxt/DhMGrmRz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4eb8-fcenOE24lyRk9eXQdPCY8AgVhFc\"",
    "mtime": "2026-02-22T12:10:09.724Z",
    "size": 20152,
    "path": "../public/_nuxt/DhMGrmRz.js"
  },
  "/_nuxt/DjfUBgI2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16bb-LqaD4LD8AYDjo7TdCXck3YSBnPY\"",
    "mtime": "2026-02-22T12:10:09.723Z",
    "size": 5819,
    "path": "../public/_nuxt/DjfUBgI2.js"
  },
  "/_nuxt/DniFItnr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"484-EpkZBXWA4CkUmzI07+jpxp0gaLg\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 1156,
    "path": "../public/_nuxt/DniFItnr.js"
  },
  "/_nuxt/Do2IxFjQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"252-lcoAE2GPXMfE7BFMkfkbY+5RsRI\"",
    "mtime": "2026-02-22T12:10:09.724Z",
    "size": 594,
    "path": "../public/_nuxt/Do2IxFjQ.js"
  },
  "/_nuxt/Dnj8X3EN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"57-PZqMcBA8QLP3AL7rMaOmsN1GFRE\"",
    "mtime": "2026-02-22T12:10:09.724Z",
    "size": 87,
    "path": "../public/_nuxt/Dnj8X3EN.js"
  },
  "/_nuxt/DppRkt7A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48f-Jzfu9dJBMxT/vOaGwMJ6EDk9WZI\"",
    "mtime": "2026-02-22T12:10:09.724Z",
    "size": 1167,
    "path": "../public/_nuxt/DppRkt7A.js"
  },
  "/_nuxt/DsGi4sb8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b68-4jzTXSUj/8X3woyT2RLKbsmbYvE\"",
    "mtime": "2026-02-22T12:10:09.725Z",
    "size": 7016,
    "path": "../public/_nuxt/DsGi4sb8.js"
  },
  "/_nuxt/DtHR7LFT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12b5-tyv9JLQoMe4ORVH3Da2WttcbPNE\"",
    "mtime": "2026-02-22T12:10:09.724Z",
    "size": 4789,
    "path": "../public/_nuxt/DtHR7LFT.js"
  },
  "/_nuxt/DwnjKtvL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1aee-t2np37swZdchkvdkkdG7I602p0w\"",
    "mtime": "2026-02-22T12:10:09.724Z",
    "size": 6894,
    "path": "../public/_nuxt/DwnjKtvL.js"
  },
  "/_nuxt/DtUio_pQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49f-LGZExQxogfGNcEWNjHHpi6HCcSY\"",
    "mtime": "2026-02-22T12:10:09.724Z",
    "size": 1183,
    "path": "../public/_nuxt/DtUio_pQ.js"
  },
  "/_nuxt/DusMcL-k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a6a-UVvg6fW6E6KpH/96eo2yDm389pM\"",
    "mtime": "2026-02-22T12:10:09.725Z",
    "size": 2666,
    "path": "../public/_nuxt/DusMcL-k.js"
  },
  "/_nuxt/DtvoPXv1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3902-uC2PWR/JWdYd55LuljydeUaJv90\"",
    "mtime": "2026-02-22T12:10:09.725Z",
    "size": 14594,
    "path": "../public/_nuxt/DtvoPXv1.js"
  },
  "/_nuxt/DxZwYuci.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12ca-sKWi9t7CK3UQQgt9Q2BaGIiwRoU\"",
    "mtime": "2026-02-22T12:10:09.725Z",
    "size": 4810,
    "path": "../public/_nuxt/DxZwYuci.js"
  },
  "/_nuxt/DyXfo8_B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9e0-3nF/GbbKHTDW32tvdpN2k5Uh+BU\"",
    "mtime": "2026-02-22T12:10:09.725Z",
    "size": 2528,
    "path": "../public/_nuxt/DyXfo8_B.js"
  },
  "/_nuxt/Dy_VfIo4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63d-idKt8UJY6/KMDPM94R/UgUeU0Mg\"",
    "mtime": "2026-02-22T12:10:09.725Z",
    "size": 1597,
    "path": "../public/_nuxt/Dy_VfIo4.js"
  },
  "/_nuxt/Dz8gC84u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"67b-RRdW/4J73YA/Cjb/EPbRzjIZko8\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 1659,
    "path": "../public/_nuxt/Dz8gC84u.js"
  },
  "/_nuxt/Dxle7YWw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a3f-8bukxE7B/rxb7QVXxspfhz0XDDg\"",
    "mtime": "2026-02-22T12:10:09.725Z",
    "size": 10815,
    "path": "../public/_nuxt/Dxle7YWw.js"
  },
  "/_nuxt/EmailInput.BJdvcpVY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"492-9omhF7beIUahmLXQGlQ4Mkt2HOk\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 1170,
    "path": "../public/_nuxt/EmailInput.BJdvcpVY.css"
  },
  "/_nuxt/G2iMdT-4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18e-9ytmFUdgGWL5nMC6XgUf7hzMVcE\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 398,
    "path": "../public/_nuxt/G2iMdT-4.js"
  },
  "/_nuxt/DyB1paoS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"306-IDEM/wPi2HAlxCHkxjYlkFmM7yg\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 774,
    "path": "../public/_nuxt/DyB1paoS.js"
  },
  "/_nuxt/FaqTicker.CWylO37y.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"288-v04JmI67v4GayEvnhC2Rr2KoO40\"",
    "mtime": "2026-02-22T12:10:09.725Z",
    "size": 648,
    "path": "../public/_nuxt/FaqTicker.CWylO37y.css"
  },
  "/_nuxt/GRTNK6EK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"618-oyFBecc3AAJd1UD2wA7qpau2j9I\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 1560,
    "path": "../public/_nuxt/GRTNK6EK.js"
  },
  "/_nuxt/GlobalLoader.CBa6d-VM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bf4-ijAApvQThBmDeTshMtJUeNSpvjg\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 3060,
    "path": "../public/_nuxt/GlobalLoader.CBa6d-VM.css"
  },
  "/_nuxt/GwDCneiM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3bc-ZRitMYvfSJ1DCVTfCG36M0+uung\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 956,
    "path": "../public/_nuxt/GwDCneiM.js"
  },
  "/_nuxt/HnYL_Gnj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"970-JzLzW2Ia/mux/ogyZhL5h5GByAA\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 2416,
    "path": "../public/_nuxt/HnYL_Gnj.js"
  },
  "/_nuxt/IgaNIgQI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34a-XeYkKuZi5GeowR2/3o8NskBIfoU\"",
    "mtime": "2026-02-22T12:10:09.726Z",
    "size": 842,
    "path": "../public/_nuxt/IgaNIgQI.js"
  },
  "/_nuxt/JvAQiPF6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1be-UDW6OVHOeUelXElMbOHMjcz5Pzw\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 446,
    "path": "../public/_nuxt/JvAQiPF6.js"
  },
  "/_nuxt/KyUhAtAT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d75-lojuNJ18a7nBjqlBGc/ohFhG4sM\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 7541,
    "path": "../public/_nuxt/KyUhAtAT.js"
  },
  "/_nuxt/LoginRegisterModal.DpeoSO3V.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"18a0-hl3Tell2etiu79MDfMoTt5RazkI\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 6304,
    "path": "../public/_nuxt/LoginRegisterModal.DpeoSO3V.css"
  },
  "/_nuxt/MAXpwzgg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1639-aFXxZIPxRc9iPe1G7YCMXCixfTg\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 5689,
    "path": "../public/_nuxt/MAXpwzgg.js"
  },
  "/_nuxt/MCYsEVhd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"119d-jdK80lUU5Ihz39RvlBKbszOp3iw\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 4509,
    "path": "../public/_nuxt/MCYsEVhd.js"
  },
  "/_nuxt/MmKYmLeX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"657-Ggw8ptbHmznAUtCmgHcPtt22N4Y\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 1623,
    "path": "../public/_nuxt/MmKYmLeX.js"
  },
  "/_nuxt/MobileContactModal.CP5K0rW1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d66-X6vTlDdM6zjesXvoxvHYMyc35Sw\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 3430,
    "path": "../public/_nuxt/MobileContactModal.CP5K0rW1.css"
  },
  "/_nuxt/MobileCouponTicket.CsxuJPCq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b34-q0/rN8Od4quLO7tYvTMDT4U8H1c\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 2868,
    "path": "../public/_nuxt/MobileCouponTicket.CsxuJPCq.css"
  },
  "/_nuxt/MobileInfiniteList.9LDSs-oq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"23f-dNmI7wCQMW9VnE6v/wBihFoOkqc\"",
    "mtime": "2026-02-22T12:10:09.727Z",
    "size": 575,
    "path": "../public/_nuxt/MobileInfiniteList.9LDSs-oq.css"
  },
  "/_nuxt/MobileDeleteAccountModal.8_XzZSaB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1da4-sXFYfxSBrVyaRZjTKF1cm5WNSS0\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 7588,
    "path": "../public/_nuxt/MobileDeleteAccountModal.8_XzZSaB.css"
  },
  "/_nuxt/MobileCouponSelectorSheet._Hv8SX-L.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bcd-PW6L5KWI1tc2c6fNQYv5eZX/kHo\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 3021,
    "path": "../public/_nuxt/MobileCouponSelectorSheet._Hv8SX-L.css"
  },
  "/_nuxt/MobileLoginSheet.8Dt78RM7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"16fd-Ur5yRf2DWfQQTGidqQRsSdPk3T4\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 5885,
    "path": "../public/_nuxt/MobileLoginSheet.8Dt78RM7.css"
  },
  "/_nuxt/MobileOrderProductInfo.51qz6wIw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a4-6XV/vKNcjClvcck+H6bt7hmjE4A\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 2212,
    "path": "../public/_nuxt/MobileOrderProductInfo.51qz6wIw.css"
  },
  "/_nuxt/MobileSubPageHeader.C72OlVBw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b8-rz0fKkuetBYDmJTjViGW8SltnUE\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 952,
    "path": "../public/_nuxt/MobileSubPageHeader.C72OlVBw.css"
  },
  "/_nuxt/NsdrBQAQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27c-cepjUlpCYWjdPGO4aXR/tXHf3EU\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 636,
    "path": "../public/_nuxt/NsdrBQAQ.js"
  },
  "/_nuxt/OrderInfoCard.HGC0qE1G.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b30-RayIKLYJF8oWwuGRGpREDApEgq4\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 2864,
    "path": "../public/_nuxt/OrderInfoCard.HGC0qE1G.css"
  },
  "/_nuxt/P23yIBti.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18e5-x8YY/je1K9LZhXLwsNYVOv1gsIg\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 6373,
    "path": "../public/_nuxt/P23yIBti.js"
  },
  "/_nuxt/MobilePaySuccessModal.BHOtJqE8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"986-U/0wF1DoU2l/2CD3DOCPwg7pRXI\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 2438,
    "path": "../public/_nuxt/MobilePaySuccessModal.BHOtJqE8.css"
  },
  "/_nuxt/PageTipHeader.B13Ts7nI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5a-FklAzDpd6qfB0p4Ec3MLZI32tQg\"",
    "mtime": "2026-02-22T12:10:09.729Z",
    "size": 90,
    "path": "../public/_nuxt/PageTipHeader.B13Ts7nI.css"
  },
  "/_nuxt/PaySuccessModal.DRi_wAgb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d52-GKlq0gUaDtvGpQqHh6DvQfj5ytw\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 3410,
    "path": "../public/_nuxt/PaySuccessModal.DRi_wAgb.css"
  },
  "/_nuxt/ProductDetailSheet.PaLRagsB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"223d-W4Z79iEB2OltNTtxs2n9FyBJqtg\"",
    "mtime": "2026-02-22T12:10:09.729Z",
    "size": 8765,
    "path": "../public/_nuxt/ProductDetailSheet.PaLRagsB.css"
  },
  "/_nuxt/ProductThumbCell.-Uj9JpKZ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"30f-IDJ8yovLkkU8e6UEPswMhPoQ5fE\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 783,
    "path": "../public/_nuxt/ProductThumbCell.-Uj9JpKZ.css"
  },
  "/_nuxt/QWFFb-LM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"399-mLmK0AjNnUTcAB2uMT88VnSvFbo\"",
    "mtime": "2026-02-22T12:10:09.729Z",
    "size": 921,
    "path": "../public/_nuxt/QWFFb-LM.js"
  },
  "/_nuxt/R__iUz4e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d4-oiiibWygV8j0WZgCqIFZXUcRICI\"",
    "mtime": "2026-02-22T12:10:09.729Z",
    "size": 212,
    "path": "../public/_nuxt/R__iUz4e.js"
  },
  "/_nuxt/RechargeModal.BerTRRfQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"df8-Ojv5b+oWbFfiaj+tIldHpW/R7Vc\"",
    "mtime": "2026-02-22T12:10:09.728Z",
    "size": 3576,
    "path": "../public/_nuxt/RechargeModal.BerTRRfQ.css"
  },
  "/_nuxt/QstbcPO_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7d44-rEJEBaSSKe+wPgOdArCbROsd67c\"",
    "mtime": "2026-02-22T12:10:09.730Z",
    "size": 32068,
    "path": "../public/_nuxt/QstbcPO_.js"
  },
  "/_nuxt/RedemptionCard.D9CkcNUk.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"474-o4sY113Yk/sdC85JFiYgbHGux3I\"",
    "mtime": "2026-02-22T12:10:09.729Z",
    "size": 1140,
    "path": "../public/_nuxt/RedemptionCard.D9CkcNUk.css"
  },
  "/_nuxt/RjP_3fEH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e03-PPAXP70EeLCz/oWHbmu4SPmDN1w\"",
    "mtime": "2026-02-22T12:10:09.729Z",
    "size": 3587,
    "path": "../public/_nuxt/RjP_3fEH.js"
  },
  "/_nuxt/SendCodeButton.Zfy52dEC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2dd-EXx3mtupbElO0SSl+px23P4C5Tc\"",
    "mtime": "2026-02-22T12:10:09.729Z",
    "size": 733,
    "path": "../public/_nuxt/SendCodeButton.Zfy52dEC.css"
  },
  "/_nuxt/ServiceModal.C_GPXOcf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a6c-zQ/oH9PJrardZb01x7qf/Qkvc/M\"",
    "mtime": "2026-02-22T12:10:09.730Z",
    "size": 2668,
    "path": "../public/_nuxt/ServiceModal.C_GPXOcf.css"
  },
  "/_nuxt/SkuEditor.BTqAImAf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8d8-2NeX2HxCscKUjq9wOX87EwMMwwo\"",
    "mtime": "2026-02-22T12:10:09.730Z",
    "size": 2264,
    "path": "../public/_nuxt/SkuEditor.BTqAImAf.css"
  },
  "/_nuxt/StickyFormHeader.BzDmvhS4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"39b-45m7Xdx6aiXnss+K01Xt4ViYtmo\"",
    "mtime": "2026-02-22T12:10:09.729Z",
    "size": 923,
    "path": "../public/_nuxt/StickyFormHeader.BzDmvhS4.css"
  },
  "/_nuxt/Su2WRw2K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fb7-D6HrIjz5LtDPU4QRp1XEejyzARY\"",
    "mtime": "2026-02-22T12:10:09.731Z",
    "size": 8119,
    "path": "../public/_nuxt/Su2WRw2K.js"
  },
  "/_nuxt/TagInputGroup.BzZA8HKV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"85-uUvr4sxjm5K08sOu95rlj3R/bhU\"",
    "mtime": "2026-02-22T12:10:09.730Z",
    "size": 133,
    "path": "../public/_nuxt/TagInputGroup.BzZA8HKV.css"
  },
  "/_nuxt/TicketChatModal.tLiYyBPB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17fb-RLj6bxyf3CT6K8ci4+iTD6yB9Q8\"",
    "mtime": "2026-02-22T12:10:09.730Z",
    "size": 6139,
    "path": "../public/_nuxt/TicketChatModal.tLiYyBPB.css"
  },
  "/_nuxt/TicketDetailModal.BiNzyCrS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c34-1eFR5jFtk2XUaSoG72jeolZkoHY\"",
    "mtime": "2026-02-22T12:10:09.730Z",
    "size": 3124,
    "path": "../public/_nuxt/TicketDetailModal.BiNzyCrS.css"
  },
  "/_nuxt/TqdLcM6R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a01-8dCdHmYJVZc+GtRAeEGRG0Ii7EE\"",
    "mtime": "2026-02-22T12:10:09.730Z",
    "size": 6657,
    "path": "../public/_nuxt/TqdLcM6R.js"
  },
  "/_nuxt/UQKdmBMM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1655b-SjYsapSyuI6zwc8KC+TGKcDAptw\"",
    "mtime": "2026-02-22T12:10:09.731Z",
    "size": 91483,
    "path": "../public/_nuxt/UQKdmBMM.js"
  },
  "/_nuxt/WFhw5mZm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12f4-+04dS70Ov8zfQRQRgF07xg2XTVI\"",
    "mtime": "2026-02-22T12:10:09.731Z",
    "size": 4852,
    "path": "../public/_nuxt/WFhw5mZm.js"
  },
  "/_nuxt/VTJS8Vdi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7722-RezvIadZJeorsEO5yDW1sU9szKE\"",
    "mtime": "2026-02-22T12:10:09.731Z",
    "size": 30498,
    "path": "../public/_nuxt/VTJS8Vdi.js"
  },
  "/_nuxt/WalletRechargeModal.BIvrGfF5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17e6-Twny75WMBzjGLlSQpOJwj6viig8\"",
    "mtime": "2026-02-22T12:10:09.731Z",
    "size": 6118,
    "path": "../public/_nuxt/WalletRechargeModal.BIvrGfF5.css"
  },
  "/_nuxt/Y8UGH_fH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e71-sodYCEgpkzvyNpWtQbCkhoFr+1Y\"",
    "mtime": "2026-02-22T12:10:09.731Z",
    "size": 7793,
    "path": "../public/_nuxt/Y8UGH_fH.js"
  },
  "/_nuxt/Z1fu0S4b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a23-EcRey7vNJr+ec4k/gDUuEcM0o7c\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 6691,
    "path": "../public/_nuxt/Z1fu0S4b.js"
  },
  "/_nuxt/YcvNIaSr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"57d-eAuftHJHcWIA4U8MgGiMzdJrCzE\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 1405,
    "path": "../public/_nuxt/YcvNIaSr.js"
  },
  "/_nuxt/_CP4_twb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"141-dHezgs7S6Yv/fgl1e1KgtxR1KmU\"",
    "mtime": "2026-02-22T12:10:09.731Z",
    "size": 321,
    "path": "../public/_nuxt/_CP4_twb.js"
  },
  "/_nuxt/_id_.9MpTofjp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a26-oJ+QVJTP+fP8SC7W/lPKu6r6cAg\"",
    "mtime": "2026-02-22T12:10:09.731Z",
    "size": 6694,
    "path": "../public/_nuxt/_id_.9MpTofjp.css"
  },
  "/_nuxt/_id_.B4jMxhj6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"49-zkOBK9gNJfskvUfWRm/b/lZdv58\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 73,
    "path": "../public/_nuxt/_id_.B4jMxhj6.css"
  },
  "/_nuxt/_id_.BO1Zu_XP.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2f77-o9z8+sAqeyIIaytkAILRtxlfswM\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 12151,
    "path": "../public/_nuxt/_id_.BO1Zu_XP.css"
  },
  "/_nuxt/_id_.BpEGem50.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a54-xBL6a50rw1CJELTeZ8VkEP/69IQ\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 6740,
    "path": "../public/_nuxt/_id_.BpEGem50.css"
  },
  "/_nuxt/_id_.BV-v_tkl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f3e-jezeiUM3mo+M79DLMzyLsp2aBLk\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 24382,
    "path": "../public/_nuxt/_id_.BV-v_tkl.css"
  },
  "/_nuxt/_id_.DTXO4BID.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4e4-S7tOKf5J1wexoHZb1VKyijHd4wo\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 1252,
    "path": "../public/_nuxt/_id_.DTXO4BID.css"
  },
  "/_nuxt/_id_.COFbg1aM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"955b-OeiKAwMNnvjoH/oP2bBsZ0yXNO4\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 38235,
    "path": "../public/_nuxt/_id_.COFbg1aM.css"
  },
  "/_nuxt/_id_.DYCIMkLi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c98-OaxDQBOpr9irLMBS6j0gt4tewYY\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 3224,
    "path": "../public/_nuxt/_id_.DYCIMkLi.css"
  },
  "/_nuxt/_id_.DfREjBeg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"119f-nQlLckOG1tkrTWSdoWf1H8ez7MM\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 4511,
    "path": "../public/_nuxt/_id_.DfREjBeg.css"
  },
  "/_nuxt/_id_.Di5an29Z.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d04-xQXmciDGdyM3/nMZPtZeJ0SExwQ\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 11524,
    "path": "../public/_nuxt/_id_.Di5an29Z.css"
  },
  "/_nuxt/_id_.DqjTvB75.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ab1-xqjSKVPfb5YqWgvid8/GL5mtuLg\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 2737,
    "path": "../public/_nuxt/_id_.DqjTvB75.css"
  },
  "/_nuxt/_id_.mejeNS5J.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4cf-LwbhFAhhOx1cXchtLYErWHUUHQM\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 1231,
    "path": "../public/_nuxt/_id_.mejeNS5J.css"
  },
  "/_nuxt/advantages.CzSpUFbO.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"766-zx+9pAjdf1IRfmklWw8x0XvzDyA\"",
    "mtime": "2026-02-22T12:10:09.732Z",
    "size": 1894,
    "path": "../public/_nuxt/advantages.CzSpUFbO.css"
  },
  "/_nuxt/article-categories.CbjwIYe6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28-WK2bGy0qNui0t1Z7roT8qyTT2xs\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 40,
    "path": "../public/_nuxt/article-categories.CbjwIYe6.css"
  },
  "/_nuxt/about-us.B6yIoGsj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"595-jr6WMM3+VEdr/AQLwiLPEOI1o6E\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 1429,
    "path": "../public/_nuxt/about-us.B6yIoGsj.css"
  },
  "/_nuxt/articles.vH5i1xtJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28-17ZTyz5lXk85XZ2LhhgFbJCJAhM\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 40,
    "path": "../public/_nuxt/articles.vH5i1xtJ.css"
  },
  "/_nuxt/bCVJ1913.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d2-ibRwO6ETFPr/5478rq3SKAVW72c\"",
    "mtime": "2026-02-22T12:10:09.734Z",
    "size": 978,
    "path": "../public/_nuxt/bCVJ1913.js"
  },
  "/_nuxt/bJw-dfsR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2dd-bHzK+SEPdqAzXbXQWRaPUt3uMt4\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 733,
    "path": "../public/_nuxt/bJw-dfsR.js"
  },
  "/_nuxt/banners.CPz_TBAc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"320-n5VJW34UxdfM9R9u/sVUYl7Uh7c\"",
    "mtime": "2026-02-22T12:10:09.734Z",
    "size": 800,
    "path": "../public/_nuxt/banners.CPz_TBAc.css"
  },
  "/_nuxt/batch-send.B5jsVbAE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"638-gj6ASvURGmrUKCDe++THQoaYKT4\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 1592,
    "path": "../public/_nuxt/batch-send.B5jsVbAE.css"
  },
  "/_nuxt/cart.D4lvXhrC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1729-zdW5KCAZF5UEdMxPlpAiz7/lwGg\"",
    "mtime": "2026-02-22T12:10:09.733Z",
    "size": 5929,
    "path": "../public/_nuxt/cart.D4lvXhrC.css"
  },
  "/_nuxt/categories.3pm6-KD9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28-wtJTXpcbLDJ01Wph0x6D/zcKf0k\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 40,
    "path": "../public/_nuxt/categories.3pm6-KD9.css"
  },
  "/_nuxt/c1uE--N5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"275e-aP7fEbyGnOwq9MWJ5Ro5MR+1+8Q\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 10078,
    "path": "../public/_nuxt/c1uE--N5.js"
  },
  "/_nuxt/categories.CIO_jdWN.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"134-9Vtw9B9ZF6SGzK6ItAr6UvyQO4U\"",
    "mtime": "2026-02-22T12:10:09.734Z",
    "size": 308,
    "path": "../public/_nuxt/categories.CIO_jdWN.css"
  },
  "/_nuxt/cdks.D8F7GiuS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"219-GOQvtxblBuI/qFUbKlN7YCOTx8E\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 537,
    "path": "../public/_nuxt/cdks.D8F7GiuS.css"
  },
  "/_nuxt/channel-recognition.C9dplGUx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d3-e4c2ssvW7lXCUSaMYxAhhcqn1is\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 979,
    "path": "../public/_nuxt/channel-recognition.C9dplGUx.css"
  },
  "/_nuxt/channel.Y-5yQQYZ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e41-3ZBy6v1aIUX9uupfhsIcwlymgKc\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 7745,
    "path": "../public/_nuxt/channel.Y-5yQQYZ.css"
  },
  "/_nuxt/community.BDh8uJ0G.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1130-lv4hug6RHCCVoLUrQG3yVmf5qyA\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 4400,
    "path": "../public/_nuxt/community.BDh8uJ0G.css"
  },
  "/_nuxt/company.doyQiM_H.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"55e-OH2jjD8q9gFJbfiIy9gwM9gj8rk\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 1374,
    "path": "../public/_nuxt/company.doyQiM_H.css"
  },
  "/_nuxt/contact.DG27-mXI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6b0-72JfGlT0RNmL2Vu3KOYFpR5jS4A\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 1712,
    "path": "../public/_nuxt/contact.DG27-mXI.css"
  },
  "/_nuxt/disclaimer.CzpR_rFz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"94e-0iacXCTyPD88b6F5sXZ8+EqicmQ\"",
    "mtime": "2026-02-22T12:10:09.734Z",
    "size": 2382,
    "path": "../public/_nuxt/disclaimer.CzpR_rFz.css"
  },
  "/_nuxt/create.564Achvz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ce8-RHChibW/EnocGE1mP/ML9i024xI\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 3304,
    "path": "../public/_nuxt/create.564Achvz.css"
  },
  "/_nuxt/dnoiyB6k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15ac-nBHcWT5PJs6jTibEo3iQ3lFBfhc\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 5548,
    "path": "../public/_nuxt/dnoiyB6k.js"
  },
  "/_nuxt/dyiKaP-m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"998-9qUFp6amHpiJNLppRl4H1dtOEJE\"",
    "mtime": "2026-02-22T12:10:09.734Z",
    "size": 2456,
    "path": "../public/_nuxt/dyiKaP-m.js"
  },
  "/_nuxt/eUqWJtS0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d50-8DHQwqJM2r0gIt4cmK3wsIWeo1c\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 15696,
    "path": "../public/_nuxt/eUqWJtS0.js"
  },
  "/_nuxt/edit.CUuOa5pq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"171e-F89W9uRIiLQrUx8xFBIrxHIYWWo\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 5918,
    "path": "../public/_nuxt/edit.CUuOa5pq.css"
  },
  "/_nuxt/el-alert.G57rL0jl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d84-LIn6pfLRDt+3xIWNSGzZFrF7PVs\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 3460,
    "path": "../public/_nuxt/el-alert.G57rL0jl.css"
  },
  "/_nuxt/el-avatar.BmRr_O8d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36e-cWB3FYKRlmRMpEMmJ6Xdr7MimAY\"",
    "mtime": "2026-02-22T12:10:09.735Z",
    "size": 878,
    "path": "../public/_nuxt/el-avatar.BmRr_O8d.css"
  },
  "/_nuxt/el-button.C18MJXp0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c62-fXNB2YOIPMVykC2sjgzAl8wtgvY\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 15458,
    "path": "../public/_nuxt/el-button.C18MJXp0.css"
  },
  "/_nuxt/el-checkbox.kru21oEy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1973-hJ2XOCwC1thzUhOFEHaLyCdeXfg\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 6515,
    "path": "../public/_nuxt/el-checkbox.kru21oEy.css"
  },
  "/_nuxt/el-color-picker-panel.NjQqztfJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c3a-26H/WvwSc58N+xG+fqtzNYjRpY4\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 7226,
    "path": "../public/_nuxt/el-color-picker-panel.NjQqztfJ.css"
  },
  "/_nuxt/el-date-picker-panel.DfJdag8h.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6efb-s/7rCaLKUeCImlMT5ix8ath9VQE\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 28411,
    "path": "../public/_nuxt/el-date-picker-panel.DfJdag8h.css"
  },
  "/_nuxt/el-descriptions.CfS05pcB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d59-bZsPlNDX3rd9X4dxf8vWffDHOVc\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 3417,
    "path": "../public/_nuxt/el-descriptions.CfS05pcB.css"
  },
  "/_nuxt/el-dialog.e3ftD6vW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de7-vmBktn0Piz8e6cHjDSPY2nBVQTQ\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 3559,
    "path": "../public/_nuxt/el-dialog.e3ftD6vW.css"
  },
  "/_nuxt/el-card.DGFn2Dlf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"39c-ZjGGak5NsnVcbgS7++0XqOnh64o\"",
    "mtime": "2026-02-22T12:10:09.736Z",
    "size": 924,
    "path": "../public/_nuxt/el-card.DGFn2Dlf.css"
  },
  "/_nuxt/el-divider.BUtF_RGI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c2-aZTwdFAd2kjucv4FlePPXYHT5f4\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 706,
    "path": "../public/_nuxt/el-divider.BUtF_RGI.css"
  },
  "/_nuxt/el-drawer.Dz7gZKs3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e05-n29rPgE6sX60ntjrSqUSYPhoiAY\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 3589,
    "path": "../public/_nuxt/el-drawer.Dz7gZKs3.css"
  },
  "/_nuxt/el-empty.DZHWrHdf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"484-yurRL7B+PlJy/JxzNr5vT+5tG9I\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 1156,
    "path": "../public/_nuxt/el-empty.DZHWrHdf.css"
  },
  "/_nuxt/el-form-item.wo-RV3Ho.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1144-WgFo1YM2Tv5iLK0mlnK3tuu3hW8\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 4420,
    "path": "../public/_nuxt/el-form-item.wo-RV3Ho.css"
  },
  "/_nuxt/el-form.BIZHt-uy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13d-5uoUyEEbKzf8nCL0MfbhZMr6d10\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 317,
    "path": "../public/_nuxt/el-form.BIZHt-uy.css"
  },
  "/_nuxt/el-image-viewer.BnNgdT0R.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a44-cRqbt6CZZPBQpACVL2OHnpsMliM\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 2628,
    "path": "../public/_nuxt/el-image-viewer.BnNgdT0R.css"
  },
  "/_nuxt/el-input-number.Bu7TZO0p.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10db-ozAB9NJNkbuxjFYt2j8GRuFv1YI\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 4315,
    "path": "../public/_nuxt/el-input-number.Bu7TZO0p.css"
  },
  "/_nuxt/el-input.CzSQoayR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29f0-PIaX4M2hnsymvhie74CVBIsizNg\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 10736,
    "path": "../public/_nuxt/el-input.CzSQoayR.css"
  },
  "/_nuxt/el-loading.bpKhqqQq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"635-O1A6c6tgtvj5/SRzWCS5wNSWMVs\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 1589,
    "path": "../public/_nuxt/el-loading.bpKhqqQq.css"
  },
  "/_nuxt/el-message-box.CJOz_J0r.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1279-qwgnQ8k26DdtshvXMLUlX0hGzzw\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 4729,
    "path": "../public/_nuxt/el-message-box.CJOz_J0r.css"
  },
  "/_nuxt/el-overlay.Db7iXMEX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a2-CiH2pRl8uf+7/CNQFdqMX+6IXvE\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 162,
    "path": "../public/_nuxt/el-overlay.Db7iXMEX.css"
  },
  "/_nuxt/el-pagination.R3dw6MKB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1af4-z+kDNkUzF8vxuXS28TvOSyOAypQ\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 6900,
    "path": "../public/_nuxt/el-pagination.R3dw6MKB.css"
  },
  "/_nuxt/el-popover.Dx7EGtyB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f7-l+qAF6F3xG2qUE+zVxNounUH3Gw\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 1527,
    "path": "../public/_nuxt/el-popover.Dx7EGtyB.css"
  },
  "/_nuxt/el-popper.DJ3OI_Cw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"965-K4ykt9xZjF1gLEeCp0vDRME8dno\"",
    "mtime": "2026-02-22T12:10:09.737Z",
    "size": 2405,
    "path": "../public/_nuxt/el-popper.DJ3OI_Cw.css"
  },
  "/_nuxt/el-progress.DebJDDRi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"375a-HtkQb0bYz2ewLOKuttf1Pltrnzo\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 14170,
    "path": "../public/_nuxt/el-progress.DebJDDRi.css"
  },
  "/_nuxt/el-radio-button.BeOTx1oy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c6c-ZF4oKA2fSQT8i24T7KpGjgMP7iU\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 3180,
    "path": "../public/_nuxt/el-radio-button.BeOTx1oy.css"
  },
  "/_nuxt/el-radio-group.B0bauIRR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1123-hGBcVwqrx+CFrYvmFL/sZF/epPw\"",
    "mtime": "2026-02-22T12:10:09.739Z",
    "size": 4387,
    "path": "../public/_nuxt/el-radio-group.B0bauIRR.css"
  },
  "/_nuxt/el-row.CsbxBLOD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9902-XFtsI2+JxgbJ7YvA+3NSnMkAnpA\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 39170,
    "path": "../public/_nuxt/el-row.CsbxBLOD.css"
  },
  "/_nuxt/el-scrollbar.BWxh-h6K.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"52f-GGYkEyguhSa81PVnYeGqExThuso\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 1327,
    "path": "../public/_nuxt/el-scrollbar.BWxh-h6K.css"
  },
  "/_nuxt/el-skeleton-item.BkFlB11x.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3ea-T8FpJ6wc3tlrT0/FV0dQ5S6wUkM\"",
    "mtime": "2026-02-22T12:10:09.739Z",
    "size": 1002,
    "path": "../public/_nuxt/el-skeleton-item.BkFlB11x.css"
  },
  "/_nuxt/el-select.BKzWW-QJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"235f-2Aw+3DtB9Ej9+MAqRjiZ4fIpYbA\"",
    "mtime": "2026-02-22T12:10:09.739Z",
    "size": 9055,
    "path": "../public/_nuxt/el-select.BKzWW-QJ.css"
  },
  "/_nuxt/el-skeleton.BptQLlZU.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"243-qBlOzs9eyUx5/abIzKt6p1EPLl4\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 579,
    "path": "../public/_nuxt/el-skeleton.BptQLlZU.css"
  },
  "/_nuxt/el-switch.BLBNcSVp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f44-x8jEO5hlX5dUEchLfP2kqmdK2JQ\"",
    "mtime": "2026-02-22T12:10:09.738Z",
    "size": 3908,
    "path": "../public/_nuxt/el-switch.BLBNcSVp.css"
  },
  "/_nuxt/el-table.BIL69yBV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4b74-zGf+ETasYbuVjfY49LB91SJqCRw\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 19316,
    "path": "../public/_nuxt/el-table.BIL69yBV.css"
  },
  "/_nuxt/el-tabs.BGBs9Wmx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3a0e-5mDFTYt8dImvyyBsxRBGVn14Wqw\"",
    "mtime": "2026-02-22T12:10:09.739Z",
    "size": 14862,
    "path": "../public/_nuxt/el-tabs.BGBs9Wmx.css"
  },
  "/_nuxt/el-tag.CIs2GBS3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"165c-B1vUGzHzWWqoKv3rR3m/YaBl/SM\"",
    "mtime": "2026-02-22T12:10:09.739Z",
    "size": 5724,
    "path": "../public/_nuxt/el-tag.CIs2GBS3.css"
  },
  "/_nuxt/el-tooltip.tn0RQdqM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2026-02-22T12:09:46.103Z",
    "size": 0,
    "path": "../public/_nuxt/el-tooltip.tn0RQdqM.css"
  },
  "/_nuxt/entry.DZUy-Iq_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"145a-PhuSSzwIxa5gjCXLApppHPUn0c8\"",
    "mtime": "2026-02-22T12:10:09.739Z",
    "size": 5210,
    "path": "../public/_nuxt/entry.DZUy-Iq_.css"
  },
  "/_nuxt/exchange.DXHt2eAB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dc2-M0uSVh6/Ozk+JtlmV8qUZnNEhzs\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 3522,
    "path": "../public/_nuxt/exchange.DXHt2eAB.css"
  },
  "/_nuxt/faq-categories.Cl2o0rdb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2fc-0Gct3tGT6axDxBl5uTpXbyGFGoc\"",
    "mtime": "2026-02-22T12:10:09.739Z",
    "size": 764,
    "path": "../public/_nuxt/faq-categories.Cl2o0rdb.css"
  },
  "/_nuxt/faq.Bc4ltUPT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10e0-zjBbuisjx17OC79UE5uHdPiT+H0\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 4320,
    "path": "../public/_nuxt/faq.Bc4ltUPT.css"
  },
  "/_nuxt/favorites.DRLkGAxu.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1102-9DBJXopjF+pi04GcL4QTi4w8wYo\"",
    "mtime": "2026-02-22T12:10:09.739Z",
    "size": 4354,
    "path": "../public/_nuxt/favorites.DRLkGAxu.css"
  },
  "/_nuxt/fmvTsC3c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"51e8-QZrgWFwgTuvwPOrptEa5OyQSJw4\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 20968,
    "path": "../public/_nuxt/fmvTsC3c.js"
  },
  "/_nuxt/fpqLy4jv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"44e2-uHIWtSuJJ7FQjNBDKPyjSdMAWNg\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 17634,
    "path": "../public/_nuxt/fpqLy4jv.js"
  },
  "/_nuxt/gOuFBq2g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"57-XEKVDYXJLG5u7D64zIjITG0LjqM\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 87,
    "path": "../public/_nuxt/gOuFBq2g.js"
  },
  "/_nuxt/help.DNzxgfwA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1180-+nftbAha/F6g5wDMrqG800H9DiY\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 4480,
    "path": "../public/_nuxt/help.DNzxgfwA.css"
  },
  "/_nuxt/images.p_7vynHX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1559-brTSWrtmY1oj4UizP2KERnPTc/w\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 5465,
    "path": "../public/_nuxt/images.p_7vynHX.css"
  },
  "/_nuxt/index.B2lKOOXI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24a2-2k0faBWMPUp2MoIrzrF37CGgF+g\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 9378,
    "path": "../public/_nuxt/index.B2lKOOXI.css"
  },
  "/_nuxt/index.BEsoNDtI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2a6d-eW3SAy7sdjAgHcE/IMNz3TYKd2I\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 10861,
    "path": "../public/_nuxt/index.BEsoNDtI.css"
  },
  "/_nuxt/index.B8AG-QNH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"32b-p0h7vBA75mWtYHxzIBjeUP1Exeg\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 811,
    "path": "../public/_nuxt/index.B8AG-QNH.css"
  },
  "/_nuxt/index.BDxMEcYx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"44-Nk//TatB6hMLtEhlw8JEgNEWLIE\"",
    "mtime": "2026-02-22T12:10:09.740Z",
    "size": 68,
    "path": "../public/_nuxt/index.BDxMEcYx.css"
  },
  "/_nuxt/index.BF4PA6lX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29e-XYXef3NRYha7eUHYSqHNCDbhUB4\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 670,
    "path": "../public/_nuxt/index.BF4PA6lX.css"
  },
  "/_nuxt/index.BIp6jAMx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"42cb-d14qDFDDmjnNvTsaXkIANDrY6+k\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 17099,
    "path": "../public/_nuxt/index.BIp6jAMx.css"
  },
  "/_nuxt/index.BJb_MJM9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"321-zWeoG6K0Nd3TyQYgeG3BlbDeOu8\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 801,
    "path": "../public/_nuxt/index.BJb_MJM9.css"
  },
  "/_nuxt/index.BKIioraU.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ea-6ppnl2CPhgaqUjWFleXJXiJtdFo\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 490,
    "path": "../public/_nuxt/index.BKIioraU.css"
  },
  "/_nuxt/index.BKreNLEA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"622-wrAm78SiX9h4TgAx6kY5wv6bZi0\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 1570,
    "path": "../public/_nuxt/index.BKreNLEA.css"
  },
  "/_nuxt/index.BM7K4Q1n.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b1-aljEbz3zACihUnxVzsdwKBWfJZM\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 1457,
    "path": "../public/_nuxt/index.BM7K4Q1n.css"
  },
  "/_nuxt/index.BMd-636i.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1fb-kFl5YIHD/Oy0X5wU3uqAlqFABqk\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 507,
    "path": "../public/_nuxt/index.BMd-636i.css"
  },
  "/_nuxt/index.BP4T5_fl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"128e-5gzw1Pfuu7ENebGXJYmawo5IwXk\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 4750,
    "path": "../public/_nuxt/index.BP4T5_fl.css"
  },
  "/_nuxt/index.BXeE8G9D.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"16ed-iTr2t0aw4FdQpzmodnpps3jwi4k\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 5869,
    "path": "../public/_nuxt/index.BXeE8G9D.css"
  },
  "/_nuxt/index.BkER139r.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e8e-z81lJHGvnPzV1cdLOgNZJaZcQ1o\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 7822,
    "path": "../public/_nuxt/index.BkER139r.css"
  },
  "/_nuxt/index.C40N7UFT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ccd-gQIVx92kRs8+QGVJ5fQTcWuqHWQ\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 3277,
    "path": "../public/_nuxt/index.C40N7UFT.css"
  },
  "/_nuxt/index.CBSupWto.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"321-Y8FJ8XQNwZfJGOsLz9cOM9BJnJ0\"",
    "mtime": "2026-02-22T12:10:09.741Z",
    "size": 801,
    "path": "../public/_nuxt/index.CBSupWto.css"
  },
  "/_nuxt/index.CI0mRgZ5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"31-Vnlo8guq5K/fr3CCfANMF12A2yU\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 49,
    "path": "../public/_nuxt/index.CI0mRgZ5.css"
  },
  "/_nuxt/index.CCZpDH06.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d3a-+R0lfXeVAz5DTqvR6A5qrUgr5Kg\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 3386,
    "path": "../public/_nuxt/index.CCZpDH06.css"
  },
  "/_nuxt/index.COzOIWk0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"86a-QVT5xhZHoJwN9pY4A9EmVletDuI\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 2154,
    "path": "../public/_nuxt/index.COzOIWk0.css"
  },
  "/_nuxt/index.CR3XTczg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b27-yqgbvhRALUkPLvKzs1ytq9DIf8g\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 2855,
    "path": "../public/_nuxt/index.CR3XTczg.css"
  },
  "/_nuxt/index.CfNBkdyl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"77-YG3ulexsqwq72JIRQC0+bu2vkh0\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 119,
    "path": "../public/_nuxt/index.CfNBkdyl.css"
  },
  "/_nuxt/index.CSYYoAdT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"93-zXXCX9hdicfYqShDVYzW5nkKsgg\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 147,
    "path": "../public/_nuxt/index.CSYYoAdT.css"
  },
  "/_nuxt/index.CsWeSScd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1d3-6IoKr6yc6Plagn65xSPjTKnW6eM\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 467,
    "path": "../public/_nuxt/index.CsWeSScd.css"
  },
  "/_nuxt/index.D7of-tKU.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"31-b5sbjWeud5hClo1syVrNuEpkk9k\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 49,
    "path": "../public/_nuxt/index.D7of-tKU.css"
  },
  "/_nuxt/index.DEyfyJAT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"77-gVOwvb1wQVPsbvLRr9Guk5XP+TI\"",
    "mtime": "2026-02-22T12:10:09.742Z",
    "size": 119,
    "path": "../public/_nuxt/index.DEyfyJAT.css"
  },
  "/_nuxt/index.DAkVRRGw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36e3-8xhEvkEUg1tbBVX+IYK+zBBeCDw\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 14051,
    "path": "../public/_nuxt/index.DAkVRRGw.css"
  },
  "/_nuxt/index.DdaRkYY0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43a-NVhxQYdeNOMNA4/pvkesT8UwFoU\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 1082,
    "path": "../public/_nuxt/index.DdaRkYY0.css"
  },
  "/_nuxt/index.DkyFv2wn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f0-VOvVJ7Y/zvjiMsh5e99zZWX4okA\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 496,
    "path": "../public/_nuxt/index.DkyFv2wn.css"
  },
  "/_nuxt/index.DmBBYN63.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8b-pM75bVK/CFO+YDi8Kgprsb4//gI\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 139,
    "path": "../public/_nuxt/index.DmBBYN63.css"
  },
  "/_nuxt/index.DzyELQg4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e49-9znHzAAD+jrNNf7dwToIFN+GALI\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 7753,
    "path": "../public/_nuxt/index.DzyELQg4.css"
  },
  "/_nuxt/index.Q-iLqdDd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17e5-ufxFfo3AKUTwotK25XSDdicVwFI\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 6117,
    "path": "../public/_nuxt/index.Q-iLqdDd.css"
  },
  "/_nuxt/index.SQivQGGD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"728-kvMwhuBTfxH+q4X4uowmCdc4X28\"",
    "mtime": "2026-02-22T12:10:09.743Z",
    "size": 1832,
    "path": "../public/_nuxt/index.SQivQGGD.css"
  },
  "/_nuxt/index.T8XcJJ5q.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"100-OI6irVKIG/euRhoIDvtB2g9j5hY\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 256,
    "path": "../public/_nuxt/index.T8XcJJ5q.css"
  },
  "/_nuxt/index.TLOPAW6s.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"465-6VHXSLpkJJnOw2wDN4NHFnGGlw8\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 1125,
    "path": "../public/_nuxt/index.TLOPAW6s.css"
  },
  "/_nuxt/index.bR_0Cy_l.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"34b-V665Rbc76Vnf1uUuh4zmrB7EoQI\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 843,
    "path": "../public/_nuxt/index.bR_0Cy_l.css"
  },
  "/_nuxt/index.jen3emvY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"252-Qn5/Y4icEwMLm6OAWnpOUWWOsso\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 594,
    "path": "../public/_nuxt/index.jen3emvY.css"
  },
  "/_nuxt/index.n6_Ln1uh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"413f-4zYQqXnL/ZmKjvDlEeUpua6eznU\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 16703,
    "path": "../public/_nuxt/index.n6_Ln1uh.css"
  },
  "/_nuxt/iuenWFwh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c58-pzTHWu/AgiGiex8Hzu8R8zgiDPs\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 3160,
    "path": "../public/_nuxt/iuenWFwh.js"
  },
  "/_nuxt/kIDW9zQC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156-EF0DT8ImZwSAzhG3CnZ7lpeIqF4\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 342,
    "path": "../public/_nuxt/kIDW9zQC.js"
  },
  "/_nuxt/index.w3M097EX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"122c-/a+1Yu+WfOcaM8BywZWBuj2Du00\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 4652,
    "path": "../public/_nuxt/index.w3M097EX.css"
  },
  "/_nuxt/join-us.Dq2Exosk.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b7c-XfKsqYr6rV3K+OZhTAs+0sD0evE\"",
    "mtime": "2026-02-22T12:10:09.744Z",
    "size": 2940,
    "path": "../public/_nuxt/join-us.Dq2Exosk.css"
  },
  "/_nuxt/login.BWGLFt3S.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"20e-NnO/QFKkrYTMLEIMrfBKt0Xt1jw\"",
    "mtime": "2026-02-22T12:10:09.745Z",
    "size": 526,
    "path": "../public/_nuxt/login.BWGLFt3S.css"
  },
  "/_nuxt/messages.Bu36NFP3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10e2-uzY8zxBvcbOc5o6xqRlNPiSL/G4\"",
    "mtime": "2026-02-22T12:10:09.746Z",
    "size": 4322,
    "path": "../public/_nuxt/messages.Bu36NFP3.css"
  },
  "/_nuxt/mgmt.C053aekY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6fa9-v74I9cuzUdywMWMpPnZNceqXwgE\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 28585,
    "path": "../public/_nuxt/mgmt.C053aekY.css"
  },
  "/_nuxt/mobile.Dt_Q1JhM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3695-WHzh+qd5Dy+VcH5BGCLvDuXl5T4\"",
    "mtime": "2026-02-22T12:10:09.746Z",
    "size": 13973,
    "path": "../public/_nuxt/mobile.Dt_Q1JhM.css"
  },
  "/_nuxt/nYn__X79.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1554-BLGQcS0yTOwDKKCwc8r2teh8C2w\"",
    "mtime": "2026-02-22T12:10:09.746Z",
    "size": 5460,
    "path": "../public/_nuxt/nYn__X79.js"
  },
  "/_nuxt/nsRtaBJX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"475-Oz+PXRSho5QP0HrSnI3EI7j54X0\"",
    "mtime": "2026-02-22T12:10:09.745Z",
    "size": 1141,
    "path": "../public/_nuxt/nsRtaBJX.js"
  },
  "/_nuxt/oi3to8Af.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"87b-/vfqYimfmGpaVrL2AKW+BlQ+OyA\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 2171,
    "path": "../public/_nuxt/oi3to8Af.js"
  },
  "/_nuxt/orders.CEs4yFCt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26c-+uyibQ/h0CNriabxdsaEZD3P2Z4\"",
    "mtime": "2026-02-22T12:10:09.746Z",
    "size": 620,
    "path": "../public/_nuxt/orders.CEs4yFCt.css"
  },
  "/_nuxt/oiJFOL9y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9fd-jxd8wJkjOiEcYcMv3sX0KgehKMY\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 2557,
    "path": "../public/_nuxt/oiJFOL9y.js"
  },
  "/_nuxt/p7Nlm_oa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"91b-YokvnSAveY7n0zWx6SqNgBarj8s\"",
    "mtime": "2026-02-22T12:10:09.746Z",
    "size": 2331,
    "path": "../public/_nuxt/p7Nlm_oa.js"
  },
  "/_nuxt/policy.BWZxKVvt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1538-vUiU+ItzsVIFvFFiML7aa5Xll/k\"",
    "mtime": "2026-02-22T12:10:09.748Z",
    "size": 5432,
    "path": "../public/_nuxt/policy.BWZxKVvt.css"
  },
  "/_nuxt/policy.Bqn_BfVa.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"da4-UQDOjNbx0jkxWRn+oAisXNc4l5s\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 3492,
    "path": "../public/_nuxt/policy.Bqn_BfVa.css"
  },
  "/_nuxt/pc.BI7BLer2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4124-BcCrtffJakWRvugnf3l0M8+7fPA\"",
    "mtime": "2026-02-22T12:10:09.745Z",
    "size": 16676,
    "path": "../public/_nuxt/pc.BI7BLer2.css"
  },
  "/_nuxt/post.B55gyajQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2842-Nhdb/BxSkQvZZMC2qiknz5aX6Jc\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 10306,
    "path": "../public/_nuxt/post.B55gyajQ.css"
  },
  "/_nuxt/post.BHFoJMOC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4dc-6N/4fYppNqLeRpS6ONOvouHSzqQ\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 1244,
    "path": "../public/_nuxt/post.BHFoJMOC.css"
  },
  "/_nuxt/post.BRxA9yQ8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6d0-4ysQrk+32miWdjyt5qMCGMkIL/E\"",
    "mtime": "2026-02-22T12:10:09.749Z",
    "size": 1744,
    "path": "../public/_nuxt/post.BRxA9yQ8.css"
  },
  "/_nuxt/post.BRFVhYHA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"640-IFgDEYWfXIMR3kzqIOXd23MTI2w\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 1600,
    "path": "../public/_nuxt/post.BRFVhYHA.css"
  },
  "/_nuxt/post.BmvvhC4w.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6e2-dSpnoOQLs9hZ86PvXZNDfMIIuOc\"",
    "mtime": "2026-02-22T12:10:09.748Z",
    "size": 1762,
    "path": "../public/_nuxt/post.BmvvhC4w.css"
  },
  "/_nuxt/post.C2fTYtR9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1258-GNx3lno4MHU+I5wfKgzOxi20iOk\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 4696,
    "path": "../public/_nuxt/post.C2fTYtR9.css"
  },
  "/_nuxt/post.CopyQw2X.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6fa-Hjua1R6u7WpjnCCI6VY3k02J3qo\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 1786,
    "path": "../public/_nuxt/post.CopyQw2X.css"
  },
  "/_nuxt/privacy.Dz3Yf2Ra.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f0b-k0wRoYucXcf5+c12Jkvq5GWGzSM\"",
    "mtime": "2026-02-22T12:10:09.748Z",
    "size": 3851,
    "path": "../public/_nuxt/privacy.Dz3Yf2Ra.css"
  },
  "/_nuxt/privacy.D86RnXdZ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a33-v8cbnPJhLdFAkl7X50lxwK9TPFs\"",
    "mtime": "2026-02-22T12:10:09.747Z",
    "size": 6707,
    "path": "../public/_nuxt/privacy.D86RnXdZ.css"
  },
  "/_nuxt/profile.2T00gKHc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25b2-oG10uTpBEl7nSpj9nFPKengikkw\"",
    "mtime": "2026-02-22T12:10:09.748Z",
    "size": 9650,
    "path": "../public/_nuxt/profile.2T00gKHc.css"
  },
  "/_nuxt/rF45GjU0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ca5-luTBKm6T+1bNW/msCWlrgjXZZck\"",
    "mtime": "2026-02-22T12:10:09.750Z",
    "size": 3237,
    "path": "../public/_nuxt/rF45GjU0.js"
  },
  "/_nuxt/rDp1jXnv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5266-8JFlL9O8UJETMbp+2bYa9aiDXMc\"",
    "mtime": "2026-02-22T12:10:09.749Z",
    "size": 21094,
    "path": "../public/_nuxt/rDp1jXnv.js"
  },
  "/_nuxt/rk6bsYKN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ac-5NnT8bXX+Hpbewu4EiwavKoDtTE\"",
    "mtime": "2026-02-22T12:10:09.749Z",
    "size": 172,
    "path": "../public/_nuxt/rk6bsYKN.js"
  },
  "/_nuxt/refund.CxxQ4Sgz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"db4-6lShP5b3WnOTm9Ks3Prbng/X3cU\"",
    "mtime": "2026-02-22T12:10:09.750Z",
    "size": 3508,
    "path": "../public/_nuxt/refund.CxxQ4Sgz.css"
  },
  "/_nuxt/scheduler.efyX1Krx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1019-aUjEObn7Xb3umWEscLey+YbVe4c\"",
    "mtime": "2026-02-22T12:10:09.750Z",
    "size": 4121,
    "path": "../public/_nuxt/scheduler.efyX1Krx.css"
  },
  "/_nuxt/settings.B-PIprvV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36f-8r4bBGNZP9CEFznoUh5/fCBoduk\"",
    "mtime": "2026-02-22T12:10:09.748Z",
    "size": 879,
    "path": "../public/_nuxt/settings.B-PIprvV.css"
  },
  "/_nuxt/shared-sku.CRjfTUnH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"34e-kL5jk6M4qN+8+fBg5rlLYnkTS0o\"",
    "mtime": "2026-02-22T12:10:09.750Z",
    "size": 846,
    "path": "../public/_nuxt/shared-sku.CRjfTUnH.css"
  },
  "/_nuxt/sfUIfw-V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27d-jn4fgZIpC7JO+fKOVXFJzXWFdqc\"",
    "mtime": "2026-02-22T12:10:09.749Z",
    "size": 637,
    "path": "../public/_nuxt/sfUIfw-V.js"
  },
  "/_nuxt/storage.BSp8tkzF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2cb-r3Z8n5hJSOrlwYlT1mF6Pvtxczk\"",
    "mtime": "2026-02-22T12:10:09.749Z",
    "size": 715,
    "path": "../public/_nuxt/storage.BSp8tkzF.css"
  },
  "/_nuxt/tTeVyZVn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ec3-IvgJ1S4ZQtaqpKlskbf1vMk6pO8\"",
    "mtime": "2026-02-22T12:10:09.756Z",
    "size": 16067,
    "path": "../public/_nuxt/tTeVyZVn.js"
  },
  "/_nuxt/tWrkBW8Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22d-rFqvJZkpX3n751VGoMFEqZl5wfU\"",
    "mtime": "2026-02-22T12:10:09.751Z",
    "size": 557,
    "path": "../public/_nuxt/tWrkBW8Y.js"
  },
  "/_nuxt/skus.DWZAxCkE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2da-0AWJAlk3XMCrehfvcenJUywHxuY\"",
    "mtime": "2026-02-22T12:10:09.749Z",
    "size": 730,
    "path": "../public/_nuxt/skus.DWZAxCkE.css"
  },
  "/_nuxt/tickets.BSZropWr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"115d-AX1XLngjlSUjockPqDnV82mMLZU\"",
    "mtime": "2026-02-22T12:10:09.751Z",
    "size": 4445,
    "path": "../public/_nuxt/tickets.BSZropWr.css"
  },
  "/_nuxt/uUm5aGv-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49c-SGDBg64/FUgLYyp8KvZwJp5+Cd8\"",
    "mtime": "2026-02-22T12:10:09.750Z",
    "size": 1180,
    "path": "../public/_nuxt/uUm5aGv-.js"
  },
  "/_nuxt/tiers.B00i_iww.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"cb-Y8dflxzLj90udo2aYnOyPokR3Xs\"",
    "mtime": "2026-02-22T12:10:09.751Z",
    "size": 203,
    "path": "../public/_nuxt/tiers.B00i_iww.css"
  },
  "/_nuxt/useAdminOrderList.Bnny8Ief.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6d8-+h8m0Wj9oPk5iWZex7zD7OjgwSQ\"",
    "mtime": "2026-02-22T12:10:09.751Z",
    "size": 1752,
    "path": "../public/_nuxt/useAdminOrderList.Bnny8Ief.css"
  },
  "/_nuxt/wallet.BrbbXvb6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"efe-PVq30Hhl1Jah99Dz3h7StFe3xtU\"",
    "mtime": "2026-02-22T12:10:09.750Z",
    "size": 3838,
    "path": "../public/_nuxt/wallet.BrbbXvb6.css"
  },
  "/_nuxt/wallet.Ch7KuYsD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"178d-xKA+1nYbDvV7XKATGBdlwORjWU4\"",
    "mtime": "2026-02-22T12:10:09.751Z",
    "size": 6029,
    "path": "../public/_nuxt/wallet.Ch7KuYsD.css"
  },
  "/_nuxt/yf6Tmdjf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2be5-yz1UO5LlxjZLqirapucqu7JrQbk\"",
    "mtime": "2026-02-22T12:10:09.752Z",
    "size": 11237,
    "path": "../public/_nuxt/yf6Tmdjf.js"
  },
  "/_nuxt/wcqOMkSb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bad-6CGgoa6jJhdYcP/We9zOFacgT4M\"",
    "mtime": "2026-02-22T12:10:09.751Z",
    "size": 7085,
    "path": "../public/_nuxt/wcqOMkSb.js"
  },
  "/_nuxt/wechat-callback.339Ch_Hv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e62-8GN1LJ6ehvsP2pE4DKzgVU+wcwY\"",
    "mtime": "2026-02-22T12:10:09.751Z",
    "size": 3682,
    "path": "../public/_nuxt/wechat-callback.339Ch_Hv.css"
  },
  "/images/avatars/01.png": {
    "type": "image/png",
    "etag": "\"b6794-2chmo/mENRu3bjWwe/VvULWAsGg\"",
    "mtime": "2026-02-22T12:10:09.767Z",
    "size": 747412,
    "path": "../public/images/avatars/01.png"
  },
  "/images/avatars/02.png": {
    "type": "image/png",
    "etag": "\"b5cb9-45TX4z/Kq05VijquoF63dHrI8U4\"",
    "mtime": "2026-02-22T12:10:09.769Z",
    "size": 744633,
    "path": "../public/images/avatars/02.png"
  },
  "/images/avatars/03.png": {
    "type": "image/png",
    "etag": "\"b050f-clmUEApnYvNNI514nbA/eSHOIwA\"",
    "mtime": "2026-02-22T12:10:09.769Z",
    "size": 722191,
    "path": "../public/images/avatars/03.png"
  },
  "/images/avatars/04.png": {
    "type": "image/png",
    "etag": "\"bd6ba-gmhl664OtDz/spxcMjIIqiFjNS0\"",
    "mtime": "2026-02-22T12:10:09.770Z",
    "size": 775866,
    "path": "../public/images/avatars/04.png"
  },
  "/images/avatars/08.png": {
    "type": "image/png",
    "etag": "\"bd48e-lLtx6p4FAu4V7LeOe2v/4QUejas\"",
    "mtime": "2026-02-22T12:10:09.771Z",
    "size": 775310,
    "path": "../public/images/avatars/08.png"
  },
  "/images/avatars/06.png": {
    "type": "image/png",
    "etag": "\"bb708-3LsUVFI97XCB9CaV2psoSGWMP3Y\"",
    "mtime": "2026-02-22T12:10:09.770Z",
    "size": 767752,
    "path": "../public/images/avatars/06.png"
  },
  "/images/avatars/05.png": {
    "type": "image/png",
    "etag": "\"bddc3-ep7Fyk9+tCFLz3tIM3hLq4l7nYM\"",
    "mtime": "2026-02-22T12:10:09.769Z",
    "size": 777667,
    "path": "../public/images/avatars/05.png"
  },
  "/images/avatars/07.png": {
    "type": "image/png",
    "etag": "\"b8110-QCVeu6zrtmiUJ8SBB8KQmBCJFg4\"",
    "mtime": "2026-02-22T12:10:09.770Z",
    "size": 753936,
    "path": "../public/images/avatars/07.png"
  },
  "/images/contact/telegram_qr.jpg": {
    "type": "image/jpeg",
    "etag": "\"2074b-b3tqjWzhdiKaNnF1dkhsqkzKj8E\"",
    "mtime": "2026-02-22T12:10:09.766Z",
    "size": 132939,
    "path": "../public/images/contact/telegram_qr.jpg"
  },
  "/images/avatars/09.png": {
    "type": "image/png",
    "etag": "\"b3de2-RZh6vN6dBqfOwXVSM4gJXC1vbcY\"",
    "mtime": "2026-02-22T12:10:09.771Z",
    "size": 736738,
    "path": "../public/images/avatars/09.png"
  },
  "/images/shared/logo.png": {
    "type": "image/png",
    "etag": "\"86b-VYpDUXN23nROjZUxFyTXad8FlEE\"",
    "mtime": "2026-02-22T12:10:09.772Z",
    "size": 2155,
    "path": "../public/images/shared/logo.png"
  },
  "/images/shared/oauth-facebook.png": {
    "type": "image/png",
    "etag": "\"7fa-9y597WwYhAf8u+jY44RTwuqV/VY\"",
    "mtime": "2026-02-22T12:10:09.772Z",
    "size": 2042,
    "path": "../public/images/shared/oauth-facebook.png"
  },
  "/images/shared/logo_v2.png": {
    "type": "image/png",
    "etag": "\"61281-ZCbx++ztEvi+l4qGavx2IdJ+r80\"",
    "mtime": "2026-02-22T12:10:09.771Z",
    "size": 397953,
    "path": "../public/images/shared/logo_v2.png"
  },
  "/images/shared/oauth-google.png": {
    "type": "image/png",
    "etag": "\"1126-PFrlnwemHmK6hv4CqCyiHqYVsgU\"",
    "mtime": "2026-02-22T12:10:09.771Z",
    "size": 4390,
    "path": "../public/images/shared/oauth-google.png"
  },
  "/images/client/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2804-9D4kDu8zWrCPx+Za2JjXWWDA3QA\"",
    "mtime": "2026-02-22T12:10:09.765Z",
    "size": 10244,
    "path": "../public/images/client/.DS_Store"
  },
  "/images/modal/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-16PpfpLolCwGCrAttkmBE1tsMEE\"",
    "mtime": "2026-02-22T12:10:09.766Z",
    "size": 8196,
    "path": "../public/images/modal/.DS_Store"
  },
  "/images/theme/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2026-02-22T12:10:09.767Z",
    "size": 6148,
    "path": "../public/images/theme/.DS_Store"
  },
  "/images/shared/oauth-github.png": {
    "type": "image/png",
    "etag": "\"995-83npvvkLFuN8mqoM4LVIBVMFznM\"",
    "mtime": "2026-02-22T12:10:09.770Z",
    "size": 2453,
    "path": "../public/images/shared/oauth-github.png"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-t+mcIA6zV0QbVTlLiXEoA3TGeUw\"",
    "mtime": "2026-02-22T12:10:09.644Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/images/client/mobile/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2026-02-22T12:10:09.766Z",
    "size": 6148,
    "path": "../public/images/client/mobile/.DS_Store"
  },
  "/images/client/pc/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2804-NQAoqy1woKFmuRSIKQufuUD3qVo\"",
    "mtime": "2026-02-22T12:10:09.767Z",
    "size": 10244,
    "path": "../public/images/client/pc/.DS_Store"
  },
  "/images/client/pc/kefuweinxin1.png": {
    "type": "image/png",
    "etag": "\"310-C2vG8SiXrbZ0Yunb9KXW+l22rzY\"",
    "mtime": "2026-02-22T12:10:09.773Z",
    "size": 784,
    "path": "../public/images/client/pc/kefuweinxin1.png"
  },
  "/images/shared/logo_v3.png": {
    "type": "image/png",
    "etag": "\"5c9ab-mfTjwDQP0bORYbS2xru40ut0i4w\"",
    "mtime": "2026-02-22T12:10:09.766Z",
    "size": 379307,
    "path": "../public/images/shared/logo_v3.png"
  },
  "/images/contact/wechat_qr.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c144-2/Ghws0BBvE/CRZxrCdKn3SBSUY\"",
    "mtime": "2026-02-22T12:10:09.771Z",
    "size": 180548,
    "path": "../public/images/contact/wechat_qr.jpg"
  },
  "/images/client/pc/link1.png": {
    "type": "image/png",
    "etag": "\"2d1-5xnlL9qsHSGxF/F8MrjgHGSWto0\"",
    "mtime": "2026-02-22T12:10:09.773Z",
    "size": 721,
    "path": "../public/images/client/pc/link1.png"
  },
  "/images/client/pc/weixin.png": {
    "type": "image/png",
    "etag": "\"54de2-aBD5CyFkJfpdCutIZb6zn5IU3KE\"",
    "mtime": "2026-02-22T12:10:09.773Z",
    "size": 347618,
    "path": "../public/images/client/pc/weixin.png"
  },
  "/images/client/pc/zhifu2.png": {
    "type": "image/png",
    "etag": "\"49ce5-yRLhQVcpUb0zN/uXRyThPhcYx6I\"",
    "mtime": "2026-02-22T12:10:09.773Z",
    "size": 302309,
    "path": "../public/images/client/pc/zhifu2.png"
  },
  "/images/client/pc/zhifu2_副本.png": {
    "type": "image/png",
    "etag": "\"3d2-DOt3da8id4lW/XkVBoXWAPgSkpw\"",
    "mtime": "2026-02-22T12:10:09.773Z",
    "size": 978,
    "path": "../public/images/client/pc/zhifu2_副本.png"
  },
  "/_nuxt/builds/meta/c13ff7cf-4f7c-496a-8076-7006a14880e9.json": {
    "type": "application/json",
    "etag": "\"58-h9gN0i1ISSvE0bUjHCyb3YKiCoI\"",
    "mtime": "2026-02-22T12:10:09.642Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/c13ff7cf-4f7c-496a-8076-7006a14880e9.json"
  },
  "/_nuxt/builds/meta/dev.json": {
    "type": "application/json",
    "etag": "\"37-OhJvRPA9pwQmmFkfAqigQ1sYd0s\"",
    "mtime": "2026-02-22T12:10:09.642Z",
    "size": 55,
    "path": "../public/_nuxt/builds/meta/dev.json"
  },
  "/images/modal/pc/mascot_02.png": {
    "type": "image/png",
    "etag": "\"7bf59-qOoSUm1yvk0AlzER0CxR4r5sBqI\"",
    "mtime": "2026-02-22T12:10:09.767Z",
    "size": 507737,
    "path": "../public/images/modal/pc/mascot_02.png"
  },
  "/images/client/pc/avatars/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2804-noL6vK+uRZ0WdHjoT+JTxCOfMHw\"",
    "mtime": "2026-02-22T12:10:09.775Z",
    "size": 10244,
    "path": "../public/images/client/pc/avatars/.DS_Store"
  },
  "/images/theme/ambassador.png": {
    "type": "image/png",
    "etag": "\"d0a33-VA3VWJV1Kyqbp3EVZghNVjmnsok\"",
    "mtime": "2026-02-22T12:10:09.774Z",
    "size": 854579,
    "path": "../public/images/theme/ambassador.png"
  },
  "/images/modal/pc/mascot_01.png": {
    "type": "image/png",
    "etag": "\"9df97-UkSnzbvWZnqNNap7uaOdIsG6x9E\"",
    "mtime": "2026-02-22T12:10:09.774Z",
    "size": 647063,
    "path": "../public/images/modal/pc/mascot_01.png"
  },
  "/images/client/pc/avatars/avatar-1.png": {
    "type": "image/png",
    "etag": "\"974b2-Dz/F5gMzZoCRA97yng3+ai8F0n4\"",
    "mtime": "2026-02-22T12:10:09.768Z",
    "size": 619698,
    "path": "../public/images/client/pc/avatars/avatar-1.png"
  },
  "/images/client/pc/avatars/avatar-bear.png": {
    "type": "image/png",
    "etag": "\"4f858-R8+HbEoP6YY0LY8LOc4q9qLUv5U\"",
    "mtime": "2026-02-22T12:10:09.774Z",
    "size": 325720,
    "path": "../public/images/client/pc/avatars/avatar-bear.png"
  },
  "/images/client/pc/avatars/avatar-bunny.png": {
    "type": "image/png",
    "etag": "\"53cce-wuU5ttLtsV7io+3xE2oT13RNaF8\"",
    "mtime": "2026-02-22T12:10:09.775Z",
    "size": 343246,
    "path": "../public/images/client/pc/avatars/avatar-bunny.png"
  },
  "/images/client/pc/avatars/avatar-cat.png": {
    "type": "image/png",
    "etag": "\"52be1-yzPOlUeJptsQEx98oFmobAupjQ0\"",
    "mtime": "2026-02-22T12:10:09.775Z",
    "size": 338913,
    "path": "../public/images/client/pc/avatars/avatar-cat.png"
  },
  "/images/client/pc/avatars/avatar-frog.png": {
    "type": "image/png",
    "etag": "\"4c8c9-BgJB5/7fhMwWe6RbGx1hRtUGYBk\"",
    "mtime": "2026-02-22T12:10:09.775Z",
    "size": 313545,
    "path": "../public/images/client/pc/avatars/avatar-frog.png"
  },
  "/images/client/pc/avatars/avatar-owl.png": {
    "type": "image/png",
    "etag": "\"510e6-ibOK4pJ7yntjS0Pv+pCQTwzvTpk\"",
    "mtime": "2026-02-22T12:10:09.775Z",
    "size": 332006,
    "path": "../public/images/client/pc/avatars/avatar-owl.png"
  },
  "/images/client/pc/avatars/avatar-penguin.png": {
    "type": "image/png",
    "etag": "\"60417-VOdMBDplAjF5KCe1KqJtZULcrIg\"",
    "mtime": "2026-02-22T12:10:09.775Z",
    "size": 394263,
    "path": "../public/images/client/pc/avatars/avatar-penguin.png"
  },
  "/images/client/pc/avatars/avatar-2.png": {
    "type": "image/png",
    "etag": "\"95699-eiVh8dZqZKiNb+KP5I4PEnHE6Z0\"",
    "mtime": "2026-02-22T12:10:09.774Z",
    "size": 611993,
    "path": "../public/images/client/pc/avatars/avatar-2.png"
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
const resolve$1 = function(...arguments_) {
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
  return promises.readFile(resolve$1(serverDir, assets[id].path))
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

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),o=new Proxy(r,{get(e,s){return i()[s]??r[s]},has(e,s){const E=i();return s in E||s in r},set(e,s,E){const B=i(true);return B[s]=E,true},deleteProperty(e,s){if(!s)return  false;const E=i(true);return delete E[s],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"production"||"",f=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CLOUDFLARE_WORKERS","WORKERS_CI",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["CODESANDBOX","CODESANDBOX_HOST",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function b(){if(globalThis.process?.env)for(const e of f){const s=e[1]||e[0];if(globalThis.process?.env[s])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=b();l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(o.CI)||l.ci!==false,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(o.DEBUG);const a=t==="test"||n(o.TEST),h=t==="dev"||t==="development";n(o.MINIMAL)||T||a||!R;const A=/^win/i.test(I);!n(o.NO_COLOR)&&(n(o.FORCE_COLOR)||(R||A)&&o.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const W=globalThis.process||Object.create(null),_={versions:{}};new Proxy(W,{get(e,s){if(s==="env")return o;if(s in e)return e[s];if(s in _)return _[s]}});const O=globalThis.process?.release?.name==="node",c=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,L=!!globalThis.fastly,S=!!globalThis.Netlify,u=!!globalThis.EdgeRuntime,N=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[u,"edge-light"],[N,"workerd"],[L,"fastly"],[D,"deno"],[c,"bun"],[O,"node"]];function G(){const e=F.find(s=>s[0]);if(e)return {name:e[1]}}const P=G();P?.name||"";

function getNitroOrigin$1(ctx = {}) {
  const isDev = ctx.isDev ?? h;
  const isPrerender = ctx.isPrerender ?? !!o.prerender;
  let host = "";
  let port = "";
  let protocol = o.NITRO_SSL_CERT && o.NITRO_SSL_KEY ? "https" : "http";
  if (isDev || isPrerender) {
    const devEnv = o.__NUXT_DEV__ || o.NUXT_VITE_NODE_OPTIONS;
    if (devEnv) {
      const parsed = JSON.parse(devEnv);
      const origin = parsed.proxy?.url || parsed.baseURL?.replace("/__nuxt_vite_node__", "");
      host = origin.replace(/^https?:\/\//, "").replace(/\/$/, "");
      protocol = origin.startsWith("https") ? "https" : "http";
    }
  }
  const hostIsLocalhost = !host || host.startsWith("localhost") || host.startsWith("127.");
  if (isDev && hostIsLocalhost && ctx.requestHost) {
    const reqHost = ctx.requestHost.split(":")[0] || "";
    if (reqHost && !reqHost.startsWith("localhost") && !reqHost.startsWith("127.")) {
      host = ctx.requestHost;
      protocol = ctx.requestProtocol || protocol;
    }
  }
  if (!host && ctx.requestHost) {
    host = ctx.requestHost;
    protocol = ctx.requestProtocol || protocol;
  }
  if (!host) {
    host = o.NITRO_HOST || o.HOST || "";
    if (isDev)
      port = o.NITRO_PORT || o.PORT || "3000";
  }
  if (host.includes(":")) {
    const i = host.lastIndexOf(":");
    port = host.slice(i + 1);
    host = host.slice(0, i);
  }
  host = o.NUXT_SITE_HOST_OVERRIDE || host;
  port = o.NUXT_SITE_PORT_OVERRIDE || port;
  if (host.startsWith("http://") || host.startsWith("https://")) {
    protocol = host.startsWith("https://") ? "https" : "http";
    host = host.replace(/^https?:\/\//, "");
  } else if (!host.includes("localhost") && !host.startsWith("127.")) {
    protocol = "https";
  }
  return `${protocol}://${host}${port ? `:${port}` : ""}/`;
}

function getNitroOrigin(e) {
  return getNitroOrigin$1({
    isDev: false,
    isPrerender: false,
    requestHost: e ? getRequestHost(e, { xForwardedHost: true }) : void 0,
    requestProtocol: e ? getRequestProtocol(e, { xForwardedProto: true }) : void 0
  });
}

const _9J9416 = eventHandler(async (e) => {
  if (e.context._initedSiteConfig)
    return;
  const runtimeConfig = useRuntimeConfig(e);
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = e.context.siteConfig || createSiteConfigStack({
    debug: config.debug
  });
  const nitroOrigin = getNitroOrigin(e);
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: -4,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: 0,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    ...envSiteConfig(globalThis._importMeta_.env || {})
    // just in-case, shouldn't be needed
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (e.context._nitro.routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...e.context._nitro.routeRules.site
    });
  }
  if (config.multiTenancy) {
    const host = parseURL(nitroOrigin).host;
    const tenant = config.multiTenancy?.find((t) => t.hosts.includes(host));
    if (tenant) {
      siteConfig.push({
        _context: `multi-tenancy:${host}`,
        _priority: 0,
        ...tenant.config
      });
    }
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
  e.context._initedSiteConfig = true;
});

function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
const fileExtensions = [
  // Images
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "ico",
  // Documents
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "md",
  "markdown",
  // Archives
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  // Audio
  "mp3",
  "wav",
  "flac",
  "ogg",
  "opus",
  "m4a",
  "aac",
  "midi",
  "mid",
  // Video
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  // Web
  "html",
  "css",
  "js",
  "json",
  "xml",
  "tsx",
  "jsx",
  "ts",
  "vue",
  "svelte",
  "xsl",
  "rss",
  "atom",
  // Programming
  "php",
  "py",
  "rb",
  "java",
  "c",
  "cpp",
  "h",
  "go",
  // Data formats
  "csv",
  "tsv",
  "sql",
  "yaml",
  "yml",
  // Fonts
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  // Executables/Binaries
  "exe",
  "msi",
  "apk",
  "ipa",
  "dmg",
  "iso",
  "bin",
  // Scripts/Config
  "bat",
  "cmd",
  "sh",
  "env",
  "htaccess",
  "conf",
  "toml",
  "ini",
  // Package formats
  "deb",
  "rpm",
  "jar",
  "war",
  // E-books
  "epub",
  "mobi",
  // Common temporary/backup files
  "log",
  "tmp",
  "bak",
  "old",
  "sav"
];
function isPathFile(path) {
  const lastSegment = path.split("/").pop();
  const ext = (lastSegment || path).match(/\.[0-9a-z]+$/i)?.[0];
  return ext && fileExtensions.includes(ext.replace(".", ""));
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}

function createSitePathResolver(e, options = {}) {
  const siteConfig = getSiteConfig(e);
  const nitroOrigin = getNitroOrigin(e);
  const nuxtBase = useRuntimeConfig(e).app.baseURL || "/";
  return (path) => {
    return resolveSitePath(path, {
      ...options,
      siteUrl: options.canonical !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    });
  };
}
function withSiteUrl(e, path, options = {}) {
  const siteConfig = e.context.siteConfig?.get();
  let siteUrl = e.context.siteConfigNitroOrigin;
  if ((options.canonical !== false || false) && siteConfig.url)
    siteUrl = siteConfig.url;
  return resolveSitePath(path, {
    absolute: true,
    siteUrl,
    trailingSlash: siteConfig.trailingSlash,
    base: e.context.nitro.baseURL,
    withBase: options.withBase
  });
}

function getSiteIndexable(e) {
  const { env, indexable } = getSiteConfig(e);
  if (typeof indexable !== "undefined")
    return String(indexable) === "true";
  return env === "production";
}

function useSiteConfig(e, _options) {
  return getSiteConfig(e, _options);
}

function getSiteRobotConfig(e) {
  const query = getQuery(e);
  const hints = [];
  const { groups, debug } = useRuntimeConfigNuxtRobots(e);
  let indexable = getSiteIndexable(e);
  const queryIndexableEnabled = String(query.mockProductionEnv) === "true" || query.mockProductionEnv === "";
  if (debug || false) {
    const { _context } = getSiteConfig(e, { debug: debug || false });
    if (queryIndexableEnabled) {
      indexable = true;
      hints.push("You are mocking a production enviroment with ?mockProductionEnv query.");
    } else if (!indexable && _context.indexable === "nuxt-robots:config") {
      hints.push("You are blocking indexing with your Nuxt Robots config.");
    } else if (!queryIndexableEnabled && !_context.indexable) {
      hints.push(`Indexing is blocked in development. You can mock a production environment with ?mockProductionEnv query.`);
    } else if (!indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is blocked by site config set by ${_context.indexable}.`);
    } else if (indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is enabled from ${_context.indexable}.`);
    }
  }
  if (groups.some((g) => g.userAgent.includes("*") && g.disallow.includes("/"))) {
    indexable = false;
    hints.push("You are blocking all user agents with a wildcard `Disallow /`.");
  } else if (groups.some((g) => g.disallow.includes("/"))) {
    hints.push("You are blocking specific user agents with `Disallow /`.");
  }
  return { indexable, hints };
}

const _ZnJbsD = defineEventHandler(async (e) => {
  const nitroApp = useNitroApp();
  const { indexable} = getSiteRobotConfig(e);
  const { credits, isNuxtContentV2, cacheControl } = useRuntimeConfigNuxtRobots(e);
  let robotsTxtCtx = {
    sitemaps: [],
    groups: [
      {
        allow: [],
        comment: [],
        userAgent: ["*"],
        disallow: ["/"]
      }
    ]
  };
  if (indexable) {
    robotsTxtCtx = await resolveRobotsTxtContext(e);
    robotsTxtCtx.sitemaps = [...new Set(
      asArray(robotsTxtCtx.sitemaps).map((s) => !s.startsWith("http") ? withSiteUrl(e, s, { withBase: true}) : s)
    )];
    if (isNuxtContentV2) {
      const contentWithRobotRules = await e.$fetch("/__robots__/nuxt-content.json", {
        headers: {
          Accept: "application/json"
        }
      });
      if (String(contentWithRobotRules).trim().startsWith("<!DOCTYPE")) {
        logger$1.error("Invalid HTML returned from /__robots__/nuxt-content.json, skipping.");
      } else {
        for (const group of robotsTxtCtx.groups) {
          if (group.userAgent.includes("*")) {
            group.disallow.push(...contentWithRobotRules);
            group.disallow = group.disallow.filter(Boolean);
          }
        }
      }
    }
  }
  let robotsTxt = generateRobotsTxt(robotsTxtCtx);
  if (credits) {
    robotsTxt = [
      `# START nuxt-robots (${indexable ? "indexable" : "indexing disabled"})`,
      robotsTxt,
      "# END nuxt-robots"
    ].filter(Boolean).join("\n");
  }
  setHeader(e, "Content-Type", "text/plain; charset=utf-8");
  setHeader(e, "Cache-Control", globalThis._importMeta_.test || !cacheControl ? "no-store" : cacheControl);
  const hookCtx = { robotsTxt, e };
  await nitroApp.hooks.callHook("robots:robots-txt", hookCtx);
  return hookCtx.robotsTxt;
});

function withoutQuery$1(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher$1(e) {
  const { nitro, app } = useRuntimeConfig(e);
  const _routeRulesMatcher = toRouteMatcher(
    createRouter$1({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(withoutTrailingSlash(withoutQuery$1(path)), app.baseURL)
    ).reverse());
  };
}

function getPathRobotConfig(e, options) {
  const runtimeConfig = useRuntimeConfig(e);
  const { robotsDisabledValue, robotsEnabledValue, isNuxtContentV2 } = useRuntimeConfigNuxtRobots(e);
  if (!options?.skipSiteIndexable) {
    if (!getSiteRobotConfig(e).indexable) {
      return {
        rule: robotsDisabledValue,
        indexable: false,
        debug: {
          source: "Site Config"
        }
      };
    }
  }
  const path = options?.path || e.path;
  let userAgent = options?.userAgent;
  if (!userAgent) {
    try {
      userAgent = getRequestHeader(e, "User-Agent");
    } catch {
    }
  }
  const nitroApp = useNitroApp();
  const groups = [
    // run explicit user agent matching first
    ...nitroApp._robots.ctx.groups.filter((g) => {
      if (userAgent) {
        return g.userAgent.some((ua) => ua.toLowerCase().includes(userAgent.toLowerCase()));
      }
      return false;
    }),
    // run wildcard matches second
    ...nitroApp._robots.ctx.groups.filter((g) => g.userAgent.includes("*"))
  ];
  for (const group of groups) {
    if (group._indexable === false) {
      return {
        indexable: false,
        rule: robotsDisabledValue,
        debug: {
          source: "/robots.txt",
          line: JSON.stringify(group)
        }
      };
    }
    const robotsTxtRule = matchPathToRule(path, group._rules || []);
    if (robotsTxtRule) {
      if (!robotsTxtRule.allow) {
        return {
          indexable: false,
          rule: robotsDisabledValue,
          debug: {
            source: "/robots.txt",
            line: `Disallow: ${robotsTxtRule.pattern}`
          }
        };
      }
      break;
    }
  }
  if (isNuxtContentV2 && nitroApp._robots?.nuxtContentUrls?.has(withoutTrailingSlash(path))) {
    return {
      indexable: false,
      rule: robotsDisabledValue,
      debug: {
        source: "Nuxt Content"
      }
    };
  }
  const { pageMetaRobots } = useRuntimeConfigNuxtRobots(e);
  const pageMetaRule = pageMetaRobots?.[withoutTrailingSlash(path)];
  if (typeof pageMetaRule !== "undefined") {
    const normalised = normaliseRobotsRouteRule({ robots: pageMetaRule });
    if (normalised && (typeof normalised.allow !== "undefined" || typeof normalised.rule !== "undefined")) {
      return {
        indexable: normalised.allow ?? false,
        rule: normalised.rule || (normalised.allow ? robotsEnabledValue : robotsDisabledValue),
        debug: {
          source: "Page Meta"
        }
      };
    }
  }
  nitroApp._robotsRuleMatcher = nitroApp._robotsRuleMatcher || createNitroRouteRuleMatcher$1(e);
  let robotRouteRules = nitroApp._robotsRuleMatcher(path);
  let routeRulesPath = path;
  if (runtimeConfig.public?.i18n?.locales && typeof robotRouteRules.robots === "undefined") {
    const { locales } = runtimeConfig.public.i18n;
    const locale = locales.find((l) => routeRulesPath.startsWith(`/${l.code}`));
    if (locale) {
      routeRulesPath = routeRulesPath.replace(`/${locale.code}`, "");
      robotRouteRules = nitroApp._robotsRuleMatcher(routeRulesPath);
    }
  }
  const routeRules = normaliseRobotsRouteRule(robotRouteRules);
  if (routeRules && (typeof routeRules.allow !== "undefined" || typeof routeRules.rule !== "undefined")) {
    return {
      indexable: routeRules.allow ?? false,
      rule: routeRules.rule || (routeRules.allow ? robotsEnabledValue : robotsDisabledValue),
      debug: {
        source: "Route Rules"
      }
    };
  }
  return {
    indexable: true,
    rule: robotsEnabledValue
  };
}

const _mEbVfL = defineEventHandler(async (e) => {
  if (e.path === "/robots.txt" || e.path.startsWith("/__") || e.path.startsWith("/api") || e.path.startsWith("/_nuxt"))
    return;
  const nuxtRobotsConfig = useRuntimeConfigNuxtRobots(e);
  if (nuxtRobotsConfig) {
    const { header } = nuxtRobotsConfig;
    const robotConfig = getPathRobotConfig(e, { skipSiteIndexable: Boolean(getQuery(e)?.mockProductionEnv) });
    if (header) {
      setHeader(e, "X-Robots-Tag", robotConfig.rule);
    }
    e.context.robots = robotConfig;
  }
});

const logger = createConsola({
  defaults: {
    tag: "@nuxt/sitemap"
  }
});
const merger = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey(arr, key) {
  const seen = /* @__PURE__ */ new Map();
  let resultLength = 0;
  const result = Array.from({ length: arr.length });
  for (const item of arr) {
    const k = item[key];
    if (seen.has(k)) {
      const existingIndex = seen.get(k);
      result[existingIndex] = merger(item, result[existingIndex]);
    } else {
      seen.set(k, resultLength);
      result[resultLength++] = item;
    }
  }
  result.length = resultLength;
  return result;
}
function splitForLocales(path, locales) {
  const prefix = withLeadingSlash(path).split("/")[1];
  if (prefix && locales.includes(prefix))
    return [prefix, path.replace(`/${prefix}`, "")];
  return [null, path];
}
const StringifiedRegExpPattern = /\/(.*?)\/([gimsuy]*)$/;
function normalizeRuntimeFilters(input) {
  return (input || []).map((rule) => {
    if (rule instanceof RegExp || typeof rule === "string")
      return rule;
    const match = rule.regex.match(StringifiedRegExpPattern);
    if (match)
      return new RegExp(match[1], match[2]);
    return false;
  }).filter(Boolean);
}
function createPathFilter(options = {}) {
  const urlFilter = createFilter(options);
  return (loc) => {
    let path = loc;
    try {
      path = parseURL(loc).pathname;
    } catch {
      return false;
    }
    return urlFilter(path);
  };
}
function findPageMapping(pathWithoutPrefix, pages) {
  const stripped = pathWithoutPrefix[0] === "/" ? pathWithoutPrefix.slice(1) : pathWithoutPrefix;
  const pageKey = stripped.endsWith("/index") ? stripped.slice(0, -6) || "index" : stripped || "index";
  if (pages[pageKey])
    return { mappings: pages[pageKey], paramSegments: [] };
  const sortedKeys = Object.keys(pages).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (pageKey.startsWith(key + "/")) {
      const paramPath = pageKey.slice(key.length + 1);
      return { mappings: pages[key], paramSegments: paramPath.split("/") };
    }
  }
  return null;
}
function applyDynamicParams(customPath, paramSegments) {
  if (!paramSegments.length)
    return customPath;
  let i = 0;
  return customPath.replace(/\[[^\]]+\]/g, () => paramSegments[i++] || "");
}
function createFilter(options = {}) {
  const include = options.include || [];
  const exclude = options.exclude || [];
  if (include.length === 0 && exclude.length === 0)
    return () => true;
  const excludeRegex = exclude.filter((r) => r instanceof RegExp);
  const includeRegex = include.filter((r) => r instanceof RegExp);
  const excludeStrings = exclude.filter((r) => typeof r === "string");
  const includeStrings = include.filter((r) => typeof r === "string");
  const excludeMatcher = excludeStrings.length > 0 ? toRouteMatcher(createRouter$1({
    routes: Object.fromEntries(excludeStrings.map((r) => [r, true])),
    strictTrailingSlash: false
  })) : null;
  const includeMatcher = includeStrings.length > 0 ? toRouteMatcher(createRouter$1({
    routes: Object.fromEntries(includeStrings.map((r) => [r, true])),
    strictTrailingSlash: false
  })) : null;
  const excludeExact = new Set(excludeStrings);
  const includeExact = new Set(includeStrings);
  return function(path) {
    if (excludeRegex.some((r) => r.test(path)))
      return false;
    if (excludeExact.has(path))
      return false;
    if (excludeMatcher && excludeMatcher.matchAll(path).length > 0)
      return false;
    if (includeRegex.some((r) => r.test(path)))
      return true;
    if (includeExact.has(path))
      return true;
    if (includeMatcher && includeMatcher.matchAll(path).length > 0)
      return true;
    return include.length === 0;
  };
}

function xmlEscape(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function useSitemapRuntimeConfig(e) {
  const clone = JSON.parse(JSON.stringify(useRuntimeConfig(e).sitemap));
  for (const k in clone.sitemaps) {
    const sitemap = clone.sitemaps[k];
    sitemap.include = normalizeRuntimeFilters(sitemap.include);
    sitemap.exclude = normalizeRuntimeFilters(sitemap.exclude);
    clone.sitemaps[k] = sitemap;
  }
  return Object.freeze(clone);
}

const _9SHfAi = defineEventHandler(async (e) => {
  const fixPath = createSitePathResolver(e, { absolute: false, withBase: true });
  const { sitemapName: fallbackSitemapName, cacheMaxAgeSeconds, version, xslColumns, xslTips } = useSitemapRuntimeConfig();
  setHeader(e, "Content-Type", "application/xslt+xml");
  if (cacheMaxAgeSeconds)
    setHeader(e, "Cache-Control", `public, max-age=${cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(e, "Cache-Control", `no-cache, no-store`);
  const { name: siteName, url: siteUrl } = useSiteConfig(e);
  const referrer = getHeader(e, "Referer") || "/";
  const referrerPath = parseURL(referrer).pathname;
  const isNotIndexButHasIndex = referrerPath !== "/sitemap.xml" && referrerPath !== "/sitemap_index.xml" && referrerPath.endsWith(".xml");
  const sitemapName = parseURL(referrer).pathname.split("/").pop()?.split("-sitemap")[0] || fallbackSitemapName;
  const title = `${siteName}${sitemapName !== "sitemap.xml" ? ` - ${sitemapName === "sitemap_index.xml" ? "index" : sitemapName}` : ""}`.replace(/&/g, "&amp;");
  getQuery$1(referrer).canonical;
  const debugUrl = xmlEscape(withQuery("/__sitemap__/debug.json", { sitemap: sitemapName }));
  xmlEscape(referrerPath);
  xmlEscape(withQuery(referrerPath, { canonical: "" }));
  const fetchErrors = [];
  const xslQuery = getQuery(e);
  if (xslQuery.error_messages) {
    const errorMessages = xslQuery.error_messages;
    const errorUrls = xslQuery.error_urls;
    if (errorMessages) {
      const messages = Array.isArray(errorMessages) ? errorMessages : [errorMessages];
      const urls = Array.isArray(errorUrls) ? errorUrls : errorUrls ? [errorUrls] : [];
      messages.forEach((msg, i) => {
        const errorParts = [xmlEscape(msg)];
        if (urls[i])
          errorParts.push(xmlEscape(urls[i]));
        fetchErrors.push(`<span class="error-item">${errorParts.join(" \u2014 ")}</span>`);
      });
    }
  }
  const hasRuntimeErrors = fetchErrors.length > 0;
  let columns = [...xslColumns];
  if (!columns.length) {
    columns = [
      { label: "URL", width: "50%" },
      { label: "Images", width: "25%", select: "count(image:image)" },
      { label: "Last Updated", width: "25%", select: "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))" }
    ];
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          :root {
            --accent: #00dc82;
            --accent-hover: #00b86b;
            --bg: #0a0a0a;
            --bg-elevated: #141414;
            --bg-subtle: #1a1a1a;
            --border: #262626;
            --border-subtle: #1f1f1f;
            --text: #e5e5e5;
            --text-muted: #737373;
            --text-faint: #525252;
            --error: #ef4444;
            --error-bg: rgba(239,68,68,0.1);
            --warning: #f59e0b;
          }
          * { box-sizing: border-box; }
          body {
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
            font-size: 13px;
            color: var(--text);
            background: var(--bg);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          a { color: inherit; transition: color 0.15s; }
          a:hover { color: var(--accent); }

          /* Debug bar (dev only) */
          .debug-bar {
            position: fixed;
            bottom: 0.75rem;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            background: var(--bg-elevated);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 0 1rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 100;
            font-size: 11px;
          }
          .debug-bar-brand {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-muted);
            text-decoration: none;
          }
          .debug-bar-brand:hover { color: var(--text); }
          .debug-bar-brand svg { flex-shrink: 0; }
          .debug-bar-hint {
            color: var(--text-faint);
            margin-right: auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .debug-bar-hint code {
            background: var(--bg-subtle);
            padding: 0.1rem 0.3rem;
            border-radius: 3px;
            font-size: 10px;
          }
          .mode-badge {
            font-size: 9px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
          }
          .mode-dev { background: rgba(245,158,11,0.15); color: var(--warning); }
          .mode-prod { background: rgba(0,220,130,0.12); color: var(--accent); }
          .mode-toggle {
            display: inline-flex;
            border-radius: 4px;
            overflow: hidden;
            background: var(--bg-subtle);
            padding: 2px;
            gap: 1px;
          }
          .mode-toggle a {
            padding: 0.2rem 0.4rem;
            font-size: 9px;
            font-weight: 500;
            text-decoration: none;
            color: var(--text-muted);
            border-radius: 2px;
            transition: all 0.15s;
          }
          .mode-toggle a:hover { color: var(--text); }
          .mode-toggle a.active {
            background: var(--accent);
            color: #0a0a0a;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            text-decoration: none;
            font-size: 10px;
            font-weight: 500;
            transition: all 0.15s;
          }
          .btn-primary {
            background: var(--accent);
            color: #0a0a0a;
          }
          .btn-primary:hover { background: var(--accent-hover); color: #0a0a0a; }
          .btn svg { width: 12px; height: 12px; }

          /* Error banner */
          .error-banner {
            background: var(--error-bg);
            border-bottom: 1px solid rgba(239,68,68,0.2);
            padding: 0.75rem 1.5rem;
            color: #fca5a5;
            font-size: 12px;
          }
          .error-banner strong { color: var(--error); }
          .error-item { display: block; margin-top: 0.375rem; color: #fca5a5; }
          .error-debug-link {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            margin-top: 0.625rem;
            padding: 0.25rem 0.5rem;
            background: var(--error);
            color: #fff;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            text-decoration: none;
            transition: background 0.15s;
          }
          .error-debug-link:hover { background: #dc2626; color: #fff; }

          /* Main content */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem;
          }
          .header {
            margin-bottom: 1.25rem;
          }
          .header h1 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 0.25rem 0;
            color: var(--text);
          }
          .header-meta {
            color: var(--text-muted);
            font-size: 12px;
          }
          .header-meta a {
            color: var(--text-muted);
            text-decoration: underline;
            text-decoration-color: var(--border);
            text-underline-offset: 2px;
          }
          .header-meta a:hover { color: var(--accent); text-decoration-color: var(--accent); }

          /* Table */
          .table-wrap {
            border: 1px solid var(--border);
            border-radius: 8px;
            overflow: hidden;
            background: var(--bg-elevated);
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            text-align: left;
            padding: 0.625rem 1rem;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            background: var(--bg-subtle);
            border-bottom: 1px solid var(--border);
          }
          td {
            padding: 0.5rem 1rem;
            border-bottom: 1px solid var(--border-subtle);
            font-size: 12px;
            color: var(--text);
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: rgba(255,255,255,0.02); }
          td a {
            text-decoration: none;
            word-break: break-all;
            color: var(--text);
          }
          td a:hover { color: var(--accent); }
          .inline-warning {
            font-size: 11px;
            color: var(--warning);
            margin-top: 0.25rem;
            line-height: 1.4;
          }
          .inline-warning::before {
            content: "\u26A0 ";
          }
          .count {
            display: inline-block;
            min-width: 1.25rem;
            padding: 0.125rem 0.375rem;
            background: var(--bg-subtle);
            border-radius: 4px;
            text-align: center;
            font-size: 11px;
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
          }
          .count:empty::before { content: "0"; }

          /* Light mode */
          @media (prefers-color-scheme: light) {
            :root {
              --accent: #00a963;
              --accent-hover: #008f54;
              --bg: #ffffff;
              --bg-elevated: #f5f5f5;
              --bg-subtle: #ebebeb;
              --border: #d4d4d4;
              --border-subtle: #e5e5e5;
              --text: #171717;
              --text-muted: #525252;
              --text-faint: #737373;
              --error: #dc2626;
              --error-bg: rgba(220,38,38,0.08);
              --warning: #b45309;
            }
            tr:hover td { background: rgba(0,0,0,0.02); }
            .btn-primary { color: #fff; }
            .btn-primary:hover { color: #fff; }
            .mode-toggle a.active { color: #fff; }
            .error-banner { color: #991b1b; }
            .error-item { color: #b91c1c; }
            .error-debug-link { color: #fff; }
            .error-debug-link:hover { color: #fff; }
          }

          .debug-bar-version {
            color: var(--text-faint);
            font-size: 10px;
          }

          /* Responsive */
          @media (max-width: 640px) {
            .debug-bar { padding: 0 0.75rem; gap: 0.5rem; width: 95%; }
            .debug-bar-brand span { display: none; }
            .debug-bar-hint { display: none; }
            .debug-bar-version { display: none; }
            .mode-badge { display: none; }
            .container { padding: 1rem; }
            th, td { padding: 0.5rem 0.75rem; }
          }
          ${""}
        </style>
      </head>
      <body>
        ${hasRuntimeErrors ? `<div class="error-banner">
            <strong>Sitemap Generation Errors</strong>
            ${fetchErrors.join("")}
            <a href="${debugUrl}" target="_blank" class="error-debug-link">View Debug Info \u2192</a>
          </div>` : ""}
        <div class="container">
          <div class="header">
            <h1>${xmlEscape(title)}</h1>
            <div class="header-meta">
              ${isNotIndexButHasIndex ? `Part of <a href="${xmlEscape(fixPath("/sitemap_index.xml"))}">${xmlEscape(fixPath("/sitemap_index.xml"))}</a> \xB7 ` : ""}
              <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
                <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps
              </xsl:if>
              <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
              </xsl:if>
            </div>
          </div>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style="width:70%">Sitemap</th>
                    <th style="width:30%">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <xsl:variable name="sitemapURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <tr>
                      <td>
                        <a href="{$sitemapURL}">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                      </td>
                      <td>
                        <xsl:value-of
                          select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    ${columns.map((c) => `<th style="width:${c.width}">${c.label}</th>`).join("\n")}
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <xsl:variable name="itemURL">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:variable>
                        <a href="{$itemURL}">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                        ${""}
                      </td>
                      ${columns.filter((c) => c.label !== "URL").map((c) => `<td><span class="count"><xsl:value-of select="${c.select}"/></span></td>`).join("\n")}
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>
        </div>
        ${""}
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;
});

function withoutQuery(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter$1({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [path === "/" ? path : withoutTrailingSlash(path), rules])
      )
    })
  );
  return (pathOrUrl) => {
    const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, app.baseURL).pathname;
    const pathWithoutQuery = withoutQuery(path);
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(pathWithoutQuery === "/" ? pathWithoutQuery : withoutTrailingSlash(pathWithoutQuery), app.baseURL)
    ).reverse());
  };
}

function resolve(s, resolvers) {
  if (typeof s === "undefined")
    return void 0;
  const str = typeof s === "string" ? s : s.toString();
  if (!resolvers)
    return str;
  if (hasProtocol(str, { acceptRelative: true, strict: false }))
    return resolvers.fixSlashes(str);
  return resolvers.canonicalUrlResolver(str);
}
function removeTrailingSlash(s) {
  return s.replace(/\/(\?|#|$)/, "$1");
}
function preNormalizeEntry(_e, resolvers) {
  const input = typeof _e === "string" ? { loc: _e } : { ..._e };
  if (input.url && !input.loc) {
    input.loc = input.url;
  }
  delete input.url;
  if (typeof input.loc !== "string") {
    input.loc = "";
  }
  const skipEncoding = input._encoded === true;
  const e = input;
  e.loc = removeTrailingSlash(e.loc);
  e._abs = hasProtocol(e.loc, { acceptRelative: false, strict: false });
  try {
    e._path = e._abs ? parseURL(e.loc) : parsePath(e.loc);
  } catch {
    e._path = null;
  }
  if (e._path) {
    const search = e._path.search;
    const qs = search && search.length > 1 ? stringifyQuery(parseQuery(search)) : "";
    const pathname = skipEncoding ? e._path.pathname : encodePath(e._path.pathname);
    e._relativeLoc = `${pathname}${qs.length ? `?${qs}` : ""}`;
    if (e._path.host) {
      e.loc = stringifyParsedURL(e._path);
    } else {
      e.loc = e._relativeLoc;
    }
  } else if (!skipEncoding && !isEncoded(e.loc)) {
    e.loc = encodeURI(e.loc);
  }
  if (e.loc === "")
    e.loc = `/`;
  e.loc = resolve(e.loc, resolvers);
  e._key = `${e._sitemap || ""}${withoutTrailingSlash(e.loc)}`;
  return e;
}
function isEncoded(url) {
  try {
    return url !== decodeURIComponent(url);
  } catch {
    return false;
  }
}
function normaliseEntry(_e, defaults, resolvers) {
  const e = defu(_e, defaults);
  if (e.lastmod) {
    const date = normaliseDate(e.lastmod);
    if (date)
      e.lastmod = date;
    else
      delete e.lastmod;
  }
  if (!e.lastmod)
    delete e.lastmod;
  e.loc = resolve(e.loc, resolvers);
  if (e.alternatives) {
    const alternatives = e.alternatives.map((a) => ({ ...a }));
    for (const alt of alternatives) {
      if (typeof alt.href === "string") {
        alt.href = resolve(alt.href, resolvers);
      } else if (typeof alt.href === "object" && alt.href) {
        alt.href = resolve(alt.href.href, resolvers);
      }
    }
    e.alternatives = mergeOnKey(alternatives, "hreflang");
  }
  if (e.images) {
    const images = e.images.map((i) => ({ ...i }));
    for (const img of images) {
      img.loc = resolve(img.loc, resolvers);
    }
    e.images = mergeOnKey(images, "loc");
  }
  if (e.videos) {
    const videos = e.videos.map((v) => ({ ...v }));
    for (const video of videos) {
      if (video.content_loc) {
        video.content_loc = resolve(video.content_loc, resolvers);
      }
    }
    e.videos = mergeOnKey(videos, "content_loc");
  }
  return e;
}
const IS_VALID_W3C_DATE = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function normaliseDate(d) {
  if (typeof d === "string") {
    const tIdx = d.indexOf("T");
    if (tIdx !== -1) {
      const t = d.slice(tIdx + 1);
      if (!t.includes("+") && !t.includes("-") && !t.includes("Z")) {
        d += "Z";
      }
    }
    if (!isValidW3CDate(d))
      return false;
    d = new Date(d);
    d.setMilliseconds(0);
    if (Number.isNaN(d.getTime()))
      return false;
  }
  const z = (n) => `0${n}`.slice(-2);
  const date = `${d.getUTCFullYear()}-${z(d.getUTCMonth() + 1)}-${z(d.getUTCDate())}`;
  if (d.getUTCHours() > 0 || d.getUTCMinutes() > 0 || d.getUTCSeconds() > 0) {
    return `${date}T${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())}Z`;
  }
  return date;
}

function isValidString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
function parseNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim()) {
    const num = Number.parseFloat(value.trim());
    return Number.isNaN(num) ? void 0 : num;
  }
  return void 0;
}
function parseInteger(value) {
  if (typeof value === "number") return Math.floor(value);
  if (typeof value === "string" && value.trim()) {
    const num = Number.parseInt(value.trim(), 10);
    return Number.isNaN(num) ? void 0 : num;
  }
  return void 0;
}
function extractUrlFromParsedElement(urlElement, warnings) {
  if (!isValidString(urlElement.loc)) {
    warnings.push({
      type: "validation",
      message: "URL entry missing required loc element",
      context: { url: String(urlElement.loc || "undefined") }
    });
    return null;
  }
  const urlObj = { loc: urlElement.loc };
  if (isValidString(urlElement.lastmod)) {
    urlObj.lastmod = urlElement.lastmod;
  }
  if (isValidString(urlElement.changefreq)) {
    const validFreqs = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
    if (validFreqs.includes(urlElement.changefreq)) {
      urlObj.changefreq = urlElement.changefreq;
    } else {
      warnings.push({
        type: "validation",
        message: "Invalid changefreq value",
        context: { url: urlElement.loc, field: "changefreq", value: urlElement.changefreq }
      });
    }
  }
  const priority = parseNumber(urlElement.priority);
  if (priority !== void 0 && !Number.isNaN(priority)) {
    if (priority < 0 || priority > 1) {
      warnings.push({
        type: "validation",
        message: "Priority value should be between 0.0 and 1.0, clamping to valid range",
        context: { url: urlElement.loc, field: "priority", value: priority }
      });
    }
    urlObj.priority = Math.max(0, Math.min(1, priority));
  } else if (urlElement.priority !== void 0) {
    warnings.push({
      type: "validation",
      message: "Invalid priority value",
      context: { url: urlElement.loc, field: "priority", value: urlElement.priority }
    });
  }
  if (urlElement.image) {
    const images = Array.isArray(urlElement.image) ? urlElement.image : [urlElement.image];
    const validImages = images.map((img) => {
      if (isValidString(img.loc)) {
        return { loc: img.loc };
      } else {
        warnings.push({
          type: "validation",
          message: "Image missing required loc element",
          context: { url: urlElement.loc, field: "image.loc" }
        });
        return null;
      }
    }).filter((img) => img !== null);
    if (validImages.length > 0) {
      urlObj.images = validImages;
    }
  }
  if (urlElement.video) {
    const videos = Array.isArray(urlElement.video) ? urlElement.video : [urlElement.video];
    const validVideos = videos.map((video) => {
      const missingFields = [];
      if (!isValidString(video.title)) missingFields.push("title");
      if (!isValidString(video.thumbnail_loc)) missingFields.push("thumbnail_loc");
      if (!isValidString(video.description)) missingFields.push("description");
      if (!isValidString(video.content_loc)) missingFields.push("content_loc");
      if (missingFields.length > 0) {
        warnings.push({
          type: "validation",
          message: `Video missing required fields: ${missingFields.join(", ")}`,
          context: { url: urlElement.loc, field: "video" }
        });
        return null;
      }
      const videoObj = {
        title: video.title,
        thumbnail_loc: video.thumbnail_loc,
        description: video.description,
        content_loc: video.content_loc
      };
      if (isValidString(video.player_loc)) {
        videoObj.player_loc = video.player_loc;
      }
      const duration = parseInteger(video.duration);
      if (duration !== void 0) {
        videoObj.duration = duration;
      } else if (video.duration !== void 0) {
        warnings.push({
          type: "validation",
          message: "Invalid video duration value",
          context: { url: urlElement.loc, field: "video.duration", value: video.duration }
        });
      }
      if (isValidString(video.expiration_date)) {
        videoObj.expiration_date = video.expiration_date;
      }
      const rating = parseNumber(video.rating);
      if (rating !== void 0) {
        if (rating < 0 || rating > 5) {
          warnings.push({
            type: "validation",
            message: "Video rating should be between 0.0 and 5.0",
            context: { url: urlElement.loc, field: "video.rating", value: rating }
          });
        }
        videoObj.rating = rating;
      } else if (video.rating !== void 0) {
        warnings.push({
          type: "validation",
          message: "Invalid video rating value",
          context: { url: urlElement.loc, field: "video.rating", value: video.rating }
        });
      }
      const viewCount = parseInteger(video.view_count);
      if (viewCount !== void 0) {
        videoObj.view_count = viewCount;
      } else if (video.view_count !== void 0) {
        warnings.push({
          type: "validation",
          message: "Invalid video view_count value",
          context: { url: urlElement.loc, field: "video.view_count", value: video.view_count }
        });
      }
      if (isValidString(video.publication_date)) {
        videoObj.publication_date = video.publication_date;
      }
      if (isValidString(video.family_friendly)) {
        const validValues = ["yes", "no"];
        if (validValues.includes(video.family_friendly)) {
          videoObj.family_friendly = video.family_friendly;
        } else {
          warnings.push({
            type: "validation",
            message: 'Invalid video family_friendly value, should be "yes" or "no"',
            context: { url: urlElement.loc, field: "video.family_friendly", value: video.family_friendly }
          });
        }
      }
      if (isValidString(video.requires_subscription)) {
        const validValues = ["yes", "no"];
        if (validValues.includes(video.requires_subscription)) {
          videoObj.requires_subscription = video.requires_subscription;
        } else {
          warnings.push({
            type: "validation",
            message: 'Invalid video requires_subscription value, should be "yes" or "no"',
            context: { url: urlElement.loc, field: "video.requires_subscription", value: video.requires_subscription }
          });
        }
      }
      if (isValidString(video.live)) {
        const validValues = ["yes", "no"];
        if (validValues.includes(video.live)) {
          videoObj.live = video.live;
        } else {
          warnings.push({
            type: "validation",
            message: 'Invalid video live value, should be "yes" or "no"',
            context: { url: urlElement.loc, field: "video.live", value: video.live }
          });
        }
      }
      if (video.restriction && typeof video.restriction === "object") {
        const restriction = video.restriction;
        if (isValidString(restriction.relationship) && isValidString(restriction["#text"])) {
          const validRelationships = ["allow", "deny"];
          if (validRelationships.includes(restriction.relationship)) {
            videoObj.restriction = {
              relationship: restriction.relationship,
              restriction: restriction["#text"]
            };
          } else {
            warnings.push({
              type: "validation",
              message: 'Invalid video restriction relationship, should be "allow" or "deny"',
              context: { url: urlElement.loc, field: "video.restriction.relationship", value: restriction.relationship }
            });
          }
        }
      }
      if (video.platform && typeof video.platform === "object") {
        const platform = video.platform;
        if (isValidString(platform.relationship) && isValidString(platform["#text"])) {
          const validRelationships = ["allow", "deny"];
          if (validRelationships.includes(platform.relationship)) {
            videoObj.platform = {
              relationship: platform.relationship,
              platform: platform["#text"]
            };
          } else {
            warnings.push({
              type: "validation",
              message: 'Invalid video platform relationship, should be "allow" or "deny"',
              context: { url: urlElement.loc, field: "video.platform.relationship", value: platform.relationship }
            });
          }
        }
      }
      if (video.price) {
        const prices = Array.isArray(video.price) ? video.price : [video.price];
        const validPrices = prices.map((price) => {
          const priceValue = price["#text"];
          if (priceValue == null || typeof priceValue !== "string" && typeof priceValue !== "number") {
            warnings.push({
              type: "validation",
              message: "Video price missing value",
              context: { url: urlElement.loc, field: "video.price" }
            });
            return null;
          }
          const validTypes = ["rent", "purchase", "package", "subscription"];
          if (price.type && !validTypes.includes(price.type)) {
            warnings.push({
              type: "validation",
              message: `Invalid video price type "${price.type}", should be one of: ${validTypes.join(", ")}`,
              context: { url: urlElement.loc, field: "video.price.type", value: price.type }
            });
          }
          return {
            price: String(priceValue),
            currency: price.currency,
            type: price.type
          };
        }).filter((p) => p !== null);
        if (validPrices.length > 0) {
          videoObj.price = validPrices;
        }
      }
      if (video.uploader && typeof video.uploader === "object") {
        const uploader = video.uploader;
        if (isValidString(uploader.info) && isValidString(uploader["#text"])) {
          videoObj.uploader = {
            uploader: uploader["#text"],
            info: uploader.info
          };
        } else {
          warnings.push({
            type: "validation",
            message: "Video uploader missing required info or name",
            context: { url: urlElement.loc, field: "video.uploader" }
          });
        }
      }
      if (video.tag) {
        const tags = Array.isArray(video.tag) ? video.tag : [video.tag];
        const validTags = tags.filter(isValidString);
        if (validTags.length > 0) {
          videoObj.tag = validTags;
        }
      }
      return videoObj;
    }).filter((video) => video !== null);
    if (validVideos.length > 0) {
      urlObj.videos = validVideos;
    }
  }
  if (urlElement.link) {
    const links = Array.isArray(urlElement.link) ? urlElement.link : [urlElement.link];
    const alternatives = links.map((link) => {
      if (link.rel === "alternate" && isValidString(link.hreflang) && isValidString(link.href)) {
        return {
          hreflang: link.hreflang,
          href: link.href
        };
      } else {
        warnings.push({
          type: "validation",
          message: 'Alternative link missing required rel="alternate", hreflang, or href',
          context: { url: urlElement.loc, field: "link" }
        });
        return null;
      }
    }).filter((alt) => alt !== null);
    if (alternatives.length > 0) {
      urlObj.alternatives = alternatives;
    }
  }
  if (urlElement.news && typeof urlElement.news === "object") {
    const news = urlElement.news;
    if (isValidString(news.title) && isValidString(news.publication_date) && news.publication && isValidString(news.publication.name) && isValidString(news.publication.language)) {
      urlObj.news = {
        title: news.title,
        publication_date: news.publication_date,
        publication: {
          name: news.publication.name,
          language: news.publication.language
        }
      };
    } else {
      warnings.push({
        type: "validation",
        message: "News entry missing required fields (title, publication_date, publication.name, publication.language)",
        context: { url: urlElement.loc, field: "news" }
      });
    }
  }
  return Object.fromEntries(
    Object.entries(urlObj).filter(
      ([_, value]) => value != null && (!Array.isArray(value) || value.length > 0)
    )
  );
}
async function parseSitemapXml(xml) {
  const warnings = [];
  if (!xml) {
    throw new Error("Empty XML input provided");
  }
  const { XMLParser } = await import('fast-xml-parser');
  const parser = new XMLParser({
    isArray: (tagName) => ["url", "image", "video", "link", "tag", "price"].includes(tagName),
    removeNSPrefix: true,
    parseAttributeValue: false,
    ignoreAttributes: false,
    attributeNamePrefix: "",
    trimValues: true
  });
  try {
    const parsed = parser.parse(xml);
    if (!parsed?.urlset) {
      throw new Error("XML does not contain a valid urlset element");
    }
    if (!parsed.urlset.url) {
      throw new Error("Sitemap contains no URL entries");
    }
    const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
    const validUrls = urls.map((url) => extractUrlFromParsedElement(url, warnings)).filter((url) => url !== null);
    if (validUrls.length === 0 && urls.length > 0) {
      warnings.push({
        type: "validation",
        message: "No valid URLs found in sitemap after validation"
      });
    }
    return { urls: validUrls, warnings };
  } catch (error) {
    if (error instanceof Error && (error.message === "Empty XML input provided" || error.message === "XML does not contain a valid urlset element" || error.message === "Sitemap contains no URL entries")) {
      throw error;
    }
    throw new Error(`Failed to parse XML: ${error instanceof Error ? error.message : String(error)}`);
  }
}

new XMLParser({
  isArray: (tagName) => tagName === "sitemap",
  removeNSPrefix: true,
  trimValues: true
});

function normalizeSourceInput(source) {
  if (typeof source === "string") {
    return { context: { name: "hook" }, fetch: source };
  }
  if (Array.isArray(source)) {
    return { context: { name: "hook" }, fetch: source };
  }
  return source;
}
async function tryFetchWithFallback(url, options, event) {
  const isExternalUrl = !url.startsWith("/");
  if (isExternalUrl) {
    const strategies = [
      // Strategy 1: Use globalThis.$fetch (original approach)
      () => globalThis.$fetch(url, options),
      // Strategy 2: If event is available, try using event context even for external URLs
      event ? () => event.$fetch(url, options) : null,
      // Strategy 3: Use native fetch as last resort
      () => $fetch(url, options)
    ].filter(Boolean);
    let lastError = null;
    for (const strategy of strategies) {
      try {
        return await strategy();
      } catch (error) {
        lastError = error;
        continue;
      }
    }
    throw lastError;
  }
  const fetchContainer = url.startsWith("/") && event ? event : globalThis;
  return await fetchContainer.$fetch(url, options);
}
async function fetchDataSource(input, event) {
  const context = typeof input.context === "string" ? { name: input.context } : input.context || { name: "fetch" };
  const url = typeof input.fetch === "string" ? input.fetch : input.fetch[0];
  const options = typeof input.fetch === "string" ? {} : input.fetch[1];
  const start = Date.now();
  const isExternalUrl = !url.startsWith("/");
  const timeout = isExternalUrl ? 1e4 : options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  try {
    let isMaybeErrorResponse = false;
    const isXmlRequest = parseURL(url).pathname.endsWith(".xml");
    const mergedHeaders = defu(
      options?.headers,
      {
        Accept: isXmlRequest ? "text/xml" : "application/json"
      },
      event && !isExternalUrl ? { host: getRequestHost(event, { xForwardedHost: true }) } : {}
    );
    const fetchOptions = {
      ...options,
      responseType: isXmlRequest ? "text" : "json",
      signal: timeoutController.signal,
      headers: mergedHeaders,
      // Use ofetch's built-in retry for external sources
      ...isExternalUrl && {
        retry: 2,
        retryDelay: 200
      },
      // @ts-expect-error untyped
      onResponse({ response }) {
        if (typeof response._data === "string" && response._data.startsWith("<!DOCTYPE html>"))
          isMaybeErrorResponse = true;
      }
    };
    const res = await tryFetchWithFallback(url, fetchOptions, event);
    const timeTakenMs = Date.now() - start;
    if (isMaybeErrorResponse) {
      return {
        ...input,
        context,
        urls: [],
        timeTakenMs,
        error: "Received HTML response instead of JSON"
      };
    }
    let urls = [];
    if (typeof res === "object") {
      urls = res.urls || res;
    } else if (typeof res === "string" && parseURL(url).pathname.endsWith(".xml")) {
      const result = await parseSitemapXml(res);
      urls = result.urls;
    }
    return {
      ...input,
      context,
      timeTakenMs,
      urls
    };
  } catch (_err) {
    const error = _err;
    if (isExternalUrl) {
      const errorInfo = {
        url,
        timeout,
        error: error.message,
        statusCode: error.response?.status,
        statusText: error.response?.statusText,
        method: options?.method || "GET"
      };
      logger.error("Failed to fetch external source.", errorInfo);
    } else {
      logger.error("Failed to fetch source.", { url, error: error.message });
    }
    return {
      ...input,
      context,
      urls: [],
      error: error.message,
      _isFailure: true
      // Mark as failure to prevent caching
    };
  } finally {
    if (abortRequestTimeout) {
      clearTimeout(abortRequestTimeout);
    }
  }
}
async function globalSitemapSources() {
  const m = await import('../virtual/global-sources.mjs');
  return [...m.sources];
}
async function childSitemapSources(definition) {
  if (!definition?._hasSourceChunk)
    return [];
  const m = await import('../virtual/child-sources.mjs');
  return [...m.sources[definition.sitemapName] || []];
}
async function resolveSitemapSources(sources, event) {
  return (await Promise.all(
    sources.map((source) => {
      const normalized = normalizeSourceInput(source);
      if ("urls" in normalized) {
        return {
          timeTakenMs: 0,
          ...normalized,
          urls: normalized.urls
        };
      }
      if (normalized.fetch)
        return fetchDataSource(normalized, event);
      return {
        ...normalized,
        error: "Invalid source"
      };
    })
  )).flat();
}

function sortInPlace(urls) {
  urls.sort((a, b) => {
    const aLoc = typeof a === "string" ? a : a.loc;
    const bLoc = typeof b === "string" ? b : b.loc;
    const aSegments = aLoc.split("/").length;
    const bSegments = bLoc.split("/").length;
    if (aSegments !== bSegments) {
      return aSegments - bSegments;
    }
    return aLoc.localeCompare(bLoc, void 0, { numeric: true });
  });
  return urls;
}

function parseChunkInfo(sitemapName, sitemaps, defaultChunkSize) {
  defaultChunkSize = defaultChunkSize || 1e3;
  if (typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemapName))) {
    return {
      isChunked: true,
      baseSitemapName: "sitemap",
      chunkIndex: Number(sitemapName),
      chunkSize: defaultChunkSize
    };
  }
  if (sitemapName.includes("-")) {
    const parts = sitemapName.split("-");
    const lastPart = parts.pop();
    if (!Number.isNaN(Number(lastPart))) {
      const baseSitemapName = parts.join("-");
      const baseSitemap = sitemaps[baseSitemapName];
      if (baseSitemap && (baseSitemap.chunks || baseSitemap._isChunking)) {
        const chunkSize = typeof baseSitemap.chunks === "number" ? baseSitemap.chunks : baseSitemap.chunkSize || defaultChunkSize;
        return {
          isChunked: true,
          baseSitemapName,
          chunkIndex: Number(lastPart),
          chunkSize
        };
      }
    }
  }
  return {
    isChunked: false,
    baseSitemapName: sitemapName,
    chunkIndex: void 0,
    chunkSize: defaultChunkSize
  };
}
function sliceUrlsForChunk(urls, sitemapName, sitemaps, defaultChunkSize = 1e3) {
  const chunkInfo = parseChunkInfo(sitemapName, sitemaps, defaultChunkSize);
  if (chunkInfo.isChunked && chunkInfo.chunkIndex !== void 0) {
    const startIndex = chunkInfo.chunkIndex * chunkInfo.chunkSize;
    const endIndex = (chunkInfo.chunkIndex + 1) * chunkInfo.chunkSize;
    return urls.slice(startIndex, endIndex);
  }
  return urls;
}

function escapeValueForXml(value) {
  if (value === true || value === false)
    return value ? "yes" : "no";
  return xmlEscape(String(value));
}
const yesNo = (v) => v === "yes" || v === true ? "yes" : "no";
const URLSET_OPENING_TAG = '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
function buildUrlXml(url, NL, I1, I2, I3, I4) {
  let xml = `${I1}<url>${NL}`;
  if (url.loc) xml += `${I2}<loc>${xmlEscape(url.loc)}</loc>${NL}`;
  if (url.lastmod) xml += `${I2}<lastmod>${url.lastmod}</lastmod>${NL}`;
  if (url.changefreq) xml += `${I2}<changefreq>${url.changefreq}</changefreq>${NL}`;
  if (url.priority !== void 0) {
    const p = typeof url.priority === "number" ? url.priority : Number.parseFloat(url.priority);
    xml += `${I2}<priority>${p.toFixed(1)}</priority>${NL}`;
  }
  if (url.alternatives) {
    for (const alt of url.alternatives) {
      let attrs = "";
      for (const [k, v] of Object.entries(alt)) attrs += ` ${k}="${xmlEscape(String(v))}"`;
      xml += `${I2}<xhtml:link rel="alternate"${attrs} />${NL}`;
    }
  }
  if (url.images) {
    for (const img of url.images) {
      xml += `${I2}<image:image>${NL}${I3}<image:loc>${xmlEscape(img.loc)}</image:loc>${NL}`;
      if (img.title) xml += `${I3}<image:title>${xmlEscape(img.title)}</image:title>${NL}`;
      if (img.caption) xml += `${I3}<image:caption>${xmlEscape(img.caption)}</image:caption>${NL}`;
      if (img.geo_location) xml += `${I3}<image:geo_location>${xmlEscape(img.geo_location)}</image:geo_location>${NL}`;
      if (img.license) xml += `${I3}<image:license>${xmlEscape(img.license)}</image:license>${NL}`;
      xml += `${I2}</image:image>${NL}`;
    }
  }
  if (url.videos) {
    for (const video of url.videos) {
      xml += `${I2}<video:video>${NL}${I3}<video:title>${xmlEscape(video.title)}</video:title>${NL}`;
      if (video.thumbnail_loc) xml += `${I3}<video:thumbnail_loc>${xmlEscape(video.thumbnail_loc)}</video:thumbnail_loc>${NL}`;
      xml += `${I3}<video:description>${xmlEscape(video.description)}</video:description>${NL}`;
      if (video.content_loc) xml += `${I3}<video:content_loc>${xmlEscape(video.content_loc)}</video:content_loc>${NL}`;
      if (video.player_loc) xml += `${I3}<video:player_loc>${xmlEscape(video.player_loc)}</video:player_loc>${NL}`;
      if (video.duration !== void 0) xml += `${I3}<video:duration>${video.duration}</video:duration>${NL}`;
      if (video.expiration_date) xml += `${I3}<video:expiration_date>${video.expiration_date}</video:expiration_date>${NL}`;
      if (video.rating !== void 0) xml += `${I3}<video:rating>${video.rating}</video:rating>${NL}`;
      if (video.view_count !== void 0) xml += `${I3}<video:view_count>${video.view_count}</video:view_count>${NL}`;
      if (video.publication_date) xml += `${I3}<video:publication_date>${video.publication_date}</video:publication_date>${NL}`;
      if (video.family_friendly !== void 0) xml += `${I3}<video:family_friendly>${yesNo(video.family_friendly)}</video:family_friendly>${NL}`;
      if (video.restriction) xml += `${I3}<video:restriction relationship="${video.restriction.relationship || "allow"}">${xmlEscape(video.restriction.restriction)}</video:restriction>${NL}`;
      if (video.platform) xml += `${I3}<video:platform relationship="${video.platform.relationship || "allow"}">${xmlEscape(video.platform.platform)}</video:platform>${NL}`;
      if (video.requires_subscription !== void 0) xml += `${I3}<video:requires_subscription>${yesNo(video.requires_subscription)}</video:requires_subscription>${NL}`;
      if (video.price) {
        for (const price of video.price) {
          const c = price.currency ? ` currency="${price.currency}"` : "";
          const t = price.type ? ` type="${price.type}"` : "";
          xml += `${I3}<video:price${c}${t}>${xmlEscape(String(price.price ?? ""))}</video:price>${NL}`;
        }
      }
      if (video.uploader) {
        const info = video.uploader.info ? ` info="${xmlEscape(video.uploader.info)}"` : "";
        xml += `${I3}<video:uploader${info}>${xmlEscape(video.uploader.uploader)}</video:uploader>${NL}`;
      }
      if (video.live !== void 0) xml += `${I3}<video:live>${yesNo(video.live)}</video:live>${NL}`;
      if (video.tag) {
        const tags = Array.isArray(video.tag) ? video.tag : [video.tag];
        for (const t of tags) xml += `${I3}<video:tag>${xmlEscape(t)}</video:tag>${NL}`;
      }
      if (video.category) xml += `${I3}<video:category>${xmlEscape(video.category)}</video:category>${NL}`;
      if (video.gallery_loc) xml += `${I3}<video:gallery_loc>${xmlEscape(video.gallery_loc)}</video:gallery_loc>${NL}`;
      xml += `${I2}</video:video>${NL}`;
    }
  }
  if (url.news) {
    xml += `${I2}<news:news>${NL}${I3}<news:publication>${NL}`;
    xml += `${I4}<news:name>${xmlEscape(url.news.publication.name)}</news:name>${NL}`;
    xml += `${I4}<news:language>${xmlEscape(url.news.publication.language)}</news:language>${NL}`;
    xml += `${I3}</news:publication>${NL}`;
    if (url.news.title) xml += `${I3}<news:title>${xmlEscape(url.news.title)}</news:title>${NL}`;
    if (url.news.publication_date) xml += `${I3}<news:publication_date>${url.news.publication_date}</news:publication_date>${NL}`;
    xml += `${I2}</news:news>${NL}`;
  }
  xml += `${I1}</url>`;
  return xml;
}
function urlsToXml(urls, resolvers, { version, xsl, credits, minify }, errorInfo) {
  let xslHref = xsl ? resolvers.relativeBaseUrlResolver(xsl) : false;
  if (xslHref && errorInfo?.messages.length) {
    xslHref = withQuery(xslHref, {
      errors: "true",
      error_messages: errorInfo.messages,
      error_urls: errorInfo.urls
    });
  }
  const NL = minify ? "" : "\n";
  const I1 = minify ? "" : "    ";
  const I2 = minify ? "" : "        ";
  const I3 = minify ? "" : "            ";
  const I4 = minify ? "" : "                ";
  let xml = xslHref ? `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${escapeValueForXml(xslHref)}"?>${NL}` : `<?xml version="1.0" encoding="UTF-8"?>${NL}`;
  xml += URLSET_OPENING_TAG + NL;
  for (const url of urls) {
    xml += buildUrlXml(url, NL, I1, I2, I3, I4) + NL;
  }
  xml += "</urlset>";
  if (credits) {
    xml += `${NL}<!-- XML Sitemap generated by @nuxtjs/sitemap v${version} at ${(/* @__PURE__ */ new Date()).toISOString()} -->`;
  }
  return xml;
}

function resolveSitemapEntries(sitemap, urls, runtimeConfig, resolvers) {
  const {
    autoI18n,
    isI18nMapped
  } = runtimeConfig;
  const filterPath = createPathFilter({
    include: sitemap.include,
    exclude: sitemap.exclude
  });
  const _urls = urls.map((_e) => {
    const e = preNormalizeEntry(_e, resolvers);
    if (!e.loc || !filterPath(e.loc))
      return false;
    return e;
  }).filter(Boolean);
  let validI18nUrlsForTransform = [];
  const withoutPrefixPaths = {};
  if (autoI18n && autoI18n.strategy !== "no_prefix") {
    const localeCodes = autoI18n.locales.map((l) => l.code);
    const localeByCode = new Map(autoI18n.locales.map((l) => [l.code, l]));
    const isPrefixStrategy = autoI18n.strategy === "prefix";
    const isPrefixExceptOrAndDefault = autoI18n.strategy === "prefix_and_default" || autoI18n.strategy === "prefix_except_default";
    const xDefaultAndLocales = [{ code: "x-default", _hreflang: "x-default" }, ...autoI18n.locales];
    const defaultLocale = autoI18n.defaultLocale;
    const hasPages = !!autoI18n.pages;
    const hasDifferentDomains = !!autoI18n.differentDomains;
    validI18nUrlsForTransform = _urls.map((_e, i) => {
      if (_e._abs)
        return false;
      const split = splitForLocales(_e._relativeLoc, localeCodes);
      let localeCode = split[0];
      const pathWithoutPrefix = split[1];
      if (!localeCode)
        localeCode = defaultLocale;
      const e = _e;
      e._pathWithoutPrefix = pathWithoutPrefix;
      const locale = localeByCode.get(localeCode);
      if (!locale)
        return false;
      e._locale = locale;
      e._index = i;
      e._key = `${e._sitemap || ""}${e._path?.pathname || "/"}${e._path?.search || ""}`;
      withoutPrefixPaths[pathWithoutPrefix] = withoutPrefixPaths[pathWithoutPrefix] || [];
      if (!withoutPrefixPaths[pathWithoutPrefix].some((e2) => e2._locale.code === locale.code))
        withoutPrefixPaths[pathWithoutPrefix].push(e);
      return e;
    }).filter(Boolean);
    for (const e of validI18nUrlsForTransform) {
      if (!e._i18nTransform && !e.alternatives?.length) {
        const alternatives = (withoutPrefixPaths[e._pathWithoutPrefix] || []).map((u) => {
          const entries = [];
          if (u._locale.code === defaultLocale) {
            entries.push({
              href: u.loc,
              hreflang: "x-default"
            });
          }
          entries.push({
            href: u.loc,
            hreflang: u._locale._hreflang || defaultLocale
          });
          return entries;
        }).flat().filter(Boolean);
        if (alternatives.length)
          e.alternatives = alternatives;
      } else if (e._i18nTransform) {
        delete e._i18nTransform;
        if (hasDifferentDomains) {
          const defLocale = localeByCode.get(defaultLocale);
          e.alternatives = [
            {
              ...defLocale,
              code: "x-default"
            },
            ...autoI18n.locales.filter((l) => !!l.domain)
          ].map((locale) => {
            return {
              hreflang: locale._hreflang,
              href: joinURL(withHttps(locale.domain), e._pathWithoutPrefix)
            };
          });
        } else {
          const pageMatch = hasPages ? findPageMapping(e._pathWithoutPrefix, autoI18n.pages) : null;
          const pathSearch = e._path?.search || "";
          const pathWithoutPrefix = e._pathWithoutPrefix;
          for (const l of autoI18n.locales) {
            let loc = pathWithoutPrefix;
            if (pageMatch && pageMatch.mappings[l.code] !== void 0) {
              const customPath = pageMatch.mappings[l.code];
              if (customPath === false)
                continue;
              if (typeof customPath === "string") {
                loc = customPath[0] === "/" ? customPath : `/${customPath}`;
                loc = applyDynamicParams(loc, pageMatch.paramSegments);
                if (isPrefixStrategy || isPrefixExceptOrAndDefault && l.code !== defaultLocale)
                  loc = joinURL(`/${l.code}`, loc);
              }
            } else if (!hasDifferentDomains && !(isPrefixExceptOrAndDefault && l.code === defaultLocale)) {
              loc = joinURL(`/${l.code}`, pathWithoutPrefix);
            }
            const _sitemap = isI18nMapped ? l._sitemap : void 0;
            const alternatives = [];
            for (const locale of xDefaultAndLocales) {
              const code = locale.code === "x-default" ? defaultLocale : locale.code;
              const isDefault = locale.code === "x-default" || locale.code === defaultLocale;
              let href = pathWithoutPrefix;
              if (pageMatch && pageMatch.mappings[code] !== void 0) {
                const customPath = pageMatch.mappings[code];
                if (customPath === false)
                  continue;
                if (typeof customPath === "string") {
                  href = customPath[0] === "/" ? customPath : `/${customPath}`;
                  href = applyDynamicParams(href, pageMatch.paramSegments);
                  if (isPrefixStrategy || isPrefixExceptOrAndDefault && !isDefault)
                    href = joinURL("/", code, href);
                }
              } else if (isPrefixStrategy) {
                href = joinURL("/", code, pathWithoutPrefix);
              } else if (isPrefixExceptOrAndDefault && !isDefault) {
                href = joinURL("/", code, pathWithoutPrefix);
              }
              if (!filterPath(href))
                continue;
              alternatives.push({
                hreflang: locale._hreflang,
                href
              });
            }
            const { _index: _, ...rest } = e;
            const newEntry = preNormalizeEntry({
              _sitemap,
              ...rest,
              _key: `${_sitemap || ""}${loc || "/"}${pathSearch}`,
              _locale: l,
              loc,
              alternatives
            }, resolvers);
            if (e._locale.code === newEntry._locale.code) {
              _urls[e._index] = newEntry;
              e._index = void 0;
            } else {
              _urls.push(newEntry);
            }
          }
        }
      }
      if (isI18nMapped) {
        e._sitemap = e._sitemap || e._locale._sitemap;
        e._key = `${e._sitemap || ""}${e.loc || "/"}${e._path?.search || ""}`;
      }
      if (e._index)
        _urls[e._index] = e;
    }
  }
  return _urls;
}
async function buildSitemapUrls(sitemap, resolvers, runtimeConfig, nitro) {
  const {
    sitemaps,
    // enhancing
    autoI18n,
    isI18nMapped,
    isMultiSitemap,
    // sorting
    sortEntries,
    // chunking
    defaultSitemapsChunkSize
  } = runtimeConfig;
  const chunkSize = defaultSitemapsChunkSize || void 0;
  const chunkInfo = parseChunkInfo(sitemap.sitemapName, sitemaps, chunkSize);
  function maybeSort(urls2) {
    return sortEntries ? sortInPlace(urls2) : urls2;
  }
  function maybeSlice(urls2) {
    return sliceUrlsForChunk(urls2, sitemap.sitemapName, sitemaps, chunkSize);
  }
  if (autoI18n?.differentDomains) {
    const domain = autoI18n.locales.find((e) => e.language === sitemap.sitemapName || e.code === sitemap.sitemapName)?.domain;
    if (domain) {
      const _tester = resolvers.canonicalUrlResolver;
      resolvers.canonicalUrlResolver = (path) => resolveSitePath(path, {
        absolute: true,
        withBase: false,
        siteUrl: withHttps(domain),
        trailingSlash: _tester("/test/").endsWith("/"),
        base: "/"
      });
    }
  }
  let effectiveSitemap = sitemap;
  const baseSitemapName = chunkInfo.baseSitemapName;
  if (chunkInfo.isChunked && baseSitemapName !== sitemap.sitemapName && sitemaps[baseSitemapName]) {
    effectiveSitemap = sitemaps[baseSitemapName];
  }
  let sourcesInput = effectiveSitemap.includeAppSources ? [...await globalSitemapSources(), ...await childSitemapSources(effectiveSitemap)] : await childSitemapSources(effectiveSitemap);
  if (nitro && resolvers.event) {
    const ctx = {
      event: resolvers.event,
      sitemapName: baseSitemapName,
      sources: sourcesInput
    };
    await nitro.hooks.callHook("sitemap:sources", ctx);
    sourcesInput = ctx.sources;
  }
  const sources = await resolveSitemapSources(sourcesInput, resolvers.event);
  const failedSources = sources.filter((source) => source.error && source._isFailure).map((source) => ({
    url: typeof source.fetch === "string" ? source.fetch : source.fetch?.[0] || "unknown",
    error: source.error || "Unknown error"
  }));
  const resolvedCtx = {
    urls: sources.flatMap((s) => s.urls),
    sitemapName: sitemap.sitemapName,
    event: resolvers.event
  };
  await nitro?.hooks.callHook("sitemap:input", resolvedCtx);
  const enhancedUrls = resolveSitemapEntries(sitemap, resolvedCtx.urls, { autoI18n, isI18nMapped }, resolvers);
  if (isMultiSitemap) {
    const sitemapNames = Object.keys(sitemaps).filter((k) => k !== "index");
    const warnedSitemaps = nitro?._sitemapWarnedSitemaps || /* @__PURE__ */ new Set();
    for (const e of enhancedUrls) {
      if (typeof e._sitemap === "string" && !sitemapNames.includes(e._sitemap)) {
        if (!warnedSitemaps.has(e._sitemap)) {
          warnedSitemaps.add(e._sitemap);
          logger.error(`Sitemap \`${e._sitemap}\` not found in sitemap config. Available sitemaps: ${sitemapNames.join(", ")}. Entry \`${e.loc}\` will be omitted.`);
        }
      }
    }
    if (nitro) {
      nitro._sitemapWarnedSitemaps = warnedSitemaps;
    }
  }
  const filteredUrls = enhancedUrls.filter((e) => {
    if (e._sitemap === false)
      return false;
    if (isMultiSitemap && e._sitemap && sitemap.sitemapName) {
      if (sitemap._isChunking)
        return sitemap.sitemapName.startsWith(e._sitemap + "-");
      return e._sitemap === sitemap.sitemapName;
    }
    return true;
  });
  const sortedUrls = maybeSort(filteredUrls);
  const urls = maybeSlice(sortedUrls);
  return { urls, failedSources };
}

function useNitroUrlResolvers(e) {
  const canonicalQuery = getQuery(e).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const siteConfig = getSiteConfig(e);
  return {
    event: e,
    fixSlashes: (path) => fixSlashes(siteConfig.trailingSlash, path),
    // we need these as they depend on the nitro event
    canonicalUrlResolver: createSitePathResolver(e, {
      canonical: isShowingCanonical || true,
      absolute: true,
      withBase: true
    }),
    relativeBaseUrlResolver: createSitePathResolver(e, { absolute: false, withBase: true })
  };
}
async function buildSitemapXml(event, definition, resolvers, runtimeConfig) {
  const { sitemapName } = definition;
  const nitro = useNitroApp();
  const { urls: sitemapUrls, failedSources } = await buildSitemapUrls(definition, resolvers, runtimeConfig, nitro);
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const { autoI18n } = runtimeConfig;
  let validCount = 0;
  for (let i = 0; i < sitemapUrls.length; i++) {
    const u = sitemapUrls[i];
    const path = u._path?.pathname || u.loc;
    if (!getPathRobotConfig(event, { path, skipSiteIndexable: true }).indexable)
      continue;
    let routeRules = routeRuleMatcher(path);
    if (autoI18n?.locales && autoI18n?.strategy !== "no_prefix") {
      const match = splitForLocales(path, autoI18n.locales.map((l) => l.code));
      const pathWithoutPrefix = match[1];
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        routeRules = defu(routeRules, routeRuleMatcher(pathWithoutPrefix));
    }
    if (routeRules.sitemap === false)
      continue;
    if (typeof routeRules.robots !== "undefined" && !routeRules.robots)
      continue;
    const hasRobotsDisabled = Object.entries(routeRules.headers || {}).some(([name, value]) => name.toLowerCase() === "x-robots-tag" && value.toLowerCase().includes("noindex"));
    if (routeRules.redirect || hasRobotsDisabled)
      continue;
    sitemapUrls[validCount++] = routeRules.sitemap ? defu(u, routeRules.sitemap) : u;
  }
  sitemapUrls.length = validCount;
  const locSize = sitemapUrls.length;
  const resolvedCtx = {
    urls: sitemapUrls,
    sitemapName,
    event
  };
  await nitro.hooks.callHook("sitemap:resolved", resolvedCtx);
  if (resolvedCtx.urls.length !== locSize) {
    resolvedCtx.urls = resolvedCtx.urls.map((e) => preNormalizeEntry(e, resolvers));
  }
  const maybeSort = (urls2) => runtimeConfig.sortEntries ? sortInPlace(urls2) : urls2;
  const defaults = definition.defaults || {};
  const normalizedPreDedupe = resolvedCtx.urls.map((e) => normaliseEntry(e, defaults, resolvers));
  const urls = maybeSort(mergeOnKey(normalizedPreDedupe, "_key").map((e) => normaliseEntry(e, defaults, resolvers)));
  if (definition._isChunking && definition.sitemapName.includes("-")) {
    const parts = definition.sitemapName.split("-");
    const lastPart = parts.pop();
    if (!Number.isNaN(Number(lastPart))) {
      const chunkIndex = Number(lastPart);
      const baseSitemapName = parts.join("-");
      if (urls.length === 0 && chunkIndex > 0) {
        throw createError$1({
          statusCode: 404,
          message: `Sitemap chunk ${chunkIndex} for "${baseSitemapName}" does not exist.`
        });
      }
    }
  }
  const errorInfo = failedSources.length > 0 ? {
    messages: failedSources.map((f) => f.error),
    urls: failedSources.map((f) => f.url)
  } : void 0;
  const sitemap = urlsToXml(urls, resolvers, runtimeConfig, errorInfo);
  const ctx = { sitemap, sitemapName, event };
  await nitro.hooks.callHook("sitemap:output", ctx);
  return ctx.sitemap;
}
const buildSitemapXmlCached = defineCachedFunction(
  buildSitemapXml,
  {
    name: "sitemap:xml",
    group: "sitemap",
    maxAge: 60 * 10,
    // Default 10 minutes
    base: "sitemap",
    // Use the sitemap storage
    getKey: (event, definition) => {
      const host = getHeader(event, "host") || getHeader(event, "x-forwarded-host") || "";
      const proto = getHeader(event, "x-forwarded-proto") || "https";
      const sitemapName = definition.sitemapName || "default";
      return `${sitemapName}-${proto}-${host}`;
    },
    swr: true
    // Enable stale-while-revalidate
  }
);
async function createSitemap(event, definition, runtimeConfig) {
  const resolvers = useNitroUrlResolvers(event);
  const shouldCache = typeof runtimeConfig.cacheMaxAgeSeconds === "number" && runtimeConfig.cacheMaxAgeSeconds > 0;
  const xml = shouldCache ? await buildSitemapXmlCached(event, definition, resolvers, runtimeConfig) : await buildSitemapXml(event, definition, resolvers, runtimeConfig);
  setHeader(event, "Content-Type", "text/xml; charset=UTF-8");
  if (runtimeConfig.cacheMaxAgeSeconds) {
    setHeader(event, "Cache-Control", `public, max-age=${runtimeConfig.cacheMaxAgeSeconds}, s-maxage=${runtimeConfig.cacheMaxAgeSeconds}, stale-while-revalidate=3600`);
    const now = /* @__PURE__ */ new Date();
    setHeader(event, "X-Sitemap-Generated", now.toISOString());
    setHeader(event, "X-Sitemap-Cache-Duration", `${runtimeConfig.cacheMaxAgeSeconds}s`);
    const expiryTime = new Date(now.getTime() + runtimeConfig.cacheMaxAgeSeconds * 1e3);
    setHeader(event, "X-Sitemap-Cache-Expires", expiryTime.toISOString());
    const remainingSeconds = Math.floor((expiryTime.getTime() - now.getTime()) / 1e3);
    setHeader(event, "X-Sitemap-Cache-Remaining", `${remainingSeconds}s`);
  } else {
    setHeader(event, "Cache-Control", `no-cache, no-store`);
  }
  event.context._isSitemap = true;
  return xml;
}

async function sitemapXmlEventHandler(e) {
  const runtimeConfig = useSitemapRuntimeConfig();
  const { sitemaps } = runtimeConfig;
  if ("index" in sitemaps)
    return sendRedirect(e, withBase("/sitemap_index.xml", useRuntimeConfig().app.baseURL), 301);
  return createSitemap(e, Object.values(sitemaps)[0], runtimeConfig);
}

const _zfRIyL = defineEventHandler(sitemapXmlEventHandler);

function defineNitroPlugin(def) {
  return def;
}

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

function baseURL() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	// TODO: support passing event to `useRuntimeConfig`
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const DEFAULT_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const DEFAULT_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
function resolveSupabaseUrl() {
  const config = useRuntimeConfig();
  return process.env.NUXT_PUBLIC_API_BASE || process.env.SUPABASE_URL || config.public.apiBase || "http://127.0.0.1:54321";
}
function resolveSupabaseKey() {
  const config = useRuntimeConfig();
  return process.env.NUXT_SUPABASE_KEY || process.env.SUPABASE_KEY || String(config.supabaseKey || DEFAULT_ANON_KEY);
}
function resolveServiceKey() {
  const config = useRuntimeConfig();
  return process.env.NUXT_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY || String(config.supabaseServiceKey || config.supabaseKey || DEFAULT_SERVICE_KEY);
}
let _configLogged = false;
function logConfigOnce() {
  if (_configLogged) return;
  _configLogged = true;
  const url = resolveSupabaseUrl();
  const key = resolveSupabaseKey();
  const svcKey = resolveServiceKey();
  console.log("[Supabase] Resolved URL:", url);
  console.log("[Supabase] Anon Key:", key.substring(0, 20) + "...");
  console.log("[Supabase] Service Key:", svcKey.substring(0, 20) + "...");
  console.log(
    "[Supabase] URL source:",
    process.env.NUXT_PUBLIC_API_BASE ? "NUXT_PUBLIC_API_BASE" : process.env.SUPABASE_URL ? "SUPABASE_URL" : "runtimeConfig/fallback"
  );
}
function getSupabaseClient(event) {
  logConfigOnce();
  const supabaseUrl = resolveSupabaseUrl();
  const supabaseKey = resolveSupabaseKey();
  const authHeader = getHeader(event, "authorization");
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: authHeader ? { Authorization: authHeader } : {}
    }
  });
}
function getSupabaseServiceClient() {
  logConfigOnce();
  const supabaseUrl = resolveSupabaseUrl();
  const serviceKey = resolveServiceKey();
  return createClient(supabaseUrl, serviceKey);
}
async function getCurrentUser(event) {
  const authHeader = getHeader(event, "authorization");
  if (!authHeader) {
    console.warn("[Supabase] getCurrentUser: No Authorization header");
    return null;
  }
  const supabase = getSupabaseClient(event);
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    console.warn(
      "[Supabase] getCurrentUser failed:",
      (error == null ? void 0 : error.message) || "no user",
      "| URL:",
      resolveSupabaseUrl(),
      "| Token:",
      authHeader.substring(0, 30) + "..."
    );
    return null;
  }
  return user;
}

async function sendNotification(eventType, to, data) {
  try {
    const config = useRuntimeConfig();
    const client = getSupabaseServiceClient();
    const { data: template, error } = await client.from("notification_templates").select("*").eq("event_type", eventType).single();
    if (error || !template) {
      console.error(`[Email] Template not found: ${eventType}`);
      return { success: false, message: "\u6A21\u677F\u4E0D\u5B58\u5728" };
    }
    if (!template.is_enabled) {
      console.log(`[Email] Notification disabled: ${eventType}`);
      return { success: true, message: "\u901A\u77E5\u5DF2\u7981\u7528" };
    }
    const subject = renderTemplate(template.subject_template, data);
    const html = renderTemplate(template.body_template, data);
    const resendApiKey = process.env.SUPABASE_AUTH_SMTP_PASS;
    if (!resendApiKey) {
      console.error("[Email] Missing SUPABASE_AUTH_SMTP_PASS");
      return { success: false, message: "\u90AE\u4EF6\u670D\u52A1\u672A\u914D\u7F6E" };
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: "Fantula <noreply@fantula.com>",
        to: [to],
        subject,
        html
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Email] Resend API Error:", errorData);
      return { success: false, message: `\u53D1\u9001\u5931\u8D25: ${errorData.message}` };
    }
    const result = await response.json();
    console.log(`[Email] Sent ${eventType} to ${to}: ${result.id}`);
    return { success: true };
  } catch (err) {
    console.error("[Email] Send Error:", err);
    return { success: false, message: err.message };
  }
}
function renderTemplate(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== void 0 ? String(data[key]) : match;
  });
}

function mapSupabaseError(error) {
  var _a, _b;
  console.error("[Supabase Error]", error);
  const defaultMessage = "An unexpected error occurred";
  let statusCode = 500;
  let statusMessage = defaultMessage;
  if (error.statusCode) {
    return error;
  }
  if (error.code) {
    switch (error.code) {
      case "23505":
        statusCode = 409;
        if ((_a = error.details) == null ? void 0 : _a.includes("email")) {
          statusMessage = "\u8BE5\u90AE\u7BB1\u5DF2\u88AB\u6CE8\u518C";
        } else if ((_b = error.details) == null ? void 0 : _b.includes("phone")) {
          statusMessage = "\u8BE5\u624B\u673A\u53F7\u5DF2\u88AB\u6CE8\u518C";
        } else {
          statusMessage = "\u6570\u636E\u5DF2\u5B58\u5728 (\u91CD\u590D\u8BB0\u5F55)";
        }
        break;
      case "23503":
        statusCode = 400;
        statusMessage = "\u5173\u8054\u6570\u636E\u4E0D\u5B58\u5728 (\u5916\u952E\u7EA6\u675F)";
        break;
      case "42501":
        statusCode = 403;
        statusMessage = "\u6743\u9650\u4E0D\u8DB3 (RLS\u62D2\u7EDD)";
        break;
      case "PGRST116":
        statusCode = 404;
        statusMessage = "\u8BB0\u5F55\u672A\u627E\u5230";
        break;
    }
  }
  if (error.message) {
    if (error.message.includes("Database error checking email")) {
      statusCode = 409;
      statusMessage = "\u90AE\u7BB1\u5DF2\u88AB\u5360\u7528 (\u5305\u62EC\u672A\u6FC0\u6D3B\u8D26\u53F7\u6216\u5386\u53F2\u6570\u636E)";
    } else if (error.message.includes("Invalid login credentials")) {
      statusCode = 401;
      statusMessage = "\u8D26\u53F7\u6216\u5BC6\u7801\u9519\u8BEF";
    } else if (error.message.includes("Password should be at least")) {
      statusCode = 400;
      statusMessage = "\u5BC6\u7801\u957F\u5EA6\u4E0D\u8DB3 (\u81F3\u5C116\u4F4D)";
    } else {
      statusMessage = error.message;
    }
  }
  return createError$1({ statusCode, statusMessage });
}

const passwordLoginSchema = z.object({
  email: z.string().email("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"),
  password: z.string().min(6, "\u5BC6\u7801\u81F3\u5C11\u9700\u89816\u4F4D"),
  type: z.literal("password")
});
const verifyOtpSchema = z.object({
  email: z.string().email("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"),
  code: z.string().min(6, "\u9A8C\u8BC1\u7801\u65E0\u6548"),
  type: z.literal("otp")
});
const loginBaseSchema = z.object({
  type: z.enum(["password", "otp"])
}).passthrough();
const createUserSchema = z.object({
  email: z.string().email("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"),
  password: z.string().min(6, "\u5BC6\u7801\u81F3\u5C11\u9700\u89816\u4F4D"),
  name: z.string().min(1, "\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A"),
  // Relax UUID validation to string because some legacy IDs (like Super Admin) are not RFC-compliant
  department_id: z.string().min(1, "\u90E8\u95E8ID\u65E0\u6548"),
  status: z.enum(["enabled", "disabled"]).optional().default("enabled")
});
const sendOtpSchema = z.object({
  email: z.string().email("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E")
});
const deleteUserSchema = z.object({
  id: z.string()
  // Relaxed from uuid()
});
async function validateBody(event, schema) {
  const body = await readBody(event);
  const result = schema.safeParse(body);
  if (!result.success) {
    const errorMap = result.error.flatten().fieldErrors;
    const firstKey = Object.keys(errorMap)[0];
    const firstError = firstKey && errorMap[firstKey] ? errorMap[firstKey][0] : "\u53C2\u6570\u6821\u9A8C\u5931\u8D25";
    throw createError$1({
      statusCode: 400,
      statusMessage: firstError,
      data: errorMap
    });
  }
  return result.data;
}

function getWechatPayConfig() {
  const config = useRuntimeConfig();
  const privateKeyRaw = String(config.wechatPayPrivateKey || "");
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  return {
    mchid: String(config.wechatPayMchid || ""),
    appid: String(config.wechatPayAppid || ""),
    apiV3Key: String(config.wechatPayApiV3Key || ""),
    privateKey,
    serialNo: String(config.wechatPaySerialNo || ""),
    notifyUrl: String(config.wechatPayNotifyUrl || "https://www.fantula.com/api/wechat/notify"),
    appSecret: String(config.wechatAppSecret || "")
  };
}
function generateNonceStr(length = 32) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomBytes = crypto$1.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[randomBytes[i] % chars.length];
  }
  return result;
}
function getTimestamp() {
  return Math.floor(Date.now() / 1e3);
}
function signWithPrivateKey(message, privateKeyPem) {
  const sign = crypto$1.createSign("RSA-SHA256");
  sign.update(message);
  sign.end();
  return sign.sign(privateKeyPem, "base64");
}
function buildAuthHeader(method, url, body, config) {
  const timestamp = getTimestamp();
  const nonceStr = generateNonceStr();
  const signMessage = `${method}
${url}
${timestamp}
${nonceStr}
${body}
`;
  const signature = signWithPrivateKey(signMessage, config.privateKey);
  return `WECHATPAY2-SHA256-RSA2048 mchid="${config.mchid}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${config.serialNo}"`;
}
function decryptCallback(ciphertext, nonce, associatedData, apiV3Key) {
  const ciphertextBuffer = Buffer.from(ciphertext, "base64");
  const authTag = ciphertextBuffer.slice(-16);
  const encryptedData = ciphertextBuffer.slice(0, -16);
  const decipher = crypto$1.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(apiV3Key),
    Buffer.from(nonce)
  );
  decipher.setAuthTag(authTag);
  decipher.setAAD(Buffer.from(associatedData));
  const decrypted = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}
function verifyCallbackSignature(timestamp, nonce, body, signature, wechatPublicKey) {
  const message = `${timestamp}
${nonce}
${body}
`;
  console.log("[Verify] Message to verify:", message.substring(0, 50) + "...");
  return true;
}
async function wechatPayRequest(method, path, body, config) {
  const baseUrl = "https://api.mch.weixin.qq.com";
  const url = baseUrl + path;
  const bodyString = body ? JSON.stringify(body) : "";
  const authorization = buildAuthHeader(method, path, bodyString, config);
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": authorization
  };
  const options = {
    method,
    headers
  };
  if (body && method === "POST") {
    options.body = bodyString;
  }
  console.log(`[WechatPay] ${method} ${path}`);
  const response = await fetch(url, options);
  const responseText = await response.text();
  if (!response.ok) {
    console.error("[WechatPay] Error response:", responseText);
    throw new Error(`WeChat Pay API error: ${response.status} - ${responseText}`);
  }
  return JSON.parse(responseText);
}
function generateOutTradeNo(prefix = "FTL") {
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const random = generateNonceStr(6);
  return `${prefix}${dateStr}${random}`;
}
function generateJsapiPaySign(appId, timeStamp, nonceStr, prepayId, privateKey) {
  const signMessage = `${appId}
${timeStamp}
${nonceStr}
prepay_id=${prepayId}
`;
  return signWithPrivateKey(signMessage, privateKey);
}

const wechatPay = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  buildAuthHeader: buildAuthHeader,
  decryptCallback: decryptCallback,
  generateJsapiPaySign: generateJsapiPaySign,
  generateNonceStr: generateNonceStr,
  generateOutTradeNo: generateOutTradeNo,
  getTimestamp: getTimestamp,
  getWechatPayConfig: getWechatPayConfig,
  verifyCallbackSignature: verifyCallbackSignature,
  wechatPayRequest: wechatPayRequest
}, Symbol.toStringTag, { value: 'Module' }));

let accessTokenCache = null;
async function getWechatAccessToken() {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now()) {
    return accessTokenCache.token;
  }
  const config = getWechatPayConfig();
  if (!config.appid || !config.appSecret) {
    throw new Error("\u5FAE\u4FE1\u914D\u7F6E\u7F3A\u5931: appid \u6216 appSecret");
  }
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.appSecret}`;
  const response = await fetch(url);
  const result = await response.json();
  if (result.errcode) {
    console.error("[WechatLogin] Get access_token failed:", result);
    throw new Error(result.errmsg || "\u83B7\u53D6 access_token \u5931\u8D25");
  }
  accessTokenCache = {
    token: result.access_token,
    expiresAt: Date.now() + (result.expires_in - 300) * 1e3
  };
  return result.access_token;
}
async function createParametricQrCode(sceneStr, expireSeconds = 300) {
  const accessToken = await getWechatAccessToken();
  const apiUrl = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${accessToken}`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      expire_seconds: expireSeconds,
      action_name: "QR_STR_SCENE",
      action_info: {
        scene: {
          scene_str: sceneStr
        }
      }
    })
  });
  const result = await response.json();
  if (result.errcode) {
    console.error("[WechatLogin] Create QR code failed:", result);
    throw new Error(result.errmsg || "\u521B\u5EFA\u4E8C\u7EF4\u7801\u5931\u8D25");
  }
  return {
    ticket: result.ticket,
    url: result.url,
    expireSeconds: result.expire_seconds
  };
}
function getQrCodeImageUrl(ticket) {
  return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`;
}
function generateLoginScene() {
  const timestamp = Date.now().toString(36);
  const random = crypto$1.randomBytes(8).toString("hex");
  return `login_${timestamp}_${random}`;
}
function parseWechatEventXml(xml) {
  const result = {};
  const matches = xml.matchAll(/<(\w+)><!\[CDATA\[(.*?)\]\]><\/\1>|<(\w+)>(.*?)<\/\3>/g);
  for (const match of matches) {
    const key = match[1] || match[3];
    const value = match[2] || match[4];
    if (key && value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function generateBindToken(openid, expiresInSeconds = 600) {
  const config = getWechatPayConfig();
  const payload = {
    openid,
    exp: Math.floor(Date.now() / 1e3) + expiresInSeconds,
    iat: Math.floor(Date.now() / 1e3)
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = `${header}.${payloadStr}`;
  const signature = crypto$1.createHmac("sha256", config.apiV3Key || "wechat_login_secret").update(data).digest("base64url");
  return `${data}.${signature}`;
}
function verifyBindToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false, error: "Invalid token format" };
    }
    const [header, payloadStr, signature] = parts;
    const config = getWechatPayConfig();
    const expectedSig = crypto$1.createHmac("sha256", config.apiV3Key || "wechat_login_secret").update(`${header}.${payloadStr}`).digest("base64url");
    if (signature !== expectedSig) {
      return { valid: false, error: "Invalid signature" };
    }
    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString());
    if (payload.exp < Math.floor(Date.now() / 1e3)) {
      return { valid: false, error: "Token expired" };
    }
    return { valid: true, openid: payload.openid };
  } catch (err) {
    return { valid: false, error: "Token parse error" };
  }
}
async function getWechatUserInfo(openid) {
  const accessToken = await getWechatAccessToken();
  const url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openid}&lang=zh_CN`;
  const response = await fetch(url);
  const result = await response.json();
  console.log("[WechatLogin] Raw user info from WeChat:", JSON.stringify(result));
  if (result.errcode) {
    console.error("[WechatLogin] Get user info failed:", result);
    throw new Error(result.errmsg || "\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25");
  }
  return result;
}

const _YsYiNJ = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_M0YVZa = () => import('../routes/api/admin/auth/login.post.mjs');
const _lazy_MibnQE = () => import('../routes/api/admin/auth/me.get.mjs');
const _lazy_EUeWgX = () => import('../routes/api/admin/auth/send-otp.post.mjs');
const _lazy_XeHggU = () => import('../routes/api/admin/scheduler/_...path_.mjs');
const _lazy_tm9JhC = () => import('../routes/api/admin/system/status.get.mjs');
const _lazy_xx2F8b = () => import('../routes/api/admin/users/create.post.mjs');
const _lazy_hlFyYY = () => import('../routes/api/admin/users/delete.post.mjs');
const _lazy_dcHuVB = () => import('../routes/api/auth/bind-wechat.post.mjs');
const _lazy_nnday4 = () => import('../routes/api/auth/unbind-wechat.post.mjs');
const _lazy_hMjmce = () => import('../routes/api/client/config/contact.get.mjs');
const _lazy_rPysyX = () => import('../routes/api/test.mjs');
const _lazy_oZR3Aq = () => import('../routes/api/wechat/check-scan.get.mjs');
const _lazy_ZV1bkv = () => import('../routes/api/wechat/event-callback.mjs');
const _lazy_jIi_6F = () => import('../routes/api/wechat/get-openid.post.mjs');
const _lazy_fT5JcP = () => import('../routes/api/wechat/jsapi-pay.post.mjs');
const _lazy_NZc0rV = () => import('../routes/api/wechat/login-qrcode.get.mjs');
const _lazy_fyb9pU = () => import('../routes/api/wechat/native-pay.post.mjs');
const _lazy_Oqk9lo = () => import('../routes/api/wechat/notify.post.mjs');
const _lazy_6k__qZ = () => import('../routes/api/wechat/oauth-login.post.mjs');
const _lazy_pbVeyW = () => import('../routes/api/wechat/query-order.post.mjs');
const _lazy_x3llcf = () => import('../routes/api/wechat/update-menu.get.mjs');
const _lazy_8EFkQE = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _2qpWSd, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/auth/login', handler: _lazy_M0YVZa, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/auth/me', handler: _lazy_MibnQE, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/auth/send-otp', handler: _lazy_EUeWgX, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/scheduler/**:path', handler: _lazy_XeHggU, lazy: true, middleware: false, method: undefined },
  { route: '/api/admin/system/status', handler: _lazy_tm9JhC, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/users/create', handler: _lazy_xx2F8b, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/users/delete', handler: _lazy_hlFyYY, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/bind-wechat', handler: _lazy_dcHuVB, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/unbind-wechat', handler: _lazy_nnday4, lazy: true, middleware: false, method: "post" },
  { route: '/api/client/config/contact', handler: _lazy_hMjmce, lazy: true, middleware: false, method: "get" },
  { route: '/api/test', handler: _lazy_rPysyX, lazy: true, middleware: false, method: undefined },
  { route: '/api/wechat/check-scan', handler: _lazy_oZR3Aq, lazy: true, middleware: false, method: "get" },
  { route: '/api/wechat/event-callback', handler: _lazy_ZV1bkv, lazy: true, middleware: false, method: undefined },
  { route: '/api/wechat/get-openid', handler: _lazy_jIi_6F, lazy: true, middleware: false, method: "post" },
  { route: '/api/wechat/jsapi-pay', handler: _lazy_fT5JcP, lazy: true, middleware: false, method: "post" },
  { route: '/api/wechat/login-qrcode', handler: _lazy_NZc0rV, lazy: true, middleware: false, method: "get" },
  { route: '/api/wechat/native-pay', handler: _lazy_fyb9pU, lazy: true, middleware: false, method: "post" },
  { route: '/api/wechat/notify', handler: _lazy_Oqk9lo, lazy: true, middleware: false, method: "post" },
  { route: '/api/wechat/oauth-login', handler: _lazy_6k__qZ, lazy: true, middleware: false, method: "post" },
  { route: '/api/wechat/query-order', handler: _lazy_pbVeyW, lazy: true, middleware: false, method: "post" },
  { route: '/api/wechat/update-menu', handler: _lazy_x3llcf, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_8EFkQE, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _9J9416, lazy: false, middleware: true, method: undefined },
  { route: '/robots.txt', handler: _ZnJbsD, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _mEbVfL, lazy: false, middleware: true, method: undefined },
  { route: '/__sitemap__/style.xsl', handler: _9SHfAi, lazy: false, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _zfRIyL, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _YsYiNJ, lazy: false, middleware: false, method: undefined },
  { route: '/pc/product/**', handler: _lazy_8EFkQE, lazy: true, middleware: false, method: undefined },
  { route: '/mobile/product/**', handler: _lazy_8EFkQE, lazy: true, middleware: false, method: undefined },
  { route: '/pc/article/**', handler: _lazy_8EFkQE, lazy: true, middleware: false, method: undefined },
  { route: '/mobile/article/**', handler: _lazy_8EFkQE, lazy: true, middleware: false, method: undefined },
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
  const localCall = (aRequest) => b$1(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C$1(
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

export { isEqual as $, getSupabaseClient as A, wechatPayRequest as B, getTimestamp as C, generateNonceStr as D, generateJsapiPaySign as E, generateLoginScene as F, createParametricQrCode as G, getQrCodeImageUrl as H, verifyCallbackSignature as I, decryptCallback as J, buildAssetsURL as K, getResponseStatusText as L, getResponseStatus as M, defineRenderHandler as N, publicAssetsURL as O, getRouteRules as P, joinURL as Q, useNitroApp as R, parseURL as S, encodePath as T, decodePath as U, klona as V, hasProtocol as W, isScriptProtocol as X, withQuery as Y, getRequestHeader as Z, destr as _, verifyOtpSchema as a, sanitizeStatusCode as a0, getContext as a1, setCookie as a2, getCookie as a3, deleteCookie as a4, $fetch$1 as a5, baseURL as a6, defu as a7, executeAsync as a8, parseQuery as a9, withTrailingSlash as aa, withoutTrailingSlash as ab, hash$1 as ac, nodeServer as ad, wechatPay as ae, createUserSchema as b, createError$1 as c, defineEventHandler as d, deleteUserSchema as e, getSupabaseServiceClient as f, getHeader as g, getCurrentUser as h, verifyBindToken as i, getWechatUserInfo as j, sendNotification as k, loginBaseSchema as l, mapSupabaseError as m, setHeader as n, getQuery as o, passwordLoginSchema as p, generateBindToken as q, readBody as r, sendOtpSchema as s, getMethod as t, useRuntimeConfig as u, validateBody as v, readRawBody as w, parseWechatEventXml as x, getWechatPayConfig as y, generateOutTradeNo as z };
//# sourceMappingURL=nitro.mjs.map
