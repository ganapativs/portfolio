import React from 'react';
import styled from 'styled-components/macro';

const DevName = styled.h1`
  font-size: 48px;
  margin: 15px 0;
  font-weight: 400;

  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 40px;
  }

  span {
    display: none;

    @media screen and (min-width: 768px) {
      font-size: 20px;
      color: var(--color-light-dark);
      display: inline-block;
      vertical-align: middle;
      transition: color 0.2s ease-in;

      &:hover {
        color: var(--color-light);
      }
    }
  }
`;

const DevDescription = styled.h3`
  font-size: 18px;
  font-weight: 400;
  margin: 5px 0 24px 0;

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
          href="https://twitter.com/ganapativs"
          rel="noopener noreferrer"
          target="_blank">
          <span>(@ganapativs)</span>
        </a>
      </DevName>
      <DevDescription className="animated fadeInUp faster animation-delay-half-s">
        Hi{' '}
        <span role="img" aria-label="Hi!">
          👋
        </span>{' '}
        I'm a Full-Stack JavaScript developer with over 4 years of experience.
        Currently working{' '}
        <a
          href="https://twitter.com/tracxn"
          rel="noopener noreferrer"
          target="_blank">
          @Tracxn
        </a>
        . I like contributing to open source & have created{' '}
        <a
          href="https://bttn.surge.sh/"
          rel="noopener noreferrer"
          target="_blank">
          bttn.css
        </a>
        ,{' '}
        <a
          href="https://www.npmjs.com/package/react-dynamic-import"
          rel="noopener noreferrer"
          target="_blank">
          react-dynamic-import
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/ganapativs"
          rel="noopener noreferrer"
          target="_blank">
          more
        </a>{' '}
        <span role="img" aria-label="Yay!!!">
          🎉
        </span>
        <Separator />I spend most of my day on{' '}
        <span role="img" aria-label="Coding">
          👨🏻‍💻
        </span>
        and I play{' '}
        <span role="img" aria-label="Soccer">
          ⚽️
        </span>
        <span role="img" aria-label="Badminton">
          🏸
        </span>
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
