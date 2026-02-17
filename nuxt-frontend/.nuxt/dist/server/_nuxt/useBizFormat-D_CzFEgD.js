function useBizFormat() {
  const formatPrice = (price, fallback = "0.00") => {
    if (price === null || price === void 0 || price === "") return fallback;
    const num = Number(price);
    if (isNaN(num)) return fallback;
    return num.toFixed(2);
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "-";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const formatRemainingTime = (expiryStr) => {
    if (!expiryStr) return null;
    const expiry = new Date(expiryStr).getTime();
    const now = (/* @__PURE__ */ new Date()).getTime();
    const diff = expiry - now;
    if (diff <= 0) return "已过期";
    const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
    const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
    const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
    if (days > 0) return `${days}天 ${hours}小时`;
    if (hours > 0) return `${hours}小时 ${minutes}分`;
    return `${minutes}分钟`;
  };
  return {
    formatPrice,
    formatDate,
    formatRemainingTime
  };
}
export {
  useBizFormat as u
};
//# sourceMappingURL=useBizFormat-D_CzFEgD.js.map
