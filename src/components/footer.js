import React from 'react';
import styled from 'styled-components';
import ExternalLink from './externalLink';
import { FeedbackFish } from '@feedback-fish/react'

const FooterWrapper = styled.footer`
  max-width: 840px;
  margin: 0 auto;
  align-self: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 30px 0 15px 0;
  transition: 0.25s ease;
  color: var(--color-light-dark);

  a {
    transition: 0.25s ease;
    color: var(--color-light-dark);
  }

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover {
      a {
        color: var(--color-accent);
      }
    }
  }

  @media screen and (min-width: 768px) {
    padding: 60px 0 30px 0;
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

const Feedback = styled(ExternalLink)`
  cursor: pointer;
`

const Separator = styled.span`
  padding: 0 0.5rem;
`

const Footer = () => (
  <FooterWrapper>
    <Left>
      <span>Hand-crafted in India with ❤</span>
    </Left>
    <Right>
      <FeedbackFish projectId="0fdef6fa4b69d7">
        <Feedback className="hide-xs">
          Feedback
        </Feedback>
      </FeedbackFish>
      <Separator className="hide-xs">・</Separator>
      <ExternalLink
        title="View source code on GitHub"
        href={'https://github.com/ganapativs/portfolio?ref=meetguns.com'}>
        &lt;Code /&gt;
      </ExternalLink>
    </Right>
  </FooterWrapper>
);

export default Footer;
