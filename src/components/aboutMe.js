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
  }
`;

const ProfileInfo = styled.div`
  padding: 2rem;
  border-radius: 20px;

  /* @media screen and (min-width: 768px) {
    padding-left: 50px;
  } */
`;

const AboutMe = ({ profileLogo }) => {
  return (
    <Div>
      <ProfileLogo profileLogo={profileLogo} />
      <ProfileInfo className="neumorphism">
        <DevInfo />
        <ProfileLinks />
      </ProfileInfo>
    </Div>
  );
};

export default AboutMe;
