import clsx from 'clsx';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';

interface UserData {
  userEmail: string;
  userPassword: string;
  userConfirmPassword: string;
  userStatus: boolean;
  userId: string;
}

const Register: FC = () => {
  const [newUser, setNewUser] = useState<UserData>({
    userEmail: '',
    userPassword: '',
    userConfirmPassword: '',
    userStatus: true,
    userId: '',
  });

  const [errorPoint, setErrorPoint] = useState('none');

  const router = useRouter();

  async function createUser(userData: UserData) {
    try {
      fetch('/api/users/create_user', {
        body: JSON.stringify({ userData }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(() => {
        setNewUser({
          userEmail: '',
          userPassword: '',
          userConfirmPassword: '',
          userStatus: true,
          userId: '',
        });
        router.push('/home');
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [registerClicked, setRegisterClicked] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (data: UserData) => {
    setRegisterClicked(true);
    if (data.userEmail !== '') {
      if (data.userConfirmPassword !== '' && data.userPassword !== '') {
        if (data.userConfirmPassword === data.userPassword) {
          setRegisterClicked(!registerClicked);
          try {
            createUser(data);
          } catch (error) {
            console.log(error);
          }
          setErrorPoint('none');
        } else {
          setErrorPoint('pass_mismatch');
        }
      } else {
        setErrorPoint('null_password');
      }
    } else {
      setRegisterClicked(false);
      setErrorPoint('mail');
    }
  };
  return (
    <div className="flex w-full flex-col p-1 md:px-7 md:py-2">
      <h1 className="text-justify text-[30px] font-semibold">REGISTER</h1>
      <div className="w-full">
        <p className="py-1 text-[18px]">EMAIL</p>
        <input
          className={clsx(
            'w-full rounded-sm border-[1px] px-5 py-2 text-[18px]',
            errorPoint === 'mail' ? 'border-red-500' : 'border-gray-500'
          )}
          placeholder="example@gmail.com"
          type="text"
          value={newUser.userEmail}
          onChange={(e) =>
            setNewUser({ ...newUser, userEmail: e.target.value })
          }
        />
      </div>
      <div className="w-full">
        <p className="py-1 text-[18px]">PASSWORD</p>
        <input
          className={clsx(
            'w-full rounded-sm border-[1px] border-gray-500 px-5 py-2 text-[18px]',
            errorPoint === 'null_password' || errorPoint === 'pass_mismatch'
              ? 'border-red-500'
              : 'border-gray-500'
          )}
          type="password"
          placeholder="*******"
          value={newUser.userPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, userPassword: e.target.value })
          }
        />
      </div>
      <div className="w-full">
        <p className="py-1 text-[18px]">CONFIRM PASSWORD</p>
        <input
          className={clsx(
            'w-full rounded-sm border-[1px] border-gray-500 px-5 py-2 text-[18px]',
            errorPoint === 'null_password' || errorPoint === 'pass_mismatch'
              ? 'border-red-500'
              : 'border-gray-500'
          )}
          type="password"
          placeholder="*******"
          value={newUser.userConfirmPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, userConfirmPassword: e.target.value })
          }
        />
      </div>
      <div className="relative my-8">
        <button
          onClick={async () => {
            await handleSubmit(newUser);
          }}
          className={clsx(
            'absolute right-0  w-[60%] rounded-full p-2 text-center font-semibold text-white',
            registerClicked
              ? 'bg-white shadow-md'
              : 'bg-blue-700 hover:bg-blue-900'
          )}
        >
          {registerClicked ? (
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

export default Register;
