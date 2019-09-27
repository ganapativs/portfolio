import { keyframes } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
