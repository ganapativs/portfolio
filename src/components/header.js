import React, { Suspense } from 'react';
import styled from 'styled-components/macro';

const ProfileLinks = React.lazy(() => import('./profileLinks'));
const ProfileLogo = React.lazy(() => import('./profileLogo'));
const DevInfo = React.lazy(() => import('./devInfo'));

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-light);

  @media screen and (min-width: 768px) {
    align-items: flex-start;
  }
`;

const Header = React.memo(
  () => {
    return (
      <Div>
        <Suspense fallback={<div style={{ height: 220 }} />}>
          <ProfileLogo ppOnly />
        </Suspense>
        <Suspense fallback={null}>
          <DevInfo />
          <ProfileLinks />
        </Suspense>
      </Div>
    );
  },
  () => true, // Never re-render
);

export default Header;
