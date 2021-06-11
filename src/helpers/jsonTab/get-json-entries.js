let jsonEntries = {};

export const getJsonEntries = (json) => {
  let i = 0;

  const jsonData = getJsonData(json);
  const maxLen = getMaxLen(jsonData);

  Object.values(jsonEntries).map((entry) => {
    entry.map((item, id) => {
      if (maxLen > entry.length && entry.length === id + 1) {
        item[0] = maxLen;
      }
      if (item.length === 3) item.push(i);
      return null;
    });
    i++;
    return null;
  });

  return jsonData;
};

const getJsonData = (json, lastSpan = 1, reset = true) => {
  if (reset) jsonEntries = {};

  Object.keys(json).map((k) => {
    if (json[k] && typeof json[k] === 'object') {
      if (Array.isArray(json[k]) && typeof json[k][0] !== 'object') {
        return Object.keys(json[k]).map((index) => pushItem([lastSpan, json[k][index], k]));
      }
      return getJsonData(json[k], getSpan(json[k]), false);
    }
    return pushItem([lastSpan, json[k], k]);
  });

  return jsonEntries;
};

const getMaxLen = (json) => {
  const lengths = [];

  Object.values(json).map((value) => {
    lengths.push(value.length);
    return null;
  });

  return Math.max.apply(null, lengths);
};

const pushItem = (item) => {
  const Items = jsonEntries[item[2]] || [];
  Items.push(item);
  jsonEntries[item[2]] = Items;
};

const getSpan = (data) => {
  let span = 1;
  if (typeof data === 'object') {
    Object.keys(data).map((key) => {
      if (typeof data[key] === 'object') {
        span = data[key].length;
      }
      if (Array.isArray(data[key])) {
        span = 1;
      }
      return null;
    });
  }

  return span;
};
