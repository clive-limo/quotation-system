import type { FC } from 'react';

interface CardDetails {
  name: string;
  quantity: number;
  price: number;
}
const ItemsCard: FC<CardDetails> = ({ name, quantity, price }) => {
  return (
    <div className="m-1 flex flex-row border-y-[1px] border-gray-300 p-2">
      <p className="w-[15vw]">{name}</p>
      <p className="flex-1">{quantity}</p>
      <p className="flex-1">{price}</p>
      <button className="mx-auto bg-blue-400 p-1 font-bold text-white">
        Delete
      </button>
    </div>
  );
};

export default ItemsCard;
