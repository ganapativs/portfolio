import React from 'react';
import useWindowSize from '@rehooks/window-size';
import styled from 'styled-components/macro';
import GitHubIcon from '../assets/icons/github-icon.js';
import TwitterIcon from '../assets/icons/twitter-icon.js';
import LinkedInIcon from '../assets/icons/linkedin-icon.js';
import DribbbleIcon from '../assets/icons/dribbble-icon.js';
import NPMIcon from '../assets/icons/npm-icon.js';

const Div = styled.div`
  html.wf-active & {
    font-family: 'Fira Mono', monospace;
  }

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
    .app__link {
      padding: 5px 10px;
    }
  }
`;

const Row = styled.div`
  padding: 10px;
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
  {
    link: 'https://www.npmjs.com/~ganapativs',
    Component: NPMIcon,
  },
];

export default function ProfileLinks() {
  let { innerWidth } = useWindowSize();
  const isMobile = innerWidth < 768;
  const iconWidth = isMobile ? 36 : 40;

  return (
    <Div className="animated fadeInUp faster animation-delay-half-s">
      {socialLinks.map(({ link, Component }, index) => (
        <Row
          className="app__link animated fadeInUp faster"
          key={link}
          style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Component
              width={iconWidth}
              height={iconWidth}
              style={{ verticalAlign: 'sub' }}
            />{' '}
          </a>
        </Row>
      ))}
    </Div>
  );
}
