import React from 'react';
import { Link } from 'gatsby';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';
import styled, { keyframes } from 'styled-components';
import Logo from '../assets/logo/meetguns';

export const FadeIn = keyframes`
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
  background: var(--color-dark);
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
  background-image: linear-gradient(var(--color-dark), transparent),
    radial-gradient(circle at bottom left, var(--color-light-op-3), transparent);
  border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;
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

    &.active {
      color: var(--color-red);
    }
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
  return (
    <HeaderWrapper className="animated faster">
      <Left>
        <Link to="/">
          <LogoWrapper>
            <Logo color="var(--color-red)" height={30} />
          </LogoWrapper>
        </Link>
        <Location>
          {({ location }) => (
            <RouteLinks>
              {links.map(({ link, name }) => (
                <Link
                  key={link}
                  title={name}
                  className={location.pathname === link ? 'active' : ''}
                  to={link}>
                  {name}
                </Link>
              ))}
            </RouteLinks>
          )}
        </Location>
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
  );
};

export default Header;
