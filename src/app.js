import React, { Suspense, useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from './contexts/themeContext';
import SquareLoader from './components/squareLoader';
import GlobalStyles from './globalStyles';
import ColorPalette from './colorPalette';
import { FixedCentered } from './utils';
import HalfMoon from './assets/icons/halfMoon.js';

const Header = React.lazy(() => import('./components/header'));
const WithFonts = React.lazy(() => import('./components/withFonts'));
const BackgroundLoader = React.lazy(() =>
  import('./components/background-mesh/backgroundLoader'),
);

const LayoutWidth = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
`;

const Div = styled.div`
  margin: 0 auto;
  max-width: 540px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
  padding: 15px;

  @media screen and (min-width: 768px) {
    margin: 0 0 0 60px;
    justify-content: flex-start;
    align-items: center;
  }

  @media screen and (min-width: 768px) and (min-height: 550px) {
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

const FallbackLoader = () => (
  <FixedCentered>
    <SquareLoader />
  </FixedCentered>
);

const App = React.memo(props => {
  const { theme } = useContext(ThemeContext);
  const { setTheme } = props;

  return (
    <>
      <GlobalStyles theme={ColorPalette[theme]} />
      <Suspense maxDuration={200} fallback={<FallbackLoader />}>
        <WithFonts FontFamilies="Source Sans Pro:300,400">
          <LayoutWidth>
            <Div>
              <BackgroundLoader />
              <Header />
              <ThemeSwitcher
                role="button"
                tabIndex={0}
                onKeyPress={e => {
                  if (e.which === 13 || e.which === 32) {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }
                }}
                className="animated fadeInDown delay-1s faster"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                <HalfMoon />
              </ThemeSwitcher>
            </Div>
          </LayoutWidth>
        </WithFonts>
      </Suspense>
    </>
  );
});

export default App;
