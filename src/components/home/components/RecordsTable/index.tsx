import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import ItemsCard from '../AddQuoteModal/components/ItemsCard';
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

const RecordTable: FC<RecordsProps> = ({ quotations, items }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [itemsArray, setItemsArray] = useState<
    {
      id: number;
      itemName: string;
      itemQuantity: number;
      itemPrice: number;
      quotationId: number;
    }[]
  >([]);

  const padLeadingZeros = (num: number, size: number) => {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
  };

  const handleShowDetails = (id: number) => {
    if (id === selectedQuote) {
      setDetailsOpen(!detailsOpen);
    } else {
      setSelectedQuote(id);
    }
  };

  let selectedQuoteItems: {
    id: number;
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
    quotationId: number;
  }[] = [];
  useEffect(() => {
    selectedQuoteItems = items.filter(
      (item) => item.quotationId === selectedQuote && item.itemQuantity !== 0
    );
    const calculatedTotal = selectedQuoteItems.reduce((accumulator, item) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
    setItemsTotal(calculatedTotal);
    setItemsArray(selectedQuoteItems);
  }, [selectedQuote]);

  return (
    <div className="flex h-[76%] w-full flex-row overflow-x-hidden rounded-[50px] border-[1px] border-gray-400">
      <div className="h-[95%] flex-[5]">
        {/* Title customers */}
        <div className="flex h-[10%] w-full flex-row bg-gray-400">
          <p className="my-auto flex-1 text-center font-semibold text-blue-500">
            CUSTOMER
          </p>
          <p className="my-auto flex-1 text-center font-semibold text-blue-500">
            AMOUNT
          </p>
          <p className="my-auto flex-1 text-center font-semibold text-blue-500">
            DATE CREATED
          </p>
          <p className="my-auto flex-1 text-center font-semibold text-blue-500">
            STATUS
          </p>
          <p className="my-auto flex-[0.7] text-center font-semibold text-blue-500">
            ACTIONS
          </p>
        </div>
        {/* Quotations Cards */}
        <div className="h-[90%] w-full overflow-y-auto">
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
                id={quote.id}
                customerName={quote.customer.customerName}
                createDate={quote.dateCreated}
                approvalStatus={quote.quoteStatus}
                quoteTotal={total.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'KSH',
                  minimumFractionDigits: 2,
                })}
                handleShowDetails={() => handleShowDetails(quote.id)}
              />
            );
          })}
        </div>
      </div>
      {/* Show details div */}
      <div
        className={clsx(
          'm-[.5%] h-[95%] flex-[2] overflow-y-auto rounded-l-lg rounded-r-[50px] border-[1px] border-gray-300 bg-white p-[.5%] shadow-lg',
          detailsOpen ? 'visible' : 'hidden'
        )}
      >
        {/* Quotation and invoice number */}
        <div className="flex h-[15%] w-full flex-row">
          <div className="my-auto flex flex-1 flex-row">
            <p className="p-[6px] text-end text-sm font-bold text-gray-600 ">
              Quote No:
            </p>
            <p className="p-1 text-center text-lg font-light text-blue-500">
              {padLeadingZeros(selectedQuote, 5)}
            </p>
          </div>
          <div className="relative h-[15%] w-full flex-1">
            <button className="absolute right-0 mt-[3%]">
              <p className="w-[100%] rounded-full bg-blue-500 p-[6px] text-end text-sm font-bold text-white ">
                Open Invoice
              </p>
            </button>
          </div>
        </div>
        {/* Quote details div */}
        <div className="h-[70%] w-full rounded-lg border-[1px] border-gray-300">
          <p className="h-[15%] p-[1.5%] text-gray-600 ">Quote Items</p>
          <div className="h-[80%] overflow-y-auto">
            {itemsArray.map((item) => {
              return (
                <ItemsCard
                  key={item.id}
                  name={item.itemName}
                  price={item.itemPrice}
                  quantity={item.itemQuantity}
                  isDeletable={false}
                />
              );
            })}
          </div>
        </div>
        {/* Total div */}
        <div className="flex h-[10%] w-full flex-row">
          <p className="p-[6px] text-end text-sm font-bold text-gray-600 ">
            Total
          </p>
          <p className="p-1 text-center text-3xl font-light text-blue-500">
            {itemsTotal.toLocaleString('en-US', {
              style: 'currency',
              currency: 'KSH',
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecordTable;
