import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

interface CustomerDetails {
  customerName: string;
  customerEmail: string;
}

interface CustomerProps {
  customerName: string;
  customerEmail: string;
  handleSelect: ({ customerName, customerEmail }: CustomerDetails) => void;
}

const CustomerCard: FC<CustomerProps> = ({
  customerName,
  customerEmail,
  handleSelect,
}) => {
  const [selected, setSelected] = useState(false);
  return (
    <div
      className={clsx(
        'm-1 w-full content-center p-2',
        selected ? 'bg-blue-300' : 'bg-white'
      )}
    >
      <p>{customerName}</p>
      <p>{customerEmail}</p>
      <button
        onClick={() => {
          setSelected(!selected);
          handleSelect({ customerName, customerEmail });
        }}
      >
        Select
      </button>
    </div>
  );
};

export default CustomerCard;
