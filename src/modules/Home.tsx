import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

import QuotationModal from '@/components/home/components/AddQuoteModal';
import QuotesSummary from '@/components/home/components/QuotesSummary';
import RecordTable from '@/components/home/components/RecordsTable';

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
const HomeModule: FC<HomeProps> = ({ customers, quotations, items }) => {
  const [openCreateQuote, setOpenCreateQuote] = useState(false);
  return (
    <section className="relative h-[100] w-[100]">
      <div
        className={clsx(
          'absolute z-10 mx-[30vh] my-[23vh] h-[52vh] rounded-lg border-[1px] border-gray-300 bg-white shadow-xl',
          openCreateQuote ? 'visible' : 'invisible'
        )}
      >
        <button
          className="absolute z-10 h-10 w-10 rounded-full border-[1px] border-gray-500 p-1"
          onClick={() => {
            setOpenCreateQuote(!openCreateQuote);
          }}
        >
          X
        </button>
        <QuotationModal visibility={openCreateQuote} customers={customers} />
      </div>
      <div>
        <p className="mx-10 mt-5 mb-1 flex-1 text-4xl font-bold text-gray-600">
          Quotations
        </p>
        <p className="my-4 mx-10 flex-1 text-2xl font-normal text-gray-600">
          Summary
        </p>
      </div>
      <QuotesSummary />
      <div className="mx-10 my-4 flex h-[7vh] flex-row">
        <p className="my-auto flex-1 text-2xl font-normal text-gray-600">
          Records
        </p>
        <button
          className="m-auto h-[40px] flex-[0.3] rounded-lg bg-blue-500 px-6 py-2 text-[16px] font-bold text-white"
          onClick={() => {
            setOpenCreateQuote(!openCreateQuote);
          }}
        >
          Add Quote
        </button>
        <div className="my-auto ml-2 flex-[0.6] rounded-lg border-[1px] border-gray-400">
          <input placeholder="Search" className="p-2" />
        </div>
      </div>
      <RecordTable quotations={quotations} items={items} />
    </section>
  );
};

export default HomeModule;
