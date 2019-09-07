import 'normalize.css';
import '../assets/animate-custom.css';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Container from './container';
import ThemeContext from '../contexts/themeContext';
import { TurnOffTransitionStyles } from '../utils/globalStyles';
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

const WaitForTheme = styled.div`
  opacity: 0;
  &.go {
    opacity: 1;
  }
`;

const getDefaultTheme = () => {
  // https://twitter.com/levelsio/status/1089418602401296384
  const prefersDarkMode =
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) ||
    false;

  return prefersDarkMode ? 'dark' : 'light';
};

const setTheme = (theme = getDefaultTheme()) => {
  if (window.localStorage) {
    return window.localStorage.setItem('theme', theme);
  }

  return null;
};

const getTheme = () => {
  if (window.localStorage) {
    const theme = window.localStorage.getItem('theme');
    if (theme) {
      return theme;
    }

    const defaultTheme = getDefaultTheme();
    // If no theme was set, set default theme and return
    setTheme(defaultTheme);
    captureEvent(
      defaultTheme === 'dark' ? 'yes' : 'no',
      'default',
      'Prefers Dark Mode',
    );
    captureEvent(defaultTheme, 'change', 'Theme');
    return defaultTheme;
  }

  return getDefaultTheme();
};

class AppWithTheme extends PureComponent {
  state = {
    theme: 'light',
    themeReady: false,
    themingInProgress: false,
  };

  componentDidMount() {
    this.setState({
      theme: getTheme(),
      themeReady: true,
    });
  }

  setTheme = theme => {
    const { themingInProgress } = this.state;
    if (themingInProgress) {
      return;
    }

    this.setState({ themingInProgress: true }, () => {
      requestAnimationFrame(() => {
        this.setState({ theme }, () => {
          requestAnimationFrame(() => {
            this.setState({ themingInProgress: false });
            setTheme(theme);
          });
        });
      });
    });
  };

  render() {
    const { theme, themeReady, themingInProgress } = this.state;

    return (
      <WaitForTheme className={themeReady ? 'go' : ''}>
        <ThemeContext.Provider value={{ theme, themingInProgress }}>
          <TurnOffTransitionStyles active={themingInProgress} />
          <Container setTheme={this.setTheme}>{this.props.children}</Container>
        </ThemeContext.Provider>
      </WaitForTheme>
    );
  }
}

export default AppWithTheme;
