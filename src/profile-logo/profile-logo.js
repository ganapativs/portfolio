import React from 'react';
import Logo from '../logo/meetguns';
import './profile-logo.css';

export default React.memo(function ProfileLogo(props) {
  return (
    <div className="text-center full-width">
      <div className="user__logo animated fadeIn">
        <div className="user__logo--bg-rotate">
          <div className="user__logo--bg" />
        </div>
        <Logo height={60} />
      </div>
    </div>
  );
});
