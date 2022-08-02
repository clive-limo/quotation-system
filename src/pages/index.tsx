import type { FC } from 'react';

import Login from '@/components/authentication/login';
import Register from '@/components/authentication/register';
import { MainLayout } from '@/layouts/MainLayout';

const Home: FC = () => {
  return (
    <MainLayout>
      <section className="flex h-full w-full flex-row">
        <div className=" flex h-full w-[75vw] bg-orange-300">
          <img
            className="mx-auto"
            src="\assets\images\im-person.svg"
            alt="Person Image"
            height={500}
            width={500}
          />
        </div>
        <div className="flex flex-col">
          <Login />
          <Register />
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
