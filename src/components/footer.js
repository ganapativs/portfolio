import React from 'react';
import styled from 'styled-components';
import ExternalLink from './externalLink';

const FooterWrapper = styled.div`
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

const Footer = () => (
  <FooterWrapper className="animated fadeIn">
    <Left>
      <span>Hand-crafted in India with ❤</span>
    </Left>
    <Right>
      <ExternalLink
        title="View source code on GitHub"
        href={'https://github.com/ganapativs/portfolio?ref=meetguns.com'}>
        Source
      </ExternalLink>
    </Right>
  </FooterWrapper>
);

export default Footer;
