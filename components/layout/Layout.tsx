import AppBar from '../appBar/AppBar';

export default function Layout({ children }: any) {
  return (
    <>
      <AppBar />
      <main>{children}</main>
    </>
  );
}
