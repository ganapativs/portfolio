import React from 'react';
import styled, { keyframes } from 'styled-components';
import { captureEvent } from '../utils/ga';
import ExternalLink from './externalLink';

const DevName = styled.h1`
  font-size: 48px;
  margin: 15px 0;
  font-weight: 400;
  font-family: 'Source Sans Pro', sans-serif;

  @media screen and (max-width: 767px) {
    font-size: 40px;
  }

  a {
    display: none;

    @media screen and (min-width: 768px) {
      display: inline-block;
    }
  }

  span {
    @media screen and (min-width: 768px) {
      font-size: 20px;
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

const DevDescription = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin: 5px 0 24px 0;
  animation-name: ${SmallFadeInUp};
  font-family: 'Source Sans Pro', sans-serif;

  @media screen and (max-width: 767px) {
    font-size: 16px;
  }

  span {
    font-size: 16px;

    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

const Separator = styled.div`
  margin-bottom: 8px;
`;

const DevInfo = () => {
  return (
    <>
      <DevName className="animated fadeInUp faster animation-delay-half-s">
        Ganapati V S{' '}
        <ExternalLink
          href="https://twitter.com/ganapativs?ref=meetguns.com"
          onClick={() =>
            captureEvent('Personal Twitter', 'click', 'Social Links')
          }>
          <span>(@ganapativs)</span>
        </ExternalLink>
      </DevName>
      <DevDescription className="animated faster animation-delay-half-s">
        Hi{' '}
        <span role="img" aria-label="Hi!">
          👋
        </span>{' '}
        I&#39;m a Full-Stack JavaScript developer with over 5 years of
        experience. Currently working{' '}
        <ExternalLink
          href="https://twitter.com/tracxn?ref=meetguns.com"
          onClick={() =>
            captureEvent('Tracxn Twitter', 'click', 'Social Links')
          }>
          @Tracxn
        </ExternalLink>
        . <Separator />I love coding, contributing to the open source and have
        created{' '}
        <ExternalLink
          href="https://www.npmjs.com/package/react-delightful-scroller?ref=meetguns.com"
          onClick={() =>
            captureEvent(
              'react-delightful-scroller NPM',
              'click',
              'Social Links',
            )
          }
          style={{ whiteSpace: 'nowrap' }}>
          react-delightful-scroller
        </ExternalLink>
        ,{' '}
        <ExternalLink
          href="https://www.npmjs.com/package/react-dynamic-import?ref=meetguns.com"
          onClick={() =>
            captureEvent('react-dynamic-import NPM', 'click', 'Social Links')
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
          more
        </ExternalLink>{' '}
        <span role="img" aria-label="Yay!!!">
          🎉
        </span>
        <Separator />I like travelling, capturing photos and I play{' '}
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
    </>
  );
};

export default DevInfo;
