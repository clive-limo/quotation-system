import type { FC } from 'react';

import InvoiceSummary from '@/components/invoice/components/InvoiceSummary';
import InvoiceTable from '@/components/invoice/components/RecordTable';

interface InvoiceModuleProps {
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

const InvoiceModule: FC<InvoiceModuleProps> = ({
  items,
  quotations,
  invoices,
}) => {
  return (
    <div className="h-full w-full overflow-hidden px-[3%]">
      <div className="h-[150px]">
        <p className="my-auto flex-1 py-[0.6%] text-4xl font-bold text-gray-600">
          Dashboard
        </p>
        <p className="my-auto flex-1 text-2xl font-normal text-gray-600">
          Summary
        </p>
      </div>
      <div className="h-[20%] w-full">
        <InvoiceSummary
          items={items}
          quotations={quotations}
          invoices={invoices}
        />
      </div>
      <div className="h-[60%] w-full rounded-[50px] border-[1px] border-gray-300 p-3 shadow-md md:mt-[80px]">
        <p className="px-[2%] py-[3%] text-3xl font-bold text-gray-600">
          Invoices
        </p>
        <InvoiceTable items={items} invoices={invoices} />
      </div>
    </div>
  );
};

export default InvoiceModule;
