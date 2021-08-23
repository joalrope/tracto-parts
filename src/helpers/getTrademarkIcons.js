import baldwin from '../assets/images/baldwin.png';
import cat from '../assets/images/cat.png';
import ctp from '../assets/images/ctp.png';
import donaldson from '../assets/images/donaldson.png';
import mcbee from '../assets/images/mcbee.png';

const icons = {
  baldwin,
  cat,
  ctp,
  donaldson,
  ['mc bee']: mcbee,
};

export const getTrademarkIcons = (trademark) => {
  return icons[trademark];
};
