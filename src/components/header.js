import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import Logo from '../assets/logo/meetguns';

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0 30px 0;
  animation-name: ${FadeIn};

  @media screen and (min-width: 768px) {
    padding: 30px 0 100px 0;
  }
`;

const LogoWrapper = styled.div`
  background: var(--color-light-op-3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
  background: linear-gradient(-45deg, var(--color-light-op-2), transparent);

  @media screen and (hover: hover) {
    border: 0 solid transparent;
    /* border: 3px solid; */
    transition: all 0.3s ease-out, border-color 0.4s ease-out,
      border-width 0.15s ease-out, border-radius 0.15s ease-out;

    &:hover,
    &.init-hover-animate-state {
      transition: all 0.5s ease-in, border-color 0.25s ease-in-out,
        border-width 0.15s ease-in-out, transform 0.25s ease,
        border-radius 0.25s ease, box-shadow 0.25s ease-in;
      border-width: 2px;
      border-bottom-width: 6px;
      border-right-width: 6px;
      border-radius: 35% 65% 55% 45% / 48% 48% 52% 52%;
      border-color: var(--color-red);
      background: linear-gradient(
        -45deg,
        var(--color-light-op-2),
        var(--color-dark)
      );
      transform: translateY(-3px) scale(1.05);
      box-shadow: 2px 5px 25px -5px var(--color-orange);
    }

    svg {
      transition: transform 0.15s ease-out;
    }

    &:hover svg,
    &.init-hover-animate-state svg {
      transition: transform 0.15s ease-in-out;
      transform: scale(1.05) translateX(-2px);
    }
  }
`;

const Left = styled.div`
  display: inline-flex;
  align-items: center;

  ${LogoWrapper} {
    margin-right: 24px;
  }
`;
const Right = styled.div`
  display: inline-flex;
  align-items: center;
`;

const RouteLinks = styled.div`
  a {
    color: var(--color-light-dark);
    margin: 0 15px;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;

    &.active {
      color: var(--color-red);
    }

    @media screen and (hover: hover) {
      transition: all 0.1s ease-out;

      &:hover {
        transition: all 0.2s ease-in;
        color: var(--color-red);
      }
    }
  }
`;

const SepiaEffectGlobalStyle = createGlobalStyle`
  body {
    transition: filter .5s ease-in-out;
    filter: ${props => (props.sepia ? 'sepia(1)' : '')}
  }
`;

const links = [
  {
    link: '/',
    name: 'About',
  },
  {
    link: '/photography',
    name: 'Photography',
  },
  {
    link: '/blog',
    name: 'blog',
  },
];

const Header = () => {
  const [logoActiveAnimateState, setLogoAnimateState] = useState(true);
  const [sepia, setSepia] = useState(false);

  // Animate hover state to normal state initially on logo
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimateState(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Location>
      {({ location: { pathname } }) => (
        <HeaderWrapper className="animated faster">
          <SepiaEffectGlobalStyle sepia={sepia} />
          <Left>
            <button
              onClick={() => {
                setSepia(!sepia);
              }}>
              <LogoWrapper
                className={
                  logoActiveAnimateState ? 'init-hover-animate-state' : ''
                }>
                <Logo color="var(--color-red)" height={30} />
              </LogoWrapper>
            </button>
            <RouteLinks>
              {links.map(({ link, name }) => (
                <Link
                  key={link}
                  title={name}
                  className={pathname === link ? 'active' : ''}
                  to={link}>
                  {name}
                </Link>
              ))}
            </RouteLinks>
          </Left>
          <Right>
            <RouteLinks>
              <a
                title="View source code on GitHub"
                className="hide-xs"
                target="_blank"
                href={'https://github.com/ganapativs/portfolio'}
                rel="noopener noreferrer">
                Source
              </a>
            </RouteLinks>
          </Right>
        </HeaderWrapper>
      )}
    </Location>
  );
};

export default Header;
