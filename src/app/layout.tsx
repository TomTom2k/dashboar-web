import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Aside from "@/components/layout/aside";
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import Header from "@/components/layout/header";
import { UserProvider } from "@/contexts/user-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <UserProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
              <Aside />
              <div className="sm:pl-14 h-screen flex flex-col">
                <Header />
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </UserProvider>
        </TooltipProvider>
      </body>
    </html >
  );
}
