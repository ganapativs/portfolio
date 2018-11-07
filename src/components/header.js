import React, { Suspense } from 'react';
import styled from 'styled-components/macro';

const ProfileLinks = React.lazy(() => import('./profileLinks'));
const ProfileLogo = React.lazy(() => import('./profile-logo/profile-logo'));

const Div = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-light);
`;

const Header = props => {
  return (
    <Div>
      <Suspense maxDuration={200} fallback={<div style={{ height: 220 }} />}>
        <ProfileLogo />
      </Suspense>
      <Suspense fallback={null}>
        <ProfileLinks />
      </Suspense>
    </Div>
  );
};

export default Header;
