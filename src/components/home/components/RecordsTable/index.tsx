import type { FC } from 'react';

import RecordCard from './components/RecordsCard';

interface RecordsProps {
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

const RecordTable: FC<RecordsProps> = ({ quotations, items }) => {
  return (
    <div className="mx-10 mt-3 rounded-lg border-[1px] border-gray-400">
      <div className="flex flex-row rounded-lg bg-gray-400 p-3">
        <p className="flex-1 text-center font-semibold text-blue-500">CUSTOMER</p>
        <p className="flex-1 text-center">AMOUNT</p>
        <p className="flex-1 text-center">DATE CREATED</p>
        <p className="flex-1 text-center">DATE APPROVED</p>
        <p className="flex-[0.7] text-center">ACTIONS</p>
      </div>
      <div className="my-1 h-[45vh] overflow-y-auto p-1">
        {quotations.map((quote) => {
          let total = 0;

          const quoteItemsArr = items.filter(
            (item) => item.quotationId === quote.id
          );

          total = quoteItemsArr.reduce((accumulator, item) => {
            return accumulator + item.itemPrice * item.itemQuantity;
          }, 0);

          return (
            <RecordCard
              key={quote.id}
              customerName={quote.customer.customerName}
              createDate={quote.dateCreated}
              approvedDate={quote.dateApproved}
              quoteTotal={total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'KSH',
                minimumFractionDigits: 2,
              })}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecordTable;
