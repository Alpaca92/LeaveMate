import { vars } from '@/themes/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  backgroundColor: vars.bottomNavigationBackground,
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
  stroke: vars.icon,
  strokeWidth: '1.5px',
});

export const activeSvg = style({
  stroke: vars.highlight,
});
