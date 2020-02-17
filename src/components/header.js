import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import Logo from '../assets/logo/meetguns';
import { captureEvent } from '../utils/ga';
import AccentSwitcher from './accentSwitcher';
import SwitcherButton from './SwitcherButton';

const switchTheme = (theme, toggleTheme) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  toggleTheme(nextTheme);
  captureEvent(nextTheme, 'change', 'Theme');
};

const HeaderRow = styled.header`
  position: sticky;
  top: 0;
  background: var(--color-dark);
  z-index: 1;
  margin: 20px -20px;
  padding: 10px 15px;

  @media screen and (min-width: 768px) and (max-width: 991px) {
    margin: 40px -30px;
    padding: 20px 25px;
  }

  @media screen and (min-width: 992px) {
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
    transition: transform 0.3s ease-out, border-radius 0.15s ease-out;

    &:hover,
    &.init-hover-animate-state {
      transition: transform 0.5s ease-in-out, border-radius 0.2s ease-in-out;
      border-radius: 35% 65% 55% 45% / 48% 48% 52% 52%;
      transform: translateY(-2px);
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
  margin-left: 2rem;

  @media screen and (max-width: 767px) {
    margin-left: 0.6rem;
  }

  a {
    color: var(--color-light-dark);
    margin: 0 1rem;
    text-transform: capitalize;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.2s ease-out;
    padding: 8px 15px;
    border-radius: 20px;

    &.active {
      transition: color 0.25s ease-in;
      color: var(--color-accent);
    }

    @media screen and (hover: hover) and (pointer: fine) {
      &:hover {
        transition: color 0.25s ease-in;
        color: var(--color-accent);
      }
    }

    @media screen and (max-width: 767px) {
      margin: 0 8px;
    }
  }
`;

const ThemeSwitcher = styled.div`
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
  {
    link: '/blog/',
    name: 'Blog',
  },
  {
    link: '/captures/',
    name: 'Captures',
  },
];

const Header = ({ location: { pathname } }) => {
  const [logoActiveAnimateState, setLogoAnimateState] = useState(false);
  const [jsEnabled, setJSEnabled] = useState(false);

  // Animate hover state to normal state initially on logo
  useEffect(() => {
    setJSEnabled(true);
    setLogoAnimateState(true);
    const timer = setTimeout(() => {
      setLogoAnimateState(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HeaderRow>
      <HeaderWrapper>
        <Left>
          <Link title={'Meetguns.com | About'} to={'/'}>
            <LogoWrapper
              className={`neumorphism ${
                logoActiveAnimateState ? 'init-hover-animate-state' : ''
              }`}>
              <Logo color="var(--color-accent)" />
            </LogoWrapper>
          </Link>
          <RouteLinks>
            {links.map(({ link, name }) => (
              <Link
                key={`${link}_${pathname}`}
                title={name}
                className={`neumorphism ${
                  (pathname === '/' && pathname === link) ||
                  (link !== '/' && pathname.startsWith(link))
                    ? 'active'
                    : ''
                }`}
                to={link}>
                {name}
              </Link>
            ))}
          </RouteLinks>
        </Left>
        <Right>
          {jsEnabled ? (
            <>
              <AccentSwitcher />
              <ThemeToggler>
                {({ theme, toggleTheme }) => (
                  <SwitcherButton
                    className="neumorphism"
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
                    <ThemeSwitcher>
                      {/* <Switcher theme={theme} /> */}
                      <MoonOrSun isDark={theme === 'dark'} />
                      <MoonMask isDark={theme === 'dark'} />
                    </ThemeSwitcher>
                  </SwitcherButton>
                )}
              </ThemeToggler>
            </>
          ) : null}
        </Right>
      </HeaderWrapper>
    </HeaderRow>
  );
};

export default Header;
