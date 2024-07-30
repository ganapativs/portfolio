import React, { useRef, useEffect } from "react";

/**
 * Usage:
      <Sentinel
        fetchMoreBufferDistance={1000}
        onFetchMore={onFetchMore}>
        <Loader />
      </Sentinel>
 */
const Sentinel = ({
  fetchMoreBufferDistance,
  onFetchMore,
  wrapperElement = "div",
  children,
  root,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const targetNode = ref.current;
    const options = {
      root: root ? root() : null,
      rootMargin: `0px 0px ${fetchMoreBufferDistance}px 0px`,
      threshold: 0,
    };
    const callback = ([{ isIntersecting }]) => {
      if (isIntersecting) {
        onFetchMore();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    if (targetNode) {
      observer.observe(targetNode);
    }

    return () => {
      // Stop watching all of its target elements for visibility changes
      observer.disconnect();
    };
  }, [fetchMoreBufferDistance, onFetchMore, root]);

  return React.createElement(
    wrapperElement,
    {
      ref,
    },
    children,
  );
};

export default Sentinel;
