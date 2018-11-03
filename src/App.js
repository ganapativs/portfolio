import React, { Suspense } from 'react';
import './App.css';

const WithFonts = React.lazy(() => import('./with-fonts/with-fonts'));
const ProfileLinks = React.lazy(() => import('./profile-links/profile-links'));
const ProfileLogo = React.lazy(() => import('./profile-logo/profile-logo'));

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
      <WithFonts>
        <div className="app">
          <header className="app__header">
            <Suspense
              maxDuration={200}
              fallback={<div style={{ height: 220 }} />}>
              <ProfileLogo />
            </Suspense>
            <Suspense fallback={null}>
              <ProfileLinks />
            </Suspense>
          </header>
        </div>
      </WithFonts>
    </Suspense>
  );
});
