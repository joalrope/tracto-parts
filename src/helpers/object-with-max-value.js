export const objectMax = (array, key) => {
  const targetValues = array.map((obj) => obj[key]);
  const maxValue = Math.max(...targetValues);
  const maxValueIndex = targetValues.indexOf(maxValue);
  return array[maxValueIndex];
};

export const keyExists = (array, value) => {
  let result = false;
  array.map((obj) => {
    if (Object.values(obj).includes(value)) result = true;
  });
  return result;
};
