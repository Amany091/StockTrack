
import "./globals.css";
import 'react-toastify/ReactToastify.css';
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    absolute: "products",
    default: "products | StockTrack",
    template: "%s - products",
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>
) {
  const cookieStore = cookies()
  const cookie = (await cookieStore).get("access_token")?.value
  const token: string | undefined = cookie?.split(" ")[1]

  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar token={token} />
          <main>
            <ToastContainer />
            {children}
          </main>
        </Providers>
      </body>

    </html>
  );
}
