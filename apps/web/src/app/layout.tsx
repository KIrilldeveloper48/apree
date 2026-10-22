import type { Metadata } from 'next';

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
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
