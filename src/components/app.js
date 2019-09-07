import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/themeContext';
import GlobalStyles from '../utils/globalStyles';
import ColorPalette from '../utils/colorPalette';
import HalfMoonIcon from '../assets/icons/halfMoonIcon';
import { captureEvent } from '../utils/ga';
import BackgroundLoader from './background-mesh/backgroundLoader';
import ProfileLogo from './profileLogo';

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
    justify-content: flex-start;
    align-items: center;
  }

  @media screen and (min-height: 550px) {
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

const App = React.memo(props => {
  const [showBg, setShowBg] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { setTheme } = props;

  useEffect(() => {
    setShowBg(true);
  }, []);

  return (
    <>
      <GlobalStyles theme={ColorPalette[theme]} />
      <LayoutWidth>
        <Div>
          {showBg ? <BackgroundLoader /> : null}
          {props.children}
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
        </Div>
      </LayoutWidth>
    </>
  );
});

export default App;
