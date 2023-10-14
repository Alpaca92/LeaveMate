import { createThemeContract, fontFace, style } from '@vanilla-extract/css';

export const vars = createThemeContract({
  text: null,
  background: null,
  bottomNavigationBackground: null,
  highlight: null,
  icon: null,
});

const comicSans = fontFace({
  src: 'local("../assets/fonts/NanumSquare")',
});

export const base = style({
  fontFamily: comicSans,
});
