import type { FC } from 'react';
import { useEffect } from 'react';

import MailCard from './components/MailItemsCard';

interface PreviewProps {
  customerName: string;
  previewData: {
    address: string;
    postalAddress: string;
    officeNumber: string;
    emailAddress: string;
    pinNumber: string;
  };
  salesDetails: {
    accountRef: string;
    receiptNumber: string;
    taxPercentage: number;
  };
  items: {
    id: number;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    quotationId: number;
  }[];
}
const MailPreview: FC<PreviewProps> = ({
  customerName,
  previewData,
  salesDetails,
  items,
}) => {
  const padLeadingZeros = (num: number, size: number) => {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
  };

  const generateQuoteNumber = (quoteNo: string) => {
    return padLeadingZeros(parseInt(quoteNo, 10), 4);
  };
  const quotationNo = sessionStorage.getItem('quotationNumber');

  const quoteItems = items.filter(
    (item) => item.quotationId === parseInt(quotationNo || '0', 10)
  );

  const total = quoteItems.reduce((accumulator, item) => {
    return accumulator + item.itemPrice * item.itemQuantity;
  }, 0);

  const tax = total * (salesDetails.taxPercentage / 100);

  useEffect(() => {
    generateQuoteNumber(quotationNo || '0');
  }, []);

  return (
    <div className="relative mx-auto h-[90%] w-[60%] rounded-md border-[.5px] border-gray-400 bg-white px-[3%] py-[1%] shadow-xl">
      <div className="relative m-[1%] flex flex-row">
        <p className="font-aboreto text-3xl text-blue-800">
          Chemtron <br></br> Enterprises
        </p>
        <div className="absolute right-0 flex flex-col">
          <p className="text-xs font-bold">CHEMTRON ENTERPRISES</p>
          <p className="text-xs font-light">P.O Box 8539-3100 KAPSOYA</p>
          <p className="text-xs font-light">MOBILE: +254 723268939</p>
          <p className="text-xs font-light">
            EMAIL: info@chemtronenterprises.com
          </p>
          <p className="text-xs  font-light">PIN: P051565361M</p>
        </div>
      </div>
      <div className="mx-1 mt-[6%] flex flex-col">
        <p className="text-xs  font-bold">{customerName}</p>
        <p className="text-xs  font-light">{previewData.address}</p>
        <p className="text-xs  font-light">{previewData.postalAddress}</p>
        <p className="text-xs  font-light">
          MOBILE: {previewData.officeNumber}
        </p>
        <p className="text-xs  font-light">EMAIL: {previewData.emailAddress}</p>
        <p className="text-xs  font-light">PIN: {previewData.pinNumber}</p>
      </div>
      {/* Add Items */}
      <p className="mt-3 text-lg font-semibold underline">
        QUOTATION QT{generateQuoteNumber(quotationNo || '0')}{' '}
      </p>

      <div>
        <div className="flex flex-row bg-blue-800">
          <p className="flex-1 text-center text-xs font-bold text-white">
            Description
          </p>
          <p className="flex-1 text-center text-xs font-bold text-white">
            Quantity
          </p>
          <p className="flex-1 text-center text-xs font-bold text-white">
            Unit Cost
          </p>
          <p className="flex-1 text-center text-xs font-bold text-white">
            Total Cost
          </p>
          <p className="flex-1 text-center text-xs font-bold text-white">VAT</p>
        </div>
        <div>
          {quoteItems.map((item) => {
            return (
              <MailCard
                key={item.id}
                name={item.itemName}
                price={item.itemPrice}
                quantity={item.itemQuantity}
                tax={salesDetails.taxPercentage}
              />
            );
          })}
        </div>
      </div>
      <div className="relative mt-10">
        <div className="absolute right-0 mt-5 flex w-[300px] flex-col">
          <div className="flex w-full flex-row">
            <p className="flex-[1] font-semibold text-gray-400 ">SUBTOTAL</p>
            <p className="flex-[2] text-end">{total}</p>
          </div>
          <span className="mx-auto my-1 h-[1px] w-full bg-gray-400" />
          <div className="flex w-full flex-row">
            <p className="flex-[1] font-semibold text-gray-400 ">VAT</p>
            <p className="flex-[2] text-end">{tax}</p>
          </div>
          <span className="mx-auto my-1 h-[1px] w-full bg-gray-400" />
          <div className="flex w-full flex-row">
            <p className="flex-[1] text-lg  font-semibold text-gray-600">
              TOTAL
            </p>
            <p className="flex-[2] text-end text-2xl">{total + tax}</p>
          </div>
          <span className="mx-auto my-1 h-[1px] w-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default MailPreview;
