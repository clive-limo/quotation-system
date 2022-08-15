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

  const handleItems = async (
    addItems: { itemName: string; itemPrice: number; itemQuantity: number }[]
  ) => {
    addItems.forEach(async (item) => {
      try {
        await fetch('http://localhost:3000/api/quotations/createQuoteItems', {
          body: JSON.stringify({
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      } catch (e) {
        console.log(e);
      }
    });
  };

  const handleCreateQuotation = async (quoteDetails: AddQuoteProps) => {
    try {
      await fetch('http://localhost:3000/api/quotations/createQuotation', {
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
            className="my-auto h-[40px] w-[100px] rounded-md bg-blue-400 font-bold text-white"
          >
            Add
          </button>
        </div>
        <div className="flex flex-row">
          <div className="h-[30vh] w-[30vw] overflow-y-auto rounded-md border-[1px] border-gray-200">
            <p className="fixed m-2 h-4">Quotation Items</p>
            <div>
              <span className="m-3 h-4" />
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
          <div className="ml-2 h-[30vh] w-[20vw] overflow-y-auto rounded-md border-[1px] border-gray-200">
            <div>
              <label>Total</label>
              <p>{sum}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(pageNumber === 3 ? 'visible' : 'hidden')}>
        <p>Confirm Details</p>
        <div className="flex flex-row">
          <div className="flex flex-1 flex-row">
            <p className="font-bold">Customer Name: </p>
            <p>{selectedCustomer.customerName}</p>
          </div>
          <div className="flex flex-1 flex-row">
            <p className="font-bold">Customer Email: </p>
            <p>{selectedCustomer.customerEmail}</p>
          </div>
        </div>
        <div>
          <p>Quotation Details</p>
          <div>
            <div className="flex flex-row">
              <p className="font-bold">Number of Items: </p>
              <p>{items.length}</p>
            </div>
            <div className="flex flex-row">
              <p className="font-bold">Quotation Total: </p>
              <p>{sum}</p>
            </div>
          </div>
        </div>
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
