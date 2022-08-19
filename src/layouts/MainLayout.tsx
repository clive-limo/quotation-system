import type { FC, ReactNode } from 'react';

type IMainProps = {
  children: ReactNode;
};

const MainLayout: FC<IMainProps> = ({ children }) => {
  return <section className="h-screen w-screen">{children}</section>;
};

export { MainLayout };
