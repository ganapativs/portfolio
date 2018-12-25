import React from 'react';
import styled from 'styled-components/macro';
import useMesh from './useMesh';

const Div = styled.div``;

const BackgroundMesh = React.memo(
  () => {
    const mesh = useMesh();
    console.log(mesh);

    return <Div>Hi</Div>;
  },
  () => true, // Never re-render
);

export default BackgroundMesh;
