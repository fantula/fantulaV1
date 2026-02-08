const http = {
  get(url, params, config) {
    throw new Error("http.get 已废弃，请改用 useHttp() composable");
  },
  post(url, data, config) {
    throw new Error("http.post 已废弃，请改用 useHttp() composable");
  },
  put(url, data, config) {
    throw new Error("http.put 已废弃，请改用 useHttp() composable");
  },
  delete(url, config) {
    throw new Error("http.delete 已废弃，请改用 useHttp() composable");
  },
  upload(url, file, config) {
    throw new Error("http.upload 已废弃，请改用 useHttp() composable");
  },
  download(url, params, filename) {
    throw new Error("http.download 已废弃，请改用 useHttp() composable");
  }
};
export {
  http as h
};
//# sourceMappingURL=request-n20yf-Kr.js.map
