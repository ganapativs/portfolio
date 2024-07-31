import React from 'react';
import styled from 'styled-components';
import DribbbleIcon from '../assets/icons/dribbbleIcon';
import EmailIcon from '../assets/icons/emailIcon';
import GitHubIcon from '../assets/icons/githubIcon';
import LinkedInIcon from '../assets/icons/linkedinIcon';
import StackoverflowIcon from '../assets/icons/stackoverflowIcon';
import TwitterIcon from '../assets/icons/twitterIcon';
import { captureEvent } from '../utils/ga';
import ExternalLink from './externalLink';

const Icons = styled.div`
  text-align: left;
  padding: 8px 10px;
  display: inline-block;

  @media screen and (min-width: 768px) {
    padding: 5px 10px;
  }
`;

const Div = styled.div`
  ${Icons}:first-child {
    padding-left: 0;
  }

  ${Icons}::last-child {
    padding-right: 0;
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
    <Div>
      {socialLinks.map(({ link, Component, title, seo }) => (
        <Icons key={link} title={title}>
          <ExternalLink
            href={link}
            onClick={() => captureEvent(seo, 'click', 'Social Links')}
          >
            <Component
              width={26}
              height={26}
              style={{ verticalAlign: 'sub' }}
            />
          </ExternalLink>
        </Icons>
      ))}
    </Div>
  );
}
