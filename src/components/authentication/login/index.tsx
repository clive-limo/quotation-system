import Router from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';

interface Users {
  userData: {
    userId: string;
    userEmail: string;
    userPassword: string;
  }[];
}
interface UserData {
  userEmail: string;
  userPassword: string;
}
const Login: FC<Users> = ({ userData }) => {
  const [user, setUser] = useState<UserData>({
    userEmail: '',
    userPassword: '',
  });

  const handleLogin = () => {
    userData.map((dbUser) => {
      if (dbUser.userEmail === user.userEmail) {
        if (dbUser.userPassword === user.userPassword) {
          return Router.push('/home');
        }
        setUser({ ...user, userEmail: '', userPassword: '' });
        return false;
      }
      setUser({ ...user, userEmail: '', userPassword: '' });
      return false;
    });
  };
  return (
    <div className="flex flex-col">
      <h1 className="mx-10 mt-10 mb-2 text-justify text-[30px] font-semibold">
        LOG IN
      </h1>
      <div>
        <p className="mx-10  py-2 text-[18px]">EMAIL</p>
        <input
          className="mx-10 w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
          placeholder="example@gmail.com"
          value={user.userEmail}
          onChange={(e) => {
            setUser({ ...user, userEmail: e.target.value });
          }}
        />
      </div>
      <div>
        <p className="mx-10  py-2 text-[18px] ">PASSWORD</p>
        <input
          className="mx-10 w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
          placeholder="*******"
          value={user.userPassword}
          onChange={(e) => {
            setUser({ ...user, userPassword: e.target.value });
          }}
        />
      </div>
      <button
        className="m-10 h-[40px] w-full rounded-sm bg-blue-700 text-center text-[20px] font-semibold text-white hover:bg-blue-900"
        onClick={handleLogin}
      >
        Next
      </button>
    </div>
  );
};

export default Login;
