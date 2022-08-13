import type { FC, ReactNode } from 'react';

import Sidebar from '@/components/SideBar';

type IMainProps = {
  children: ReactNode;
};

const PagesLayout: FC<IMainProps> = ({ children }) => {
  return (
    <section className="flex h-[100vh] w-full flex-row">
      <Sidebar />
      <div className="h-full w-full">{children}</div>
    </section>
  );
};

export { PagesLayout };
