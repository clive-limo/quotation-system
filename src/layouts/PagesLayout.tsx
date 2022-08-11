import type { FC, ReactNode } from 'react';

import Sidebar from '@/components/SideBar';

type IMainProps = {
  children: ReactNode;
};

const PagesLayout: FC<IMainProps> = ({ children }) => {
  return (
    <section className="h-[100vh] w-[100vw]">
      <Sidebar />
      <div>{children}</div>
    </section>
  );
};

export { PagesLayout };
