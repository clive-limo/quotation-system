import type { FC } from 'react';

import RecordCard from './components';

interface RecordsProps {
  quotations: {
    id: number;
    customer: {
      id: string;
      customerName: string;
      customerEmail: string;
    };
    quoteItems: {
      id: number;
      itemName: string;
      itemQuantity: number;
      itemPrice: number;
    };
    dateCreated: string;
    dateApproved: string;
  }[];
}

const RecordTable: FC<RecordsProps> = ({quotations}) => {
  return (
    <div className="mx-10 mt-3 rounded-lg border-[1px] border-gray-400">
      <div className="flex flex-row rounded-lg bg-gray-400 p-3">
        <p className="flex-1 text-center">Customer</p>
        <p className="flex-1 text-center">Amount</p>
        <p className="flex-1 text-center">Date Created</p>
        <p className="flex-1 text-center">Date Approved</p>
        <p className="flex-[0.7] text-center">Actions</p>
      </div>
      <div className="my-1 h-[45vh] overflow-y-auto p-1">
        <RecordCard />
      </div>
    </div>
  );
};

export default RecordTable;
