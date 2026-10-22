import type { Metadata } from 'next';

import type { TRootLayoutProps } from './root-layout-props.types';

export const metadata: Metadata = {
  title: 'Apree',
  description: 'Доска задач',
};

export default function RootLayout({ children }: TRootLayoutProps) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
