import type { FC } from 'react';

const QuotesSummary: FC = () => {
  return (
    <div className="flex h-[20vh] flex-row">
      <div className="ml-10 mr-3 flex-1 rounded-lg border-[1px] border-gray-400 p-2">
        <div className="w-[230px]">
          <p className="p-[2px] text-center text-2xl font-bold text-gray-600">
            Approved Quotes
          </p>
          <div className="h-[1px] w-full bg-gray-400 px-3" />
        </div>
        <div className="relative flex flex-row">
          <div className="">
            <p className="text-4xl ">KSH 30,000,000</p>
          </div>
          <div className="right-0 m-5 h-[100px] w-[100px] rounded-full bg-blue-500">
            <p className="mt-[35px] text-center text-xl font-bold text-white">
              20
            </p>
          </div>
        </div>
      </div>
      <div className="m-3 flex-1 rounded-md border-[1px] border-gray-500 p-2">
        <p>Pending Quotes</p>
      </div>
    </div>
  );
};

export default QuotesSummary;
