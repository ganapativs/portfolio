import React from 'react';
import Logo from '../logo/meetguns';
import './profile-logo.css';

export default React.memo(
  function ProfileLogo() {
    return (
      <div className="text-center full-width">
        <div className="user__logo animated fadeIn">
          <div className="user__logo--bg-rotate">
            <div className="user__logo--bg">
              <div className="user__logo--image--wrapper">
                <div className="user__logo--image" />
              </div>
            </div>
          </div>
          <div className="user__logo--svg-wrapper">
            <Logo height={60} />
          </div>
        </div>
      </div>
    );
  },
  () => true, // Never re-render
);
