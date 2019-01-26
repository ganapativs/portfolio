import React from 'react';
import useWindowSize from '@rehooks/window-size';
import styled from 'styled-components/macro';
import GitHubIcon from '../assets/icons/githubIcon.js';
import TwitterIcon from '../assets/icons/twitterIcon.js';
import StackoverflowIcon from '../assets/icons/stackoverflowIcon.js';
import LinkedInIcon from '../assets/icons/linkedinIcon.js';
import DribbbleIcon from '../assets/icons/dribbbleIcon.js';
import EmailIcon from '../assets/icons/emailIcon.js';

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
    link: 'https://twitter.com/ganapativs',
    Component: TwitterIcon,
    title: 'Twitter',
  },
  {
    link: 'https://github.com/ganapativs',
    Component: GitHubIcon,
    title: 'GitHub',
  },
  {
    link: 'https://stackoverflow.com/users/2627022',
    Component: StackoverflowIcon,
    title: 'Stack Overflow',
  },
  {
    link: 'https://www.linkedin.com/in/ganapativs/',
    Component: LinkedInIcon,
    title: 'LinkedIn',
  },
  {
    link: 'https://dribbble.com/ganapativs',
    Component: DribbbleIcon,
    title: 'Dribbble',
  },
  {
    link: 'mailto:vsg.inbox+meetguns+com@gmail.com?Subject=Hello 👋',
    Component: EmailIcon,
    title: 'Email',
  },
];

export default function ProfileLinks() {
  let { innerWidth } = useWindowSize();
  const isMobile = innerWidth < 768;
  const iconWidth = isMobile ? 28 : 26;

  return (
    <Div className="animated fadeInUp faster animation-delay-half-s">
      {socialLinks.map(({ link, Component, title }, index) => (
        <Icons
          className="app__link animated fadeInUp faster"
          key={link}
          title={title}
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
