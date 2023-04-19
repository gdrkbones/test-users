import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const [rootElement, setRootElement] = useState<HTMLDivElement>();

  useEffect(() => {
    setRootElement(document.createElement("div"));
  }, []);

  useEffect(() => {
    const root = document.querySelector("#__next");
    if (rootElement && root) {
      root.appendChild(rootElement);
    }
    return () => {
      rootElement && root && root.removeChild(rootElement);
    };
  }, [rootElement]);

  return isOpen && rootElement
    ? ReactDOM.createPortal(
        <div
          className={clsx(
            "fixed inset-0 grid place-items-center bg-gray-600/60 backdrop-blur-sm",
            className
          )}
          onClick={onClose}
        >
          <div className="" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        rootElement
      )
    : null;
};

export default Modal;
