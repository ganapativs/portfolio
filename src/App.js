import React, { Suspense, useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from './contexts/themeContext';
import SquareLoader from './components/squareLoader';
import GlobalStyles from './globalStyles';
import { FixedCentered } from './utils';

const Header = React.lazy(() => import('./components/header'));
const WithFonts = React.lazy(() => import('./components/withFonts'));

const Div = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

// .app__comments {
//   font-size: 20px;
// }

// .app__comment {
//   color: var(--color-dark-light);
//   font-style: italic;
// }

// .app__comment-text {
//   font-style: italic;
// }

// <Row className="app__comments">
//             <div className="app__comment">{'/**'}</div>
//             <div>
//               <span className="app__comment">&nbsp;*</span>
//               <span className="app__comment-text">&nbsp;Ganapati V S</span>
//             </div>
//             <div className="app__comment">&nbsp;*/</div>
//           </Row>

const FallbackLoader = () => (
  <FixedCentered>
    <SquareLoader />
  </FixedCentered>
);

const App = React.memo(props => {
  const theme = useContext(ThemeContext);
  const { setTheme } = props;

  return (
    <>
      <GlobalStyles theme={theme} />
      <Suspense maxDuration={200} fallback={<FallbackLoader />}>
        <WithFonts FontFamilies="Fira Mono|Source Sans Pro:300,400">
          <Div>
            <div
              style={{ color: 'var(--color-light)' }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              Theme - {theme}
            </div>
            <Header />
          </Div>
        </WithFonts>
      </Suspense>
    </>
  );
});

export default App;
