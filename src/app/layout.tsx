import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import RotatingLogo from "./components/RotatingLogo";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ToastNotification from "./components/ToastNotification";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brewza Coffee Roasters - High-End Artisan Coffee",
  description: "Artisan roasting that honors the origin. Experience quiet luxury in every cup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="bg-background text-on-background font-body-md antialiased flex flex-col min-h-screen relative">
        <CartProvider>
          <Navbar />
          {children}
          <CartDrawer />
          <ToastNotification />
          <RotatingLogo />
        </CartProvider>
      </body>
    </html>
  );
}
