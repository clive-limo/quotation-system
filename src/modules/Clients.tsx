import type { FC } from 'react';

import ClientCard from '@/components/clients/ClientCard';

interface CustomerProps {
  customers: {
    id: number;
    customerName: string;
    customerEmail: string;
  }[];
}
const ClientsModule: FC<CustomerProps> = ({ customers }) => {
  return (
    <section className="h-full w-full px-[3%]">
      <p className="my-auto h-[10%] flex-1 py-[0.6%] text-4xl font-bold text-gray-600">
        Clients
      </p>
      <div className="flex h-[90%] max-w-[98%] flex-wrap overflow-y-auto">
        {customers.map((customer) => {
          return (
            <ClientCard
              key={customer.customerName}
              clientEmail={customer.customerEmail}
              clientName={customer.customerName}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ClientsModule;
