module.exports = {
  getData(key) {
    const str = this.getDataValue(key);
    if (!str) return;
    const [, type, json] = str.match(/^\^\[(array|object)\](.*)/i);
    return JSON.parse(json);
  },
  setData(val, key) {
    var type = typeof val;
    if (Array.isArray(val)) {
      type = "array";
    }
    const str = `^[${type}]` + JSON.stringify(val);
    this.setDataValue(key, str);
  },
};
