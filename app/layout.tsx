import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "600"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentalCar",
  description:
    "RentalCar is an app for searching, filtering, and booking your perfect rental car.",
  openGraph: {
    title: "RentalCar",
    description:
      "RentalCar is an app for searching, filtering, and booking your perfect rental car.",
    url: "rental-car-p16d.vercel.app",
    images: [
      {
        url: "/home-bg.jpg",
        width: 1200,
        height: 630,
        alt: "RentalCar Open Graph image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RentalCar",
    description:
      "RentalCar is an app for searching, filtering, and booking your perfect rental car.",
    images: ["/home-bg.jpg"],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <TanStackProvider>
          <Header />
          <main className="container">{children}</main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              success: {
                style: {
                  background: "#ffffff",
                  color: "#000000",
                },
                iconTheme: {
                  primary: "#4caf50",
                  secondary: "#ffffff",
                },
              },
              error: {
                style: {
                  background: "#ffffff",
                  color: "#000000",
                },
                iconTheme: {
                  primary: "#e53935",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </TanStackProvider>
      </body>
    </html>
  );
}
