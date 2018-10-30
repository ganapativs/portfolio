import React, { Component } from 'react';
import Logo from '../logo/meetguns';
import './profile-logo.css';

class ProfileLogo extends Component {
  render() {
    return (
      <div className="text-center full-width">
        <div className="user__logo">
          <div className="user__logo--bg-rotate">
            <div className="user__logo--bg" />
          </div>
          <Logo height={60} />
        </div>
      </div>
    );
  }
}

export default ProfileLogo;
