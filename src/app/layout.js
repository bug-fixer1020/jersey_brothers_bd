import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import Providers from './providers';

export const metadata = {
  title: 'Jersey Brother BD',
  description: 'Premium jersey store',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-black">

        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>

      </body>
    </html>
  );
}