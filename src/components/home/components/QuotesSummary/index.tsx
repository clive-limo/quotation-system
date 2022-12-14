import type { FC } from 'react';

interface SummaryProps {
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

interface Items {
  id: number;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  quotationId: number;
}

const QuotesSummary: FC<SummaryProps> = ({ quotations, items }) => {
  // completed quotations
  const completedArray = quotations.filter(
    (quote) => quote.quoteStatus !== false
  );
  // pending quotations
  const pendingArray = quotations.filter(
    (quote) => quote.quoteStatus === false
  );
  // sum of pending quotations
  const completedQuotesArray: number[] = [];
  const completedQuoteItems: Items[] = [];
  let sumTotal = 0;

  if (completedArray.length !== 0) {
    completedArray.map((quote) => {
      return completedQuotesArray.push(quote.id);
    });

    items.map((item) => {
      if (completedQuotesArray.includes(item.quotationId)) {
        completedQuoteItems.push(item);
      }
      return completedQuoteItems;
    });

    sumTotal = completedQuoteItems.reduce((accumulator, item) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
  }

  const pendingQuotesArray: number[] = [];
  const pendingQuoteItems: Items[] = [];
  let pendingSumTotal = 0;

  if (pendingArray.length !== 0) {
    pendingArray.map((quote) => {
      return pendingQuotesArray.push(quote.id);
    });

    items.map((item) => {
      if (pendingQuotesArray.includes(item.quotationId)) {
        pendingQuoteItems.push(item);
      }
      return pendingQuoteItems;
    });

    pendingSumTotal = pendingQuoteItems.reduce((accumulator, item) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
  }

  return (
    <div className="flex h-full w-full flex-row">
      <div className="flex flex-1 flex-row rounded-[50px] border-[1px] border-gray-400 p-2 shadow-lg md:mr-8">
        <div className="relative flex flex-1 flex-col">
          <div className="w-[210px] flex-[0.5]">
            <p className="p-[2px] text-center text-xl font-bold text-gray-600">
              Approved Quotes
            </p>
            <div className="h-[1px] w-full bg-gray-400 px-3" />
          </div>
          <div className="flex-1 pl-4">
            <p className="text-[24px] font-light text-blue-400 md:text-[45px]">
              {sumTotal.toLocaleString('en-US', {
                style: 'currency',
                currency: 'KSH',
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="right-0 my-auto mr-10 h-[120px] w-[120px] content-center rounded-full bg-gray-400 ">
          <p className="mt-[45px] text-center text-2xl font-bold text-blue-500">
            {completedArray.length}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-row rounded-[50px] border-[1px] border-gray-400 p-2 shadow-lg md:ml-8">
        <div className="relative flex flex-1 flex-col">
          <div className="w-[210px] flex-[0.5]">
            <p className="p-[2px] text-center text-xl font-bold text-gray-600">
              Pending Quotes
            </p>
            <div className="h-[1px] w-full bg-gray-400 px-3" />
          </div>
          <div className="flex-1 pl-4">
            <p className="text-[45px] font-light text-blue-400">
              {pendingSumTotal.toLocaleString('en-US', {
                style: 'currency',
                currency: 'KSH',
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="right-0 my-auto mr-10 h-[120px] w-[120px] content-center rounded-full bg-gray-400 ">
          <p className="mt-[45px] text-center text-xl font-bold text-blue-500">
            {pendingArray.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuotesSummary;
