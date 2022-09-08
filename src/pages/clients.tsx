import { getCookie } from 'cookies-next';
import { prisma } from 'lib/prisma';
import type { GetServerSideProps } from 'next';
import router from 'next/router';
import type { FC } from 'react';
import { useEffect } from 'react';

import { PagesLayout } from '@/layouts/PagesLayout';
import ClientsModule from '@/modules/Clients';

interface ClientProps {
  customers: {
    id: number;
    customerName: string;
    customerEmail: string;
  }[];
}

const Clients: FC<ClientProps> = ({ customers }) => {
  useEffect(() => {
    const token = getCookie('authToken');
    if (!token) {
      router.push('/404');
    }
  }, []);
  return (
    <PagesLayout>
      <ClientsModule customers={customers} />
    </PagesLayout>
  );
};

export default Clients;

export const getServerSideProps: GetServerSideProps = async () => {
  const customers = await prisma.customer.findMany({});

  return {
    props: {
      customers,
    },
  };
};
