import AppBar from '../appBar/AppBar';
import Navbar from '../navbar/Navbar';

export default function Layout({ children }: any) {
  return (
    <>
      <AppBar />
      <main>{children}</main>
    </>
  );
}
