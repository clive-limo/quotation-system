import { getCookie } from 'cookies-next';
import { prisma } from 'lib/prisma';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect } from 'react';

import { PagesLayout } from '@/layouts/PagesLayout';
import HomeModule from '@/modules/Home';

interface HomeProps {
  customers: {
    id: string;
    customerName: string;
    customerEmail: string;
  }[];
  quotations: {
    id: number;
    customer: {
      id: string;
      customerName: string;
      customerEmail: string;
    };
    dateCreated: string;
    quoteStatus: boolean;
  }[];
  items: {
    id: number;
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
    quotationId: number;
  }[];
}
const Home: FC<HomeProps> = ({ customers, quotations, items }) => {
  const router = useRouter();
  useEffect(() => {
    const token = getCookie('authToken');
    if (!token) {
      router.push('/404');
    }
  }, []);

  return (
    <PagesLayout>
      <HomeModule customers={customers} quotations={quotations} items={items} />
    </PagesLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const customers = await prisma.customer.findMany({
    select: {
      id: false,
      customerName: true,
      customerEmail: true,
    },
  });

  const quotations = await prisma.quotation.findMany({
    select: {
      id: true,
      customer: {
        select: {
          id: true,
          customerName: true,
          customerEmail: true,
        },
      },
      quotationItems: {
        select: {
          id: true,
          itemName: true,
          itemPrice: true,
          itemQuantity: true,
        },
      },
      dateCreated: true,
      quoteStatus: true,
      invoice: false,
      customerId: false,
    },
  });

  const items = await prisma.items.findMany();

  return {
    props: {
      customers,
      quotations: JSON.parse(JSON.stringify(quotations)),
      items,
    },
  };
};
