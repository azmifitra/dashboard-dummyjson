import React from 'react';

import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Navbar />
        <div className="mt-[60px] min-h-screen w-full bg-violet-100 md:ml-[192px] md:mt-0 lg:ml-[256px]">{children}</div>
      </div>
    </>
  );
}

export default Layout;
