// app/layout.js
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}