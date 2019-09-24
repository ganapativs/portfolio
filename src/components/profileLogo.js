import React from 'react';
import styled, { keyframes } from 'styled-components';
import Img from 'gatsby-image';
import { Spin } from '../utils/keyframes';

const Wiggle = keyframes`
  0% {
    transform: scale(0.85) translate3d(-3px, 3px, 0);
  }
  33.33% {
    transform: translate3d(3px, -3px, 0);
  }
  66.66% {
    transform: translate3d(-3px, -3px, 0);
  }
  100% {
    transform: scale(0.95) translate3d(3px, 3px, 0);
  }
`;

const MorphShadow = keyframes`
  0% {
    box-shadow: 0 0 0 0 var(--color-light-op-1),
      0 0 0 0 var(--color-light-op-2), 0 0 0 0 var(--color-light-op-3);
  }
  100% {
    box-shadow: 0 0 0 10px var(--color-transparent),
      0 0 0 25px var(--color-transparent), 0 0 0 45px var(--color-transparent);
  }
`;

const MorphShadowMobile = keyframes`
  0% {
    box-shadow: 0 0 0 0 var(--color-light-op-1),
      0 0 0 0 var(--color-light-op-2), 0 0 0 0 var(--color-light-op-3);
  }
  100% {
    box-shadow: 0 0 0 10px var(--color-transparent),
      0 0 0 17px var(--color-transparent), 0 0 0 25px var(--color-transparent);
  }
`;

const MorphRest = keyframes`
  0% {
    transform: scale(0.95);
    border-radius: 50%;
    border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
  }
  100% {
    transform: scale(1.1);
    border-radius: 50%;
    border-radius: 35% 65% 55% 45% / 48% 48% 52% 52%;
  }
`;

const UserLogoBGCommon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
`;

const UserLogoBG = styled(UserLogoBGCommon)`
  overflow: hidden;
  border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
  animation: ${MorphRest} 8s ease-in-out infinite both alternate,
    ${MorphShadowMobile} 8s ease-in-out infinite both alternate;

  @media screen and (min-width: 768px) {
    animation: ${MorphRest} 8s ease-in-out infinite both alternate,
      ${MorphShadow} 8s ease-in-out infinite both alternate;
  }
`;

const UserLogoBGRotate = styled(UserLogoBGCommon)`
  @media screen and (min-width: 768px) {
    animation: ${Spin} 12s linear infinite;
  }
`;

const UserLogoImageWrapper = styled(UserLogoBGCommon)`
  @media screen and (min-width: 768px) {
    animation: ${Spin} 12s linear infinite reverse;
  }
`;

const UserLogoImage = styled(UserLogoBGCommon)`
  width: 110%;
  height: 110%;
  left: -5%;
  top: -5%;
  border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
  opacity: 0;
  transform: scale(1) rotate(-10deg) translateY(10%);
  filter: grayscale(100%);
  transition: opacity 0.1s ease-out, transform 0.2s ease-out,
    border-radius 0.1s ease-out, filter 0.2s ease-out;
`;

const UserLogo = styled.div`
  width: 120px;
  height: 120px;
  padding: 30px 18px;
  text-align: center;
  position: relative;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    width: 160px;
    height: 160px;
  }

  ${UserLogoImage} {
    opacity: 1;
    transform: scale(1) rotate(0deg) translateY(0);
    filter: grayscale(0%);
    border-radius: 50%;
    transition: opacity 0.15s ease-in, transform 0.15s ease-in,
      border-radius 0.2s ease-in, filter 0.2s ease-in;
    transition-delay: 0.2s;
  }

  svg {
    animation: ${Wiggle} 10s ease-out infinite both alternate;
  }
`;

const W1 = styled.div`
  animation-delay: 0.5s;
`;

const W2 = styled.div`
  width: 160px;
  height: 120px;
  margin: 30px 0 25px -15px;

  @media screen and (min-width: 768px) {
    margin: 50px 0 25px 0;
    width: 200px;
    height: 160px;
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
    <W1>
      <W2>
        <UserLogo>
          <UserLogoBGRotate>
            <UserLogoBG>
              <UserLogoImageWrapper>
                <UserLogoImage>
                  {profileLogo ? <Img fluid={sources} /> : null}
                </UserLogoImage>
              </UserLogoImageWrapper>
            </UserLogoBG>
          </UserLogoBGRotate>
        </UserLogo>
      </W2>
    </W1>
  );
}
