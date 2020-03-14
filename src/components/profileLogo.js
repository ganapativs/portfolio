import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Wrapper = styled.div`
  min-width: 140px;
  margin: 1rem 0;

  @media screen and (min-width: 768px) {
    min-width: 160px;
    margin: 0;
  }

  .profile-logo {
    border-radius: 50%;
    border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
    overflow: hidden;
    background: var(--color-accent);
    border: 0.6rem solid var(--color-dark);

    .gatsby-image-wrapper {
      transform: translateY(0.5rem);
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
