import React, { Suspense, useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from './contexts/themeContext';
import SquareLoader from './components/squareLoader';
import GlobalStyles from './globalStyles';
import ColorPalette from './colorPalette';
import { FixedCentered } from './utils';
import HalfMoonIcon from './assets/icons/halfMoonIcon.js';
import { captureEvent } from './ga';

const Header = React.lazy(() => import('./components/header'));
const BackgroundLoader = React.lazy(() =>
  import('./components/background-mesh/backgroundLoader'),
);
const ProfileLogo = React.lazy(() => import('./components/profileLogo'));

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

const OpenSource = styled.a`
  color: var(--color-light);
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 8px;
  cursor: pointer;
`;

const MeetgunsLogo = styled.a`
  position: fixed;
  bottom: 10px;
  right: -30px;
  padding: 8px;
  cursor: pointer;
  transform: scale(0.3) translateY(260px);
  filter: invert(1);
  opacity: 0.6;
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
      <Suspense fallback={<FallbackLoader />}>
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
              title={
                theme === 'dark'
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              }
              className="animated fadeInDown delay-1s"
              onClick={() => {
                const nextTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(nextTheme);
                captureEvent(nextTheme, 'change', 'Theme');
              }}>
              <HalfMoonIcon />
            </ThemeSwitcher>
            <Suspense fallback={null}>
              <OpenSource
                title="View source code on GitHub"
                className="animated fadeInUp delay-2s"
                href="https://github.com/ganapativs/portfolio"
                target="_blank"
                rel="noopener noreferrer">
                <MeetgunsLogo>
                  <ProfileLogo noHover />
                </MeetgunsLogo>
              </OpenSource>
            </Suspense>
          </Div>
        </LayoutWidth>
      </Suspense>
    </>
  );
});

export default App;
