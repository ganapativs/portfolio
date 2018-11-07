import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components/macro';

const Div = styled.div`
  padding: 10px;

  &.row--shadow {
    box-shadow: 0 4px 10px var(--color-secondary);
  }
`;

const Row = ({ children, shadow = false, className }) => (
  <Div className={classNames(className, { 'row--shadow': shadow })}>
    {children}
  </Div>
);

export default Row;
