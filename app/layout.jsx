import "./globals.css";

export const metadata = {
  title: "JAMS INVESTMENT | Pro Network",
  description: "Elite Society of Finance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="no-scrollbar antialiased">
        {children}
      </body>
    </html>
  );
}
