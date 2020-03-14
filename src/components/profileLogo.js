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
    border: 0.6rem solid var(--color-dark);
    background: var(--color-accent);
    background: radial-gradient(
          circle at 0% 50%,
          transparent 9px,
          var(--color-dark) 10px,
          transparent 11px
        )
        0px 10px,
      radial-gradient(
        at 100% 100%,
        transparent 9px,
        var(--color-dark) 10px,
        transparent 11px
      ),
      var(--color-accent);
    background-size: 20px 20px;

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
        {profileLogo ? <Img draggable={false} fluid={sources} /> : null}
      </div>
    </Wrapper>
  );
}
