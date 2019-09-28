import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  color: red;
`;

function Hello() {
  // eslint-disable-next-line jsx-a11y/accessible-emoji
  return <Div>Hello from Component 🙌</Div>;
}

export default Hello;
