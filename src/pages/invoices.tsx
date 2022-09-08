import { getCookie } from 'cookies-next';
import { prisma } from 'lib/prisma';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect } from 'react';

import { PagesLayout } from '@/layouts/PagesLayout';
import InvoiceModule from '@/modules/Invoice';

interface InvoiceProps {
  items: {
    id: number;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    quotationId: number;
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
  invoices?: {
    id: number;
    status: number;
    dateCreated: string;
    datePaid: string;
    quotationId: number;
  }[];
}

const Invoices: FC<InvoiceProps> = ({ items, quotations, invoices }) => {
  const router = useRouter();
  useEffect(() => {
    const token = getCookie('authToken');
    if (!token) {
      router.push('/404');
    }
  }, []);
  return (
    <PagesLayout>
      <InvoiceModule
        items={items}
        quotations={quotations}
        invoices={invoices}
      />
    </PagesLayout>
  );
};

export default Invoices;

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await prisma.items.findMany({
    select: {
      id: true,
      itemName: true,
      itemPrice: true,
      itemQuantity: true,
      quotation: false,
      quotationId: true,
    },
  });

  const invoices = await prisma.invoice.findMany({
    select: {
      id: true,
      status: true,
      dateCreated: true,
      datePaid: true,
      quotationId: true,
      quotation: false,
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
      dateCreated: true,
      quoteStatus: true,
      invoice: false,
      quotationItems: false,
      customerId: false,
    },
  });

  return {
    props: {
      items,
      quotations: JSON.parse(JSON.stringify(quotations)),
      invoices: JSON.parse(JSON.stringify(invoices)),
    },
  };
};
