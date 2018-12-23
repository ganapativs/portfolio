import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import ApplePolygon from '../assets/apple-icon-polygon/apple-icon-polygon';

const blink = keyframes`
  0%, 25% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
`;

const Div = styled.div`
  margin: 20px auto;
  pointer-events: none;
  width: 80px;
  height: 80px;
`;

const DivSquare = styled(ApplePolygon)`
  background: var(--color-light);
  margin: 4px;
  flex: 1;
  animation: ${blink} 0.8s ease-in infinite;
  animation-delay: ${props => props.delay}s;
  width: 32px;
  height: 32px;
  opacity: 0;
  border-radius: 2px;
  box-shadow: inset 0px 0px 10px 4px var(--color-red);
  background: var(--color-orange);
`;

const Flex = styled.div`
  display: flex;
`;

const SquareLoader = () => (
  <Div>
    <Flex>
      <DivSquare delay={0.2} />
      <DivSquare delay={0.4} />
    </Flex>
    <Flex>
      <DivSquare delay={0.8} />
      <DivSquare delay={0.6} />
    </Flex>
  </Div>
);

export default SquareLoader;
