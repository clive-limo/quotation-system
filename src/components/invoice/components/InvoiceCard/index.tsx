import type { FC } from 'react';

interface InvoiceCardProps {
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
  quoteNumber,
  items,
  dateCreated,
  invoiceStatus,
}) => {
  const totalArray = items.filter((item) => item.quotationId === quoteNumber);
  const invoiceTotal = totalArray.reduce((accumulator, item) => {
    return accumulator + item.itemPrice * item.itemQuantity;
  }, 0);

  return (
    <div className="flex h-[10%] w-full flex-row">
      <p className="my-auto flex-1 text-center">{quoteNumber}</p>
      <p className="my-auto flex-1 text-center">{invoiceTotal}</p>
      <p className="my-auto flex-1 text-center">{dateCreated}</p>
      <p className="my-auto flex-1 text-center">{invoiceStatus}</p>
      <div className="flex-1"></div>
    </div>
  );
};

export default InvoiceCard;
