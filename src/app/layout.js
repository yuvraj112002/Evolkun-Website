// app/layout.js
import Header from '@/components/Navbar/Header';
import '@/styles/globals.scss';
import "../styles/globals.scss"
import { ClerkProvider } from '@clerk/nextjs';
export const metadata = {
  title: 'Evolkun | Personalized Digital Strategies',
  description: 'Build smarter, not harder. Get real-time digital solutions powered by logic.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ClerkProvider>
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
