import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import Logo from '../../assets/logo/meetguns';
import BackgroundImage from './images/ganapativs.jpg';

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

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Morph = keyframes`
  0% {
    transform: scale(0.95);
    border-radius: 50%;
    border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
    background: var(--color-orange);
    box-shadow: inset 6px -6px 12px var(--color-red),
      inset 4px 0px 10px var(--color-blue), 0 0 0 0 var(--color-light-op-1),
      0 0 0 0 var(--color-light-op-2), 0 0 0 0 var(--color-light-op-3);
  }
  100% {
    transform: scale(1.1);
    border-radius: 50%;
    background: var(--color-red);
    border-radius: 35% 65% 55% 45% / 48% 48% 52% 52%;
    box-shadow: inset 6px -6px 12px var(--color-orange),
      inset 4px 0px 10px var(--color-blue), 0 0 0 10px var(--color-transparent),
      0 0 0 25px var(--color-transparent), 0 0 0 45px var(--color-transparent);
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
  animation: ${Morph} 8s ease-in-out infinite both alternate;
`;

const UserLogoBGRotate = styled(UserLogoBGCommon)`
  animation: ${Spin} 12s linear infinite;
`;
const UserLogoImageWrapper = styled(UserLogoBGCommon)`
  animation: ${Spin} 12s linear infinite reverse;
`;
const UserLogoImage = styled(UserLogoBGCommon)`
  width: 110%;
  height: 110%;
  left: -5%;
  top: -5%;
  border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
  background-image: url(${BackgroundImage});
  background-size: cover;
  opacity: 0;
  transform: scale(0.95) rotate(-10deg) translateY(10%);
  filter: grayscale(100%);
  transition: opacity 0.1s ease-out, transform 0.2s ease-out,
    border-radius 0.1s ease-out, filter 0.2s ease-out;
`;

const UserLogoSVGWrapper = styled.div`
  opacity: 1;
  transform: scale(1) rotate(0deg);
  transition: opacity 0.3s 0.1s ease-out, transform 0.3s 0.1s ease-out;
`;

const UserLogo = styled.div`
  width: 120px;
  height: 120px;
  padding: 30px 18px;
  text-align: center;
  position: relative;
  margin: 50px auto 30px auto;

  &:hover ${UserLogoSVGWrapper} {
    opacity: 0;
    transform: scale(0.8) rotate(5deg);
    transition: opacity 0.1s ease-in, transform 0.1s ease-in;
    transition-delay: 0.2s;
  }

  &:hover ${UserLogoImage} {
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

const UserLogoWrapper = styled.div`
  animation-delay: 0.5s;
`;

const directions = [
  '',
  'UpLeft',
  'UpRight',
  'DownLeft',
  'DownRight',
  'no-rotate',
];

export default React.memo(
  function ProfileLogo() {
    const randomNo = Math.floor(Math.random() * directions.length + 1);

    return (
      <UserLogoWrapper className="animated jello">
        <div className={`animated rotateIn${directions[randomNo]}`}>
          <div className="animated fadeInUp">
            <UserLogo className="animated zoomInDown">
              <UserLogoBGRotate>
                <UserLogoBG>
                  <UserLogoImageWrapper>
                    <UserLogoImage />
                  </UserLogoImageWrapper>
                </UserLogoBG>
              </UserLogoBGRotate>
              <UserLogoSVGWrapper>
                <Logo height={60} />
              </UserLogoSVGWrapper>
            </UserLogo>
          </div>
        </div>
      </UserLogoWrapper>
    );
  },
  () => true, // Never re-render
);
