import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import StoreProvider from "./StoreProvider";
import Toast from "@/components/Toast";
import ClientAuth from "@/components/ClientAuth";

const inter = Signika({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Feather",
    default: "Feather",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white text-green-500 duration-500 dark:bg-slate-900`}
      >
        <StoreProvider>
          <ClientAuth />
          <Toast />
          <Header />
          <main className="text-black dark:text-white">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
