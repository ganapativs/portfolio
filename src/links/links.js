import React from 'react';
import Row from '../row/row';
import GitHubIcon from '../icons/github-icon.js';
import NPMIcon from '../icons/npm-icon.js';
import TwitterIcon from '../icons/twitter-icon.js';
import './links.css';

export default () => (
  <>
    <Row className="app__links text-center">
      <Row className="app__link">
        <GitHubIcon width={16} style={{ verticalAlign: 'sub' }} />{' '}
        <a
          href="https://github.com/ganapativs"
          target="_blank"
          rel="noopener noreferrer">
          ganapativs
        </a>
      </Row>
      <Row className="app__link">
        <TwitterIcon width={16} style={{ verticalAlign: 'sub' }} />{' '}
        <a
          href="https://twitter.com/ganapativs"
          target="_blank"
          rel="noopener noreferrer">
          @ganapativs
        </a>
      </Row>
      <Row className="app__link">
        <NPMIcon width={16} style={{ verticalAlign: 'sub' }} />{' '}
        <a
          href="https://www.npmjs.com/~ganapativs"
          target="_blank"
          rel="noopener noreferrer">
          ~ganapativs
        </a>
      </Row>
    </Row>
  </>
);
