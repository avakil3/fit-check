import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit Check",
  description: "An outfit recommender AI tool",
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
          <PromptInput />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
