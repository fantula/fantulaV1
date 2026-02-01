import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, getHeader, getMethod, readRawBody, getResponseStatusText } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import crypto$1 from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.js';
import { createClient } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import destr, { destr as destr$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/errx/dist/index.js';
import { isVNode, isRef, toValue } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import { walkResolver } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/dalin/fantula/nuxt-frontend/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/dalin/fantula/nuxt-frontend","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/dalin/fantula/nuxt-frontend/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/dalin/fantula/nuxt-frontend/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/dalin/fantula/nuxt-frontend/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/dalin/fantula/nuxt-frontend/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
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

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

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
    "buildId": "dev",
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
      }
    }
  },
  "public": {
    "apiBase": "http://127.0.0.1:54321",
    "appName": "凡图拉",
    "siteUrl": "https://www.fantula.com",
    "wechatAppid": "wxc2042fae927b28b8"
  },
  "apiSecret": "",
  "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
  "supabaseServiceKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdm16Y29kYmVpam5lbWJqaWlnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMTc1OCwiZXhwIjoyMDg1NDA3NzU4fQ.5jpTpQ6OLjXiqWxGYN51E_Q5YKEbaKzq3ksbQJ9ouJY",
  "wechatPayMchid": "1716074381",
  "wechatPayAppid": "wxc2042fae927b28b8",
  "wechatPayApiV3Key": "lWm9tNYwCIDsnzhedfqz1QVvK4pmAoBb",
  "wechatPaySerialNo": "53245181B4BB24F7AC58047FED958C04057735F9",
  "wechatPayPrivateKey": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMTogoAZexax27\\nMxWMyhMfFf6Vnc1kUJMHv0FTNDddobb7kVBgEMIDtsAB/zE9M8f5cWWKfrFR0dYr\\njaMyUCJE/PO9THno6/M9W2wesjDnezP3zCVqy0/dIFsvWK+811RbBNOndGxZ+9Eg\\nNGVdukHaorFNRWjuNz8WwvnyVYnVWgP8j6Q16b+KDI6+DGhObBLxWB8VikG5Nh7I\\n9GVz8QN7XfO2SDFcE9hakkLkf+olDI4hC7PpYpOy/w54tKeuKaGifKwwsEaB1By1\\nD31t/l2IS75831cuG2u9prz5knud86JuCSgb234jUoF5BPwc1GFJDMKaTXVsi+rY\\nHDYZLgaVAgMBAAECggEAMCk/DXc6pBclHhDvvo2QLl7H8csONNyNnGDobE2903Og\\np/LcaJjqs2dsIcxfdhbzyAiEMD6nXCtD+mZcFysuuOaMKo6RmmesokUf2qiUwKyZ\\nVouoMmGVBQJwnFuiqbh06TPdFPdr51ZmONpBHvQePAToGNgI4Ubit2Hk+8xQPpua\\nrNL8ivHL0k57y6acC1qN8+vW0K9Grd3ZQeVYUxu6s7frqhucBDrn2sE3rEIHCMZL\\nEXtU/auWGw/RLE6ZusErCZ+tqybXUIrtwzDyKMJZBTaBRG6eJbd/m0xa8L4+1SU0\\nXn6FIE1E29r6NGyQ5bUvGq/Sq8T/XW3kbF98yzeuwQKBgQDv4FpemUNdnV1W8FtA\\nX40e3YqkoC//ym5JuylQJ2Nj6hExX4cA4L6ixpRjEU7urh5LgfxKREG0xcc2gBZf\\nmLUpZh5bMjK+mhW4Ckr6ZpibuTF8oIly/6xSGZDRp/s9n9JiT4lBGy6jKiv0Doy1\\n2Wh2t8p7w3IAFmxoNkpg1bjEJQKBgQDaCh5ZP9DGLN/Er1gtOECdow8zsWtvbvIi\\nk1v9achvidUt0M89Pmugw0AALfhnvZDjIN45IEnajszCnAqz5zU9UGP2TkUEaSgP\\nKRctUFVF3igV91B/C48ChzyblEBeh+5JhQpn+ZfO12pbx7d4OCbzzKY5luqmwnUu\\n2LQAzKv1sQKBgQCZocF/UP3aWU1Mv0hSZGBH4nBHm+jiFM6qHlsJYRDBD0rPqnUW\\n1NqD+ldTU+SP7aith6UEE89Zbkp213Z855sv1p2envntJVa/tqfq1AbtxaCyR0eB\\nBctiEcm03beF8nSWToaD0lr+WaYo+6CXX5UOZAwlVDoRYEsyO4NLndZmmQKBgBPg\\n7klmxwr6VmBhOCHPShzVG/Kzjz72l37NfoqJFWwN3fCyY+KKiVd71Z7ukgIrR0Vd\\n3sTIi9MwR7zKazNhtfnkFWkEU8iGKc/QCDvqYgvfqDnwdVdP33b0i3MHviKgM/ph\\n9cPq/osuGpVJjRGZ1PtPQixn9PbFLdfai/aysk7RAoGAcg4IyQkEsMwBfstMoxHc\\nv9OEvpV8I3FxVZTmcSpud/Vsn8XFNCt5L0MuFV3EEKSgB2GKAzfCVcUNORWguxFg\\nOLxc12Rz6UncsrRyGCGhetxUJpKMi1ByBqR8A6G3y7JdKUGFNt72BTa6oOZbn8HS\\nqaapcC5n2bY7cKyXTpGKUlw=\\n-----END PRIVATE KEY-----",
  "wechatPayNotifyUrl": "https://www.fantula.com/api/wechat/notify",
  "wechatAppSecret": "521970d6155d6f7ee3045f05b7cc3eb3"
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

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
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
        const query = getQuery(event.path);
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
        const query = getQuery(event.path);
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

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
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
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		// normalize to string format expected by nuxt `error.vue`
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	// remove proto/hostname/port from URL
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	// add default server message
	errorObject.message ||= "Server Error";
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
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			// TODO: Support `message` in template
			errorObject.description = errorObject.message;
		}
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
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
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
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
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

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _1y5rfsR9t5zT26cbB4ZDoPOhVnwjCp_suXcAWStJclE = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/dalin/fantula/nuxt-frontend";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持"},{"name":"keywords","content":"凡图拉,流媒体,数字产品,Netflix,Disney+,Apple TV,技术支持,社区帮助"},{"name":"author","content":"凡图拉团队"},{"name":"robots","content":"index, follow"},{"name":"googlebot","content":"index, follow"},{"name":"language","content":"zh-CN"},{"name":"revisit-after","content":"7 days"},{"property":"og:title","content":"凡图拉｜智能海外代充代付平台"},{"property":"og:description","content":"提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持"},{"property":"og:type","content":"website"},{"property":"og:site_name","content":"凡图拉"},{"property":"og:locale","content":"zh_CN"},{"property":"og:image","content":"/images/og-image.jpg"},{"property":"og:image:width","content":"1200"},{"property":"og:image:height","content":"630"},{"property":"og:url","content":"http://localhost:3000"},{"name":"twitter:card","content":"summary_large_image"},{"name":"twitter:title","content":"凡图拉｜智能海外代充代付平台"},{"name":"twitter:description","content":"提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持。"},{"name":"twitter:image","content":"/images/og-image.jpg"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"rel":"canonical","href":"http://localhost:3000"},{"rel":"alternate","hreflang":"zh-CN","href":"http://localhost:3000"},{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"dns-prefetch","href":"http://127.0.0.1:54321"}],"style":[],"script":[],"noscript":[],"title":"凡图拉｜智能海外代充代付平台"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _fy54yt5h8gnrY5ksk0ToqrUYohroiU1U2cOhUCV49Mc = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			filename,
			stack: trace
		};
		// retain log to be include in the next render
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	// Pass any logs to the client
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const plugins = [
  _1y5rfsR9t5zT26cbB4ZDoPOhVnwjCp_suXcAWStJclE,
_fy54yt5h8gnrY5ksk0ToqrUYohroiU1U2cOhUCV49Mc
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

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
      throw createError({ statusCode: 404 });
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

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
	const ssrContext = {
		url: decodePath(event.path),
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
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

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => import('file:///Users/dalin/fantula/nuxt-frontend/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => import('file:///Users/dalin/fantula/nuxt-frontend/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
// -- SSR Renderer --
const getSSRRenderer = lazyCachedFunction(async () => {
	// Load server bundle
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	// Load precomputed dependencies
	const precomputed = undefined ;
	// Create renderer
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		// In development with vite-node, the manifest is on-demand and will be available after rendering
		// eslint-disable-next-line no-restricted-globals
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});
// -- SPA Renderer --
const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
		}
	});
	// Create SPA renderer and cache the result for all requests
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
/**
* remove the root node from the html body
*/
function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		// remove teleport anchor to avoid hydration issues
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	// Render app
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	// Handle errors
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			// Do not add links to resources that are inlined (vite v5+)
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			// Add CSS links in <head> for CSS files
			// - in dev mode when rendering an island and the file has scoped styles and is not a page
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	// TODO: remove for v4
	islandHead.link ||= [];
	islandHead.style ||= [];
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
async function getIslandContext(event) {
	// TODO: Strict validation for url
	let url = event.path || "";
	const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	// TODO: Validate context
	const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
	const ctx = {
		url: "/",
		...context,
		id: hashId,
		name: componentName,
		props: destr$1(context.props) || {},
		slots: {},
		components: {}
	};
	return ctx;
}

const _lazy_dcHuVB = () => Promise.resolve().then(function () { return bindWechat_post$1; });
const _lazy_rPysyX = () => Promise.resolve().then(function () { return test$1; });
const _lazy_oZR3Aq = () => Promise.resolve().then(function () { return checkScan_get$1; });
const _lazy_ZV1bkv = () => Promise.resolve().then(function () { return eventCallback$1; });
const _lazy_jIi_6F = () => Promise.resolve().then(function () { return getOpenid_post$1; });
const _lazy_fT5JcP = () => Promise.resolve().then(function () { return jsapiPay_post$1; });
const _lazy_NZc0rV = () => Promise.resolve().then(function () { return loginQrcode_get$1; });
const _lazy_fyb9pU = () => Promise.resolve().then(function () { return nativePay_post$1; });
const _lazy_Oqk9lo = () => Promise.resolve().then(function () { return notify_post$1; });
const _lazy_6k__qZ = () => Promise.resolve().then(function () { return oauthLogin_post$1; });
const _lazy_pbVeyW = () => Promise.resolve().then(function () { return queryOrder_post$1; });
const _lazy_8EFkQE = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _2qpWSd, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/bind-wechat', handler: _lazy_dcHuVB, lazy: true, middleware: false, method: "post" },
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
    debug: destr(true),
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
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
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

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = crypto$1.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"version": "",
	"status": 500,
	"statusText": "Server error",
	"description": "This page is temporarily unavailable."
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0\" name=\"viewport\"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);filter:blur(20vh)}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.-bottom-1\\/2{bottom:-50%}.left-0{left:0}.right-0{right:0}.grid{display:grid}.mb-16{margin-bottom:4rem}.mb-8{margin-bottom:2rem}.h-1\\/2{height:50%}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-8{padding-left:2rem;padding-right:2rem}.text-center{text-align:center}.text-8xl{font-size:6rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:px-0{padding-left:0;padding-right:0}.sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}}</style><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script></head><body class=\"antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black\"><div class=\"-bottom-1/2 fixed h-1/2 left-0 right-0 spotlight\"></div><div class=\"max-w-520px text-center\"><h1 class=\"font-medium mb-8 sm:text-10xl text-8xl\">" + escapeHtml(messages.status) + "</h1><p class=\"font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

function getSupabaseClient(event) {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.apiBase || "http://127.0.0.1:54321";
  const supabaseKey = String(config.supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0");
  const authHeader = getHeader(event, "authorization");
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: authHeader ? { Authorization: authHeader } : {}
    }
  });
}
function getSupabaseServiceClient() {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.apiBase || "http://127.0.0.1:54321";
  const serviceKey = String(config.supabaseServiceKey || config.supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU");
  return createClient(supabaseUrl, serviceKey);
}
async function getCurrentUser(event) {
  const supabase = getSupabaseClient(event);
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return null;
  }
  return user;
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

const bindWechat_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const supabase = getSupabaseServiceClient();
    const currentUser = await getCurrentUser(event);
    if (currentUser && body.wechatCode) {
      return await bindWechatToExistingUser(supabase, currentUser.id, body.wechatCode);
    }
    if (!body.bindToken) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u7ED1\u5B9A\u51ED\u8BC1"
      });
    }
    const tokenResult = verifyBindToken(body.bindToken);
    if (!tokenResult.valid || !tokenResult.openid) {
      throw createError({
        statusCode: 400,
        message: tokenResult.error || "\u7ED1\u5B9A\u51ED\u8BC1\u65E0\u6548\u6216\u5DF2\u8FC7\u671F"
      });
    }
    const openid = tokenResult.openid;
    if (!body.email) {
      throw createError({
        statusCode: 400,
        message: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740"
      });
    }
    if (!body.code) {
      throw createError({
        statusCode: 400,
        message: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
      });
    }
    const { data: existingProfile } = await supabase.from("profiles").select("id, email").eq("wechat_openid", openid).single();
    if (existingProfile) {
      throw createError({
        statusCode: 400,
        message: "\u6B64\u5FAE\u4FE1\u5DF2\u7ED1\u5B9A\u5176\u4ED6\u8D26\u53F7"
      });
    }
    const { createClient } = await import('file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs');
    const config = useRuntimeConfig();
    const anonClient = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey
    );
    const { data: authData, error: verifyError } = await anonClient.auth.verifyOtp({
      email: body.email,
      token: body.code,
      type: "email"
    });
    if (verifyError) {
      throw createError({
        statusCode: 400,
        message: verifyError.message || "\u9A8C\u8BC1\u7801\u9519\u8BEF\u6216\u5DF2\u8FC7\u671F"
      });
    }
    if (!authData.user) {
      throw createError({
        statusCode: 500,
        message: "\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
      });
    }
    if (body.password) {
      await anonClient.auth.updateUser({
        password: body.password
      });
    }
    const { error: updateError } = await supabase.from("profiles").update({
      wechat_openid: openid
    }).eq("id", authData.user.id);
    if (updateError) {
      console.error("[BindWechat] Update profile failed:", updateError);
      throw createError({
        statusCode: 500,
        message: "\u7ED1\u5B9A\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
      });
    }
    console.log("[BindWechat] Successfully bound:", { userId: authData.user.id, openid });
    return {
      success: true,
      message: "\u7ED1\u5B9A\u6210\u529F",
      data: {
        user: authData.user,
        session: authData.session
      }
    };
  } catch (err) {
    console.error("[BindWechat] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u7ED1\u5B9A\u5931\u8D25"
    });
  }
});
async function bindWechatToExistingUser(supabase, userId, wechatCode) {
  const { getWechatPayConfig } = await Promise.resolve().then(function () { return wechatPay; });
  const config = getWechatPayConfig();
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appSecret}&code=${wechatCode}&grant_type=authorization_code`;
  const response = await fetch(url);
  const result = await response.json();
  if (result.errcode || !result.openid) {
    throw createError({
      statusCode: 400,
      message: result.errmsg || "\u5FAE\u4FE1\u6388\u6743\u5931\u8D25"
    });
  }
  const { data: existingProfile } = await supabase.from("profiles").select("id").eq("wechat_openid", result.openid).single();
  if (existingProfile && existingProfile.id !== userId) {
    throw createError({
      statusCode: 400,
      message: "\u6B64\u5FAE\u4FE1\u5DF2\u7ED1\u5B9A\u5176\u4ED6\u8D26\u53F7"
    });
  }
  const { error } = await supabase.from("profiles").update({
    wechat_openid: result.openid
  }).eq("id", userId);
  if (error) {
    throw createError({
      statusCode: 500,
      message: "\u7ED1\u5B9A\u5931\u8D25"
    });
  }
  return {
    success: true,
    message: "\u5FAE\u4FE1\u7ED1\u5B9A\u6210\u529F",
    data: {
      openid: result.openid
    }
  };
}

const bindWechat_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: bindWechat_post
}, Symbol.toStringTag, { value: 'Module' }));

const test = defineEventHandler(async (event) => {
  return { message: "API is working!", timestamp: (/* @__PURE__ */ new Date()).toISOString() };
});

const test$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: test
}, Symbol.toStringTag, { value: 'Module' }));

const checkScan_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const sceneStr = query.scene;
    if (!sceneStr) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11 scene \u53C2\u6570"
      });
    }
    const supabase = getSupabaseServiceClient();
    const { data: session, error } = await supabase.from("wechat_login_sessions").select("*").eq("scene_str", sceneStr).single();
    if (error || !session) {
      return {
        success: true,
        data: {
          status: "expired",
          message: "\u4F1A\u8BDD\u4E0D\u5B58\u5728\u6216\u5DF2\u8FC7\u671F"
        }
      };
    }
    if (new Date(session.expires_at) < /* @__PURE__ */ new Date()) {
      return {
        success: true,
        data: {
          status: "expired",
          message: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u5237\u65B0"
        }
      };
    }
    if (session.status === "waiting") {
      return {
        success: true,
        data: {
          status: "waiting",
          message: "\u7B49\u5F85\u626B\u7801"
        }
      };
    }
    if (session.status === "scanned" && session.openid) {
      const { data: profile } = await supabase.from("profiles").select("id, email, nickname").eq("wechat_openid", session.openid).single();
      if (profile) {
        return {
          success: true,
          data: {
            status: "logged_in",
            message: "\u767B\u5F55\u6210\u529F",
            userId: profile.id,
            email: profile.email,
            nickname: profile.nickname
          }
        };
      } else {
        const bindToken = generateBindToken(session.openid);
        return {
          success: true,
          data: {
            status: "need_bind",
            message: "\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55",
            bindToken
          }
        };
      }
    }
    if (session.status === "bound") {
      return {
        success: true,
        data: {
          status: "bound",
          message: "\u7ED1\u5B9A\u5B8C\u6210"
        }
      };
    }
    return {
      success: true,
      data: {
        status: session.status,
        message: "\u672A\u77E5\u72B6\u6001"
      }
    };
  } catch (err) {
    console.error("[CheckScan] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u67E5\u8BE2\u72B6\u6001\u5931\u8D25"
    });
  }
});

const checkScan_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: checkScan_get
}, Symbol.toStringTag, { value: 'Module' }));

const eventCallback = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method === "GET") {
    const query = getQuery$1(event);
    const echostr = query.echostr;
    console.log("[WechatCallback] URL verification, echostr:", echostr);
    return echostr || "ok";
  }
  try {
    const rawBody = await readRawBody(event) || "";
    console.log("[WechatCallback] Received event:", rawBody.substring(0, 200));
    const eventData = parseWechatEventXml(rawBody);
    console.log("[WechatCallback] Parsed event:", eventData);
    const msgType = eventData.MsgType;
    const eventType = eventData.Event;
    const fromUser = eventData.FromUserName;
    const eventKey = eventData.EventKey;
    if (msgType !== "event") {
      return "success";
    }
    if (eventType === "SCAN" || eventType === "subscribe") {
      let sceneStr = eventKey;
      if (eventType === "subscribe" && (eventKey == null ? void 0 : eventKey.startsWith("qrscene_"))) {
        sceneStr = eventKey.replace("qrscene_", "");
      }
      if (!sceneStr || !sceneStr.startsWith("login_")) {
        console.log("[WechatCallback] Not a login scan, ignoring");
        return "success";
      }
      console.log("[WechatCallback] Login scan detected:", { sceneStr, openid: fromUser });
      const supabase = getSupabaseServiceClient();
      const { error } = await supabase.from("wechat_login_sessions").update({
        openid: fromUser,
        status: "scanned"
      }).eq("scene_str", sceneStr).eq("status", "waiting");
      if (error) {
        console.error("[WechatCallback] Update session failed:", error);
      } else {
        console.log("[WechatCallback] Session updated to scanned");
      }
    }
    return "success";
  } catch (err) {
    console.error("[WechatCallback] Error:", err);
    return "success";
  }
});

const eventCallback$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: eventCallback
}, Symbol.toStringTag, { value: 'Module' }));

const getOpenid_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u767B\u5F55"
      });
    }
    const body = await readBody(event);
    const { code } = body;
    if (!code) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u6388\u6743 code"
      });
    }
    const config = getWechatPayConfig();
    if (!config.appid || !config.appSecret) {
      throw createError({
        statusCode: 500,
        message: "\u5FAE\u4FE1\u914D\u7F6E\u9519\u8BEF"
      });
    }
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.errcode) {
      console.error("[GetOpenId] WeChat API error:", result);
      throw createError({
        statusCode: 400,
        message: result.errmsg || "\u83B7\u53D6 OpenID \u5931\u8D25"
      });
    }
    console.log("[GetOpenId] Got openid:", result.openid);
    const supabase = getSupabaseServiceClient();
    await supabase.from("profiles").update({
      wechat_openid: result.openid,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", user.id);
    return {
      success: true,
      data: {
        openid: result.openid
      }
    };
  } catch (err) {
    console.error("[GetOpenId] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u83B7\u53D6 OpenID \u5931\u8D25"
    });
  }
});

const getOpenid_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: getOpenid_post
}, Symbol.toStringTag, { value: 'Module' }));

const jsapiPay_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u767B\u5F55"
      });
    }
    const body = await readBody(event);
    const { amount, openid, description } = body;
    if (!amount || amount <= 0) {
      throw createError({
        statusCode: 400,
        message: "\u5145\u503C\u91D1\u989D\u5FC5\u987B\u5927\u4E8E0"
      });
    }
    if (!openid) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11 OpenID"
      });
    }
    const config = getWechatPayConfig();
    if (!config.mchid || !config.privateKey) {
      throw createError({
        statusCode: 500,
        message: "\u652F\u4ED8\u914D\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"
      });
    }
    const outTradeNo = generateOutTradeNo("JSAPI");
    const amountInCents = Math.round(amount * 100);
    const supabase = getSupabaseClient(event);
    await supabase.from("recharge_orders").insert({
      out_trade_no: outTradeNo,
      user_id: user.id,
      amount,
      amount_cents: amountInCents,
      status: "pending",
      pay_type: "wechat_jsapi",
      description: description || `\u5145\u503C${amount}\u70B9`,
      payer_openid: openid,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    const requestBody = {
      appid: config.appid,
      mchid: config.mchid,
      description: description || `\u51E1\u56FE\u62C9-\u5145\u503C${amount}\u70B9`,
      out_trade_no: outTradeNo,
      notify_url: config.notifyUrl,
      amount: {
        total: amountInCents,
        currency: "CNY"
      },
      payer: {
        openid
      },
      attach: JSON.stringify({ userId: user.id, type: "recharge" })
    };
    console.log("[JsapiPay] Request:", JSON.stringify(requestBody, null, 2));
    const result = await wechatPayRequest(
      "POST",
      "/v3/pay/transactions/jsapi",
      requestBody,
      config
    );
    const timeStamp = String(getTimestamp());
    const nonceStr = generateNonceStr();
    const paySign = generateJsapiPaySign(
      config.appid,
      timeStamp,
      nonceStr,
      result.prepay_id,
      config.privateKey
    );
    return {
      success: true,
      data: {
        appId: config.appid,
        timeStamp,
        nonceStr,
        package: `prepay_id=${result.prepay_id}`,
        signType: "RSA",
        paySign,
        out_trade_no: outTradeNo,
        amount
      }
    };
  } catch (err) {
    console.error("[JsapiPay] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u652F\u4ED8\u4E0B\u5355\u5931\u8D25"
    });
  }
});

const jsapiPay_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: jsapiPay_post
}, Symbol.toStringTag, { value: 'Module' }));

const loginQrcode_get = defineEventHandler(async (event) => {
  try {
    const sceneStr = generateLoginScene();
    const qrResult = await createParametricQrCode(sceneStr, 300);
    const supabase = getSupabaseServiceClient();
    const expiresAt = new Date(Date.now() + 300 * 1e3).toISOString();
    const { error: insertError } = await supabase.from("wechat_login_sessions").insert({
      scene_str: sceneStr,
      ticket: qrResult.ticket,
      status: "waiting",
      expires_at: expiresAt
    });
    if (insertError) {
      console.error("[LoginQrCode] Insert session failed:", insertError);
      throw createError({
        statusCode: 500,
        message: "\u521B\u5EFA\u767B\u5F55\u4F1A\u8BDD\u5931\u8D25"
      });
    }
    return {
      success: true,
      data: {
        sceneStr,
        ticket: qrResult.ticket,
        qrcodeUrl: getQrCodeImageUrl(qrResult.ticket),
        expiresIn: qrResult.expireSeconds
      }
    };
  } catch (err) {
    console.error("[LoginQrCode] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u751F\u6210\u4E8C\u7EF4\u7801\u5931\u8D25"
    });
  }
});

const loginQrcode_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: loginQrcode_get
}, Symbol.toStringTag, { value: 'Module' }));

const nativePay_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u767B\u5F55"
      });
    }
    const body = await readBody(event);
    const { amount, bonus = 0, description } = body;
    if (!amount || amount <= 0) {
      throw createError({
        statusCode: 400,
        message: "\u5145\u503C\u91D1\u989D\u5FC5\u987B\u5927\u4E8E0"
      });
    }
    const config = getWechatPayConfig();
    if (!config.mchid || !config.privateKey) {
      console.error("[NativePay] Missing WeChat Pay config");
      throw createError({
        statusCode: 500,
        message: "\u652F\u4ED8\u914D\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"
      });
    }
    const outTradeNo = generateOutTradeNo("RECHARGE");
    const amountInCents = Math.round(amount * 100);
    const supabase = getSupabaseClient(event);
    const { error: insertError } = await supabase.from("recharge_orders").insert({
      out_trade_no: outTradeNo,
      user_id: user.id,
      amount,
      bonus,
      // 赠送金额
      amount_cents: amountInCents,
      status: "pending",
      pay_type: "wechat_native",
      description: description || `\u5145\u503C${amount}\u70B9`,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (insertError) {
      console.error("[NativePay] Failed to create order:", insertError);
      if (!insertError.message.includes("does not exist")) {
        throw insertError;
      }
    }
    const requestBody = {
      appid: config.appid,
      mchid: config.mchid,
      description: description || `\u51E1\u56FE\u62C9-\u5145\u503C${amount}\u70B9`,
      out_trade_no: outTradeNo,
      notify_url: config.notifyUrl,
      amount: {
        total: amountInCents,
        currency: "CNY"
      },
      attach: JSON.stringify({ userId: user.id, type: "recharge", bonus })
    };
    console.log("[NativePay] Request:", JSON.stringify(requestBody, null, 2));
    const result = await wechatPayRequest(
      "POST",
      "/v3/pay/transactions/native",
      requestBody,
      config
    );
    console.log("[NativePay] Response:", result);
    return {
      success: true,
      data: {
        code_url: result.code_url,
        out_trade_no: outTradeNo,
        amount
      }
    };
  } catch (err) {
    console.error("[NativePay] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u652F\u4ED8\u4E0B\u5355\u5931\u8D25"
    });
  }
});

const nativePay_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: nativePay_post
}, Symbol.toStringTag, { value: 'Module' }));

const notify_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const timestamp = getHeader(event, "Wechatpay-Timestamp") || "";
    const nonce = getHeader(event, "Wechatpay-Nonce") || "";
    const signature = getHeader(event, "Wechatpay-Signature") || "";
    const rawBody = await readRawBody(event);
    const body = JSON.parse(rawBody || "{}");
    console.log("[Notify] Received notification:", body.event_type, body.id);
    const isValid = verifyCallbackSignature(
      timestamp,
      nonce,
      rawBody || "",
      signature,
      ""
    );
    if (!isValid) ;
    if (body.event_type !== "TRANSACTION.SUCCESS") {
      return { code: "SUCCESS", message: "\u975E\u652F\u4ED8\u6210\u529F\u4E8B\u4EF6" };
    }
    const config = getWechatPayConfig();
    const decryptedStr = decryptCallback(
      body.resource.ciphertext,
      body.resource.nonce,
      body.resource.associated_data,
      config.apiV3Key
    );
    const payment = JSON.parse(decryptedStr);
    console.log("[Notify] Decrypted payment:", payment.out_trade_no, payment.trade_state);
    let attach = {};
    try {
      attach = JSON.parse(payment.attach || "{}");
    } catch (e) {
      console.error("[Notify] Failed to parse attach:", payment.attach);
    }
    if (!attach.userId) {
      console.error("[Notify] Missing userId in attach");
      return { code: "FAIL", message: "\u7F3A\u5C11\u7528\u6237ID" };
    }
    const supabase = getSupabaseServiceClient();
    const { data: order, error: orderError } = await supabase.from("recharge_orders").select("*").eq("out_trade_no", payment.out_trade_no).single();
    if (orderError || !order) {
      console.error("[Notify] Order not found:", payment.out_trade_no);
      return { code: "FAIL", message: "\u8BA2\u5355\u4E0D\u5B58\u5728" };
    }
    if (order.status === "paid") {
      console.log("[Notify] Order already processed:", payment.out_trade_no);
      return { code: "SUCCESS", message: "\u5DF2\u5904\u7406" };
    }
    await supabase.from("recharge_orders").update({
      status: "paid",
      transaction_id: payment.transaction_id,
      payer_openid: (_a = payment.payer) == null ? void 0 : _a.openid,
      paid_at: payment.success_time,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("out_trade_no", payment.out_trade_no);
    const { data: profile } = await supabase.from("profiles").select("balance").eq("id", attach.userId).single();
    if (profile) {
      const currentBalance = profile.balance || 0;
      const bonus = order.bonus || attach.bonus || 0;
      const totalAmount = order.amount + bonus;
      const newBalance = currentBalance + totalAmount;
      await supabase.from("profiles").update({
        balance: newBalance,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", attach.userId);
      await supabase.from("wallet_transactions").insert({
        user_id: attach.userId,
        type: "\u5FAE\u4FE1\u5145\u503C",
        amount: totalAmount,
        balance_after: newBalance,
        description: `\u5FAE\u4FE1\u652F\u4ED8\u5145\u503C ${order.amount.toFixed(2)}\u70B9 \u8D60\u9001${bonus.toFixed(2)}\u70B9`,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      console.log(`[Notify] Success: User ${attach.userId} recharged ${totalAmount} (amount: ${order.amount}, bonus: ${bonus})`);
    }
    return { code: "SUCCESS", message: "\u6210\u529F" };
  } catch (err) {
    console.error("[Notify] Error:", err);
    return { code: "FAIL", message: err.message || "\u5904\u7406\u5931\u8D25" };
  }
});

const notify_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notify_post
}, Symbol.toStringTag, { value: 'Module' }));

const oauthLogin_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { code } = body;
    if (!code) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u6388\u6743 code"
      });
    }
    const config = getWechatPayConfig();
    if (!config.appid || !config.appSecret) {
      throw createError({
        statusCode: 500,
        message: "\u5FAE\u4FE1\u914D\u7F6E\u9519\u8BEF"
      });
    }
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.errcode || !result.openid) {
      console.error("[OAuthLogin] WeChat API error:", result);
      throw createError({
        statusCode: 400,
        message: result.errmsg || "\u5FAE\u4FE1\u6388\u6743\u5931\u8D25"
      });
    }
    const openid = result.openid;
    console.log("[OAuthLogin] Got openid:", openid);
    const supabase = getSupabaseServiceClient();
    const { data: profile } = await supabase.from("profiles").select("id, email, nickname").eq("wechat_openid", openid).single();
    if (profile) {
      return {
        success: true,
        data: {
          status: "logged_in",
          message: "\u767B\u5F55\u6210\u529F",
          userId: profile.id,
          email: profile.email,
          nickname: profile.nickname,
          openid
        }
      };
    } else {
      const bindToken = generateBindToken(openid);
      return {
        success: true,
        data: {
          status: "need_bind",
          message: "\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55",
          bindToken
        }
      };
    }
  } catch (err) {
    console.error("[OAuthLogin] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u767B\u5F55\u5931\u8D25"
    });
  }
});

const oauthLogin_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: oauthLogin_post
}, Symbol.toStringTag, { value: 'Module' }));

const queryOrder_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u767B\u5F55"
      });
    }
    const body = await readBody(event);
    const { out_trade_no } = body;
    if (!out_trade_no) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u8BA2\u5355\u53F7"
      });
    }
    const supabase = getSupabaseClient(event);
    const { data: order, error: orderError } = await supabase.from("recharge_orders").select("*").eq("out_trade_no", out_trade_no).eq("user_id", user.id).single();
    if (orderError || !order) {
      throw createError({
        statusCode: 404,
        message: "\u8BA2\u5355\u4E0D\u5B58\u5728"
      });
    }
    if (order.status === "paid") {
      return {
        success: true,
        data: {
          trade_state: "SUCCESS",
          trade_state_desc: "\u652F\u4ED8\u6210\u529F",
          out_trade_no,
          amount: order.amount,
          paid: true
        }
      };
    }
    const config = getWechatPayConfig();
    const path = `/v3/pay/transactions/out-trade-no/${out_trade_no}?mchid=${config.mchid}`;
    console.log("[QueryOrder] Querying:", out_trade_no);
    const result = await wechatPayRequest(
      "GET",
      path,
      null,
      config
    );
    console.log("[QueryOrder] Result:", result.trade_state);
    if (result.trade_state === "SUCCESS" && order.status !== "paid") {
      const supabaseService = getSupabaseServiceClient();
      await supabaseService.from("recharge_orders").update({
        status: "paid",
        transaction_id: result.transaction_id,
        paid_at: result.success_time,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("out_trade_no", out_trade_no);
      const { data: profile } = await supabaseService.from("profiles").select("balance").eq("id", user.id).single();
      if (profile) {
        const currentBalance = profile.balance || 0;
        const bonus = order.bonus || 0;
        const totalAmount = order.amount + bonus;
        const newBalance = currentBalance + totalAmount;
        await supabaseService.from("profiles").update({
          balance: newBalance,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", user.id);
        await supabaseService.from("wallet_transactions").insert({
          user_id: user.id,
          type: "\u5FAE\u4FE1\u5145\u503C",
          amount: totalAmount,
          balance_after: newBalance,
          description: `\u5FAE\u4FE1\u652F\u4ED8\u5145\u503C ${order.amount.toFixed(2)}\u70B9 \u8D60\u9001${bonus.toFixed(2)}\u70B9`,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
    }
    return {
      success: true,
      data: {
        trade_state: result.trade_state,
        trade_state_desc: result.trade_state_desc,
        out_trade_no,
        transaction_id: result.transaction_id,
        amount: order.amount,
        paid: result.trade_state === "SUCCESS"
      }
    };
  } catch (err) {
    console.error("[QueryOrder] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u67E5\u8BE2\u5931\u8D25"
    });
  }
});

const queryOrder_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: queryOrder_post
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"]) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? stringify(opts.data, opts.ssrContext["~payloadReducers"]) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const renderer = defineRenderHandler(async (event) => {
	const nitroApp = useNitroApp();
	// Whether we're rendering an error page
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	// Initialize ssr context
	const ssrContext = createSSRContext(event);
	// needed for hash hydration plugin to work
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			// eslint-disable-next-line @typescript-eslint/no-deprecated
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		setSSRError(ssrContext, ssrError);
	}
	// Get route options (for `ssr: false`, `isr`, `cache` and `noScripts`)
	const routeOptions = getRouteRules(event);
	// Whether we are prerendering route or using ISR/SWR caching
	const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (_PAYLOAD_EXTRACTION || routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
		ssrContext.url = url;
		event._path = event.node.req.url = url;
	}
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(ssrContext.runtimeConfig.app.cdnURL || ssrContext.runtimeConfig.app.baseURL, ssrContext.url.replace(/\?.*$/, ""), PAYLOAD_FILENAME) + "?" + ssrContext.runtimeConfig.app.buildId : undefined;
	// Render app
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		// We use error to bypass full render if we have an early response we can make
		// TODO: remove _renderResponse in nuxt v5
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		// Use explicitly thrown error in preference to subsequent rendering errors
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	// Render inline styles
	// TODO: remove _renderResponse in nuxt v5
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		// TODO: remove _renderResponse in nuxt v5
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	// Handle errors
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	// Directly render payload routes
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	// Setup head
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	// 1. Preload payloads and app manifest
	if (_PAYLOAD_EXTRACTION && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			crossorigin: "anonymous",
			href: payloadURL
		} ] }, headEntryOptions);
	}
	if (ssrContext["~preloadManifest"] && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			fetchpriority: "low",
			crossorigin: "anonymous",
			href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`)
		}] }, {
			...headEntryOptions,
			tagPriority: "low"
		});
	}
	// 2. Styles
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		// Do not add links to resources that are inlined (vite v5+)
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		// Add CSS links in <head> for CSS files
		// - in production
		// - in dev mode when not rendering an island
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		// 4. Resource Hints
		// Remove lazy hydrated modules from ssrContext.modules so they don't get preloaded
		// (CSS links are already added above, this only affects JS preloads)
		if (ssrContext["~lazyHydratedModules"]) {
			for (const id of ssrContext["~lazyHydratedModules"]) {
				ssrContext.modules?.delete(id);
			}
		}
		// TODO: add priorities based on Capo
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		// 5. Payloads
		ssrContext.head.push({ script: _PAYLOAD_EXTRACTION ? renderPayloadJsonScript({
			ssrContext,
			data: splitPayload(ssrContext).initial,
			src: payloadURL
		})  : renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  }, {
			...headEntryOptions,
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	// 6. Scripts
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	// Create render context
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	// Allow hooking into the rendered result
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	// Construct HTML response
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
});
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
