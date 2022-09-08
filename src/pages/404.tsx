import Link from 'next/link';
import type { FC } from 'react';

const ErrorPage: FC = () => {
  return (
    <div className="h-full w-full">
      <div className="m-auto h-[50%] w-[50%]">
        <p className="text-center text-[100px] font-bold text-gray-600">
          Ooops!
        </p>
        <p className="text-center text-[25px] font-light text-gray-600">
          A problem occured while loading this page. Click{' '}
          <Link href="/">
            <a>here</a>
          </Link>{' '}
          to go back to home page
        </p>
        <img
          src="/assets/images/rubber-25.png"
          alt="404 Image"
          height={576}
          width={768}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
