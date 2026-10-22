'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { appTheme } from './app-theme';
import type { IAppThemeProviderProps } from './app-theme-provider-props.types';

export function AppThemeProvider({ children }: IAppThemeProviderProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
