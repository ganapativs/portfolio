import React, { PureComponent } from 'react';
import App from './app';
import ThemeContext from './contexts/themeContext';
import { TurnOffTransitionStyles } from './globalStyles';
import { captureEvent } from './ga';

// https://twitter.com/levelsio/status/1089418602401296384
let prefersDarkMode =
  (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  false;

const defaultTheme = prefersDarkMode ? 'dark' : 'light';

const getTheme = () => {
  if (window.localStorage) {
    const theme = window.localStorage.getItem('theme');
    if (theme) {
      return theme;
    }

    // If no theme was set, set default theme and return
    setTheme(defaultTheme);
    captureEvent(
      prefersDarkMode ? 'yes' : 'no',
      'default',
      'Prefers Dark Mode',
    );
    captureEvent(defaultTheme, 'change', 'Theme');
    return defaultTheme;
  }

  return defaultTheme;
};

const setTheme = (theme = defaultTheme) => {
  if (window.localStorage) {
    return window.localStorage.setItem('theme', theme);
  }

  return null;
};

class AppWithTheme extends PureComponent {
  state = {
    theme: getTheme(),
    themingInProgress: false,
  };
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
    const { theme, themingInProgress } = this.state;

    return (
      <ThemeContext.Provider value={{ theme, themingInProgress }}>
        <TurnOffTransitionStyles active={themingInProgress} />
        <App setTheme={this.setTheme} />
      </ThemeContext.Provider>
    );
  }
}

export default AppWithTheme;
