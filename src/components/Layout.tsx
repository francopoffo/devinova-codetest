import { ReactNode } from "react";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex flex-col items-center gap-4">
      <header className="mb-6">
        <Link href="/">
          <h1 className="p-8 text-2xl font-bold">Devinova Code Test</h1>
        </Link>
        <nav className="flex gap-3 text-lg font-bold items-center justify-between m-auto">
          <Link href="/">English</Link>
          <Link href="/portuguese">Portuguese</Link>
          <Link href="/spanish">Spanish</Link>
        </nav>
      </header>

      {children}
    </main>
  );
};

export default Layout;
