export const objectMax = (array, key) => {
  const targetValues = array.map((obj) => obj[key]);
  const maxValue = Math.max(...targetValues);
  const maxValueIndex = targetValues.indexOf(maxValue);
  return array[maxValueIndex];
};
