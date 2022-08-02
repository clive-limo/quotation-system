import type { FC } from 'react';

import Sidebar from '@/components/home/components';

const HomeModule: FC = () => {
  return (
    <section className="h-full w-full">
      <Sidebar />
    </section>
  );
};

export default HomeModule;
