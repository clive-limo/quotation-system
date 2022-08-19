import { useRouter } from 'next/router';
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
const Login: FC<Users> = () => {
  const [user, setUser] = useState<UserData>({
    userEmail: '',
    userPassword: '',
  });
  const router = useRouter();

  const handleLogin = async (userData: UserData) => {
    const email = userData.userEmail;
    const password = userData.userPassword;

    const res = await fetch('/api/auth/authenticate', {
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((t) => t.json());

    const { token } = res;

    if (token) {
      router.push('/home');
    }
  };

  return (
    <div className="flex w-full flex-col p-1 md:p-3">
      <h1 className="mt-10 mb-2 text-justify text-[30px] font-semibold">
        LOG IN
      </h1>
      <div className="w-full">
        <p className="py-2 text-[18px]">EMAIL</p>
        <input
          className="w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
          placeholder="example@gmail.com"
          value={user.userEmail}
          onChange={(e) => {
            setUser({ ...user, userEmail: e.target.value });
          }}
        />
      </div>
      <div className="w-full">
        <p className="py-2 text-[18px] ">PASSWORD</p>
        <input
          className="w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
          type="password"
          placeholder="*******"
          value={user.userPassword}
          onChange={(e) => {
            setUser({ ...user, userPassword: e.target.value });
          }}
        />
      </div>
      <button
        className="mx-auto my-10  h-[40px] w-full rounded-sm bg-blue-700 text-center text-[20px] font-semibold text-white hover:bg-blue-900"
        onClick={() => handleLogin(user)}
      >
        Next
      </button>
    </div>
  );
};

export default Login;
