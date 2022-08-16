import type { FC } from 'react';

interface SummaryProps {
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
    }[];
    dateCreated: Date;
    dateApproved: Date;
    customerId: number;
  }[];
}

const QuotesSummary: FC = () => {
  return (
    <div className="flex h-[18vh] flex-row">
      <div className="ml-10 mr-3 flex flex-1 flex-row rounded-lg border-[1px] border-gray-400 p-2">
        <div className="relative flex flex-1 flex-col">
          <div className="w-[210px] flex-[0.5]">
            <p className="p-[2px] text-center text-xl font-bold text-gray-600">
              Approved Quotes
            </p>
            <div className="h-[1px] w-full bg-gray-400 px-3" />
          </div>
          <div className="flex-1 pl-4">
            <p className="text-[45px] font-light text-blue-400">
              ksh 30,000,000
            </p>
          </div>
        </div>
        <div className="right-0 my-auto mr-10 h-[120px] w-[120px] content-center rounded-full bg-gray-400 ">
          <p className="mt-[45px] text-center text-2xl font-bold text-blue-500">
            1320
          </p>
        </div>
      </div>
      <div className="ml-3 mr-10 flex flex-1 flex-row rounded-lg border-[1px] border-gray-400 p-2">
        <div className="relative flex flex-1 flex-col">
          <div className="w-[210px] flex-[0.5]">
            <p className="p-[2px] text-center text-xl font-bold text-gray-600">
              Pending Quotes
            </p>
            <div className="h-[1px] w-full bg-gray-400 px-3" />
          </div>
          <div className="flex-1 pl-4">
            <p className="text-[45px] font-light text-blue-400">
              ksh 10,000,000
            </p>
          </div>
        </div>
        <div className="right-0 my-auto mr-10 h-[120px] w-[120px] content-center rounded-full bg-gray-400 ">
          <p className="mt-[45px] text-center text-xl font-bold text-blue-500">
            20
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuotesSummary;
