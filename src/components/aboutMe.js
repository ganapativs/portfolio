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
  padding: 3rem;
  border-radius: 20px;

  @media screen and (min-width: 768px) {
    margin: 85px 0 0 85px;
    padding-left: 100px;
  }
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
