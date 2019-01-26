import React, { Suspense, useContext, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from './contexts/themeContext';
import SquareLoader from './components/squareLoader';
import GlobalStyles from './globalStyles';
import ColorPalette from './colorPalette';
import { FixedCentered } from './utils';
import useWindowSize from '@rehooks/window-size';

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
  max-width: 580px;
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

const FallbackLoader = () => (
  <FixedCentered>
    <SquareLoader />
  </FixedCentered>
);

const App = React.memo(props => {
  const { theme } = useContext(ThemeContext);
  const [mountBg, activateBg] = useState(false);
  const { innerWidth } = useWindowSize();
  const { setTheme } = props;

  // Mount after basic animation
  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => activateBg(true));
    }, 500);
  }, []);

  return (
    <>
      <GlobalStyles theme={ColorPalette[theme]} />
      <Suspense maxDuration={200} fallback={<FallbackLoader />}>
        <WithFonts FontFamilies="Source Sans Pro:300,400">
          <LayoutWidth>
            <Div>
              {mountBg && innerWidth > 767 ? <BackgroundLoader /> : null}
              <Header />
              <div
                style={{
                  color: 'var(--color-light)',
                  position: 'fixed',
                  top: 0,
                  right: 0,
                }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                Theme - {theme}
              </div>
            </Div>
          </LayoutWidth>
        </WithFonts>
      </Suspense>
    </>
  );
});

export default App;
