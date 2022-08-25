import { prisma } from 'lib/prisma';
import type { GetServerSideProps } from 'next';
import type { FC } from 'react';

import { PagesLayout } from '@/layouts/PagesLayout';
import ClientsModule from '@/modules/Clients';

interface ClientProps {
  customers: {
    id: number;
    customerName: string;
    customerEmail: string;
  }[];
}

const Clients: FC<ClientProps> = ({ customers }) => (
  <PagesLayout>
    <ClientsModule customers={customers} />
  </PagesLayout>
);

export default Clients;

export const getServerSideProps: GetServerSideProps = async () => {
  const customers = await prisma.customer.findMany({});

  return {
    props: {
      customers,
    },
  };
};
