import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Wrapper = styled.div`
  min-width: 200px;
  padding-right: 2rem;

  .profile-logo {
    border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
    overflow: hidden;
    border: 10px solid var(--color-dark);
  }
`;

export default function ProfileLogo({ profileLogo }) {
  const sources = profileLogo
    ? [
        profileLogo.mobileImage.childImageSharp.fluid,
        {
          ...profileLogo.desktopImage.childImageSharp.fluid,
          media: `(min-width: 768px)`,
        },
      ]
    : [];

  return (
    <Wrapper>
      <div className="neumorphism profile-logo">
        {profileLogo ? <Img fluid={sources} /> : null}
      </div>
    </Wrapper>
  );
}
