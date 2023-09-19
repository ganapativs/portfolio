import React from 'react';
import styled, { keyframes } from 'styled-components';
import { captureEvent } from '../utils/ga';
import ExternalLink from './externalLink';
import { rhythm } from '../utils/typography';

const DevName = styled.h1`
  font-size: ${rhythm(1.4)};
  margin-bottom: ${rhythm(0.8)};

  @media screen and (min-width: 768px) {
    margin-top: 0;
  }

  a {
    display: none;

    @media screen and (min-width: 768px) {
      display: inline-block;
    }
  }

  span {
    @media screen and (min-width: 768px) {
      font-size: ${rhythm(0.8)};
      vertical-align: middle;
    }
  }
`;

const SmallFadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 80px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const DevDescription = styled.div`
  animation-name: ${SmallFadeInUp};
`;

const Separator = styled.div`
  margin-bottom: ${props => props.mb}px;
`;

const DevInfo = () => {
  return (
    <>
      <DevName>
        Ganapati V S{' '}
        <ExternalLink
          href="https://twitter.com/ganapativs?ref=meetguns.com"
          onClick={() =>
            captureEvent('Personal Twitter', 'click', 'Social Links')
          }>
          <span>(@ganapativs)</span>
        </ExternalLink>
      </DevName>
      <DevDescription>
        Hi{' '}
        <span role="img" aria-label="Hi!">
          👋
        </span>{' '}
        I&#39;m a Full-Stack JavaScript developer with over 8 years of
        experience. Currently working as Vice President - Technology{' '}
        <ExternalLink
          href="https://twitter.com/tracxn?ref=meetguns.com"
          onClick={() =>
            captureEvent('Tracxn Twitter', 'click', 'Social Links')
          }>
          @Tracxn
        </ExternalLink>
        . <Separator mb={8} />I love coding, contributing to the open source and
        have created{' '}
        <ExternalLink
          href="https://github.com/ganapativs/react-spectrum?ref=meetguns.com"
          onClick={() =>
            captureEvent('react-spectrum GitHub', 'click', 'Social Links')
          }
          style={{ whiteSpace: 'nowrap' }}>
          react-spectrum
        </ExternalLink>
        ,{' '}
        <ExternalLink
          href="https://github.com/ganapativs/react-delightful-scroller?ref=meetguns.com"
          onClick={() =>
            captureEvent(
              'react-delightful-scroller GitHub',
              'click',
              'Social Links',
            )
          }
          style={{ whiteSpace: 'nowrap' }}>
          react-delightful-scroller
        </ExternalLink>
        ,{' '}
        <ExternalLink
          href="https://github.com/ganapativs/react-dynamic-import?ref=meetguns.com"
          onClick={() =>
            captureEvent('react-dynamic-import GitHub', 'click', 'Social Links')
          }
          style={{ whiteSpace: 'nowrap' }}>
          react-dynamic-import
        </ExternalLink>
        ,{' '}
        <ExternalLink
          href="https://bttn.surge.sh/?ref=meetguns.com"
          onClick={() =>
            captureEvent('bttn.surge.sh', 'click', 'Social Links')
          }>
          bttn.css
        </ExternalLink>{' '}
        and{' '}
        <ExternalLink
          href="https://github.com/ganapativs?ref=meetguns.com"
          onClick={() =>
            captureEvent('Personal GitHub', 'click', 'Social Links')
          }>
          many more
        </ExternalLink>{' '}
        <span role="img" aria-label="Yay!!!">
          🎉
        </span>
        <Separator mb={8} />I like travelling, capturing photos and I play{' '}
        <span role="img" aria-label="Soccer">
          ⚽️
        </span>{' '}
        <span role="img" aria-label="Badminton">
          🏸
        </span>{' '}
        <span role="img" aria-label="FIFA gaming">
          🎮
        </span>{' '}
        in my free time{' '}
        <span role="img" aria-label="Celebrates">
          🙌
        </span>
      </DevDescription>
      <Separator mb={24} />
    </>
  );
};

export default DevInfo;
