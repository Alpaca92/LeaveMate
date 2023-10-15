import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

globalStyle(`${container} > p`, {
  fontSize: '30px',
  fontWeight: '600',
});

export const form = style({
  width: '80%',
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle(`${form} > *`, {
  height: '40px',
  borderRadius: '15px',
  fontSize: '16px',
});

globalStyle(`${form} > input`, {
  padding: '0px 20px',
});

globalStyle(`${form} > *:not(input:first-child)`, {
  marginTop: '10px',
});
