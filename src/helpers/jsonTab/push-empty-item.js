export const pushEmptyItem = (entry) => {
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
