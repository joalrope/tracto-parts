//import noImage from '../assets/images/no-image.jpeg';

export const getUrlImage = async (code, trademark) => {
  console.log(code, trademark);
  console.log(`${urlImages[trademark.toLowerCase()]}${code}.jpg`);
  return `${urlImages[trademark.toLowerCase()]}${code}.jpg`;
};

export const urlImages = {
  cat: 'https://www.ctpsales.costex.com:11443/Webpics/BigPictures/',
  ctp: 'https://www.ctpsales.costex.com:11443/Webpics/BigPictures/',
  macbee: 'https://www.',
  donaldson: 'https://www.',
};
