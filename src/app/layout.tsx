import type { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css"; //ui핵심

//클라이언트용
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

