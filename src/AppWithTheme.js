import React, { PureComponent } from 'react';
import App from './App';
import ThemeContext from './contexts/themeContext';

class AppWithTheme extends PureComponent {
  state = {
    theme: 'dark',
  };
  setTheme = theme => this.setState({ theme });
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
