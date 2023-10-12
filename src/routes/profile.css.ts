import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const listContainer = style({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  selectors: {
    li: {},
  },
});
