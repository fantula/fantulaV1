import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, getRequestProtocol, getRequestHost, setHeader, getHeader, getResponseStatus, lazyEventHandler, useBase, createApp, createRouter as createRouter$1, toNodeListener, getRouterParam, getMethod, readRawBody, getResponseStatusText } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve as resolve$1, dirname, join } from 'node:path';
import crypto$1 from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.js';
import { createClient } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import { z } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, hasProtocol, withHttps, withoutTrailingSlash, withTrailingSlash, decodePath, withLeadingSlash, joinRelativeURL, withBase, parsePath, stringifyQuery, parseQuery, encodePath, stringifyParsedURL } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import destr, { destr as destr$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import defu, { defuFn, defu as defu$1, createDefu } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { createConsola, consola as consola$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/source-map/source-map.js';
import devalue from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@nuxt/devalue/dist/devalue.mjs';
import { toValue, isVNode, isRef } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/errx/dist/index.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$2, isAbsolute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import { walkResolver } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import { XMLParser } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';

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
        "robots": "noindex",
        "headers": {
          "X-Robots-Tag": "noindex"
        }
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
    "cacheMaxAgeSeconds": 0,
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
        "env": "development"
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
      "dir": [
        "/Users/dalin/fantula/nuxt-frontend/public"
      ]
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

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config$1.nitro.routeRules })
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
        frame.fileName = resolve$1(dirname(frame.fileName), originalPosition.source);
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

const logger$2 = /* @__PURE__ */ createConsola({
  defaults: {
    tag: "nuxt-site-config"
  }
});

function getSiteConfig(e, _options) {
  if (!e.context._initedSiteConfig) {
    logger$2.warn("Site config has not been initialized yet. If you're trying to access site config in a server middleware then this not yet supported. See https://github.com/harlan-zw/nuxt-seo/issues/397");
  }
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu$1(_options, useRuntimeConfig(e)["nuxt-site-config"], { debug: false });
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
createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
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

const rootDir = "/Users/dalin/fantula/nuxt-frontend";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持"},{"name":"keywords","content":"凡图拉,流媒体,数字产品,Netflix,Disney+,Apple TV,技术支持,社区帮助"},{"name":"author","content":"凡图拉团队"},{"name":"robots","content":"index, follow"},{"name":"googlebot","content":"index, follow"},{"name":"language","content":"zh-CN"},{"name":"revisit-after","content":"7 days"},{"property":"og:title","content":"凡图拉｜智能海外代充代付平台"},{"property":"og:description","content":"提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持"},{"property":"og:type","content":"website"},{"property":"og:site_name","content":"凡图拉"},{"property":"og:locale","content":"zh_CN"},{"property":"og:image","content":"/images/og-image.jpg"},{"property":"og:image:width","content":"1200"},{"property":"og:image:height","content":"630"},{"property":"og:url","content":"https://www.fantula.com"},{"name":"twitter:card","content":"summary_large_image"},{"name":"twitter:title","content":"凡图拉｜智能海外代充代付平台"},{"name":"twitter:description","content":"提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持。"},{"name":"twitter:image","content":"/images/og-image.jpg"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"rel":"canonical","href":"https://www.fantula.com"},{"rel":"alternate","hreflang":"zh-CN","href":"https://www.fantula.com"},{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"dns-prefetch","href":"https://www.fantula.com"}],"style":[{"innerHTML":"html, body { background-color: #020617 !important; }"},{"innerHTML":"@media (max-width: 768px) { .app-wrapper { display: none !important; } }"}],"script":[],"noscript":[],"title":"凡图拉｜智能海外代充代付平台"};

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
_mZNsXmtfF43G05db5E7lnFrvESG8Xgqt4t4joSasPRc,
_nM0M79OmNj5ses6jqX12vkPkw5GMoSsYizdVQJTVA,
_fy54yt5h8gnrY5ksk0ToqrUYohroiU1U2cOhUCV49Mc
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$2(serverDir, assets[id].path))
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
		url: event.path,
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

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),o=new Proxy(r,{get(e,s){return i()[s]??r[s]},has(e,s){const E=i();return s in E||s in r},set(e,s,E){const B=i(true);return B[s]=E,true},deleteProperty(e,s){if(!s)return  false;const E=i(true);return delete E[s],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",f=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CLOUDFLARE_WORKERS","WORKERS_CI",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["CODESANDBOX","CODESANDBOX_HOST",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function b(){if(globalThis.process?.env)for(const e of f){const s=e[1]||e[0];if(globalThis.process?.env[s])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=b();l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(o.CI)||l.ci!==false,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(o.DEBUG);const a=t==="test"||n(o.TEST),h=t==="dev"||t==="development";n(o.MINIMAL)||T||a||!R;const A=/^win/i.test(I);!n(o.NO_COLOR)&&(n(o.FORCE_COLOR)||(R||A)&&o.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const W=globalThis.process||Object.create(null),_={versions:{}};new Proxy(W,{get(e,s){if(s==="env")return o;if(s in e)return e[s];if(s in _)return _[s]}});const O=globalThis.process?.release?.name==="node",c=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,L=!!globalThis.fastly,S=!!globalThis.Netlify,u=!!globalThis.EdgeRuntime,N=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[u,"edge-light"],[N,"workerd"],[L,"fastly"],[D,"deno"],[c,"bun"],[O,"node"]];function G(){const e=F.find(s=>s[0]);if(e)return {name:e[1]}}const P=G();P?.name||"";

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
    isDev: true,
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

const __zAMVZ = eventHandler(async (e) => {
  const siteConfig = getSiteConfig(e);
  const nitroOrigin = getNitroOrigin(e);
  const runtimeConfig = useRuntimeConfig(e);
  const stack = e.context.siteConfig.stack;
  setHeader(e, "Content-Type", "application/json");
  return {
    config: siteConfig,
    stack,
    nitroOrigin,
    version: runtimeConfig["nuxt-site-config"].version
  };
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
  const query = getQuery$1(e);
  const hints = [];
  const { groups, debug } = useRuntimeConfigNuxtRobots(e);
  let indexable = getSiteIndexable(e);
  const queryIndexableEnabled = String(query.mockProductionEnv) === "true" || query.mockProductionEnv === "";
  {
    const { _context } = getSiteConfig(e, { debug: debug || true });
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
  const { indexable, hints } = getSiteRobotConfig(e);
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
  if (hints.length) {
    robotsTxt += `
# DEVELOPMENT HINTS:
# - ${hints.join("\n# - ")}
`;
  }
  if (credits) {
    robotsTxt = [
      `# START nuxt-robots (${indexable ? "indexable" : "indexing disabled"})`,
      robotsTxt,
      "# END nuxt-robots"
    ].filter(Boolean).join("\n");
  }
  setHeader(e, "Content-Type", "text/plain; charset=utf-8");
  setHeader(e, "Cache-Control", "no-store" );
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
    createRouter({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu$1({}, ..._routeRulesMatcher.matchAll(
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
    const robotConfig = getPathRobotConfig(e, { skipSiteIndexable: Boolean(getQuery$1(e)?.mockProductionEnv) });
    if (header) {
      setHeader(e, "X-Robots-Tag", robotConfig.rule);
    }
    e.context.robots = robotConfig;
    {
      const productionRobotConfig = getPathRobotConfig(e, { skipSiteIndexable: true });
      setHeader(e, "X-Robots-Production", productionRobotConfig.rule);
      e.context.robotsProduction = productionRobotConfig;
    }
  }
});

const _eVFmdM = defineEventHandler(async (e) => {
  const runtimeConfig = useRuntimeConfigNuxtRobots(e);
  const { indexable, hints } = getSiteRobotConfig(e);
  const siteConfig = useSiteConfig(e);
  const robotsTxt = await e.$fetch("/robots.txt", {
    query: getQuery$1(e)
  });
  return {
    robotsTxt,
    indexable,
    hints,
    runtimeConfig,
    siteConfig: {
      url: siteConfig.url,
      env: siteConfig.env,
      indexable: siteConfig.indexable
    }
  };
});

const _xgQB1Y = defineEventHandler(async (e) => {
  const query = getQuery$1(e);
  const path = query.path;
  const isMockProduction = Boolean(query.mockProductionEnv);
  delete query.path;
  let robotsHeader = null;
  let robotsContent = null;
  let robotsHint = null;
  const res = await $fetch.raw(withQuery(path, query)).catch(() => null);
  if (res) {
    const html = res._data;
    robotsHeader = String(res.headers.get("x-robots-tag"));
    if (isMockProduction) {
      const productionHeader = res.headers.get("x-robots-production");
      if (productionHeader) {
        robotsHeader = String(productionHeader);
      }
      const productionMeta = String(html).match(/<meta[^>]+name=["']robots["'][^>]+data-production-content=["']([^"']+)["'](?:[^>]+data-hint=["']([^"']+)["'])?[^>]*>/i);
      if (productionMeta) {
        [, robotsContent = null, robotsHint = null] = productionMeta;
      }
    }
    if (!robotsContent) {
      const robotsMeta = String(html).match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'](?:[^>]+data-hint=["']([^"']+)["'])?[^>]*>/i);
      if (robotsMeta) {
        [, robotsContent = null, robotsHint = null] = robotsMeta;
      }
    }
  }
  if (!robotsContent) {
    const robotConfig = getPathRobotConfig(e, {
      path,
      skipSiteIndexable: isMockProduction
    });
    robotsContent = robotConfig.rule;
    robotsHint = robotConfig.debug?.source || null;
    if (!robotsHeader) {
      robotsHeader = robotConfig.rule;
    }
  }
  const [source, line] = robotsHint ? robotsHint.split(",") : [null, null];
  return {
    rule: robotsContent,
    indexable: !(robotsContent?.includes("noindex") && robotsHeader?.includes("noindex")),
    crawlable: !(source === "/robots.txt"),
    path,
    debug: {
      source,
      line
    },
    robotsHeader,
    robotsContent
  };
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
  const excludeMatcher = excludeStrings.length > 0 ? toRouteMatcher(createRouter({
    routes: Object.fromEntries(excludeStrings.map((r) => [r, true])),
    strictTrailingSlash: false
  })) : null;
  const includeMatcher = includeStrings.length > 0 ? toRouteMatcher(createRouter({
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
  const { XMLParser } = await import('file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js');
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
    const mergedHeaders = defu$1(
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
  const m = await Promise.resolve().then(function () { return globalSources; });
  return [...m.sources];
}
async function childSitemapSources(definition) {
  if (!definition?._hasSourceChunk)
    return [];
  const m = await Promise.resolve().then(function () { return childSources; });
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

const VALID_CHANGEFREQ = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
function validateSitemapUrl(url) {
  if (typeof url === "string")
    return [];
  const warnings = [];
  if (url.lastmod) {
    const d = typeof url.lastmod === "string" ? url.lastmod : void 0;
    if (d && !isValidW3CDate(d))
      warnings.push(`lastmod "${d}" is not a valid W3C date`);
  }
  if (url.changefreq && !VALID_CHANGEFREQ.includes(url.changefreq))
    warnings.push(`changefreq "${url.changefreq}" is not valid (expected: always|hourly|daily|weekly|monthly|yearly|never)`);
  if (url.priority !== void 0) {
    const p = typeof url.priority === "number" ? url.priority : Number.parseFloat(String(url.priority));
    if (Number.isNaN(p) || p < 0 || p > 1)
      warnings.push(`priority "${url.priority}" is not valid (expected: number between 0.0 and 1.0)`);
  }
  return warnings;
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
  const e = defu$1(_e, defaults);
  {
    const warnings = validateSitemapUrl(e);
    if (warnings.length)
      e._warnings = (e._warnings || []).concat(warnings);
  }
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

function attachUrlWarnings(sources) {
  for (const source of sources) {
    if (!source.urls?.length)
      continue;
    const warnings = [];
    for (const url of source.urls) {
      const msgs = validateSitemapUrl(url);
      if (msgs.length) {
        const loc = typeof url === "string" ? url : url.loc || "";
        for (const message of msgs)
          warnings.push({ loc, message });
      }
    }
    if (warnings.length)
      source._urlWarnings = warnings;
  }
  return sources;
}
const _iFIONi = defineEventHandler(async (e) => {
  const _runtimeConfig = useSitemapRuntimeConfig();
  const siteConfig = getSiteConfig(e);
  const { sitemaps: _sitemaps } = _runtimeConfig;
  const runtimeConfig = { ..._runtimeConfig };
  delete runtimeConfig.sitemaps;
  const globalSources = await globalSitemapSources();
  const nitroOrigin = getNitroOrigin(e);
  const sitemaps = {};
  for (const s of Object.keys(_sitemaps)) {
    const sitemap = _sitemaps[s];
    sitemaps[s] = {
      ...sitemap,
      sources: attachUrlWarnings(await resolveSitemapSources(await childSitemapSources(sitemap), e))
    };
  }
  return {
    nitroOrigin,
    sitemaps,
    runtimeConfig,
    globalSources: attachUrlWarnings(await resolveSitemapSources(globalSources, e)),
    siteConfig: { ...siteConfig }
  };
});

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
  const isIndexPage = referrerPath === "/sitemap.xml" || referrerPath === "/sitemap_index.xml";
  const canonicalQuery = getQuery(referrer).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const debugUrl = xmlEscape(withQuery("/__sitemap__/debug.json", { sitemap: sitemapName }));
  const devUrl = xmlEscape(referrerPath);
  const prodUrl = xmlEscape(withQuery(referrerPath, { canonical: "" }));
  const fetchErrors = [];
  const xslQuery = getQuery$1(e);
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
  const showDevTools = xslTips !== false;
  const hints = [
    `This is an XSL sitemap (CSS for XML). Disable with <code>xsl: false</code>`,
    `View the raw XML by adding <code>?canonical</code> to the URL`,
    `Check <code>/__sitemap__/debug.json</code> for full sitemap diagnostics`
  ];
  const hint = hints[Math.floor(Math.random() * hints.length)];
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
          ${showDevTools ? "body { padding-bottom: 3.5rem; }" : ""}
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
                        ${showDevTools ? `<xsl:for-each select="comment()[starts-with(normalize-space(.), 'WARN:')]">
                          <div class="inline-warning">
                            <xsl:value-of select="substring-after(normalize-space(.), 'WARN:')"/>
                          </div>
                        </xsl:for-each>` : ""}
                      </td>
                      ${columns.filter((c) => c.label !== "URL").map((c) => `<td><span class="count"><xsl:value-of select="${c.select}"/></span></td>`).join("\n")}
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>
        </div>
        ${showDevTools ? `<div class="debug-bar">
            <a href="${xmlEscape(fixPath("/sitemap_index.xml"))}" class="debug-bar-brand">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32"><path fill="#00dc82" d="M4 26h4v4H4zm10 0h4v4h-4zm10 0h4v4h-4zm1-10h-8v-2h-2v2H7a2 2 0 0 0-2 2v6h2v-6h8v6h2v-6h8v6h2v-6a2 2 0 0 0-2-2zM9 2v10h14V2zm2 2h2v6h-2zm10 6h-6V4h6z"/></svg>
              <span>Sitemap Debug Bar</span>
            </a>
            <span class="debug-bar-version">v${version} \xB7 ${xmlEscape(siteUrl)}</span>
            <span class="debug-bar-hint">Hint: ${hint}</span>
            ${isIndexPage ? `<span class="mode-badge ${isShowingCanonical ? "mode-prod" : "mode-dev"}">${isShowingCanonical ? "Prod" : "Dev"}</span>
              <div class="mode-toggle">
                <a href="${isShowingCanonical ? devUrl : "#"}" class="${!isShowingCanonical ? "active" : ""}">Dev</a>
                <a href="${!isShowingCanonical ? prodUrl : "#"}" class="${isShowingCanonical ? "active" : ""}">Prod</a>
              </div>` : ""}
            <a href="${debugUrl}" target="_blank" class="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              Debug
            </a>
          </div>` : ""}
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
    createRouter({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [path === "/" ? path : withoutTrailingSlash(path), rules])
      )
    })
  );
  return (pathOrUrl) => {
    const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, app.baseURL).pathname;
    const pathWithoutQuery = withoutQuery(path);
    return defu$1({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(pathWithoutQuery === "/" ? pathWithoutQuery : withoutTrailingSlash(pathWithoutQuery), app.baseURL)
    ).reverse());
  };
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
  if (url._warnings?.length) {
    for (const w of url._warnings)
      xml += `${I2}<!-- WARN: ${w} -->${NL}`;
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
  const canonicalQuery = getQuery$1(e).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const siteConfig = getSiteConfig(e);
  return {
    event: e,
    fixSlashes: (path) => fixSlashes(siteConfig.trailingSlash, path),
    // we need these as they depend on the nitro event
    canonicalUrlResolver: createSitePathResolver(e, {
      canonical: isShowingCanonical || false,
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
        routeRules = defu$1(routeRules, routeRuleMatcher(pathWithoutPrefix));
    }
    if (routeRules.sitemap === false)
      continue;
    if (typeof routeRules.robots !== "undefined" && !routeRules.robots)
      continue;
    const hasRobotsDisabled = Object.entries(routeRules.headers || {}).some(([name, value]) => name.toLowerCase() === "x-robots-tag" && value.toLowerCase().includes("noindex"));
    if (routeRules.redirect || hasRobotsDisabled)
      continue;
    sitemapUrls[validCount++] = routeRules.sitemap ? defu$1(u, routeRules.sitemap) : u;
  }
  sitemapUrls.length = validCount;
  if (validCount === 0 && sitemapUrls.length > 0) {
    logger.warn(`Sitemap had ${sitemapUrls.length} that were all filtered out. This may be due to a robots rules blocking these URLs from indexing. Check your /** route rules or robots.txt configuration.`);
  }
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
        throw createError({
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
defineCachedFunction(
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
  const xml = await buildSitemapXml(event, definition, resolvers, runtimeConfig);
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
    return sendRedirect(e, withBase("/sitemap_index.xml", useRuntimeConfig().app.baseURL), 302 );
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
  console.log("[Supabase] Init Service Client. URL:", supabaseUrl);
  console.log("[Supabase] Service Key (conf):", config.supabaseServiceKey ? "Yes" : "No");
  console.log("[Supabase] Using Key:", serviceKey.substring(0, 15) + "...");
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
  return createError({ statusCode, statusMessage });
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
    throw createError({
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

const _lazy_M0YVZa = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_MibnQE = () => Promise.resolve().then(function () { return me_get$1; });
const _lazy_EUeWgX = () => Promise.resolve().then(function () { return sendOtp_post$1; });
const _lazy_tm9JhC = () => Promise.resolve().then(function () { return status_get$1; });
const _lazy_xx2F8b = () => Promise.resolve().then(function () { return create_post$1; });
const _lazy_hlFyYY = () => Promise.resolve().then(function () { return delete_post$1; });
const _lazy_dcHuVB = () => Promise.resolve().then(function () { return bindWechat_post$1; });
const _lazy_nnday4 = () => Promise.resolve().then(function () { return unbindWechat_post$1; });
const _lazy_hMjmce = () => Promise.resolve().then(function () { return contact_get$1; });
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
const _lazy_x3llcf = () => Promise.resolve().then(function () { return updateMenu_get$1; });
const _lazy_8EFkQE = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _2qpWSd, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/auth/login', handler: _lazy_M0YVZa, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/auth/me', handler: _lazy_MibnQE, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/auth/send-otp', handler: _lazy_EUeWgX, lazy: true, middleware: false, method: "post" },
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
  { route: '/__site-config__/debug.json', handler: __zAMVZ, lazy: false, middleware: false, method: undefined },
  { route: '/robots.txt', handler: _ZnJbsD, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _mEbVfL, lazy: false, middleware: true, method: undefined },
  { route: '/__robots__/debug.json', handler: _eVFmdM, lazy: false, middleware: false, method: undefined },
  { route: '/__robots__/debug-path.json', handler: _xgQB1Y, lazy: false, middleware: false, method: undefined },
  { route: '/__sitemap__/debug.json', handler: _iFIONi, lazy: false, middleware: false, method: undefined },
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

const sources$1 = [
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/"
            },
            {
                "loc": "/pc/faq"
            },
            {
                "loc": "/pc/about"
            },
            {
                "loc": "/pc"
            },
            {
                "loc": "/pc/policy"
            },
            {
                "loc": "/pc/refund"
            },
            {
                "loc": "/pc/company"
            },
            {
                "loc": "/pc/contact"
            },
            {
                "loc": "/pc/join-us"
            },
            {
                "loc": "/pc/privacy"
            },
            {
                "loc": "/pc/profile"
            },
            {
                "loc": "/pc/profile/wallet"
            },
            {
                "loc": "/pc/profile/tickets"
            },
            {
                "loc": "/pc/profile/exchange"
            },
            {
                "loc": "/pc/profile/messages"
            },
            {
                "loc": "/pc/profile/favorites"
            },
            {
                "loc": "/pc/profile/order"
            },
            {
                "loc": "/pc/service"
            },
            {
                "loc": "/mobile/cart"
            },
            {
                "loc": "/mobile/help"
            },
            {
                "loc": "/pc/about-us"
            },
            {
                "loc": "/mobile"
            },
            {
                "loc": "/pc/community"
            },
            {
                "loc": "/pc/advantages"
            },
            {
                "loc": "/pc/disclaimer"
            },
            {
                "loc": "/mobile/channel"
            },
            {
                "loc": "/mobile/profile"
            },
            {
                "loc": "/mobile/profile/wallet"
            },
            {
                "loc": "/mobile/profile/order"
            },
            {
                "loc": "/mobile/profile/account"
            },
            {
                "loc": "/mobile/profile/tickets"
            },
            {
                "loc": "/mobile/profile/messages"
            },
            {
                "loc": "/mobile/profile/favorites"
            },
            {
                "loc": "/mobile/profile/redemption"
            },
            {
                "loc": "/manager_portal/cdk/cdks"
            },
            {
                "loc": "/manager_portal/cdk/keys"
            },
            {
                "loc": "/manager_portal/cdk/post"
            },
            {
                "loc": "/manager_portal/cdk/debug"
            },
            {
                "loc": "/manager_portal/cdk"
            },
            {
                "loc": "/manager_portal/cdk/virtual"
            },
            {
                "loc": "/manager_portal/cdk/accounts"
            },
            {
                "loc": "/manager_portal/cdk/channel-recognition"
            },
            {
                "loc": "/manager_portal"
            },
            {
                "loc": "/manager_portal/login"
            },
            {
                "loc": "/manager_portal/media"
            },
            {
                "loc": "/manager_portal/media/images"
            },
            {
                "loc": "/manager_portal/media/banners"
            },
            {
                "loc": "/manager_portal/users"
            },
            {
                "loc": "/manager_portal/users/accounts"
            },
            {
                "loc": "/manager_portal/users/departments"
            },
            {
                "loc": "/manager_portal/orders"
            },
            {
                "loc": "/manager_portal/orders/cdkey/post"
            },
            {
                "loc": "/manager_portal/orders/share/post"
            },
            {
                "loc": "/manager_portal/orders/cdkey"
            },
            {
                "loc": "/manager_portal/orders/share"
            },
            {
                "loc": "/manager_portal/orders/refund"
            },
            {
                "loc": "/manager_portal/orders/recharge/post"
            },
            {
                "loc": "/manager_portal/orders/recharge"
            },
            {
                "loc": "/manager_portal/orders/preorders"
            },
            {
                "loc": "/manager_portal/coupons"
            },
            {
                "loc": "/manager_portal/coupons/flat/post"
            },
            {
                "loc": "/manager_portal/coupons/flat"
            },
            {
                "loc": "/manager_portal/coupons/stats"
            },
            {
                "loc": "/manager_portal/coupons/balance/post"
            },
            {
                "loc": "/manager_portal/coupons/product/post"
            },
            {
                "loc": "/manager_portal/coupons/balance"
            },
            {
                "loc": "/manager_portal/coupons/product"
            },
            {
                "loc": "/mobile/wechat-callback"
            },
            {
                "loc": "/manager_portal/messages"
            },
            {
                "loc": "/manager_portal/messages/settings"
            },
            {
                "loc": "/manager_portal/messages/batch-send"
            },
            {
                "loc": "/manager_portal/products/edit"
            },
            {
                "loc": "/manager_portal/products/skus"
            },
            {
                "loc": "/manager_portal/products"
            },
            {
                "loc": "/manager_portal/products/categories"
            },
            {
                "loc": "/manager_portal/products/shared-sku"
            },
            {
                "loc": "/manager_portal/recharge"
            },
            {
                "loc": "/manager_portal/recharge/tiers"
            },
            {
                "loc": "/manager_portal/recharge/orders"
            },
            {
                "loc": "/pc/support/refund/create"
            },
            {
                "loc": "/manager_portal/help-center"
            },
            {
                "loc": "/manager_portal/help-center/articles"
            },
            {
                "loc": "/manager_portal/help-center/articles/post"
            },
            {
                "loc": "/manager_portal/help-center/faq/post"
            },
            {
                "loc": "/manager_portal/help-center/faq"
            },
            {
                "loc": "/manager_portal/help-center/faq-categories"
            },
            {
                "loc": "/manager_portal/help-center/article-categories"
            },
            {
                "loc": "/manager_portal/article/post"
            },
            {
                "loc": "/manager_portal/images"
            },
            {
                "loc": "/manager_portal/article"
            },
            {
                "loc": "/manager_portal/banners"
            },
            {
                "loc": "/manager_portal/tickets"
            },
            {
                "loc": "/manager_portal/backend-settings"
            },
            {
                "loc": "/manager_portal/backend-settings/contact"
            },
            {
                "loc": "/manager_portal/backend-settings/storage"
            },
            {
                "loc": "/manager_portal/backend-settings/scheduler"
            },
            {
                "loc": "/manager_portal/backend-settings/notification"
            },
            {
                "loc": "/manager_portal/article/categories"
            },
            {
                "loc": "/manager_portal/tickets/components/TicketChatModal"
            },
            {
                "loc": "/faq"
            },
            {
                "loc": "/about"
            },
            {
                "loc": "/policy"
            },
            {
                "loc": "/refund"
            },
            {
                "loc": "/company"
            },
            {
                "loc": "/contact"
            },
            {
                "loc": "/join-us"
            },
            {
                "loc": "/privacy"
            },
            {
                "loc": "/profile"
            },
            {
                "loc": "/profile/wallet"
            },
            {
                "loc": "/profile/tickets"
            },
            {
                "loc": "/profile/exchange"
            },
            {
                "loc": "/profile/messages"
            },
            {
                "loc": "/profile/favorites"
            },
            {
                "loc": "/profile/order"
            },
            {
                "loc": "/service"
            },
            {
                "loc": "/about-us"
            },
            {
                "loc": "/community"
            },
            {
                "loc": "/advantages"
            },
            {
                "loc": "/disclaimer"
            },
            {
                "loc": "/support/refund/create"
            }
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:route-rules",
            "description": "Generated from your route rules config.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:route-rules'] }`."
            ]
        },
        "urls": [
            "/",
            "/pc",
            "/mobile"
        ],
        "sourceType": "app"
    }
];

const globalSources = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  sources: sources$1
}, Symbol.toStringTag, { value: 'Module' }));

const sources = {};

const childSources = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  sources: sources
}, Symbol.toStringTag, { value: 'Module' }));

let adminSupabaseClient = null;
function getAdminSupabaseClient() {
  if (!adminSupabaseClient) {
    const config = useRuntimeConfig();
    const SUPABASE_SERVICE_ROLE_KEY = config.supabaseServiceKey;
    const SUPABASE_URL = config.public.supabaseUrl;
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      console.error("\u274C [Admin Client] Missing SUPABASE_SERVICE_KEY in runtimeConfig");
      throw new Error("Server configuration error: Missing Service Key");
    }
    adminSupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    });
  }
  return adminSupabaseClient;
}

const login_post = defineEventHandler(async (event) => {
  try {
    const baseBody = await validateBody(event, loginBaseSchema);
    const { type } = baseBody;
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseAnonKey = config.public.supabaseAnonKey;
    const authClient = createClient(supabaseUrl, supabaseAnonKey);
    const adminClient = getAdminSupabaseClient();
    let authResult;
    let email = "";
    if (type === "password") {
      const { email: e, password } = await validateBody(event, passwordLoginSchema);
      email = e;
      authResult = await authClient.auth.signInWithPassword({ email, password });
    } else {
      const { email: e, code } = await validateBody(event, verifyOtpSchema);
      email = e;
      authResult = await authClient.auth.verifyOtp({ email, token: code, type: "email" });
    }
    const { data, error } = authResult;
    if (error) {
      throw error;
    }
    if (!(data == null ? void 0 : data.session)) {
      throw createError({ statusCode: 401, statusMessage: "Unable to start session" });
    }
    const userId = data.session.user.id;
    const userEmail = data.session.user.email;
    let { data: adminData, error: adminError } = await adminClient.from("admin_users").select(`
        *,
        department:admin_departments(id, name, permissions)
    `).eq("auth_user_id", userId).single();
    if ((adminError || !adminData) && type === "otp") {
      const { data: adminByEmail } = await adminClient.from("admin_users").select(`*, department:admin_departments(id, name, permissions)`).eq("email", userEmail).single();
      if (adminByEmail) {
        await adminClient.from("admin_users").update({ auth_user_id: userId }).eq("id", adminByEmail.id);
        adminData = adminByEmail;
      }
    }
    if (!adminData) {
      await authClient.auth.signOut();
      throw createError({ statusCode: 403, statusMessage: "\u8BE5\u8D26\u53F7\u4E0D\u662F\u7BA1\u7406\u5458" });
    }
    if (adminData.status !== "enabled") {
      await authClient.auth.signOut();
      throw createError({ statusCode: 403, statusMessage: "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7981\u7528" });
    }
    return {
      success: true,
      session: data.session,
      adminInfo: adminData
    };
  } catch (err) {
    throw mapSupabaseError(err);
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const me_get = defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "Authorization");
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: "No token" });
  }
  const token = authHeader.replace("Bearer ", "");
  const config = useRuntimeConfig();
  const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);
  const { data: { user }, error: authError } = await authClient.auth.getUser(token);
  if (authError || !user) {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
  const adminClient = getAdminSupabaseClient();
  const { data: adminData, error: adminError } = await adminClient.from("admin_users").select(`
        *,
        department:admin_departments(id, name, permissions)
    `).eq("auth_user_id", user.id).single();
  if (adminError || !adminData) {
    throw createError({ statusCode: 403, statusMessage: "User is not admin" });
  }
  return { success: true, adminInfo: adminData };
});

const me_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: me_get
}, Symbol.toStringTag, { value: 'Module' }));

const sendOtp_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const body = await validateBody(event, sendOtpSchema);
    const { email } = body;
    const adminClient = getAdminSupabaseClient();
    const config = useRuntimeConfig();
    console.log("Using Admin Client. Key Length:", (_a = config.supabaseServiceKey) == null ? void 0 : _a.length);
    console.log("Key Prefix:", (_b = config.supabaseServiceKey) == null ? void 0 : _b.substring(0, 10));
    console.log("Key Suffix:", (_c = config.supabaseServiceKey) == null ? void 0 : _c.substring(config.supabaseServiceKey.length - 5));
    const { data: adminData, error: fetchError } = await adminClient.from("admin_users").select("id, status, auth_user_id").eq("email", email).single();
    if (fetchError || !adminData) {
      console.error("Admin Auth Lookup Failed:", { email, error: fetchError, data: adminData });
      throw createError({ statusCode: 403, statusMessage: "\u90AE\u7BB1\u672A\u6CE8\u518C\u4E3A\u7BA1\u7406\u5458" });
    }
    if (adminData.status !== "enabled") {
      throw createError({ statusCode: 403, statusMessage: "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7981\u7528" });
    }
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseAnonKey = config.public.supabaseAnonKey;
    const authClient = createClient(supabaseUrl, supabaseAnonKey);
    const shouldCreateUser = !adminData.auth_user_id;
    const { error } = await authClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser
      }
    });
    if (error) {
      if (error.message.includes("Signups not allowed")) {
        throw createError({ statusCode: 403, statusMessage: "\u8D26\u53F7\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u8054\u7CFB\u8D85\u7EA7\u7BA1\u7406\u5458" });
      }
      throw error;
    }
    return { success: true };
  } catch (err) {
    throw mapSupabaseError(err);
  }
});

const sendOtp_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sendOtp_post
}, Symbol.toStringTag, { value: 'Module' }));

const status_get = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "Authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, statusMessage: "No token" });
    }
    const token = authHeader.replace("Bearer ", "");
    const config = useRuntimeConfig();
    const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);
    const { data: { user: caller }, error: callerError } = await authClient.auth.getUser(token);
    if (callerError) {
      console.error("Auth User Check Failed:", callerError);
    }
    if (callerError || !caller) {
      throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }
    const adminClient = getAdminSupabaseClient();
    const { data: adminCaller, error: adminError } = await adminClient.from("admin_users").select("id, status").eq("auth_user_id", caller.id).single();
    if (adminError || !adminCaller || adminCaller.status !== "enabled") {
      throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
    }
    const probeUrl = "http://127.0.0.1:8000/functions/v1/system-health";
    const serviceKey = config.supabaseServiceKey;
    try {
      const response = await $fetch(probeUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json"
        },
        timeout: 5e3
        // 5s timeout
      });
      return { success: true, results: response };
    } catch (probeError) {
      console.error("Probe Failed:", probeError);
      return {
        success: false,
        error: "Probe unreachable: " + probeError.message,
        results: {
          status: "critical",
          checks: {
            system: { status: "error", error: probeError.message }
          }
        }
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.message,
      results: null
    };
  }
});

const status_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: status_get
}, Symbol.toStringTag, { value: 'Module' }));

const create_post = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "Authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, statusMessage: "No token" });
    }
    const token = authHeader.replace("Bearer ", "");
    const config = useRuntimeConfig();
    const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);
    const { data: { user: caller }, error: callerError } = await authClient.auth.getUser(token);
    if (callerError || !caller) {
      throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }
    const adminClient = getAdminSupabaseClient();
    const { data: adminCaller, error: adminError } = await adminClient.from("admin_users").select("id, status").eq("auth_user_id", caller.id).single();
    if (adminError || !adminCaller || adminCaller.status !== "enabled") {
      throw createError({ statusCode: 403, statusMessage: "Unauthorized: Admin access required" });
    }
    const body = await validateBody(event, createUserSchema);
    const { email, password, name, department_id, status } = body;
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role: "admin" }
    });
    if (authError) {
      throw authError;
    }
    if (!authData.user) {
      throw createError({ statusCode: 500, statusMessage: "Auth user creation returned no data" });
    }
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const password_hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const { data: newUser, error: dbError } = await adminClient.from("admin_users").insert({
      name,
      email,
      password_hash,
      auth_user_id: authData.user.id,
      department_id: department_id || null,
      // Zod handles optional/null
      status: status || "enabled"
    }).select().single();
    if (dbError) {
      await adminClient.auth.admin.deleteUser(authData.user.id);
      throw dbError;
    }
    return { success: true, user: newUser };
  } catch (err) {
    throw mapSupabaseError(err);
  }
});

const create_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post
}, Symbol.toStringTag, { value: 'Module' }));

const delete_post = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "Authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, statusMessage: "No token" });
    }
    const token = authHeader.replace("Bearer ", "");
    const config = useRuntimeConfig();
    const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);
    const { data: { user: caller }, error: callerError } = await authClient.auth.getUser(token);
    if (callerError || !caller) {
      throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }
    const adminClient = getAdminSupabaseClient();
    const { data: adminCaller, error: adminError } = await adminClient.from("admin_users").select("id, status").eq("auth_user_id", caller.id).single();
    if (adminError || !adminCaller || adminCaller.status !== "enabled") {
      throw createError({ statusCode: 403, statusMessage: "Unauthorized: Admin access required" });
    }
    const body = await validateBody(event, deleteUserSchema);
    const { id } = body;
    const { data: targetUser, error: fetchError } = await adminClient.from("admin_users").select("auth_user_id").eq("id", id).single();
    if (fetchError || !targetUser) {
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }
    const { error: deleteError } = await adminClient.from("admin_users").delete().eq("id", id);
    if (deleteError) {
      throw deleteError;
    }
    if (targetUser.auth_user_id) {
      const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(targetUser.auth_user_id);
      if (authDeleteError) {
        console.error(`Failed to delete auth user ${targetUser.auth_user_id}:`, authDeleteError.message);
      }
    }
    return { success: true };
  } catch (err) {
    throw mapSupabaseError(err);
  }
});

const delete_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: delete_post
}, Symbol.toStringTag, { value: 'Module' }));

const bindWechat_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const body = await readBody(event);
    const supabase = getSupabaseServiceClient();
    const currentUser = await getCurrentUser(event);
    if (currentUser) {
      if (body.wechatCode) {
        return await bindWechatToExistingUser(supabase, currentUser.id, body.wechatCode);
      }
      if (body.bindToken) {
        return await bindWechatToExistingUserByToken(supabase, currentUser.id, body.bindToken);
      }
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
    let openid = tokenResult.openid;
    let unionid;
    try {
      const userInfo = await getWechatUserInfo(openid);
      if (userInfo.unionid) unionid = userInfo.unionid;
    } catch (e) {
      console.warn("[BindWechat] Failed to fetch user info:", e);
    }
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
      config.public.supabaseAnonKey
    );
    let authData;
    let verifyError;
    const resEmail = await anonClient.auth.verifyOtp({
      email: body.email,
      token: body.code,
      type: "email"
    });
    if (!resEmail.error) {
      authData = resEmail.data;
      verifyError = null;
    } else {
      console.log("[BindWechat] verifyOtp(type=email) failed:", resEmail.error.message);
      const resSignup = await anonClient.auth.verifyOtp({
        email: body.email,
        token: body.code,
        type: "signup"
      });
      if (!resSignup.error) {
        console.log("[BindWechat] verifyOtp(type=signup) succeeded");
        authData = resSignup.data;
        verifyError = null;
      } else {
        verifyError = resEmail.error;
        if (resSignup.error.message !== resEmail.error.message) {
          console.log("[BindWechat] verifyOtp(type=signup) failed:", resSignup.error.message);
        }
      }
    }
    if (verifyError || !(authData == null ? void 0 : authData.user)) {
      throw createError({
        statusCode: 400,
        message: "\u9A8C\u8BC1\u7801\u9519\u8BEF\u6216\u5DF2\u8FC7\u671F"
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
    const { data: userProfile } = await supabase.from("profiles").select("id").eq("id", authData.user.id).single();
    if (!userProfile) {
      console.log("[BindWechat] Profile not found, creating manually for user:", authData.user.id);
      const uid = Math.floor(1e7 + Math.random() * 9e7).toString();
      const { error: insertError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        uid,
        email: authData.user.email,
        nickname: body.nickname || ((_a = authData.user.email) == null ? void 0 : _a.split("@")[0]) || "User",
        avatar: body.avatar || "",
        status: "active",
        balance: 0,
        wechat_openid: openid,
        wechat_unionid: unionid
      });
      if (insertError) {
        if (insertError.message.includes("duplicate")) {
          console.warn("[BindWechat] Profile insert failed (duplicate), falling back to update for user:", authData.user.id);
          const { error: fallbackUpdateError } = await supabase.from("profiles").update({
            wechat_openid: openid,
            wechat_unionid: unionid,
            nickname: body.nickname || void 0,
            avatar: body.avatar || void 0,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }).eq("id", authData.user.id);
          if (fallbackUpdateError) {
            console.error("[BindWechat] Fallback update failed:", fallbackUpdateError);
            throw createError({
              statusCode: 500,
              message: "\u7ED1\u5B9A\u5931\u8D25\uFF08\u66F4\u65B0\u8D26\u6237\u65F6\u51FA\u9519\uFF09"
            });
          }
        } else {
          console.error("[BindWechat] Insert profile failed:", insertError);
          throw createError({
            statusCode: 500,
            message: "\u521B\u5EFA\u8D26\u6237\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
          });
        }
      }
    } else {
      const { error: updateError } = await supabase.from("profiles").update({
        wechat_openid: openid,
        wechat_unionid: unionid,
        nickname: body.nickname || void 0,
        avatar: body.avatar || void 0,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", authData.user.id);
      if (updateError) {
        console.error("[BindWechat] Update profile failed:", updateError);
        throw createError({
          statusCode: 500,
          message: "\u7ED1\u5B9A\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
        });
      }
    }
    console.log("[BindWechat] Successfully bound:", { userId: authData.user.id, openid });
    if (authData.user.email) {
      sendNotification("account_welcome", authData.user.email, {
        nickname: body.nickname || authData.user.email.split("@")[0] || "\u65B0\u7528\u6237"
      }).catch((e) => console.error("[BindWechat] Welcome email error:", e));
    }
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
  return await performBinding(supabase, userId, result.openid, result.unionid);
}
async function bindWechatToExistingUserByToken(supabase, userId, bindToken) {
  const tokenResult = verifyBindToken(bindToken);
  if (!tokenResult.valid || !tokenResult.openid) {
    throw createError({
      statusCode: 400,
      message: tokenResult.error || "\u7ED1\u5B9A\u51ED\u8BC1\u65E0\u6548\u6216\u5DF2\u8FC7\u671F"
    });
  }
  let unionid;
  try {
    const userInfo = await getWechatUserInfo(tokenResult.openid);
    if (userInfo.unionid) unionid = userInfo.unionid;
  } catch (e) {
    console.warn("[BindWechat] Failed to fetch unionid:", e);
  }
  return await performBinding(supabase, userId, tokenResult.openid, unionid);
}
async function performBinding(supabase, userId, openid, unionid) {
  const { data: existingProfile } = await supabase.from("profiles").select("id, wechat_unionid").eq("wechat_openid", openid).single();
  if (existingProfile) {
    if (existingProfile.id === userId) {
      if (unionid && !existingProfile.wechat_unionid) {
        await supabase.from("profiles").update({ wechat_unionid: unionid }).eq("id", userId);
        console.log("[BindWechat] Backfilled missing unionid for user:", userId);
      }
      return {
        success: true,
        message: "\u60A8\u5DF2\u7ED1\u5B9A\u8BE5\u5FAE\u4FE1",
        data: { openid }
      };
    }
    throw createError({
      statusCode: 400,
      message: "\u6B64\u5FAE\u4FE1\u5DF2\u7ED1\u5B9A\u5176\u4ED6\u8D26\u53F7"
    });
  }
  const { error } = await supabase.from("profiles").update({
    wechat_openid: openid,
    wechat_unionid: unionid
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
      openid
    }
  };
}

const bindWechat_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: bindWechat_post
}, Symbol.toStringTag, { value: 'Module' }));

const unbindWechat_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u8BF7\u5148\u767B\u5F55"
      });
    }
    const supabase = getSupabaseServiceClient();
    const { data: profile, error: fetchError } = await supabase.from("profiles").select("wechat_openid").eq("id", user.id).single();
    if (fetchError || !profile) {
      throw createError({
        statusCode: 404,
        message: "\u7528\u6237\u8D44\u6599\u4E0D\u5B58\u5728"
      });
    }
    if (!profile.wechat_openid) {
      return {
        success: true,
        message: "\u5F53\u524D\u672A\u7ED1\u5B9A\u5FAE\u4FE1"
      };
    }
    const { error: updateError } = await supabase.from("profiles").update({
      wechat_openid: null,
      wechat_unionid: null,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
      // Now we can use this!
    }).eq("id", user.id);
    if (updateError) {
      console.error("[UnbindWechat] Failed to unbind:", updateError);
      throw createError({
        statusCode: 500,
        message: "\u89E3\u7ED1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
      });
    }
    console.log("[UnbindWechat] Success for user:", user.id);
    return {
      success: true,
      message: "\u5FAE\u4FE1\u89E3\u7ED1\u6210\u529F"
    };
  } catch (err) {
    console.error("[UnbindWechat] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u89E3\u7ED1\u5931\u8D25"
    });
  }
});

const unbindWechat_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: unbindWechat_post
}, Symbol.toStringTag, { value: 'Module' }));

const contact_get = defineEventHandler(async (event) => {
  const client = getAdminSupabaseClient();
  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
  const { data, error } = await client.from("system_configs").select("value").eq("key", "contact_info").single();
  if (error) {
    return {
      success: true,
      data: {
        wechat_id: "Spotify-cn",
        wechat_qr: "/images/contact/wechat_qr.jpg",
        telegram_id: "@FANTULA_SUPPORT",
        telegram_qr: "/images/contact/telegram_qr.jpg",
        service_time: "10:00 - 23:00"
      }
    };
  }
  return { success: true, data: data.value };
});

const contact_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: contact_get
}, Symbol.toStringTag, { value: 'Module' }));

const test = defineEventHandler(async (event) => {
  return { message: "API is working!", timestamp: (/* @__PURE__ */ new Date()).toISOString() };
});

const test$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: test
}, Symbol.toStringTag, { value: 'Module' }));

const checkScan_get = defineEventHandler(async (event) => {
  var _a;
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
        const { createClient } = await import('file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs');
        const config = useRuntimeConfig();
        const supabaseAdmin = createClient(
          config.public.supabaseUrl,
          config.supabaseServiceKey
        );
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email: profile.email
        });
        if (linkError || !((_a = linkData.properties) == null ? void 0 : _a.action_link)) {
          console.error("[CheckScan] Generate link failed:", linkError);
          console.error("[CheckScan] Link data:", JSON.stringify(linkData));
          return {
            success: true,
            data: {
              status: "error",
              message: "\u751F\u6210\u767B\u5F55\u94FE\u63A5\u5931\u8D25\uFF0C\u8BF7\u5C1D\u8BD5\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F",
              error_detail: (linkError == null ? void 0 : linkError.message) || "action_link missing"
            }
          };
        }
        let actionLink = linkData.properties.action_link;
        if (actionLink) {
          try {
            const publicSupabaseUrl = config.public.supabaseUrl;
            if (actionLink.startsWith("/")) {
              if (publicSupabaseUrl) {
                const baseUrl = publicSupabaseUrl.replace(/\/$/, "");
                const path = actionLink.replace(/^\//, "");
                actionLink = `${baseUrl}/${path}`;
                console.log("[CheckScan] Fixed relative link to:", actionLink);
              } else {
                console.warn("[CheckScan] Relative link found but publicSupabaseUrl is missing");
              }
            }
            let urlObj = new URL(actionLink);
            if (publicSupabaseUrl && (urlObj.hostname.includes("localhost") || urlObj.hostname.includes("127.0.0.1"))) {
              const supabaseUrlObj = new URL(publicSupabaseUrl);
              urlObj.protocol = supabaseUrlObj.protocol;
              urlObj.host = supabaseUrlObj.host;
              console.log("[CheckScan] Fixed localhost base URL to:", urlObj.toString());
            }
            const siteUrl = config.public.siteUrl || "https://www.fantula.com";
            urlObj.searchParams.set("redirect_to", siteUrl);
            actionLink = urlObj.toString();
            console.log("[CheckScan] Enforced Action Link:", actionLink);
          } catch (e) {
            console.warn("[CheckScan] Failed to fix link:", e);
          }
        }
        return {
          success: true,
          data: {
            status: "logged_in",
            message: "\u767B\u5F55\u6210\u529F",
            userId: profile.id,
            email: profile.email,
            nickname: profile.nickname,
            action_link: actionLink
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
    if (eventType === "CLICK" && eventKey === "MENU_CONTACT_SUPPORT") {
      const now = Math.floor(Date.now() / 1e3);
      const content = `\u516C\u4F17\u53F7\u65E0\u4EBA\u503C\u5B88\uFF1A\u9700\u8981\u5E2E\u52A9\u8BF7\u8054\u7CFB\u56FE\u62C9
Spotify-cn(\u957F\u6309\u5FAE\u4FE1\u53F7\u53EF\u590D\u5236)
\u5728\u7EBF\u65F6\u95F4\uFF1A10:00-23:00`;
      return `<xml>
              <ToUserName><![CDATA[${fromUser}]]></ToUserName>
              <FromUserName><![CDATA[${eventData.ToUserName}]]></FromUserName>
              <CreateTime>${now}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[${content}]]></Content>
            </xml>`;
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
    const { error: updateError } = await supabase.from("profiles").update({
      wechat_openid: result.openid
    }).eq("id", user.id);
    if (updateError) {
      console.error("[GetOpenId] Failed to update profile openid:", updateError);
    }
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
    const { amount, openid, description, bonus = 0 } = body;
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
      bonus,
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
      attach: JSON.stringify({ userId: user.id, type: "recharge", bonus })
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
    console.log("\u{1F534} [PC Stage 1] Ticket Generated:", qrResult.ticket ? "Success" : "Failed");
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
      const currentBalance = parseFloat(profile.balance) || 0;
      const orderAmount = parseFloat(order.amount) || 0;
      const bonus = parseFloat(order.bonus) || parseFloat(String(attach.bonus || 0)) || 0;
      const totalAmount = orderAmount + bonus;
      const newBalance = currentBalance + totalAmount;
      const { error: updateError } = await supabase.from("profiles").update({
        balance: newBalance
      }).eq("id", attach.userId);
      if (updateError) {
        console.error("[Notify] Failed to update balance:", updateError);
      }
      await supabase.from("wallet_transactions").insert({
        user_id: attach.userId,
        type: "\u5FAE\u4FE1\u5145\u503C",
        amount: totalAmount,
        balance_after: newBalance,
        description: `\u5FAE\u4FE1\u652F\u4ED8\u5145\u503C ${order.amount.toFixed(2)}\u70B9 \u8D60\u9001${bonus.toFixed(2)}\u70B9`,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      console.log(`[Notify] Success: User ${attach.userId} recharged ${totalAmount} (amount: ${order.amount}, bonus: ${bonus})`);
      const { data: userProfile } = await supabase.from("profiles").select("email").eq("id", attach.userId).single();
      if (userProfile == null ? void 0 : userProfile.email) {
        sendNotification("recharge_success", userProfile.email, {
          amount: orderAmount.toFixed(2),
          bonus: bonus.toFixed(2),
          balance: newBalance.toFixed(2)
        }).catch((e) => console.error("[Notify] Email send error:", e));
      }
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
  var _a;
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
    const access_token = result.access_token;
    const openid = result.openid;
    console.log("\u{1F534} [Stage 3] Backend OpenID:", openid);
    let userInfo = {};
    try {
      const userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
      const userRes = await fetch(userInfoUrl);
      userInfo = await userRes.json();
      console.log("[OAuthLogin] Got config:", { nickname: userInfo.nickname });
    } catch (e) {
      console.warn("[OAuthLogin] Failed to fetch user info:", e);
    }
    const supabaseAdmin = getSupabaseServiceClient();
    const { data: profile } = await supabaseAdmin.from("profiles").select("id, email, nickname, avatar").eq("wechat_openid", openid).single();
    if (profile) {
      const updates = {};
      if (userInfo.nickname && !profile.nickname) updates.nickname = userInfo.nickname;
      if (userInfo.headimgurl && !profile.avatar) updates.avatar = userInfo.headimgurl;
      if (Object.keys(updates).length > 0) {
        await supabaseAdmin.from("profiles").update(updates).eq("id", profile.id);
      }
      let actionLink = null;
      if (profile.email) {
        const config2 = useRuntimeConfig();
        const baseUrl = config2.public.siteUrl || "https://www.fantula.com";
        const finalDestination = body.redirectTo || "/mobile";
        const callbackUrl = `${baseUrl}/mobile/wechat-callback?return_to=${encodeURIComponent(finalDestination)}`;
        console.log("[OAuthLogin] Magic Link RedirectTo:", callbackUrl);
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email: profile.email,
          options: {
            redirectTo: callbackUrl
          }
        });
        if (!linkError && ((_a = linkData == null ? void 0 : linkData.properties) == null ? void 0 : _a.action_link)) {
          actionLink = linkData.properties.action_link;
        } else {
          console.error("[OAuthLogin] Failed to generate magic link:", linkError);
        }
      }
      return {
        success: true,
        data: {
          status: "logged_in",
          message: "\u767B\u5F55\u6210\u529F",
          userId: profile.id,
          email: profile.email,
          nickname: updates.nickname || profile.nickname,
          avatar: updates.avatar || profile.avatar,
          openid,
          actionLink
          // 返回 Magic Link
        }
      };
    } else {
      const bindToken = generateBindToken(openid);
      return {
        success: true,
        data: {
          status: "need_bind",
          message: "\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55",
          bindToken,
          nickname: userInfo.nickname,
          avatar: userInfo.headimgurl
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

const config = useRuntimeConfig();
const appid = config.wechatAppid || config.public.wechatAppid;
const secret = config.wechatAppSecret;
const updateMenu_get = defineEventHandler(async (event) => {
  try {
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return { success: false, message: "Failed to get access token", error: tokenData };
    }
    const menuData = {
      button: [
        {
          name: "\u5F00\u59CB\u4F7F\u7528",
          sub_button: [
            {
              type: "view",
              name: "\u8FDB\u5165\u56FE\u62C9",
              url: "https://www.fantula.com/mobile"
            },
            {
              type: "view",
              name: "\u6211\u7684\u56FE\u62C9",
              url: "https://www.fantula.com/mobile/profile/account"
            }
          ]
        },
        {
          name: "\u670D\u52A1\u4E2D\u5FC3",
          sub_button: [
            {
              type: "click",
              name: "\u8054\u7CFB\u5BA2\u670D",
              key: "MENU_CONTACT_SUPPORT"
            },
            {
              type: "view",
              name: "\u5E2E\u52A9\u6587\u6863",
              url: "https://www.fantula.com/mobile/help"
            }
          ]
        },
        {
          type: "view",
          name: "\u767B\u5F55\u65E7\u7248",
          url: "https://en.jjhezu.com/pages/login/login"
        }
      ]
    };
    const createMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${tokenData.access_token}`;
    const createRes = await fetch(createMenuUrl, {
      method: "POST",
      body: JSON.stringify(menuData),
      headers: { "Content-Type": "application/json" }
    });
    const createResult = await createRes.json();
    return {
      success: createResult.errcode === 0,
      result: createResult,
      menu: menuData
    };
  } catch (e) {
    return {
      success: false,
      message: e.message
    };
  }
});

const updateMenu_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: updateMenu_get
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
	const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && ((routeOptions.isr || routeOptions.cache));
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
