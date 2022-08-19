import type { FC, ReactNode } from 'react';

import Sidebar from '@/components/SideBar';

type IMainProps = {
  children: ReactNode;
};

const PagesLayout: FC<IMainProps> = ({ children }) => {
  return (
    <section className="flex h-screen w-screen flex-col md:flex-row">
      <div className="h-full flex-[1.2]">
        <Sidebar />
      </div>
      <div className="h-full flex-[5]">{children}</div>
    </section>
  );
};

export { PagesLayout };
