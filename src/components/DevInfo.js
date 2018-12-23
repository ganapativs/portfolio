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

const DevDesignation = styled.h3`
  font-size: 20px;
  font-weight: 300;
  margin: 5px 0 24px 0;

  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 18px;
    line-height: 1.6;
  }
`;

const DevInfo = () => {
  return (
    <>
      <DevName className="animated fadeInUp faster animation-delay-half-s">
        Ganapati V S
      </DevName>
      <DevDesignation className="animated fadeInUp faster animation-delay-half-s">
        JavaScript Developer, Lead{' '}
        <a
          href="https://twitter.com/tracxn"
          rel="noopener noreferrer"
          target="_blank">
          @Tracxn
        </a>
        , Open Source Enthusiast, Created{' '}
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
        🎉
      </DevDesignation>
    </>
  );
};

export default DevInfo;
