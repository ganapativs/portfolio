import React, { PureComponent } from 'react';
import App from './appx';
import ThemeContext from './contexts/themeContext';
import { TurnOffTransitionStyles } from './globalStyles';

const defaultTheme = 'dark';

const getTheme = () => {
  if (window.localStorage) {
    const theme = window.localStorage.getItem('theme');
    if (theme) {
      return theme;
    }

    // If no theme was set, set default theme and return
    setTheme(defaultTheme);
    return defaultTheme;
  }

  return defaultTheme;
};

const setTheme = (theme = 'dark') => {
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
      <ThemeContext.Provider value={theme}>
        <TurnOffTransitionStyles active={themingInProgress} />
        <App setTheme={this.setTheme} />
      </ThemeContext.Provider>
    );
  }
}

export default AppWithTheme;
