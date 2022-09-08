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
  invoices?: {
    id: number;
    status: number;
    dateCreated: string;
    datePaid: string;
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

const InvoiceSummary: FC<SummaryProps> = ({ quotations, items, invoices }) => {
  // quotations with pending invoices
  const approvedQuotesArray = quotations.filter(
    (quote) => quote.quoteStatus !== false
  );

  // sum of invoices pending approval
  const completedQuotesArray: number[] = [];
  const unpaidInvoices: number[] = [];
  const paidInvoices: number[] = [];
  const completedQuoteItems: Items[] = [];
  const pendingQuoteItems: Items[] = [];
  let pendingSumTotal = 0;
  let completedSumTotal = 0;

  if (approvedQuotesArray.length !== 0) {
    approvedQuotesArray.map((quote) => {
      return completedQuotesArray.push(quote.id);
    });

    invoices?.map((invoice) => {
      if (invoice.status === 0) {
        unpaidInvoices.push(invoice.quotationId);
      } else if (invoice.status === 1) {
        paidInvoices.push(invoice.quotationId);
      }
      return { unpaidInvoices, paidInvoices };
    });

    items.map((item) => {
      if (
        completedQuotesArray.includes(item.quotationId) &&
        paidInvoices.includes(item.quotationId)
      ) {
        completedQuoteItems.push(item);
      } else if (
        completedQuotesArray.includes(item.quotationId) &&
        unpaidInvoices.includes(item.quotationId)
      ) {
        pendingQuoteItems.push(item);
      }
      return { completedQuoteItems, pendingQuoteItems };
    });

    completedSumTotal = completedQuoteItems.reduce((accumulator, item) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);

    pendingSumTotal = pendingQuoteItems.reduce((accumulator, item) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);

    console.log(invoices);
  }

  return (
    <div className="flex h-full w-full flex-row">
      <div className="flex flex-1 flex-row rounded-[50px] border-[1px] border-gray-400 p-2 shadow-md md:mr-10">
        <div className="relative flex flex-1 flex-col">
          <div className="w-[210px] flex-[0.5]">
            <p className="p-[2px] text-center text-xl font-bold text-gray-600">
              Paid Invoices
            </p>
            <div className="h-[1px] w-full bg-gray-400 px-3" />
          </div>
          <div className="flex-1 pl-4">
            <p className="text-[24px] font-light text-blue-400 md:text-[45px]">
              {completedSumTotal.toLocaleString('en-US', {
                style: 'currency',
                currency: 'KSH',
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="right-0 my-auto mr-10 h-[120px] w-[120px] content-center rounded-full bg-gray-400 ">
          <p className="mt-[45px] text-center text-2xl font-bold text-blue-500">
            {paidInvoices.length}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-row rounded-[50px] border-[1px] border-gray-400 p-2 shadow-md md:ml-10">
        <div className="relative flex flex-1 flex-col">
          <div className="w-[210px] flex-[0.5]">
            <p className="p-[2px] text-center text-xl font-bold text-gray-600">
              Pending Invoices
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
            {unpaidInvoices.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;
