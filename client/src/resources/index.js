import bg from "./Dummy/bg.png";
import dummy from "./Dummy/slide.json";
import journal from "./Dummy/empty_bud.jpg";
import user from "./Dummy/empty_user.png";
import img0 from "./recomendPlant/IMG_0.jpg";
import img1 from "./recomendPlant/IMG_1.jpg";
import img2 from "./recomendPlant/IMG_2.jpg";
import img3 from "./recomendPlant/IMG_3.jpg";
import img4 from "./recomendPlant/IMG_4.jpg";
import img5 from "./recomendPlant/IMG_5.jpg";
import img6 from "./recomendPlant/IMG_6.jpg";

import l from "./slideArrow/left-arrow.png";
import r from "./slideArrow/right-arrow.png";

dummy.slide[0].src = img0;
dummy.slide[1].src = img1;
dummy.slide[2].src = img2;
dummy.slide[3].src = img3;
dummy.slide[4].src = img4;
dummy.slide[5].src = img5;
dummy.slide[6].src = img6;

const asset = {
  bg,
  empty: {
    journal,
    user,
  },
  slide: dummy.slide,
  proverbs: dummy.proverbs,
};

export { bg };

export { dummy };
console.log(dummy, img0, dummy.slide);
export const empty = {
  journal,
  user,
};

export const slide = {
  slide: dummy.slide,
};

export const arrow = {
  l,
  r,
};

export default asset;
