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
  return {
    formatPrice,
    formatDate
  };
}

export { useBizFormat as u };
//# sourceMappingURL=useBizFormat-CLwhy_Ih.mjs.map
