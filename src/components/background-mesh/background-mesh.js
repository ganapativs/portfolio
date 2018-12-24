import React from 'react';
import styled from 'styled-components/macro';

const Div = styled.div``;

const BackgroundMesh = React.memo(
  () => {
    return <Div>Hi</Div>;
  },
  () => true, // Never re-render
);

export default BackgroundMesh;
