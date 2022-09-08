import clsx from 'clsx';
import { setCookie } from 'cookies-next';
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

  const [loginClicked, setLoginClicked] = useState(false);

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
      setCookie('authToken', token);
      router.push('/home');
    }
    setLoginClicked(!loginClicked);
  };

  return (
    <div className="flex w-full flex-col p-1 md:px-7 md:py-2">
      <h1 className="text-justify text-[30px] font-semibold text-gray-600">
        LOG IN
      </h1>
      <div className="w-full">
        <p className="py-2 text-[18px] text-gray-600">EMAIL</p>
        <input
          className="w-full rounded-sm border-[1px] border-gray-400 px-5 py-2 text-[18px]"
          placeholder="example@gmail.com"
          value={user.userEmail}
          onChange={(e) => {
            setUser({ ...user, userEmail: e.target.value });
          }}
        />
      </div>
      <div className="w-full">
        <p className="py-2 text-[18px] text-gray-600 ">PASSWORD</p>
        <input
          className="w-full rounded-sm border-[1px] border-gray-400 px-5 py-2 text-[18px]"
          type="password"
          placeholder="*******"
          value={user.userPassword}
          onChange={(e) => {
            setUser({ ...user, userPassword: e.target.value });
          }}
        />
      </div>
      <div className="relative my-8">
        <button
          className={clsx(
            'absolute right-0  w-[40%] rounded-[15px] p-2 text-center font-semibold text-white',
            loginClicked
              ? 'bg-white shadow-md'
              : 'bg-blue-700 hover:bg-blue-900'
          )}
          onClick={() => {
            handleLogin(user);
            setLoginClicked(!loginClicked);
          }}
        >
          {loginClicked ? (
            <img
              className="mx-auto"
              src="/assets/icons/loading.gif"
              height={25}
              width={25}
              alt="loading-icon"
            />
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
