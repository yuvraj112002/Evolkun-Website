// app/layout.js
import Header from '@/components/Navbar/Header';
import '@/styles/globals.scss';
import "../styles/globals.scss"
import { UserProvider } from '@/context/UserContext';
export const metadata = {
  title: 'Evolkun | Personalized Digital Strategies',
  description: 'Build smarter, not harder. Get real-time digital solutions powered by logic.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div>
        <Header/>
        <main>{children}</main>
        </div>
        </UserProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
