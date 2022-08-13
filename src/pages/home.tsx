import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import type { FC } from 'react';

import { PagesLayout } from '@/layouts/PagesLayout';
import HomeModule from '@/modules/Home';

interface Customers {
  customers: {
    id: string;
    customerName: string;
    customerEmail: string;
  }[];
}
const Home: FC<Customers> = ({ customers }: Customers) => {
  return (
    <PagesLayout>
      <HomeModule customers={customers} />
    </PagesLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const customers = await prisma.customer.findMany({
    select: {
      id: false,
      customerName: true,
      customerEmail: true,
    },
  });

  return {
    props: {
      customers,
    },
  };
};
