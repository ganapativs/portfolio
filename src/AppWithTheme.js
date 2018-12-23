import React, { PureComponent } from 'react';
import App from './App';
import ThemeContext from './contexts/themeContext';

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
  };
  setTheme = theme => this.setState({ theme }, () => setTheme(theme));
  render() {
    const { theme } = this.state;

    return (
      <ThemeContext.Provider value={theme}>
        <App setTheme={this.setTheme} />
      </ThemeContext.Provider>
    );
  }
}

export default AppWithTheme;
