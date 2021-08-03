export const getUrlBgImage = (path) => {
  return `${urlBgImages[path]}`;
};

const urlBgImages = {
  '/home': null,
  '/login': 'https://cdn.pixabay.com/photo/2017/12/11/20/06/spanner-3013135_960_720.jpg',
  '/register': 'https://cdn.pixabay.com/photo/2016/10/06/19/57/engine-1719889_960_720.jpg',
};
