import { getJsonEntries } from './get-json-entries';

export const jsonToTabular = (json, mode = 'landscape') => {
  if (json === null) return null;

  const jsonEntries = getJsonEntries(json);

  return mode === 'portrait' ? toPortrait(jsonEntries) : toLandscape(jsonEntries);
};

const pushEmptyItem = (entry) => {
  let result = [];
  let addIndex = 0;

  entry.forEach((item, index) => {
    result.push(item);

    if (item[0] > 1 && index + 1 !== entry.length) {
      result.splice(index + addIndex + 1, 0, []);
      addIndex++;
    }
  });
  return result;
};

const toPortrait = (json) => {
  const result = {};

  Object.entries(json).map((entry) => {
    const jsonWithEmpty = pushEmptyItem(entry[1]);
    const keyData = [];

    jsonWithEmpty.forEach((value) => {
      if (value[0] && value[1]) keyData.push({ value: value[1], span: value[0] });
    });

    return (result[entry[0]] = keyData);
  });

  return result;
};

const toLandscape = (json) => {
  const result = {};

  Object.entries(json).map((entry) => {
    const jsonWithEmpty = pushEmptyItem(entry[1]);

    return jsonWithEmpty.forEach((value, id) => {
      if (value[0] && value[1]) {
        if (!result[id]) result[id] = {};
        result[id][value[2]] = { value: value[1], span: value[0] };
      }
    });
  });

  return result;
};
