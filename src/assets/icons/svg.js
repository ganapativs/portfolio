import styled from 'styled-components/macro';

export const Path = styled.path`
  transition: fill 0.2s ease-in;
  fill: var(--color-light-dark);
`;

export const Svg = styled.svg`
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
