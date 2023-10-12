import { style } from '@vanilla-extract/css';

export const container = style({
  borderTop: '1px solid black',
});

export const icons = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

export const icon = style({
  width: '30px',
});

export const svg = style({
  stroke: 'black',
  strokeWidth: '1.5px',
});
