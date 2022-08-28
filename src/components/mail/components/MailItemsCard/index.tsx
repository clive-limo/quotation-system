import type { FC } from 'react';

interface CardDetails {
  name: string;
  quantity: number;
  price: number;
  tax: number;
}
const MailCard: FC<CardDetails> = ({ name, quantity, price, tax }) => {
  const totalPrice = price * quantity;
  return (
    <div className="m-1 flex flex-row border-y-[1px] border-gray-300 p-2">
      <p className="flex-1  text-center">{name}</p>
      <p className="flex-1 text-center">{quantity}</p>
      <p className="flex-1 text-center">
        {price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'KSH',
          minimumFractionDigits: 2,
        })}
      </p>
      <p className="flex-1 text-center">
        {totalPrice.toLocaleString('en-US', {
          style: 'currency',
          currency: 'KSH',
          minimumFractionDigits: 2,
        })}
      </p>
      <p className="flex-1 text-center">{tax}%</p>
    </div>
  );
};

export default MailCard;
