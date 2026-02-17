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
    if (diff <= 0) return "\u5DF2\u8FC7\u671F";
    const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
    const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
    const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
    if (days > 0) return `${days}\u5929 ${hours}\u5C0F\u65F6`;
    if (hours > 0) return `${hours}\u5C0F\u65F6 ${minutes}\u5206`;
    return `${minutes}\u5206\u949F`;
  };
  return {
    formatPrice,
    formatDate,
    formatRemainingTime
  };
}

export { useBizFormat as u };
//# sourceMappingURL=useBizFormat-D_CzFEgD.mjs.map
