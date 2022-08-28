import type { FC } from 'react';

import { MainLayout } from '@/layouts/MainLayout';
import MailModule from '@/modules/mail';

const CreateMail: FC = () => {
  const name = sessionStorage.getItem('customerName') || 'None Selected';
  return (
    <MainLayout>
      <MailModule customerName={name} />
    </MainLayout>
  );
};

export default CreateMail;
