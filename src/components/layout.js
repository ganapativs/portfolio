import 'normalize.css';
import '../assets/animate-custom.css';
import React from 'react';
import styled from 'styled-components';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import GlobalStyles from '../utils/globalStyles';
import HalfMoonIcon from '../assets/icons/halfMoonIcon';
import { captureEvent } from '../utils/ga';
/**
 * Show outline only on keyboard interaction
 *
 * Adds 'js-focus-visible' class to body and 'focus-visible' class to focused element
 *
 * https://github.com/WICG/focus-visible
 * https://davidwalsh.name/css-focus
 */
import 'focus-visible';
import Header from './header';

const LayoutWidth = styled.div`
  max-width: ${props => (props.full ? '100%' : '900px')};
  margin: 0 auto;
  height: 100%;
  padding: 30px 30px;

  @media screen and (min-width: 768px) {
    padding: 50px 30px;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    align-items: center;
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

const switchTheme = (theme, toggleTheme) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  toggleTheme(nextTheme);
  captureEvent(nextTheme, 'change', 'Theme');
};

const Layout = props => {
  return (
    <>
      <GlobalStyles />
      <LayoutWidth full={props.full}>
        <Header />
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
        </Div>
      </LayoutWidth>
    </>
  );
};

export default React.memo(Layout);
