const http = {
  get(url, params, config) {
    throw new Error("http.get \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  post(url, data, config) {
    throw new Error("http.post \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  put(url, data, config) {
    throw new Error("http.put \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  delete(url, config) {
    throw new Error("http.delete \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  upload(url, file, config) {
    throw new Error("http.upload \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  download(url, params, filename) {
    throw new Error("http.download \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  }
};

export { http as h };
//# sourceMappingURL=request-n20yf-Kr.mjs.map
