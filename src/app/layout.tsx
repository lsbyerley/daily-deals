import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Daily Deals',
  description: 'Find a deal for any day of the week',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main className='min-h-screen bg-background flex flex-col items-center'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
