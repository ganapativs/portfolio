import React from 'react';
import styled from 'styled-components/macro';

const Path = styled.path`
  transition: fill 0.2s ease-in;
  fill: var(--color-light-dark);
`;

const Svg = styled.svg`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  @media screen and (min-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }

  &:hover ${Path} {
    fill: var(--color-light);
  }
`;

// https://iconmonstr.com/dribbble-4-svg/
export default props => (
  <Svg
    width="24"
    height="24"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Dribbble"
    role="img"
    viewBox="0 0 24 24">
    <Path
      d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"
      style={{ transform: 'scale(.9) translateX(2px) translateY(2px)' }}
    />
  </Svg>
);
