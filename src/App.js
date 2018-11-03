import React, { Suspense } from 'react';
import './App.css';

const Header = React.lazy(() => import('./header/header'));
const WithFonts = React.lazy(() => import('./with-fonts/with-fonts'));

// .app__comments {
//   font-size: 20px;
// }

// .app__comment {
//   color: var(--color-grey);
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

export default React.memo(function App(props) {
  return (
    <Suspense maxDuration={200} fallback={'Loading...'}>
      <WithFonts FontFamilies="Fira Mono|Source Sans Pro:300,400">
        <div className="app">
          <Header />
        </div>
      </WithFonts>
    </Suspense>
  );
});
