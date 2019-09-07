import React, { Suspense } from 'react';
import styled from 'styled-components/macro';

const ProfileLinks = React.lazy(() => import('./profileLinks'));
const ProfileLogo = React.lazy(() => import('./profileLogo'));
const DevInfo = React.lazy(() => import('./devInfo'));

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--color-light);
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const ProfileInfo = styled.div`
  @media screen and (min-width: 768px) {
    padding-left: 80px;
  }
`;

const AboutMe = React.memo(
  () => {
    return (
      <Div>
        <Suspense fallback={<div style={{ height: 220 }} />}>
          <ProfileLogo ppOnly />
        </Suspense>
        <Suspense fallback={null}>
          <ProfileInfo>
            <DevInfo />
            <ProfileLinks />
          </ProfileInfo>
        </Suspense>
      </Div>
    );
  },
  () => true, // Never re-render
);

export default AboutMe;
