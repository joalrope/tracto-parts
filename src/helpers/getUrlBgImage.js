export const getUrlBgImage = (path) => {
  return `${urlImages[path]}`;
};

export const getContentStyles = (path) => {
  console.log(contentStyles[path]);
  return `${contentStyles[path]}`;
};

const urlImages = {
  '/home': null,
  '/login': 'https://cdn.pixabay.com/photo/2017/12/11/20/06/spanner-3013135_960_720.jpg',
  '/register': 'https://cdn.pixabay.com/photo/2016/10/06/19/57/engine-1719889_960_720.jpg',
};

const contentStyles = {
  '/home': { backgroundColor: '$secondary' },
  '/login': { backgroundImage: getUrlBgImage('/login') },
  '/register': { backgroundImage: getUrlBgImage('/login') },
};
