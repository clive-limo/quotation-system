import clsx from 'clsx';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

const Sidebar: FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie('authToken');
  };
  return (
    <section className="h-full w-full content-center bg-blue-700">
      <div className="flex flex-col py-[25vh]">
        <Link href={'/home'} className="w-full px-5">
          <a
            className={clsx(
              'border-none p-2 text-center text-xl font-semibold text-white hover:bg-blue-600 hover:text-2xl',
              router.pathname === '/home'
                ? 'bg-blue-600 text-2xl'
                : 'bg-none text-xl'
            )}
          >
            Quotations
          </a>
        </Link>
        <Link href={'/invoices'} className="w-full px-5">
          <a
            className={clsx(
              'border-none p-2 text-center text-xl font-semibold text-white hover:bg-blue-600 hover:text-2xl',
              router.pathname === '/invoices'
                ? 'bg-blue-600 text-2xl'
                : 'bg-none text-xl'
            )}
          >
            Invoices
          </a>
        </Link>
        <Link href={'/clients'} className="w-full px-5">
          <a
            className={clsx(
              'border-none p-2 text-center text-xl font-semibold text-white hover:bg-blue-600 hover:text-2xl',
              router.pathname === '/clients'
                ? 'bg-blue-600 text-2xl'
                : 'bg-none text-xl'
            )}
          >
            Clients
          </a>
        </Link>
        <button className="w-full px-5" onClick={() => handleLogout()}>
          <a
            href={'/'}
            className="border-none p-2 text-center text-xl font-semibold text-white hover:bg-blue-600 hover:text-2xl"
          >
            Logout
          </a>
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
