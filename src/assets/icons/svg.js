import styled from "styled-components";

export const Path = styled.path`
  transition: fill 0.1s ease-out;
  fill: ${(p) => (p.active ? "var(--color-accent)" : "var(--color-light)")};
`;

export const Svg = styled.svg`
  transition: transform 0.2s ease-in-out;

  @media screen and (min-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }

  &:hover ${Path} {
    transition: fill 0.2s ease-in-out;
    fill: var(--color-light);
  }
`;
