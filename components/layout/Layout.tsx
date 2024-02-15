import { useSelector } from 'react-redux';
import AppBar from '../appBar/AppBar';
import { getHouseholdId } from '@/store/Auth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

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
