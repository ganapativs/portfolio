import React from 'react';
import styled from 'styled-components';
import ProfileLinks from './profileLinks';
import ProfileLogo from './profileLogo';
import DevInfo from './devInfo';

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  padding-top: 1rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding-top: 2rem;
  }
`;

const ProfileInfo = styled.div`
  padding: 0;
  border-radius: 20px;

  @media screen and (min-width: 768px) {
    padding: 0 0 0 2rem;
  }
`;

const AboutMe = ({ profileLogo }) => {
  return (
    <Div>
      <ProfileLogo profileLogo={profileLogo} />
      <ProfileInfo>
        <DevInfo />
        <ProfileLinks />
      </ProfileInfo>
    </Div>
  );
};

export default AboutMe;
