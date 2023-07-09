import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Friendship Dare",
  description:
    "Looking for fun and exciting ways to strengthen your friendships? Explore our collection of Friendship Dare Games designed specifically for sharing on WhatsApp! Discover a wide range of entertaining and interactive dares that will bring laughter, joy, and bonding experiences to your friendships. From hilarious challenges to heartfelt questions, these games are perfect for creating memorable moments and deepening your connections. Share these Friendship Dare Games with your friends today and embark on a journey of laughter, surprises, and everlasting camaraderie. Start spreading the joy and strengthening your bonds through these engaging WhatsApp dare games!",
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
