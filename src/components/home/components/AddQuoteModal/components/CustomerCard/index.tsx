import clsx from 'clsx';
import type { FC } from 'react';

interface CustomerDetails {
  customerName: string;
  customerEmail: string;
}

interface CustomerProps {
  customerName: string;
  customerEmail: string;
  selectedCustomer: string;
  handleSelect: ({ customerName, customerEmail }: CustomerDetails) => void;
}

const CustomerCard: FC<CustomerProps> = ({
  customerName,
  customerEmail,
  selectedCustomer,
  handleSelect,
}) => {
  return (
    <div
      className={clsx(
        'relative m-1 flex w-full flex-row content-center rounded-md p-2',
        selectedCustomer === customerName ? 'bg-blue-300' : 'bg-white'
      )}
    >
      <div>
        <p className="text-lg font-medium">{customerName}</p>
        <p className="text-sm font-light">{customerEmail}</p>
      </div>
      <button
        className="absolute right-3 mx-auto rounded-md bg-blue-900 px-3 py-1 text-sm font-bold text-white"
        onClick={() => {
          handleSelect({ customerName, customerEmail });
        }}
      >
        Select
      </button>
      <span className="absolute bottom-1 h-[0.5px] w-[25vw] bg-gray-300" />
    </div>
  );
};

export default CustomerCard;
