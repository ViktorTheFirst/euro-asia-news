import { useMemo } from 'react';
import { useRouter } from 'next/router';

import AppBar from '../appBar/AppBar';

export default function Layout({ children }: any) {
  const router = useRouter();

  const showAppBar = useMemo(() => {
    const condition =
      router.route === '/login' || router.route === '/registration';
    return !condition;
  }, [router.route]);

  return (
    <>
      {showAppBar && <AppBar />}
      <main>{children}</main>
    </>
  );
}
