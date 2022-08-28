import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

import MailPreview from '@/components/mail';

interface MailProps {
  customerName: string;
}
const MailModule: FC<MailProps> = ({ customerName }) => {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const handleClick = () => {
    setDetailsOpen(!detailsOpen);
  };
  return (
    <section className="flex h-full w-full flex-row p-[1.5%]">
      <div
        className={clsx(
          'relative h-full flex-[0.3] rounded-l-lg border-y-[1px] border-l-[1px] border-gray-400 px-[1.5%] py-[1%]',
          detailsOpen ? 'visible' : 'hidden'
        )}
      >
        <p className="my-auto  flex-1 py-[0.6%] text-xl font-bold text-gray-600">
          Email Title
        </p>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            Title
          </label>
          <input
            placeholder="CASH SALE/QUOTE"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
          />
        </div>
        <p className="my-auto mt-[2%] flex-1 py-[0.6%] text-xl font-bold text-gray-600">
          Customer Address
        </p>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            Address
          </label>
          <input
            placeholder="Building Name, Street Name"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
          />
        </div>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            P.O Box
          </label>
          <input
            placeholder="P.O Box Address"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
          />
        </div>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            Contact Details
          </label>
          <input
            placeholder="Office Number"
            type="number"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
          />
          <input
            placeholder="Other Mobile Number"
            type="number"
            className="mt-[1.5%] rounded-full border-[.5px] border-gray-400 px-[3%] py-[1.5%]"
          />
        </div>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            PIN Number
          </label>
          <input
            placeholder="PIN Number"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
          />
        </div>
        {/* Sale Details div */}
        <p className="my-auto mt-[2%] flex-1 py-[0.6%] text-xl font-bold text-gray-600">
          Sale Details
        </p>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            Account Ref
          </label>
          <input
            placeholder="Account Reference"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
          />
        </div>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            KRA Receipt No.
          </label>
          <input
            placeholder="0110XXXXXXXXXXXXX XX"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
          />
        </div>
        <p className="my-auto mt-[2%] flex-1 py-[0.6%] text-xl font-bold text-gray-600">
          Tax Details
        </p>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            Tax Percentage
          </label>
          <input
            placeholder="Building Name, Street Name"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
          />
          <button
            onClick={() => handleClick()}
            className="absolute top-1 right-1 rounded-full bg-blue-600 p-2 font-bold text-white "
          >
            Done
          </button>
        </div>
      </div>
      {/* Email Preview */}
      <div className="h-[100%] flex-1 rounded-r-lg border-[.5px] border-gray-400 px-[1.5%] py-[1%]">
        <p className="my-auto  flex-1 py-[0.6%] text-xl font-bold text-gray-600">
          Preview
        </p>
        <MailPreview customerName={customerName} />
      </div>
    </section>
  );
};

export default MailModule;
