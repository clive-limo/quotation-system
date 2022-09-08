import type { FC } from 'react';

import InvoiceCard from '../InvoiceCard';

interface InvoiceTableProps {
  items: {
    id: number;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    quotationId: number;
  }[];
  invoices?: {
    id: number;
    status: number;
    dateCreated: string;
    datePaid: string;
    quotationId: number;
  }[];
}

const InvoiceTable: FC<InvoiceTableProps> = ({ items, invoices }) => {
  return (
    <div className="flex h-[80%] w-full flex-col overflow-x-hidden rounded-[50px] border-[1px] border-gray-400">
      <div className="flex h-[40px] w-full flex-row bg-gray-400">
        <p className=" my-auto flex-1 text-center font-semibold text-blue-500">
          QUOTE N0.
        </p>
        <p className=" my-auto flex-1 text-center font-semibold text-blue-500">
          AMOUNT
        </p>
        <p className="my-auto flex-1 text-center font-semibold text-blue-500">
          DATE CREATED
        </p>
        <p className="my-auto flex-1 text-center font-semibold text-blue-500">
          STATUS
        </p>
        <p className="my-auto flex-1 text-center font-semibold text-blue-500">
          ACTIONS
        </p>
      </div>
      <div className="h-[50%]">
        {invoices?.map((invoice) => {
          return (
            <InvoiceCard
              key={invoice.id}
              items={items}
              id={invoice.id}
              quoteNumber={invoice.quotationId}
              invoiceStatus={invoice.status}
              dateCreated={invoice.dateCreated}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InvoiceTable;
