//import homeBg from '../assets/images/home-bg.jpg'
export const getUrlBgImage = (path) => {
  return `${urlImages[path]}`;
};

export const getContentStyles = (path) => {
  return `${contentStyles[path]}`;
};

const urlImages = {
  //'/home': 'https://cdn.pixabay.com/photo/2017/08/04/15/46/wheel-loader-2580439__340.jpg',
  '/home': '',
  '/login': 'https://cdn.pixabay.com/photo/2020/01/13/14/44/checkout-4762569_960_720.jpg',
  '/register': 'https://cdn.pixabay.com/photo/2020/12/03/13/00/laptop-5800452_960_720.jpg',
};

const contentStyles = {
  '/home': { backgroundImage: getUrlBgImage('/home') },
  '/login': { backgroundImage: getUrlBgImage('/login') },
  '/register': { backgroundImage: getUrlBgImage('/register') },
};
