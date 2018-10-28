import React, { Component } from "react";
import Section from "./helpers/section";
import GitHubIcon from "./github-icon.js";
import NPMIcon from "./npm-icon.js";
import TwitterIcon from "./twitter-icon.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <Section className="app--comments">
            <div className="app--comment">{"/**"}</div>
            <div>
              <span className="app--comment">&nbsp;*</span>
              <span className="app--comment-text">&nbsp;Ganapati V S</span>
            </div>
            <div className="app--comment">&nbsp;*/</div>
          </Section>
          <Section className="app--links">
            <Section vspace={5} hspace={0}>
              <GitHubIcon width={16} style={{ verticalAlign: "sub" }} /> Github:{" "}
              <a
                href="https://github.com/ganapativs/react-dynamic-import"
                target="_blank"
                rel="noopener noreferrer"
              >
                ganapativs/react-dynamic-import
              </a>
            </Section>
            <Section vspace={5} hspace={0}>
              <NPMIcon width={16} style={{ verticalAlign: "sub" }} /> NPM:{" "}
              <a
                href="https://www.npmjs.com/package/react-dynamic-import"
                target="_blank"
                rel="noopener noreferrer"
              >
                ~ganapativs/react-dynamic-import
              </a>
            </Section>
            <Section vspace={5} hspace={0}>
              <TwitterIcon width={16} style={{ verticalAlign: "sub" }} />{" "}
              Twitter:{" "}
              <a
                href="https://twitter.com/ganapativs"
                target="_blank"
                rel="noopener noreferrer"
              >
                @ganapativs
              </a>
            </Section>
          </Section>
        </header>
      </div>
    );
  }
}

export default App;
