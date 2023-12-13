import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smiley shopy",
  description:
    "Shop Custom T Shirts at Smiley shoppy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
