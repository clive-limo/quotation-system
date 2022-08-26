import type { FC } from 'react';

import { MainLayout } from '@/layouts/MainLayout';
import MailModule from '@/modules/mail';

const CreateMail: FC = () => {
  return (
    <MainLayout>
      <MailModule />
    </MainLayout>
  );
};

export default CreateMail;
