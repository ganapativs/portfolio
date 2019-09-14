import React from 'react';
import styled from 'styled-components';
import ProfileLinks from './profileLinks';
import ProfileLogo from './profileLogo';
import DevInfo from './devInfo';

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
    padding-left: 50px;
  }
`;

const AboutMe = ({ profileLogo }) => {
  return (
    <Div>
      <ProfileLogo ppOnly profileLogo={profileLogo} />
      <ProfileInfo>
        <DevInfo />
        <ProfileLinks />
      </ProfileInfo>
    </Div>
  );
};

export default AboutMe;
