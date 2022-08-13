import clsx from 'clsx';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';

import CustomerCard from './components/CustomerCard';

interface CustomerDetails {
  customerName: string;
  customerEmail: string;
}

interface QuoteProps {
  visibility: boolean;
  customers: {
    id: string;
    customerName: string;
    customerEmail: string;
  }[];
}
const QuotationModal: FC<QuoteProps> = ({ visibility, customers }) => {
  const router = useRouter();
  //  Save customer data state
  const [newCustomer, setNewCustomer] = useState<CustomerDetails>({
    customerName: '',
    customerEmail: '',
  });

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails>({
    customerName: '',
    customerEmail: '',
  });
  // User selection state
  const [existingUser, setExistingUser] = useState(true);
  // Page number
  const [pageNumber, setPageNumber] = useState(1);

  // Refresh the data after addition  of  quotes
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleAddCustomer = async (customer: CustomerDetails) => {
    try {
      await fetch('http://localhost:3000/api/customers/addCustomer', {
        body: JSON.stringify({ customer }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(() => {
        setNewCustomer({ customerName: '', customerEmail: '' });
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedCustomer = (
    customerName: string,
    customerEmail: string
  ) => {
    setSelectedCustomer({
      ...selectedCustomer,
      customerEmail,
      customerName,
    });

    return true;
  };

  const handleNextPage = (type: string) => {
    if (type === 'add') {
      if (pageNumber < 3) {
        setPageNumber(pageNumber + 1);
      }
    } else if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <div className={clsx(pageNumber === 1 ? 'visible' : 'hidden')}>
        <div className="relative flex w-full flex-row">
          <h1>Create Quotation</h1>
          <button
            onClick={() => {
              setExistingUser(!existingUser);
            }}
            className={clsx(
              'absolute right-1 rounded-md bg-blue-500 px-5 py-2 font-bold text-white'
            )}
          >
            {existingUser ? 'Create New Customer' : 'Select Existing Customer'}
          </button>
        </div>

        <div
          className={clsx(
            'm-1',
            existingUser ? 'visible' : 'hidden',
            visibility ? 'visible' : 'hidden'
          )}
        >
          <p>Select Customer</p>
          <div className="flex flex-row">
            <div className="m-3 h-[35vh] w-[30vw] overflow-y-auto overflow-x-hidden border-[0.5px] border-gray-400">
              {customers.map((customer) => {
                return (
                  <CustomerCard
                    key={customer.customerName}
                    customerName={customer.customerName}
                    customerEmail={customer.customerEmail}
                    handleSelect={() => {
                      handleSelectedCustomer(
                        customer.customerName,
                        customer.customerEmail
                      );
                    }}
                  />
                );
              })}
            </div>
            <div className="m-3 h-[35vh] w-[20vw] border-[0.5px] border-gray-400">
              <p>Selected Customer</p>
              <label>Name</label>
              <p>{selectedCustomer.customerName}</p>
              <label>Email</label>
              <p>{selectedCustomer.customerEmail}</p>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'm-1',
            existingUser ? 'hidden' : 'visible',
            visibility ? 'visible' : 'hidden'
          )}
        >
          <p>Create User</p>
          <div>
            <div>
              <label>Customer Name</label>
              <input
                className="w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
                placeholder="Customer Name"
                type="text"
                value={newCustomer.customerName}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    customerName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Customer Email</label>
              <input
                className="w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
                placeholder="Customer Email"
                type="text"
                value={newCustomer.customerEmail}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    customerEmail: e.target.value,
                  })
                }
              />
            </div>
            <button
              onClick={() =>
                handleAddCustomer({
                  customerName: newCustomer.customerName,
                  customerEmail: newCustomer.customerEmail,
                })
              }
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      <div className={clsx('m-1 p-1', pageNumber === 2 ? 'visible' : 'hidden')}>
        <p>Quotation Details</p>

        <div className="flex flex-row p-1">
          <div className="m-1 flex flex-col">
            <label>Item Name</label>
            <input
              placeholder="Enter item name"
              className="rounded-md border-[1px] border-black p-1"
            />
          </div>
          <div className="m-1 flex flex-col">
            <label>Item Price</label>
            <input
              type="number"
              placeholder="Enter item name"
              className="rounded-md border-[1px] border-black p-1"
            />
          </div>
          <button className="h-[40px] w-[100px] rounded-md bg-blue-400 font-bold text-white">
            Add
          </button>
        </div>
        <div className="h-[30vh] w-[30vw] overflow-y-auto rounded-md border-[1px] border-gray-200">
          <p className="m-2">Quotation Items</p>
        </div>
      </div>

      <div className={clsx(pageNumber === 3 ? 'visible' : 'hidden')}>
        <p>Confirm Details</p>
      </div>

      <div>
        <div className="relative bottom-0 flex w-full flex-row">
          <button
            className="absolute right-1 rounded-md bg-blue-500 px-5 py-2 font-bold text-white"
            onClick={() => handleNextPage('add')}
          >
            Next
          </button>
          <button
            className={clsx(
              'absolute left-1 rounded-md bg-blue-500 px-5 py-2 font-bold text-white',
              pageNumber === 1 ? 'hidden' : 'visible'
            )}
            onClick={() => handleNextPage('subtract')}
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationModal;
