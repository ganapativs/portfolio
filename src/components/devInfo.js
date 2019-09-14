import React from 'react';
import styled, { keyframes } from 'styled-components';
import { captureEvent } from '../utils/ga';

const DevName = styled.h1`
  font-size: 48px;
  margin: 15px 0;
  font-weight: 400;

  @media screen and (max-width: 767px) {
    text-align: center;
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

const DevDescription = styled.h3`
  font-size: 18px;
  font-weight: 400;
  margin: 5px 0 24px 0;
  animation-name: ${SmallFadeInUp};

  @media screen and (max-width: 767px) {
    text-align: center;
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
        <a
          href="https://twitter.com/ganapativs?ref=meetguns.com"
          rel="noopener noreferrer"
          onClick={() =>
            captureEvent('Personal Twitter', 'click', 'Social Links')
          }
          target="_blank">
          <span>(@ganapativs)</span>
        </a>
      </DevName>
      <DevDescription className="animated faster animation-delay-half-s">
        Hi{' '}
        <span role="img" aria-label="Hi!">
          👋
        </span>{' '}
        I&#39;m a Full-Stack JavaScript developer with over 5 years of
        experience. Currently working{' '}
        <a
          href="https://twitter.com/tracxn?ref=meetguns.com"
          rel="noopener noreferrer"
          onClick={() =>
            captureEvent('Tracxn Twitter', 'click', 'Social Links')
          }
          target="_blank">
          @Tracxn
        </a>
        . <Separator />I love coding, contributing to the open source and have
        created{' '}
        <a
          href="https://www.npmjs.com/package/react-delightful-scroller?ref=meetguns.com"
          rel="noopener noreferrer"
          onClick={() =>
            captureEvent(
              'react-delightful-scroller NPM',
              'click',
              'Social Links',
            )
          }
          style={{ whiteSpace: 'nowrap' }}
          target="_blank">
          react-delightful-scroller
        </a>
        ,{' '}
        <a
          href="https://www.npmjs.com/package/react-dynamic-import?ref=meetguns.com"
          rel="noopener noreferrer"
          onClick={() =>
            captureEvent('react-dynamic-import NPM', 'click', 'Social Links')
          }
          style={{ whiteSpace: 'nowrap' }}
          target="_blank">
          react-dynamic-import
        </a>
        ,{' '}
        <a
          href="https://bttn.surge.sh/?ref=meetguns.com"
          rel="noopener noreferrer"
          onClick={() => captureEvent('bttn.surge.sh', 'click', 'Social Links')}
          target="_blank">
          bttn.css
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/ganapativs?ref=meetguns.com"
          rel="noopener noreferrer"
          onClick={() =>
            captureEvent('Personal GitHub', 'click', 'Social Links')
          }
          target="_blank">
          many more
        </a>{' '}
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
