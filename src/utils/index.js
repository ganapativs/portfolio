import styled from 'styled-components/macro';

export const FixedCentered = styled.div`
  position: fixed;
  height: 100%;
  display: flex;
  width: 100%;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  background: ${props => props.bg || 'transparent'};
`;

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
