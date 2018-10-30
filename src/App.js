import React, { Component } from 'react';
import Links from './links/links';
import ProfileLogo from './profile-logo/profile-logo';
import './App.css';

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

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <ProfileLogo />
          <Links />
        </header>
      </div>
    );
  }
}

export default App;
