import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { AppThemeProvider } from './app-theme-provider';
import type { TRootLayoutProps } from './root-layout-props.types';

export const metadata: Metadata = {
  title: 'Apree',
  description: 'Доска задач',
};

export default function RootLayout({ children }: TRootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <AppRouterCacheProvider>
          <AppThemeProvider>{children}</AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
