export const getImageFromUrl = (url) => {
  console.log(url);
  return fetch(url, { mode: 'no-cors' })
    .then((resp) => {
      const result = resp.json();
      console.log(result);
      return result;
    })
    .then((blob) => {
      console.log(blob);
      return { ok: false };
    });
};
