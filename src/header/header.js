import React, { Suspense } from 'react';
import './header.css';

const ProfileLinks = React.lazy(() => import('../profile-links/profile-links'));
const ProfileLogo = React.lazy(() => import('../profile-logo/profile-logo'));

const Header = props => {
  return (
    <header className="header">
      <Suspense maxDuration={200} fallback={<div style={{ height: 220 }} />}>
        <ProfileLogo />
      </Suspense>
      <Suspense fallback={null}>
        <ProfileLinks />
      </Suspense>
    </header>
  );
};

export default Header;
