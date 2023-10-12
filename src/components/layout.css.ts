import { vars } from '@/themes/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100vh',
  display: 'grid',
  gridTemplateRows: '1fr 70px',
  backgroundColor: vars.background,
  color: vars.text,
});
