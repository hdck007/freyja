import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="h-16 bg-[#007FFA] flex flex-wrap justify-around items-center">
        <Link href="/" className="w-[300px] text-center text-white">
          Drag and drop
        </Link>
        <Link href="/css" className="w-[300px] text-center text-white">
          CSS thing
        </Link>
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
