import clsx from 'clsx';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';

interface RecordDetailProps {
  id: number;
  customerName: string;
  quoteTotal: string;
  createDate: string;
  approvalStatus: boolean;
  handleShowDetails: () => void;
}
const RecordCard: FC<RecordDetailProps> = ({
  id,
  customerName,
  quoteTotal,
  createDate,
  approvalStatus,
  handleShowDetails,
}) => {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState(false);
  const [pendingActionType, setPendingActionType] = useState<string>('none');
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleUpdateQuote = async (quoteId: number) => {
    // TODO: Click animation
    console.log('UPDATE');
    try {
      await fetch('/api/quotations/updateQuotation', {
        body: JSON.stringify({ quoteId }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      // TODO: Error handling
      console.log(error);
    }
  };
  const handleDeleteQuote = async (quoteId: number) => {
    // TODO: Click animation
    console.log('DELETE');
    try {
      await fetch('/api/quotations/deleteQuotation', {
        body: JSON.stringify({ quoteId }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      // TODO: Error handling
      console.log(error);
    }
  };
  const handlePendingAction = (quoteId: number, actionType: string) => {
    if (actionType === 'delete') {
      setPendingAction(false);
      handleDeleteQuote(quoteId);
    } else if (actionType === 'update') {
      setPendingAction(false);
      handleUpdateQuote(quoteId);
    }
  };
  const handleEmail = (selectedCustomerName: string) => {
    sessionStorage.setItem('customerName', selectedCustomerName);
    sessionStorage.setItem('quotationNumber', id.toString());
  };

  return (
    <div className="my-1 flex h-[80px] flex-row border-b-[1px] border-gray-400 ">
      {/* Quote details div */}
      <div className="flex flex-[3] flex-row">
        <p className="my-auto flex-1 text-center">{customerName}</p>
        <p className="my-auto flex-1 text-center text-blue-500">{quoteTotal}</p>
        <p className="my-auto flex-1 text-center">{createDate}</p>
      </div>
      {/* Approval status div */}
      <div className="my-auto flex-1">
        <p
          className={clsx(
            ' m-auto w-[8vw] rounded-full text-center text-white',
            approvalStatus ? 'bg-green-300' : 'bg-yellow-300'
          )}
        >
          {approvalStatus ? 'Approved' : 'Pending'}
        </p>
      </div>
      {/* Send Mail, Update, Delete, view details buttons */}
      <div
        className={clsx(
          'my-auto flex h-[40px] flex-[0.7] flex-row',
          pendingAction ? 'hidden' : 'visible'
        )}
      >
        <button
          className="flex-1"
          onClick={() => {
            handleEmail(customerName);
            router.push('/createMail');
          }}
        >
          <img
            src="/assets/icons/ic-email.svg"
            alt="mail-icon"
            height="45"
            width="45"
          />
        </button>
        <button
          className="flex-1"
          onClick={() => {
            setPendingAction(true);
            setPendingActionType('update');
          }}
        >
          <img
            src="/assets/icons/ic-edit.svg"
            alt="mail-icon"
            height="45"
            width="45"
          />
        </button>
        <button
          onClick={() => {
            setPendingAction(true);
            setPendingActionType('delete');
          }}
          className="flex-1"
        >
          <img
            src="/assets/icons/ic-delete.svg"
            alt="mail-icon"
            height="45"
            width="45"
          />
        </button>
        <button
          className="flex-[0.5] bg-blue-800"
          onClick={() => handleShowDetails()}
        >
          <p className=" font-bold text-white"> {'>'}</p>
        </button>
      </div>
      {/* Confirm/delete and cancel buttons */}
      <div
        className={clsx(
          'flex flex-[0.7] flex-row rounded-lg',
          pendingAction ? 'visible' : 'hidden'
        )}
      >
        <button
          onClick={() => handlePendingAction(id, pendingActionType)}
          className="my-auto h-full flex-[0.5] rounded-l-lg bg-red-700 hover:flex-1"
        >
          <p className="py-[2%]] text-center font-bold text-white">
            {pendingActionType === 'delete' ? 'Delete' : 'Confirm'}
          </p>
        </button>
        <button
          onClick={() => setPendingAction(false)}
          className="my-auto h-full flex-[0.5] rounded-r-lg bg-green-500 hover:flex-1"
        >
          <p className="py-[2%] text-center font-bold text-white">Cancel</p>
        </button>
      </div>
    </div>
  );
};

export default RecordCard;
