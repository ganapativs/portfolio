import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import Logo from '../assets/logo/meetguns';
import { captureEvent } from '../utils/ga';
import AccentSwitcher from './accentSwitcher';

const switchTheme = (theme, toggleTheme) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  toggleTheme(nextTheme);
  captureEvent(nextTheme, 'change', 'Theme');
};

const HeaderRow = styled.div`
  position: sticky;
  top: 0;
  background: var(--color-dark);
  z-index: 1;
  margin: 20px -20px;
  padding: 10px 15px;

  @media screen and (min-width: 768px) {
    margin: 40px 0;
    padding: 20px 0;
  }
`;

const HeaderWrapper = styled.div`
  max-width: 840px;
  margin: 0 auto;
  align-self: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
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
  background: linear-gradient(0deg, var(--color-light-op-3), transparent);
  box-shadow: 0 0 var(--color-orange), inset 0 0 var(--color-accent),
    inset 0 0 var(--color-accent), inset 0 0 var(--color-accent),
    inset 0 0 var(--color-accent);

  svg {
    height: 30px;
  }

  @media screen and (max-width: 767px) {
    width: 40px;
    height: 40px;

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
      box-shadow: 2px 5px 25px -5px var(--color-accent),
        inset 0 -4px 2px var(--color-accent),
        inset -4px 0 2px var(--color-accent),
        inset 0 2px 4px var(--color-accent),
        inset 2px 0px 4px var(--color-accent);
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
  margin-left: 1rem;

  @media screen and (max-width: 767px) {
    margin-left: 0.6rem;
  }

  a {
    color: var(--color-light-dark);
    margin: 0 15px;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.2s ease-out;

    &.active {
      transition: all 0.25s ease-in;
      color: var(--color-accent);
    }

    @media screen and (hover: hover) and (pointer: fine) {
      &:hover {
        transition: all 0.25s ease-in;
        color: var(--color-accent);
      }
    }

    @media screen and (max-width: 767px) {
      margin: 0 8px;
    }
  }
`;

const ThemeSwitcher = styled.div`
  position: relative;
  cursor: pointer;
  transform: scale(0.8) translateX(2px);

  @media screen and (max-width: 767px) {
    transform: scale(0.7) translateX(3px);
  }
`;

// Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? '4px' : '2px')} solid var(--color-accent);
  background: var(--color-accent);
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease-out, opacity 0.1s ease-out;
  overflow: ${p => (p.isDark ? 'visible' : 'hidden')};

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover {
      transition: all 0.1s ease-in, opacity 0.15s ease-in;
      opacity: 0.8;
    }
  }

  &::before {
    content: '';
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid var(--color-accent);
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 var(--color-accent), 0 23px 0 var(--color-accent),
      23px 0 0 var(--color-accent), -23px 0 0 var(--color-accent),
      15px 15px 0 var(--color-accent), -15px 15px 0 var(--color-accent),
      15px -15px 0 var(--color-accent), -15px -15px 0 var(--color-accent);
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`;

const MoonMask = styled.div`
  position: absolute;
  right: -9px;
  top: -9px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: var(--color-dark);
  transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: transform 0.35s ease;
`;

const links = [
  {
    link: '/',
    name: 'About',
  },
  // {
  //   link: '/blog/',
  //   name: 'Blog',
  // },
  {
    link: '/captures/',
    name: 'Captures',
  },
];

const Header = ({ location: { pathname } }) => {
  const [logoActiveAnimateState, setLogoAnimateState] = useState(true);

  // Animate hover state to normal state initially on logo
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimateState(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HeaderRow>
      <HeaderWrapper>
        <Left>
          <Link title={'Meetguns.com | About'} to={'/'}>
            <LogoWrapper
              className={
                logoActiveAnimateState ? 'init-hover-animate-state' : ''
              }>
              <Logo color="var(--color-accent)" />
            </LogoWrapper>
          </Link>
          <RouteLinks>
            {links.map(({ link, name }) => (
              <Link
                key={`${link}_${pathname}`}
                title={name}
                className={
                  (pathname === '/' && pathname === link) ||
                  (link !== '/' && pathname.startsWith(link))
                    ? 'active'
                    : ''
                }
                to={link}>
                {name}
              </Link>
            ))}
          </RouteLinks>
        </Left>
        <Right>
          <AccentSwitcher />
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <ThemeSwitcher
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
                {/* <Switcher theme={theme} /> */}
                <MoonOrSun isDark={theme === 'dark'} />
                <MoonMask isDark={theme === 'dark'} />
              </ThemeSwitcher>
            )}
          </ThemeToggler>
        </Right>
      </HeaderWrapper>
    </HeaderRow>
  );
};

export default Header;
