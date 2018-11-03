import React from 'react';
import useWindowSize from '@rehooks/window-size';
import Row from '../row/row';
import GitHubIcon from '../icons/github-icon.js';
import NPMIcon from '../icons/npm-icon.js';
import TwitterIcon from '../icons/twitter-icon.js';
import './profile-links.css';

export default React.memo(function ProfileLinks(props) {
  let { innerWidth } = useWindowSize();
  const isMobile = innerWidth < 768;
  const iconWidth = isMobile ? 30 : 16;

  return (
    <Row className="app__links text-center animated fadeInUp faster">
      <Row className="app__link disp-i-block">
        <GitHubIcon width={iconWidth} style={{ verticalAlign: 'sub' }} />{' '}
        {isMobile ? null : (
          <a
            href="https://github.com/ganapativs"
            target="_blank"
            rel="noopener noreferrer">
            ganapativs
          </a>
        )}
      </Row>
      <Row className="app__link disp-i-block">
        <TwitterIcon width={iconWidth} style={{ verticalAlign: 'sub' }} />{' '}
        {isMobile ? null : (
          <a
            href="https://twitter.com/ganapativs"
            target="_blank"
            rel="noopener noreferrer">
            @ganapativs
          </a>
        )}
      </Row>
      <Row className="app__link disp-i-block">
        <NPMIcon width={iconWidth} style={{ verticalAlign: 'sub' }} />{' '}
        {isMobile ? null : (
          <a
            href="https://www.npmjs.com/~ganapativs"
            target="_blank"
            rel="noopener noreferrer">
            ~ganapativs
          </a>
        )}
      </Row>
    </Row>
  );
});
