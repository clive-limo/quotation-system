import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

import QuotationModal from '@/components/home/components/AddQuoteModal';
import QuotesSummary from '@/components/home/components/QuotesSummary';

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
    <section className="relative h-[100] w-[100]">
      <div
        className={clsx(
          'absolute mx-[30vh] my-[20vh] h-[52vh] rounded-lg border-[1px] border-gray-300 shadow-xl',
          openCreateQuote ? 'visible' : 'invisible'
        )}
      >
        <QuotationModal visibility={openCreateQuote} customers={customers} />
      </div>
      <p>Quotations</p>
      <p>Summary</p>
      <QuotesSummary />
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
