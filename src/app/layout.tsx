import './globals.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'
import Loading from './loading';
import { LocationStoreProvider } from '@/providers/LocationStoreProvider';
import HydrateStore from '@/components/HydrateStore';

export const metadata = {
  title: 'Daily Deals',
  description: 'Find a deal for any day of the week',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <LocationStoreProvider>
            <HydrateStore />
            <Suspense fallback={<Loading />} />
            <Header user={user} profile={profile} />
            <main className='min-h-screen flex flex-col items-center'>
              {children}
            </main>
            <Footer />
          </LocationStoreProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
