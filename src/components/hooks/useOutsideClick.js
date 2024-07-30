// Detects clicks outside of the passed element ref
import { useEffect } from "react";

function useOutsideClick(elementRef, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClick(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
}

export default useOutsideClick;
