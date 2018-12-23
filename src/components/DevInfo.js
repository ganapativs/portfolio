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
`;

const DevDescription = styled.h3`
  font-size: 20px;
  font-weight: 300;
  margin: 5px 0 24px 0;

  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 18px;
    line-height: 1.6;
  }

  span {
    font-size: 18px;

    @media screen and (max-width: 767px) {
      font-size: 16px;
    }
  }
`;

const DevInfo = () => {
  return (
    <>
      <DevName className="animated fadeInUp faster animation-delay-half-s">
        Ganapati V S
      </DevName>
      <DevDescription className="animated fadeInUp faster animation-delay-half-s">
        Hi{' '}
        <span role="img" aria-label="hi">
          👋
        </span>{' '}
        I'm a JavaScript developer with over 4 years of experience. Currently
        working{' '}
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
        <span role="img" aria-label="party">
          🎉
        </span>
      </DevDescription>
    </>
  );
};

export default DevInfo;
