import { Link, navigate } from 'gatsby';
import React from 'react';

function LinkTransition(props) {
  const { children, ...rest } = props;

  return (
    <Link
      {...rest}
      onClick={(e) => {
        e.preventDefault();

        if (!document.startViewTransition) {
          return navigate(rest.to);
        }

        document.startViewTransition(() => navigate(rest.to));
      }}
    >
      {children}
    </Link>
  );
}

export default LinkTransition;
