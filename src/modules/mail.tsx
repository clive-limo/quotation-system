import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

import MailPreview from '@/components/mail';
import FinalMail from '@/components/mail/FinalMail';

interface MailProps {
  customerName: string;
  items: {
    id: number;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    quotationId: number;
  }[];
}
interface PreviewData {
  address: string;
  postalAddress: string;
  officeNumber: string;
  emailAddress: string;
  pinNumber: string;
}
interface SalesData {
  accountRef: string;
  receiptNumber: string;
  taxPercentage: number;
}
const MailModule: FC<MailProps> = ({ customerName, items }) => {
  const [previewData, setPreviewData] = useState<PreviewData>({
    address: '',
    postalAddress: '',
    officeNumber: '',
    emailAddress: '',
    pinNumber: '',
  });
  const [salesData, setSalesData] = useState<SalesData>({
    accountRef: '',
    receiptNumber: '',
    taxPercentage: 16,
  });
  const [printView, setPrintView] = useState(false);
  return (
    <section className="flex h-full w-full flex-row p-[1.5%]">
      <div
        className={clsx(
          'relative h-full flex-[0.3] rounded-l-lg border-y-[1px] border-l-[1px] border-gray-400 px-[1.5%] py-[1%]',
          printView ? 'hidden' : 'visible'
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
            value={previewData.address}
            onChange={(e) =>
              setPreviewData({ ...previewData, address: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            P.O Box
          </label>
          <input
            placeholder="P.O Box Address"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
            value={previewData.postalAddress}
            onChange={(e) =>
              setPreviewData({ ...previewData, postalAddress: e.target.value })
            }
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
            value={previewData.officeNumber}
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                officeNumber: e.target.value,
              })
            }
          />
          <input
            placeholder="Email Address"
            type="text"
            className="mt-[1.5%] rounded-full border-[.5px] border-gray-400 px-[3%] py-[1.5%]"
            value={previewData.emailAddress}
            onChange={(e) =>
              setPreviewData({
                ...previewData,
                emailAddress: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            PIN Number
          </label>
          <input
            placeholder="PIN Number"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
            value={previewData.pinNumber}
            onChange={(e) =>
              setPreviewData({ ...previewData, pinNumber: e.target.value })
            }
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
            value={salesData.accountRef}
            onChange={(e) =>
              setSalesData({ ...salesData, accountRef: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col ">
          <label className="px-[3%] text-sm font-bold text-blue-200">
            KRA Receipt No.
          </label>
          <input
            placeholder="0110XXXXXXXXXXXXX XX"
            className="rounded-full border-[.5px] border-gray-400 py-[1.5%] px-[3%]"
            value={salesData.accountRef}
            onChange={(e) =>
              setSalesData({ ...salesData, accountRef: e.target.value })
            }
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
        </div>
      </div>
      {/* Email Preview */}
      <div
        className={clsx(
          'h-[100%] flex-1 rounded-r-lg border-[.5px] border-gray-400 px-[1.5%] py-[1%]',
          printView ? 'hidden' : 'visible'
        )}
      >
        <p className="my-auto  flex-1 py-[0.6%] text-xl font-bold text-gray-600">
          Preview
        </p>
        <MailPreview
          customerName={customerName}
          previewData={previewData}
          salesDetails={salesData}
          items={items}
        />
      </div>
      <div className={clsx('h-full w-full', printView ? 'visible' : 'hidden')}>
        <FinalMail
          customerName={customerName}
          previewData={previewData}
          salesDetails={salesData}
          items={items}
        />
      </div>
      <button
        onClick={() => setPrintView(!printView)}
        className={clsx(
          'absolute right-0 top-0 m-[1.5%] h-[40px] rounded-full bg-blue-800 font-bold text-white first-letter:w-[250px] ',
          printView ? 'w-[40px]' : 'w-[250px]'
        )}
      >
        {printView ? '<' : 'print'}
      </button>
    </section>
  );
};

export default MailModule;
