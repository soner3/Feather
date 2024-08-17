import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";
import Header from "./_ui/Header";
import StoreProvider from "./_lib/StoreProvider";
import Toast from "./_components/Toast";

const inter = Signika({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feather",
  description: "Chat Forum",
};

export default function RootLayout({
  children,
  ...restProps
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-sky-500 duration-500 dark:bg-slate-900`}
      >
        <Toast />
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
