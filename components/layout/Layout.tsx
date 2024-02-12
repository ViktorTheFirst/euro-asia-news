import { getUserToken } from '@/auth/utils/users';
import AppBar from '../appBar/AppBar';

export default function Layout({ children }: any) {
  const token = getUserToken();
  return (
    <>
      {token && <AppBar />}
      <main>{children}</main>
    </>
  );
}
