import type { FC } from 'react';

interface CardDetails {
  name: string;
  quantity: number;
  price: number;
}
const ItemsCard: FC<CardDetails> = ({ name, quantity, price }) => {
  return (
    <div className="m-1 flex flex-row border-y-[1px] border-gray-300 p-2">
      <p className="w-[10vw] pr-1">{name}</p>
      <p className="flex-1">{quantity}</p>
      <p className="flex-1">
        {price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'KSH',
          minimumFractionDigits: 2,
        })}
      </p>
      <button className="mx-1 rounded-md bg-blue-400 p-1 text-sm font-bold text-white">
        Delete
      </button>
    </div>
  );
};

export default ItemsCard;
