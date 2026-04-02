/**
 * app/layout.jsx
 * 這是 Next.js 應用的根佈局。
 * 它負責定義 HTML 結構、載入字體以及全局樣式。
 */

import "./globals.css";

// 定義頁面元數據（SEO）
export const metadata = {
  title: "JAMS INVESTMENT | Pro Network",
  description: "Elite Society of Finance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        {/* 載入 Google Fonts: League Spartan, Inter, Libre Caslon Text */}
        <link 
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="no-scrollbar antialiased">
        {/* children 將會是 page.jsx 的內容 */}
        {children}
      </body>
    </html>
  );
}
