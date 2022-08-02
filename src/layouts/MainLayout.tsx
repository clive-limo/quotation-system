import type { FC, ReactNode } from 'react';

type IMainProps = {
  children: ReactNode;
};

const MainLayout: FC<IMainProps> = ({ children }) => {
  return <section className="h-[100vh] w-[100vw]">{children}</section>;
};

export { MainLayout };
