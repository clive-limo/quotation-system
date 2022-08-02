import type { FC } from 'react';

import { MainLayout } from '@/layouts/MainLayout';
import HomeModule from '@/modules/home_module';

const Home: FC = () => (
  <MainLayout>
    <HomeModule />
  </MainLayout>
);

export default Home;
