import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(ref, cb) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  }
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

export default useOutsideClick;
