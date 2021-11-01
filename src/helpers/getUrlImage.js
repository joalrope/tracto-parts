//import noImage from '../assets/images/no-image.jpeg';

export const getUrlImage = (code, trademark) => {
  let newTrademark = trademark;

  if (
    (trademark.toLowerCase() === 'cat' || trademark.toLowerCase() === 'ctp') &&
    !imageExist(`${urlImages[trademark.toLowerCase()]}${code}.jpg`)
  ) {
    newTrademark = `${trademark}2`;
  }
  return `${urlImages[newTrademark.toLowerCase()]}${code}.jpg`;
};

const urlImages = {
  cat: 'https://www.ctpsales.costex.com:11443/Webpics/BigPictures/',
  ctp: 'https://www.ctpsales.costex.com:11443/Webpics/BigPictures/',
  cat2: 'https://www.ctpsales.costex.com:11443/Webpics/220x220/',
  ctp2: 'https://www.ctpsales.costex.com:11443/Webpics/220x220/',
  macbee: 'https://www.',
  donaldson: 'https://www.',
};

const imageExist = (url) => {
  const img = new Image();
  img.src = url;
  return img.height != 0 ? true : false;
};
