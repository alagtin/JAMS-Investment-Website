import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "JAMS Investment",
  description: "Official Website of JAMS Investment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="bg-black antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}