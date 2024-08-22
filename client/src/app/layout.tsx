import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";
import Header from "./_ui/Header";
import ClientAuthWrapper from "./_components/ClientAuthWrapper";

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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white text-green-500 duration-500 dark:bg-slate-900`}
      >
        <ClientAuthWrapper>
          <Header />
          <main className="text-black dark:text-white">{children}</main>
        </ClientAuthWrapper>
      </body>
    </html>
  );
}
