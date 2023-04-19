import clsx from "clsx";
import { ReactNode } from "react";

const Container: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={clsx("flex flex-col", className)}>{children}</div>;
};

export default Container;
