import Head from 'next/head';
import type { FC } from 'react';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta: FC<IMetaProps> = ({ title, description, canonical }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
      </Head>
    </>
  );
};

export { Meta };
