import { useRouter } from 'next/router';
import { useState } from 'react';

interface CustomerDetails {
  customerName: string;
  customerEmail: string;
}

const AddQuotation = () => {
  const router = useRouter();
  const [newCustomer, setNewCustomer] = useState<CustomerDetails>({
    customerName: '',
    customerEmail: '',
  });

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
  return (
    <div>
      <input
        className="mx-10 w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
        placeholder="Customer Name"
        type="text"
        value={newCustomer.customerName}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, customerName: e.target.value })
        }
      />
      <input
        className="mx-10 w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
        placeholder="Customer Email"
        type="text"
        value={newCustomer.customerEmail}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, customerEmail: e.target.value })
        }
      />
      <button
        onClick={() =>
          handleAddCustomer({
            customerName: newCustomer.customerName,
            customerEmail: newCustomer.customerEmail,
          })
        }
      >
        Add User +
      </button>
    </div>
  );
};

export default AddQuotation;
