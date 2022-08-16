import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import type { FC } from 'react';

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
    dateApproved: string;
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
  return (
    <PagesLayout>
      <HomeModule customers={customers} quotations={quotations} items={items} />
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
      dateApproved: true,
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
