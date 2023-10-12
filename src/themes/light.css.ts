import { vars } from '@/themes/theme.css';
import { createTheme } from '@vanilla-extract/css';

export const lightTheme = createTheme(vars, {
  text: '#0e0e10',
  background: '#ffffff',
  bottomNavigationBackground: '#ffffff',
  highlight: '#7dd3fc',
  icon: '#18181b',
});
