import { useMemo } from 'react';
import { useRouter } from 'next/router';

import AppBar from '../appBar/AppBar';
import Footer from '../footer/Footer';

export default function Layout({ children }: any) {
  const router = useRouter();

  const showTools = useMemo(() => {
    const condition =
      router.route === '/login' || router.route === '/registration';
    return !condition;
  }, [router.route]);

  return (
    <>
      {showTools && <AppBar />}
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#cfcfcf',
        }}
      >
        {children}
      </main>
      {showTools && <Footer />}
    </>
  );
}
