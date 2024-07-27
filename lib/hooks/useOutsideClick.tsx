import { useEffect } from "react";

type TProps = {
  ref: any;
  callback: () => void;
};

/**
 * Hook that invoke callback once
 * outside an element has been clicked
 */
export const useOutsideClick = ({ callback, ref }: TProps) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
