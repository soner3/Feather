import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";
import Header from "./_ui/Header";

const inter = Signika({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feather",
  description: "Chat Forum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-sky-500 duration-500 dark:bg-slate-900`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
