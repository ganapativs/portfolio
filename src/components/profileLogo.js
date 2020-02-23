import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Wrapper = styled.div`
  min-width: 250px;

  @media screen and (min-width: 768px) {
    position: absolute;
    top: 0;
  }

  .profile-logo {
    border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
    border-radius: 50%;
    overflow: hidden;
    margin: 3rem 2rem;

    .gatsby-image-wrapper {
      box-shadow: 2px 2px 4px var(--color-ultra-dark);
      border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
      border-radius: 50%;
    }
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
