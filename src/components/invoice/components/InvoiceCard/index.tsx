import clsx from 'clsx';
import router from 'next/router';
import type { FC } from 'react';

interface InvoiceCardProps {
  id: number;
  quoteNumber: number;
  items: {
    id: number;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    quotationId: number;
  }[];
  dateCreated: string;
  invoiceStatus: number;
}

const InvoiceCard: FC<InvoiceCardProps> = ({
  id,
  quoteNumber,
  items,
  dateCreated,
  invoiceStatus,
}) => {
  const totalArray = items.filter((item) => item.quotationId === quoteNumber);
  const invoiceTotal = totalArray.reduce((accumulator, item) => {
    return accumulator + item.itemPrice * item.itemQuantity;
  }, 0);

  const padLeadingZeros = (num: number, size: number) => {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
  };
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleClick = async (invoiceId: number) => {
    await fetch('/api/invoices/handleActions', {
      body: JSON.stringify({ invoiceId }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(() => refreshData());
  };

  const invoiceNumber = padLeadingZeros(quoteNumber, 4);

  return (
    <div className="my-[.5%] flex h-[18%] w-full flex-row rounded-lg border-[1px] border-gray-400">
      <p className="my-auto flex-1 text-center">QT{invoiceNumber}</p>
      <p className="my-auto flex-1 text-center text-blue-600">
        {invoiceTotal.toLocaleString('en-US', {
          style: 'currency',
          currency: 'ksh',
          minimumFractionDigits: 2,
        })}
      </p>
      <p className="my-auto flex-1 text-center">{dateCreated}</p>
      <div className="my-auto flex-1">
        <p
          className={clsx(
            ' mx-auto w-[60%] rounded-full text-center text-white',
            invoiceStatus === 0 ? 'bg-red-800' : 'bg-green-800'
          )}
        >
          {invoiceStatus === 0 ? 'Not Paid' : 'Paid'}
        </p>
      </div>

      <div className="my-auto flex-1">
        <div
          className={clsx(
            'mx-auto w-[55%] rounded-lg bg-blue-600 p-[2%]',
            invoiceStatus === 1 ? 'hidden' : 'visible'
          )}
        >
          <button
            className="w-full"
            onClick={() => {
              handleClick(id);
            }}
          >
            <p className="px-[2%] text-sm font-bold text-white">Mark as PAID</p>
          </button>
        </div>
        <div
          className={clsx(
            'mx-auto flex w-[55%] flex-row rounded-lg bg-green-100 p-[2%]',
            invoiceStatus === 0 ? 'hidden' : 'visible'
          )}
        >
          <p className="my-auto flex-[0.8] text-center text-sm font-thin text-gray-700">
            Already paid
          </p>
          <img
            className="flex-[0.2]"
            src="/assets/icons/ic-check.png"
            alt="check-icon"
            height={30}
            width={30}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
