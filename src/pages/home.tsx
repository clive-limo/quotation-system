import type { FC } from 'react';

import { PagesLayout } from '@/layouts/PagesLayout';
import HomeModule from '@/modules/home_module';

const Home: FC = () => {
  return (
    <PagesLayout>
      <HomeModule />
    </PagesLayout>
  );
};

export default Home;
