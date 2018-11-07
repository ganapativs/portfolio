import React from 'react';
import classnames from 'classnames';
import styled, { keyframes } from 'styled-components/macro';

const rotate = keyframes`
  100% {
      transform: rotate(360deg)
  }
`;

const Div = styled.div`
  margin: 20px auto;
  pointer-events: none;
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-light);
  border-top-color: var(--color-transparent);
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;

  &.small {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 20px;
    height: 20px;
    border-width: 2px;
  }
`;

const Spinner = props => (
  <Div className={classnames('spinner', { small: props.small })} />
);

export default Spinner;
