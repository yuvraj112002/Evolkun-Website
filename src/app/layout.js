// app/layout.js
import Header from "@/components/Navbar/Header";
import "@/styles/globals.scss";
import "../styles/globals.scss";
import { AuthProvider } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer/page";
import styles from "@/styles/modules/layout.module.scss"
export const metadata = {
  title: "Evolkun | Personalized Digital Strategies",
  description:
    "Build smarter, not harder. Get real-time digital solutions powered by logic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
         <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
         <AuthProvider>
        <div className={styles.pageWrapper}>
          <Header />
          <main className={styles.main}>{children}</main>
        <Footer/>
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
