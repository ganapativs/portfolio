import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Wrapper = styled.div`
  min-width: 170px;

  @media screen and (min-width: 768px) {
    position: absolute;
  }

  .profile-logo {
    border-radius: 50%;
    border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
    overflow: hidden;
    padding: 18px;
    box-shadow: inset -4px -4px 10px -4px var(--color-dark-2),
      1px 1px 1px -1px var(--color-ultra-dark),
      -15px -15px 24px var(--color-dark-2);

    .gatsby-image-wrapper {
      box-shadow: 2px 2px 4px var(--color-ultra-dark);
      border-radius: 50%;
      border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
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
