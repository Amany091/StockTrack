
import "./globals.css";
import 'react-toastify/ReactToastify.css';
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    absolute: "products",
    default: "products | StockTrack",
    template: "%s - products",
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>
  ) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>
            <ToastContainer />
              {children}
          </main>
        </Providers>
      </body>

    </html>
  );
}
