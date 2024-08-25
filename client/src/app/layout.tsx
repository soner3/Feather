import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import StoreProvider from "./StoreProvider";
import Toast from "@/components/Toast";
import ClientAuth from "@/components/ClientAuth";
import ApplyTheme from "@/ui/ApplyTheme";

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
        className={`${inter.className} flex h-screen flex-col bg-white text-black duration-500 dark:bg-slate-900 dark:text-white`}
      >
        <StoreProvider>
          <ApplyTheme />
          <ClientAuth />
          <Toast />
          <Header />
          <main className="flex flex-1">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
