import { vars } from '@/themes/theme.css';
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

globalStyle(`${container} > span`, {
  fontSize: '12px',
  marginTop: '10px',
  fontStyle: 'italic',
});

globalStyle(`${container} > span > a`, {
  color: vars.highlight,
  opacity: 0.7,
  textDecoration: 'none',
});

export const form = style({
  width: '80%',
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

globalStyle(`${form} > *`, {
  height: '40px',
  borderRadius: '10px',
  fontSize: '16px',
  borderStyle: 'none',
});

globalStyle(`${form} > input`, {
  padding: '0px 20px',
});

globalStyle(`${form} > button`, {
  marginTop: '30px',
  fontWeight: 600,
  cursor: 'pointer',
});
