import React from 'react';
import styled from 'styled-components/macro';

const Path = styled.path`
  transition: fill 0.2s ease-in;
  fill: var(--color-light-dark);
`;

const Svg = styled.svg`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in;
  box-shadow: inset 0 0 0 ${props => props.width / 10 + 2}px
    var(--color-light-dark);
  border-radius: 50%;

  &:hover {
    box-shadow: inset 0 0 0 ${props => props.width / 10 + 2}px
      var(--color-light);
  }

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
    aria-label="npm"
    role="img"
    viewBox="0 0 512 512">
    <Path d="M64 64v384h384v-384h-384zM376 376h-48v-192h-72v192h-120v-240h240v240z" />
  </Svg>
);
