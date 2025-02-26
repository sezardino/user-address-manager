import "@/styles/index.css";
import { PropsWithChildren, ReactNode } from "react";

type UsersLayoutProps = PropsWithChildren & {
  modal: ReactNode;
};

const UsersLayout = (props: UsersLayoutProps) => {
  const { modal, children } = props;

  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default UsersLayout;
