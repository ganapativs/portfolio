import React from 'react';
import useWindowSize from '@rehooks/window-size';
import styled from 'styled-components/macro';
import GitHubIcon from '../assets/icons/github-icon.js';
import TwitterIcon from '../assets/icons/twitter-icon.js';
import LinkedInIcon from '../assets/icons/linkedin-icon.js';
import DribbbleIcon from '../assets/icons/dribbble-icon.js';

const Icons = styled.div`
  padding: 10px;
`;

const Div = styled.div`
  width: 100%;
  vertical-align: middle;
  text-align: center;

  .app__link {
    text-align: left;
    padding: 8px 10px;
    display: inline-block;

    :first-child {
      padding-left: 0;
    }

    :last-child {
      padding-right: 0;
    }
  }

  @media screen and (min-width: 768px) {
    text-align: left;

    .app__link {
      padding: 5px 10px;
    }
  }
`;

const socialLinks = [
  {
    link: 'https://github.com/ganapativs',
    Component: GitHubIcon,
  },
  {
    link: 'https://twitter.com/ganapativs',
    Component: TwitterIcon,
  },
  {
    link: 'https://www.linkedin.com/in/ganapativs/',
    Component: LinkedInIcon,
  },
  {
    link: 'https://dribbble.com/ganapativs',
    Component: DribbbleIcon,
  },
];

export default function ProfileLinks() {
  let { innerWidth } = useWindowSize();
  const isMobile = innerWidth < 768;
  const iconWidth = isMobile ? 28 : 26;

  return (
    <Div className="animated fadeInUp faster animation-delay-half-s">
      {socialLinks.map(({ link, Component }, index) => (
        <Icons
          className="app__link animated fadeInUp faster"
          key={link}
          style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Component
              width={iconWidth}
              height={iconWidth}
              style={{ verticalAlign: 'sub' }}
            />
          </a>
        </Icons>
      ))}
    </Div>
  );
}
