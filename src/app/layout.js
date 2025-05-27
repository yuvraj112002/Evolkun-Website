// app/layout.js
import Header from '@/components/Navbar/Header';
import '@/styles/globals.scss';
import "../styles/globals.scss"
import { ClerkProvider } from '@clerk/nextjs';
export const metadata = {
  title: 'Evolkun | Personalized Digital Strategies',
  description: 'Build smarter, not harder. Get real-time digital solutions powered by logic.',
};
const appearance = {
  // elements: {
  //   card: {
  //     background: `#e4e4e4`,
  //     color: "#fff",
  //     borderRadius: "12px",
  //   },
  //   headerTitle: {
  //     color: "#ffffff",
  //     fontSize: "24px",
  //   },
  //   formFieldInput: {
  //     backgroundColor: "#1a1a1a",
  //     color: "#ffffff",
  //   },
  //   footerActionText: {
  //     color: "#aaaaaa",
  //   },
  // },
  variables: {
    colorPrimary: "#e4e4e4",   // accent color
    colorText: "#000",      // global text
    colorBackground: '#e4e4e4', // global background
    fontFamily: 'poppins',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ClerkProvider appearance={appearance}>
          <div>
        <Header/>
        <main>{children}</main>
        </div>
        </ClerkProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
