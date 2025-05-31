// app/layout.js
import Header from "@/components/Navbar/Header";
import "@/styles/globals.scss";
import "../styles/globals.scss";
import { AuthProvider } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
export const metadata = {
  title: "Evolkun | Personalized Digital Strategies",
  description:
    "Build smarter, not harder. Get real-time digital solutions powered by logic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
         <GoogleOAuthProvider clientId="149429041138-eh7kkvthd54qiatmaadc04gq89k2enc2.apps.googleusercontent.com">
         <AuthProvider>
        <div>
          <Header />
          <main>{children}</main>
        </div>
        {/* <Footer /> */}
        </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
