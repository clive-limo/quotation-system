import { prisma } from 'lib/prisma';
import type { GetServerSideProps } from 'next';
import type { FC } from 'react';

import Login from '@/components/authentication/login';
import Register from '@/components/authentication/register';
import { MainLayout } from '@/layouts/MainLayout';

interface UserProps {
  userData: {
    userId: string;
    userEmail: string;
    userPassword: string;
  }[];
}

const AuthenticationPage: FC<UserProps> = ({ userData }) => {
  return (
    <MainLayout>
      <section className="flex h-screen w-screen flex-col md:flex-row">
        <div className=" flex h-[25%] w-full bg-blue-800 md:h-full md:w-[70%]">
          <img
            className="mx-auto"
            src="\assets\images\im-person.svg"
            alt="Person Image"
            height={500}
            width={500}
          />
        </div>
        <div className="mx-auto flex flex-col md:w-[30%] md:overflow-y-auto ">
          <Login userData={userData} />
          <Register />
        </div>
      </section>
    </MainLayout>
  );
};

export default AuthenticationPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const userData = await prisma?.user.findMany({});

  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
    },
  };
};
