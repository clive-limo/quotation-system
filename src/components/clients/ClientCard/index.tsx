import type { FC } from 'react';

interface ClientProps {
  clientEmail: string;
  clientName: string;
}
const ClientCard: FC<ClientProps> = ({ clientEmail, clientName }) => {
  return (
    <section className="relative m-[.5%] h-[30%] w-[30%] rounded-lg border-[1px] border-gray-300 p-[2%] shadow-lg">
      <img
        className="mx-auto"
        src="/assets/icons/user.png"
        alt="avatar-image"
        height={100}
        width={100}
      />
      <p className="max-w-[90%] text-xl font-bold text-gray-600">
        {clientName}
      </p>
      <p className="w-[50%] text-lg font-light text-blue-600 ">{clientEmail}</p>
      <button className="absolute right-4 top-2 rounded-full bg-red-400 px-[3%] py-[1%] font-bold text-white ">
        <p>Delete</p>
      </button>
    </section>
  );
};

export default ClientCard;
