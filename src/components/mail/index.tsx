import type { FC } from 'react';

interface PreviewProps {
  customerName: string;
}
const MailPreview: FC<PreviewProps> = ({ customerName }) => {
  return (
    <div className="relative mx-auto h-[90%] w-[100%] rounded-md border-[.5px] border-gray-400 bg-white px-[3%] py-[1%] shadow-xl">
      <div className="relative m-[1%] flex flex-row">
        <p className="font-aboreto text-3xl text-blue-800">
          Chemtron <br></br> Enterprises
        </p>
        <div className="absolute right-0 flex flex-col">
          <p className="font-bold">CHEMTRON ENTERPRISES</p>
          <p className="font-light">P.O Box 8539-3100 KAPSOYA</p>
          <p className="font-light">MOBILE: +254 723268939</p>
          <p className="font-light">EMAIL: info@chemtronenterprises.com</p>
          <p className=" font-light">PIN: P051565361M</p>
        </div>
      </div>
      <div className="mx-1 mt-[6%] flex flex-col">
        <p className=" font-bold">{customerName}</p>
        <p className=" font-light">P.O. Box</p>
        <p className=" font-light">Mobile</p>
        <p className=" font-light">EMAIL: info@chemtronenterprises.com</p>
        <p className=" font-light">PIN: P051565361M</p>
      </div>
      {/* Add Items */}
      <div className="absolute bottom-0 w-full ">
        <p className="mx-auto h-[90%] w-[45%] rounded-md border-[.5px] border-gray-400 bg-white shadow-xl">
          Footer
        </p>
      </div>
      <button className="rounded-full bg-blue-500 p-2">Create PDF</button>
    </div>
  );
};

export default MailPreview;
