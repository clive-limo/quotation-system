import type { FC } from 'react';

interface RecordDetailProps {
  customerName: string;
  quoteTotal: string;
  createDate: string;
  approvedDate: string;
}
const RecordCard: FC<RecordDetailProps> = ({
  customerName,
  quoteTotal,
  createDate,
  approvedDate,
}) => {
  return (
    <div className="my-1 flex flex-row rounded-lg border-[1px] border-gray-500 p-2">
      <p className="my-auto flex-1 text-center">{customerName}</p>
      <p className="my-auto flex-1 text-center text-blue-500">{quoteTotal}</p>
      <p className="my-auto flex-1 text-center">{createDate}</p>
      <p className="my-auto flex-1 text-center">{approvedDate}</p>
      <div className="flex h-[40px] flex-[0.7] flex-row text-center">
        <button className="flex-1">
          <img
            src="/assets/icons/ic-email.svg"
            alt="mail-icon"
            height="45"
            width="45"
          />
        </button>
        <button className="flex-1">
          <img
            src="/assets/icons/ic-edit.svg"
            alt="mail-icon"
            height="45"
            width="45"
          />
        </button>
        <button className="flex-1">
          <img
            src="/assets/icons/ic-delete.svg"
            alt="mail-icon"
            height="45"
            width="45"
          />
        </button>
      </div>
    </div>
  );
};

export default RecordCard;
