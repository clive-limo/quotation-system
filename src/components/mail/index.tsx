import type { FC } from 'react';

const MailPreview: FC = () => {
  return (
    <div className="relative mx-auto h-[90%] w-[45%] rounded-md border-[.5px] border-gray-400 bg-white shadow-xl">
      <div className="relative m-[1%] flex flex-row">
        <img
          className=" rounded-xl"
          src="/assets/images/im-logo.png"
          alt="logo-image"
          height={100}
          width={100}
        />
        <div className="absolute right-0 flex flex-col">
          <p className="text-xs font-bold">CHEMTRON ENTERPRISES</p>
          <p className="text-xs font-light">P.O Box 8539-3100 KAPSOYA</p>
          <p className="text-xs font-light">MOBILE: +254 723268939</p>
          <p className="text-xs font-light">
            EMAIL: info@chemtronenterprises.com
          </p>
          <p className="text-xs font-light">PIN: P051565361M</p>
        </div>
      </div>
      <div className="mx-1 mt-[6%] flex flex-col">
        <p className="text-xs font-bold">CHEMTRON ENTERPRISES</p>
        <p className="text-xs font-light">P.O Box 8539-3100 KAPSOYA</p>
        <p className="text-xs font-light">MOBILE: +254 723268939</p>
        <p className="text-xs font-light">
          EMAIL: info@chemtronenterprises.com
        </p>
        <p className="text-xs font-light">PIN: P051565361M</p>
      </div>
      {/* Add Items */}
      <div className="absolute bottom-0 w-full ">
        <p className="mx-auto h-[90%] w-[45%] rounded-md border-[.5px] border-gray-400 bg-white shadow-xl">
          Footer
        </p>
      </div>
    </div>
  );
};

export default MailPreview;
