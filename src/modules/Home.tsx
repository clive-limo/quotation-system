import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

import QuotationModal from '@/components/home/components/AddQuoteModal';
import CreateMailModal from '@/components/home/components/CreateMailModal';
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
const HomeModule: FC<HomeProps> = ({ customers, quotations, items }) => {
  const [openCreateQuote, setOpenCreateQuote] = useState(false);
  const [openCreateMail, setOpenCreateMail] = useState(true);
  return (
    <section className="relative h-full w-full px-[3%]">
      <div
        className={clsx(
          'absolute z-10 mx-[15vw] my-[23vh] h-[55%] w-[60%] rounded-lg border-[1px] border-gray-300 bg-white shadow-xl',
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
      <div
        className={clsx(
          'absolute right-0 z-10 h-[100%] w-[50%] border-[1px] border-gray-300 bg-white shadow-xl',
          openCreateMail ? 'visible' : 'invisible'
        )}
      >
        <button
          className="absolute z-10 h-10 w-10 rounded-full border-[1px] border-gray-500 p-1"
          onClick={() => {
            setOpenCreateMail(!openCreateMail);
          }}
        >
          X
        </button>
        <CreateMailModal />
      </div>
      <div className="h-[15%]">
        <p className="my-auto flex-1 py-[0.6%] text-4xl font-bold text-gray-600">
          Quotations
        </p>
        <p className="my-auto flex-1 text-2xl font-normal text-gray-600">
          Summary
        </p>
      </div>
      <div className="h-[20%]">
        <QuotesSummary quotations={quotations} items={items} />
      </div>
      <div className="my-[2%] flex h-[5%] w-full flex-row">
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
          <input placeholder="Search" className="w-full rounded-lg p-2" />
        </div>
      </div>
      <div className="h-[50%] w-full">
        <RecordTable quotations={quotations} items={items} />
      </div>
    </section>
  );
};

export default HomeModule;
