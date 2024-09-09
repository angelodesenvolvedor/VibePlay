import React from 'react';
import { HomeContextProvider } from './context/HomeContext'; // Ajuste o caminho conforme necessário

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HomeContextProvider>
          {children}
        </HomeContextProvider>
      </body>
    </html>
  );
}