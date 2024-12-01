import { useEffect, useRef } from "react";

/**
 * Custom hook to handle clicks outside a specified element.
 *
 * @param {Function} onClickOutside - Function to call when clicking outside the element.
 * @returns {Object} - A ref to attach to the element you want to monitor.
 */
export function useClickOutside(onClickOutside) {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return ref;
}
