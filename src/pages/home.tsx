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
    quoteItems: {
      id: number;
      itemName: string;
      itemQuantity: number;
      itemPrice: number;
    };
    dateCreated: Date;
    dateApproved: Date;
  }[];
}
const Home: FC<HomeProps> = ({ customers, quotations }) => {
  return (
    <PagesLayout>
      <HomeModule customers={customers} quotations={quotations} />
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

  return {
    props: {
      customers: { customers },
      quotations: { quotations },
    },
  };
};
