import clsx from 'clsx';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';

import CustomerCard from './components/CustomerCard';
import ItemsCard from './components/ItemsCard';

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

interface AddQuoteProps {
  customer: {
    customerName: string;
    customerEmail: string;
  };
  quoteItems: {
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
  }[];
}

interface ItemDetails {
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
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
  // Array for quote items
  const [items, updateItems] = useState([
    { itemName: '', itemQuantity: 0, itemPrice: 0 },
  ]);
  // Items state
  const [newItem, setNewItem] = useState<ItemDetails>({
    itemName: '',
    itemQuantity: 0,
    itemPrice: 0,
  });
  // Refresh the data after addition  of  quotes
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const sum = items.reduce((accumulator, item) => {
    return accumulator + item.itemPrice * item.itemQuantity;
  }, 0);

  const handleAddCustomer = async (customer: CustomerDetails) => {
    try {
      await fetch('/api/customers/addCustomer', {
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

  const handleItems = async (
    addItems: { itemName: string; itemPrice: number; itemQuantity: number }[]
  ) => {
    addItems.forEach(async (item) => {
      try {
        await fetch('/api/quotations/createQuoteItems', {
          body: JSON.stringify({
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }).then(() => {
          refreshData();
          setPageNumber(1);
        });
      } catch (e) {
        console.log(e);
      }
    });
  };

  const handleCreateQuotation = async (quoteDetails: AddQuoteProps) => {
    try {
      await fetch('/api/quotations/createQuotation', {
        body: JSON.stringify({ quoteDetails }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(() => {
        handleItems(quoteDetails.quoteItems);
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
      } else if (pageNumber === 3) {
        handleCreateQuotation({
          customer: {
            customerName: selectedCustomer.customerName,
            customerEmail: selectedCustomer.customerEmail,
          },
          quoteItems: items,
        });
      }
    } else if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleAddItem = () => {
    updateItems((arr) => [...arr, newItem]);
    console.log(items);
    setNewItem({ itemName: '', itemPrice: 0, itemQuantity: 0 });
  };

  return (
    <div
      className={clsx(
        'relative h-[full] p-2',
        visibility ? 'visible' : 'hidden'
      )}
    >
      <div className={clsx(pageNumber === 1 ? 'visible' : 'hidden')}>
        <div className="relative flex h-[6vh] w-full flex-row">
          <h1 className="mx-3 pl-6 text-justify text-2xl font-bold text-gray-600">
            Create Quotation
          </h1>
          <button
            onClick={() => {
              setExistingUser(!existingUser);
            }}
            className={clsx(
              'absolute right-0 mx-3 mt-4 rounded-md bg-blue-500 px-5 py-2 font-bold text-white'
            )}
          >
            {existingUser ? 'Create New Customer' : 'Select Existing Customer'}
          </button>
        </div>

        <div className={clsx(existingUser ? 'visible' : 'hidden')}>
          <p className="mx-3 text-lg text-gray-600">Select Customer</p>
          <div className="flex h-[35vh] flex-row">
            <div className="m-3 h-[35vh] w-[30vw] overflow-y-auto overflow-x-hidden rounded-md border-[0.5px] border-gray-400 p-2">
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
            <div className="m-3 h-[20vh] w-[20vw] rounded-md border-[0.5px] border-gray-400 p-3">
              <p className="text-center text-lg font-bold text-gray-600">
                Selected Customer
              </p>
              <label className="text-sm font-bold text-gray-600">Name</label>
              <p className="text-lg font-thin">
                {selectedCustomer.customerName}
              </p>
              <label className="text-sm font-bold text-gray-600">Email</label>
              <p className="text-lg font-thin">
                {selectedCustomer.customerEmail}
              </p>
            </div>
          </div>
        </div>

        <div className={clsx('m-1', existingUser ? 'hidden' : 'visible')}>
          <p className="mx-3 text-lg text-gray-600">Create Customer</p>
          <div>
            <div className="px-6 pt-4">
              <label className="text-sm font-bold text-gray-500">
                Customer Name
              </label>
              <input
                className="w-full rounded-sm border-[1px] border-gray-600 px-5 py-2 text-[18px]"
                placeholder="John Doe"
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
            <div className="px-6 pt-1">
              <label className="text-sm font-bold text-gray-500">
                Customer Email
              </label>
              <input
                className="w-full rounded-sm border-[1px] border-gray-600 px-5 py-2 text-[18px]"
                placeholder="johndoe@gmail.com"
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
              className="m-5 rounded-md bg-blue-500 px-5 py-1 font-bold text-white"
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
        <div className="h-[14vh]">
          <h1 className="px-3 pl-6 text-2xl font-bold text-gray-600">
            Quotation Details
          </h1>
          <div className="mb-2 flex flex-row p-1">
            <div className="mx-2 my-1 flex flex-col">
              <label>Item Name</label>
              <input
                placeholder="Enter item name"
                value={newItem.itemName}
                onChange={(e) =>
                  setNewItem({ ...newItem, itemName: e.target.value })
                }
                className="rounded-md border-[1px] border-black p-1"
              />
            </div>
            <div className="m-1 flex flex-col">
              <label>Item Quantity</label>
              <input
                type="number"
                placeholder="Number of items"
                value={newItem.itemQuantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, itemQuantity: +e.target.value })
                }
                className="rounded-md border-[1px] border-black p-1"
              />
            </div>
            <div className="m-1 flex flex-col">
              <label>Item Price</label>
              <input
                type="number"
                placeholder="Price per unit"
                value={newItem.itemPrice}
                onChange={(e) =>
                  setNewItem({ ...newItem, itemPrice: +e.target.value })
                }
                className="rounded-md border-[1px] border-black p-1"
              />
            </div>

            <button
              onClick={() => handleAddItem()}
              className="mt-6 h-[40px] flex-1 rounded-md bg-blue-400 font-bold text-white"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex h-[28vh] flex-row pl-3 pr-1">
          <div className="w-[28vw] overflow-y-auto rounded-md border-[1px] border-gray-500 bg-white p-1">
            <p className="fixed h-4 bg-white px-3 text-lg font-bold text-gray-600">
              Quotation Items
            </p>
            <div>
              <span className="m-4 h-5" />
              {items ? (
                items.map((item) => {
                  if (item.itemPrice === 0) {
                    return false;
                  }
                  return (
                    <ItemsCard
                      key={item.itemName}
                      name={item.itemName}
                      quantity={item.itemQuantity}
                      price={item.itemPrice}
                    />
                  );
                })
              ) : (
                <p>none</p>
              )}
            </div>
          </div>
          <div className="ml-4 flex h-[12vh] w-[20vw] flex-row rounded-md border-[1px] border-gray-500">
            <label className="my-auto h-4 bg-white pl-3 pr-2 text-xl font-bold text-gray-600">
              Total:
            </label>
            <div className="my-auto flex flex-row">
              <p className="text-4xl font-thin text-blue-500">
                {sum.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'Ksh',
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(pageNumber === 3 ? 'visible' : 'hidden')}>
        <p className="m-2 px-3 py-5 text-center text-2xl font-bold text-gray-600">
          Confirm Details
        </p>
        <div className="flex flex-row">
          <div className="ml-3 mr-1 flex flex-1 flex-row rounded-md border-[1px] border-gray-500 p-3">
            <p className="my-auto pr-2 text-sm font-bold text-gray-500">
              Customer Name:{' '}
            </p>
            <p className="text-2xl font-light">
              {selectedCustomer.customerName}
            </p>
          </div>
          <div className="ml-1 mr-3 flex flex-1 flex-row rounded-md border-[1px] border-gray-500 p-3">
            <p className="my-auto pr-2 text-sm font-bold text-gray-500">
              Customer Email:{' '}
            </p>
            <p className="text-2xl font-light">
              {selectedCustomer.customerEmail}
            </p>
          </div>
        </div>
        <div className="mb-5">
          <p className="p-3 text-lg font-bold text-gray-600">
            Quotation Details
          </p>
          <div className="mx-3 flex flex-row">
            <div className="mr-1 flex flex-1 flex-row rounded-md border-[1px] border-gray-500 p-2">
              <p className="my-auto pr-2 text-sm font-bold text-gray-500">
                Number of Items:{' '}
              </p>
              <p className="text-2xl font-light">{items.length}</p>
            </div>
            <div className="ml-1 flex flex-1 flex-row rounded-md border-[1px] border-gray-500 p-2">
              <p className="my-auto pr-2 text-sm font-bold text-gray-500">
                Quotation Total:{' '}
              </p>
              <p className="text-2xl font-light">{sum}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-3 mr-2 h-[10vh]">
        <div className="relative flex  flex-row">
          <button
            className="absolute  right-1 my-auto rounded-md bg-blue-500 px-5 py-2 font-bold text-white"
            onClick={() => handleNextPage('add')}
          >
            Next
          </button>
          <button
            className={clsx(
              'absolute  left-1 rounded-md bg-blue-500 px-5 py-2 font-bold text-white',
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
