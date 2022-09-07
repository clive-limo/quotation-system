import { prisma } from 'lib/prisma';
import type { GetServerSideProps } from 'next';
import type { FC } from 'react';

import { MainLayout } from '@/layouts/MainLayout';
import MailModule from '@/modules/Mail';

interface IProps {
  items: {
    id: number;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    quotationId: number;
  }[];
}

const CreateMail: FC<IProps> = ({ items }) => {
  const name = sessionStorage.getItem('customerName') || 'None Selected';
  return (
    <MainLayout>
      <MailModule customerName={name} items={items} />
    </MainLayout>
  );
};

export default CreateMail;

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await prisma.items.findMany();

  return {
    props: {
      items,
    },
  };
};
