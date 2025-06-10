// app/layout.js
"use client";
import Header from "@/components/Navbar/Header";
import "@/styles/globals.scss";
import "../styles/globals.scss";
import { AuthProvider } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer/page";
import styles from "@/styles/modules/layout.module.scss"
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }) {
   const pathname = usePathname();
     const hideFooterPaths = ['/signup', '/signin','/web-development','/app-development','/comming-soon'];
  return (
    <html lang="en">
      <body>
         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
         <AuthProvider>
        <div className={styles.pageWrapper}>
          <Header />
          <main className={styles.main}>{children}</main>
        {!hideFooterPaths.includes(pathname) && <Footer />}
        </div>
         <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
        </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
