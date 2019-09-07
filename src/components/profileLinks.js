import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '../assets/icons/githubIcon';
import TwitterIcon from '../assets/icons/twitterIcon';
import StackoverflowIcon from '../assets/icons/stackoverflowIcon';
import LinkedInIcon from '../assets/icons/linkedinIcon';
import DribbbleIcon from '../assets/icons/dribbbleIcon';
import EmailIcon from '../assets/icons/emailIcon';
import { captureEvent } from '../utils/ga';

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
    link: 'https://twitter.com/ganapativs?ref=meetguns.com',
    Component: TwitterIcon,
    title: 'Twitter',
    seo: 'Personal Twitter',
  },
  {
    link: 'https://github.com/ganapativs?ref=meetguns.com',
    Component: GitHubIcon,
    title: 'GitHub',
    seo: 'Personal GitHub',
  },
  {
    link: 'https://stackoverflow.com/users/2627022?ref=meetguns.com',
    Component: StackoverflowIcon,
    title: 'Stack Overflow',
    seo: 'Personal Stack Overflow',
  },
  {
    link: 'https://www.linkedin.com/in/ganapativs/?ref=meetguns.com',
    Component: LinkedInIcon,
    title: 'LinkedIn',
    seo: 'Personal LinkedIn',
  },
  {
    link: 'https://dribbble.com/ganapativs?ref=meetguns.com',
    Component: DribbbleIcon,
    title: 'Dribbble',
    seo: 'Personal Dribbble',
  },
  {
    link: 'mailto:vsg.inbox+meetguns+com@gmail.com?Subject=Hello 👋',
    Component: EmailIcon,
    title: 'Email',
    seo: 'Personal Email',
  },
];

export default function ProfileLinks() {
  return (
    <Div className="animated fadeInUp faster animation-delay-half-s">
      {socialLinks.map(({ link, Component, title, seo }, index) => (
        <Icons
          className="app__link animated fadeInUp faster"
          key={link}
          title={title}
          style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => captureEvent(seo, 'click', 'Social Links')}>
            <Component
              width={26}
              height={26}
              style={{ verticalAlign: 'sub' }}
            />
          </a>
        </Icons>
      ))}
    </Div>
  );
}
