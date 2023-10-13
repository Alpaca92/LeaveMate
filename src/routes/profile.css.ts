import { vars } from '@/themes/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const listContainer = style({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  borderTop: `2px solid ${vars.highlight}`,
  borderBottom: `2px solid ${vars.highlight}`,
  padding: '30px 20px',
});

globalStyle(`${listContainer} > li`, {
  display: 'flex',
  padding: '15px 0px',
  justifyContent: 'space-between',
  borderTop: `1px solid gray`,
});

globalStyle(`${listContainer} > li:last-child`, {
  borderBottom: `1px solid gray`,
});
