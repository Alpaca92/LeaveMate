import { vars } from '@/themes/theme.css';
import { createTheme } from '@vanilla-extract/css';

export const darkTheme = createTheme(vars, {
  text: '#ffffff',
  background: '#121212',
  bottomNavigationBackground: '#232323',
  highlight: '#e5e5e5',
  icon: '#5c5c5c',
});
