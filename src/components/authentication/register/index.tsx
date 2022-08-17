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

  const router = useRouter();

  async function createUser(userData: UserData) {
    try {
      fetch(
        'https://chemtron-quotation-system.vercel.app//api/users/create_user',
        {
          body: JSON.stringify({ userData }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      ).then(() => {
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

  const handleSubmit = async (data: UserData) => {
    console.log('CLICKED');
    try {
      createUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col">
      <h1 className="mx-10 text-justify text-[30px] font-semibold">REGISTER</h1>
      <div>
        <p className="mx-10  py-1 text-[18px]">EMAIL</p>
        <input
          className="mx-10 w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
          placeholder="example@gmail.com"
          type="text"
          value={newUser.userEmail}
          onChange={(e) =>
            setNewUser({ ...newUser, userEmail: e.target.value })
          }
        />
      </div>
      <div>
        <p className="mx-10  py-1 text-[18px]">PASSWORD</p>
        <input
          className="mx-10 w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
          placeholder="*******"
          value={newUser.userPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, userPassword: e.target.value })
          }
        />
      </div>
      <div>
        <p className="mx-10  py-1 text-[18px]">CONFIRM PASSWORD</p>
        <input
          className="mx-10 w-full rounded-sm border-[1px] border-black px-5 py-2 text-[18px]"
          placeholder="*******"
          value={newUser.userConfirmPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, userConfirmPassword: e.target.value })
          }
        />
      </div>
      <button
        onClick={() => handleSubmit(newUser)}
        className="m-10 h-[40px] w-full rounded-sm bg-blue-700 text-center text-[20px] font-semibold text-white hover:bg-blue-900"
      >
        Next
      </button>
    </div>
  );
};

export default Register;
