import React from 'react';
import styled from 'styled-components';
import ProfileLinks from './profileLinks';
import ProfileLogo from './profileLogo';
import DevInfo from './devInfo';

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ProfileInfo = styled.div`
  @media screen and (min-width: 768px) {
    padding-left: 50px;
  }
`;

const AboutMe = ({ profileLogo }) => {
  return (
    <Div className="animated fadeIn faster">
      <ProfileLogo profileLogo={profileLogo} />
      <ProfileInfo>
        <DevInfo />
        <ProfileLinks />
      </ProfileInfo>
    </Div>
  );
};

export default AboutMe;
