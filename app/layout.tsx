import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit Check AI",
  description: "An AI outfit recommender tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"h-screen bg-slate-50"}>
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
