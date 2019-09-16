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
import Footer from './footer';

const LayoutWidth = styled.div`
  max-width: ${props => (props.full ? '100%' : '900px')};
  margin: 0 auto;
  height: 100%;
  min-height: 100vh;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    padding: 0 30px;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
`;

const ThemeSwitcher = styled.div`
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
        <Div>{props.children}</Div>
        <Footer></Footer>
      </LayoutWidth>
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
    </>
  );
};

export default React.memo(Layout);
