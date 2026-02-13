function useBizFormat() {
  const formatDate = (date) => {
    if (!date) return "-";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "-";
      return d.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).replace(/\//g, "-");
    } catch (e) {
      return "-";
    }
  };
  return {
    formatDate
  };
}
export {
  useBizFormat as u
};
//# sourceMappingURL=useBizFormat-DFfhmR3x.js.map
