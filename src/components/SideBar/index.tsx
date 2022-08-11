import Link from 'next/link';
import Router from 'next/router';
import type { FC } from 'react';

const Sidebar: FC = () => {
  
  return (
    <section className="h-full w-[20vw] content-center bg-blue-700">
      <div className="flex flex-col py-[25vh]">
        <Link href={'/home'} className="w-full px-5">
          <a className="border-none p-2 text-center text-xl font-semibold text-white hover:bg-blue-600 hover:text-2xl">
            Quotations
          </a>
        </Link>
        <Link href={'/invoices'} className="w-full px-5">
          <a className="border-none p-2 text-center text-xl font-semibold text-white hover:bg-blue-600 hover:text-2xl">
            Invoices
          </a>
        </Link>
        <Link href={'/clients'} className="w-full px-5">
          <a className="border-none p-2 text-center text-xl font-semibold text-white hover:bg-blue-600 hover:text-2xl">
            Clients
          </a>
        </Link>
        <button className="border-none p-2 text-center text-xl font-semibold text-white hover:bg-blue-600 hover:text-2xl">
          Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
