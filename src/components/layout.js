import 'normalize.css';
import '../assets/animate-custom.css';
import React from 'react';
import styled from 'styled-components';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import GlobalStyles from '../utils/globalStyles';
import HalfMoonIcon from '../assets/icons/halfMoonIcon';
import { captureEvent } from '../utils/ga';
import ProfileLogo from './profileLogo';
/**
 * Show outline only on keyboard interaction
 *
 * Adds 'js-focus-visible' class to body and 'focus-visible' class to focused element
 *
 * https://github.com/WICG/focus-visible
 * https://davidwalsh.name/css-focus
 */
import 'focus-visible';

const LayoutWidth = styled.div`
  max-width: 900px;
  margin: 0 auto;
  height: 100%;
`;

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;
  padding: 50px 15px;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    align-items: center;
    padding: 150px 15px;
  }

  @media screen and (min-height: 550px) {
    margin-top: -5%;
  }
`;

const ThemeSwitcher = styled.div`
  color: var(--color-light);
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 8px;
  cursor: pointer;
`;

const OpenSource = styled.a`
  color: var(--color-light);
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 8px;
  cursor: pointer;
`;

const MeetgunsLogo = styled.span`
  position: fixed;
  bottom: 10px;
  right: -30px;
  padding: 8px;
  cursor: pointer;
  transform: scale(0.3) translateY(260px);
  filter: invert(1);
  opacity: 0.6;
`;

const switchTheme = (theme, toggleTheme) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  toggleTheme(nextTheme);
  captureEvent(nextTheme, 'change', 'Theme');
};

const Layout = React.memo(props => {
  return (
    <>
      <GlobalStyles />
      <LayoutWidth>
        <Div>
          {props.children}
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <ThemeSwitcher
                role="button"
                tabIndex={0}
                onKeyPress={e => {
                  if (e.which === 13 || e.which === 32) {
                    switchTheme(theme, toggleTheme);
                  }
                }}
                title={
                  theme === 'dark'
                    ? 'Switch to light theme'
                    : 'Switch to dark theme'
                }
                className="animated fadeInDown delay-1s"
                onClick={() => {
                  switchTheme(theme, toggleTheme);
                }}>
                <HalfMoonIcon />
              </ThemeSwitcher>
            )}
          </ThemeToggler>
          <OpenSource
            title="View source code on GitHub"
            className="animated fadeInUp delay-1s"
            href="https://github.com/ganapativs/portfolio"
            target="_blank"
            rel="noopener noreferrer">
            <MeetgunsLogo>
              <ProfileLogo noHover />
            </MeetgunsLogo>
          </OpenSource>
        </Div>
      </LayoutWidth>
    </>
  );
});

export default Layout;
