import "./globals.css";

export const metadata = {
  title: "Weather App",
  description: "Simple weather app using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
