import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

import QuotationModal from '@/components/home/components/AddQuoteModal';

interface HomeProps {
  customers: {
    id: string;
    customerName: string;
    customerEmail: string;
  }[];
}
const HomeModule: FC<HomeProps> = ({ customers }) => {
  const [openCreateQuote, setOpenCreateQuote] = useState(false);
  return (
    <section className="h-[100] w-[100]">
      <div
        className={clsx(
          'mx-auto my-[20vh] h-[52vh] w-[50vw] rounded-lg border-[1px] border-gray-300 shadow-xl',
          openCreateQuote ? 'visible' : 'invisible'
        )}
      >
        <QuotationModal visibility={openCreateQuote} customers={customers} />
      </div>
      <button
        className="m-2 bg-blue-500 px-6 py-2 text-[16px] font-bold text-white"
        onClick={() => {
          setOpenCreateQuote(!openCreateQuote);
        }}
      >
        Add Quote
      </button>
    </section>
  );
};

export default HomeModule;
