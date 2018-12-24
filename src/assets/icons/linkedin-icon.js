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

export default props => (
  <Svg
    width="24"
    height="24"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="LinkedIn"
    role="img"
    viewBox="0 0 24 24">
    <Path
      d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
      style={{ transform: 'translateY(-1px)' }}
    />
  </Svg>
);
