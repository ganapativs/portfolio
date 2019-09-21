import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import Logo from '../assets/logo/meetguns';
import { captureEvent } from '../utils/ga';

const switchTheme = (theme, toggleTheme) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  toggleTheme(nextTheme);
  captureEvent(nextTheme, 'change', 'Theme');
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    padding: 60px 0;
    font-size: inherit;
  }
`;

const LogoWrapper = styled.div`
  background: var(--color-dark);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
  margin-right: 24px;
  background: linear-gradient(0deg, var(--color-light-op-3), transparent);
  box-shadow: 0 0 var(--color-orange), inset 0 0 var(--color-red),
    inset 0 0 var(--color-red), inset 0 0 var(--color-red),
    inset 0 0 var(--color-red);

  svg {
    height: 30px;
  }

  @media screen and (max-width: 767px) {
    width: 40px;
    height: 40px;
    margin-right: 10px;

    svg {
      height: 20px;
    }
  }

  @media screen and (hover: hover) and (pointer: fine) {
    transition: all 0.3s ease-out, border-color 0.4s ease-out,
      border-radius 0.15s ease-out, box-shadow 0.25s linear;

    &:hover,
    &.init-hover-animate-state {
      transition: all 0.5s ease-in, border-color 0.25s ease-in-out,
        transform 0.25s ease, border-radius 0.25s ease, box-shadow 0.25s ease-in;
      background: linear-gradient(0deg, transparent, transparent);
      border-radius: 35% 65% 55% 45% / 48% 48% 52% 52%;
      transform: translateY(-3px) scale(1.05);
      box-shadow: 2px 5px 25px -5px var(--color-orange),
        inset 0 -4px 2px var(--color-red), inset -4px 0 2px var(--color-red),
        inset 0 2px 4px var(--color-red), inset 2px 0px 4px var(--color-red);
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
    transition: all 0.2s ease-out;

    &.active {
      transition: all 0.25s ease-in;
      color: var(--color-red);
    }

    @media screen and (hover: hover) and (pointer: fine) {
      &:hover {
        transition: all 0.25s ease-in;
        color: var(--color-red);
      }
    }

    @media screen and (max-width: 767px) {
      margin: 0 8px;
    }
  }
`;

const Switcher = styled.div`
  position: relative;
  width: 44px;
  height: 24px;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: transparent;
    transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  &:before {
    left: 0;
    top: ${props => (props.theme === 'light' ? '0px' : '6px')};
    width: ${props => (props.theme === 'light' ? '24px' : '12px')};
    height: ${props => (props.theme === 'light' ? '24px' : '12px')};
    background: ${props =>
      props.theme === 'light' ? 'var(--color-dark)' : 'var(--color-light)'};
    box-shadow: ${props =>
      props.theme === 'light' ? '0 1px 2px 1px var(--color-red)' : ''};
  }

  &:after {
    left: ${props => (props.theme === 'dark' ? '20px' : '32px')};
    top: ${props => (props.theme === 'dark' ? '0px' : '6px')};
    width: ${props => (props.theme === 'dark' ? '24px' : '12px')};
    height: ${props => (props.theme === 'dark' ? '24px' : '12px')};
    background: ${props =>
      props.theme === 'dark' ? 'var(--color-dark)' : 'var(--color-light)'};
    box-shadow: ${props =>
      props.theme === 'dark' ? '0 1px 2px 1px var(--color-red)' : ''};
  }

  @media screen and (max-width: 767px) {
    transform: scale(0.8) translateX(5px);
  }
`;

const SepiaEffectGlobalStyle = createGlobalStyle`
  body {
    transition: filter .5s ease-in-out, background 0.1s ease-in;
    filter: ${props => (props.sepia ? 'sepia(1)' : '')}
  }
`;

const links = [
  {
    link: '/',
    name: 'About',
  },
  {
    link: '/photography/',
    name: 'Photography',
  },
  {
    link: '/blog/',
    name: 'blog',
  },
];

const Header = ({ location: { pathname } }) => {
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
    <HeaderWrapper className="animated fadeIn faster">
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
            <Logo color="var(--color-red)" />
          </LogoWrapper>
        </button>
        <RouteLinks>
          {links.map(({ link, name }) => (
            <Link
              key={`${link}_${pathname === link}`}
              title={name}
              className={pathname === link ? 'active' : ''}
              to={link}>
              {name}
            </Link>
          ))}
        </RouteLinks>
      </Left>
      <Right>
        <div>
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <div
                role="button"
                tabIndex={0}
                onKeyPress={e => {
                  if (e.which === 13 || e.which === 32) {
                    switchTheme(theme, toggleTheme);
                  }
                }}
                title={
                  theme === 'dark'
                    ? 'Switch to light theme'
                    : 'Switch to dark theme'
                }
                onClick={() => {
                  switchTheme(theme, toggleTheme);
                }}>
                <Switcher theme={theme} />
              </div>
            )}
          </ThemeToggler>
        </div>
      </Right>
    </HeaderWrapper>
  );
};

export default Header;
