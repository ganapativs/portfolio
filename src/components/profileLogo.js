import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image';

const Wrapper = styled.div`
  min-width: 140px;
  margin: 1rem 0;

  @media screen and (min-width: 768px) {
    margin: 0;
  }

  .profile-logo {
    border-radius: 50%;
    overflow: hidden;
    background: var(--color-accent);
    background: linear-gradient(-135deg, var(--color-accent), transparent);
    filter: sepia(1) grayscale(1) brightness(0.8);

    @media screen and (hover: hover) and (pointer: fine) {
      transition: filter 0.15s ease-in-out;

      &:hover {
        transition: filter 0.2s ease-in-out;
        filter: sepia(0) grayscale(0) brightness(1);
      }
    }
  }
`;

export default function ProfileLogo({ profileLogo }) {
  const images = withArtDirection(
    getImage(profileLogo.desktopImage.childImageSharp.gatsbyImageData),
    [
      {
        media: `(max-width: 767px)`,
        image: getImage(
          profileLogo.mobileImage.childImageSharp.gatsbyImageData,
        ),
      },
      {
        media: `(min-width: 768px)`,
        image: getImage(
          profileLogo.desktopImage.childImageSharp.gatsbyImageData,
        ),
      },
    ],
  );

  return (
    <Wrapper>
      <div className="profile-logo">
        {profileLogo ? <GatsbyImage image={images} draggable={false} /> : null}
      </div>
    </Wrapper>
  );
}
