import {
  Navigator,
  Sandpack,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import { amethyst, githubLight } from '@codesandbox/sandpack-themes';
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import styled from 'styled-components';

/**
 * TODO
 *
 * - Vertical sandbox layout in desktop also - https://www.joshwcomeau.com/react/next-level-playground/
 * - Resizable Sandpack when collapsed
 * - View transition off on theme change
 * - File explorer in fullscreen mode in desktop
 * - Fix mobile height
 * - Highlight exit button in fullscreen mode
 * - Fix activeline flickering
 */

const Toolbar = styled.div`
    padding: 0 .75rem;
    background: var(--color-ultra-dark);
    border-bottom: 1.5px solid var(--color-light-op-3);
    border-radius: 1rem 1rem 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .8rem;
    color: var(--color-light-dark);

    @media screen and (max-width: 767px) {
        border-radius: 0;
    }

    .left {
        flex: 1;
    }
`;

const Placeholder = styled.div`
    height: 100vh;
    margin-bottom: 1.75rem;
    background: transparent;
    border-radius: 1rem;
`;

const TextButton = styled.button`
    background: none;
    border: none;
    color: currentColor;
    font-size: small;
    cursor: pointer;
    padding: 0;
    margin: 0;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: var(--color-accent);
    }
`;

const SandpackContainer = styled.div`
    border-radius: 1rem;
    margin-bottom: 1.75rem;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
    position: relative;
    view-transition-name: sandpack-container;

    @media screen and (max-width: 767px) {
        margin-left: -1.11rem;
        margin-right: -1.11rem;
        border-radius: 0;
    }

    &.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;

        ${Toolbar} {
            border-radius: 0 !important;
        }

        .sandpack-editor-layout {
            border-radius: 0 !important;
        }
    }

    .sandpack-editor-wrapper {
        height: 100%;
    }

    .sandpack-editor-layout {
        border-radius: 0 0 1rem 1rem;;
        overflow: hidden;
        border: none !important;
    }

    @media screen and (max-width: 767px) {
        .sandpack-editor-layout {
            border-radius: 0;
        }
    }

    .sandpack-editor-preview {
        background: transparent !important;
    }

    .sandpack-editor-preview * {
        z-index: initial !important;
    }

    .sandpack-editor {
        background-color: transparent !important;
    }

    .sandpack-pre-placeholder {
        background: transparent !important;
    }

    .sandpack-preview-iframe {
        max-height: 100% !important;
    }
`;

function getTheme(theme) {
  return theme === 'dark'
    ? {
        ...amethyst,
        colors: {
          ...amethyst.colors,
          surface2: '#1e1e1e',
        },
        font: {
          ...amethyst.font,
          body: '"Source Sans 3", sans-serif',
          mono: '"Fira Code", monospace',
          lineHeight: '20px',
          size: '14px',
        },
      }
    : {
        ...githubLight,
        font: {
          ...githubLight.font,
          body: '"Source Sans 3", sans-serif',
          mono: '"Fira Code", monospace',
          lineHeight: '20px',
          size: '14px',
        },
      };
}

function useMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}

function SandpackPlugin({ height = 400 }) {
  const [theme, setTheme] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMounted = useMounted();
  const sandpackRef = useRef(null);

  const editorProps = {
    template: 'react',
    theme: getTheme(theme),
    options: {
      resizablePanels: true,
      editorHeight: height,
      externalResources: [
        'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap',
      ],
      classes: {
        'sp-wrapper': 'sandpack-editor-wrapper',
        'sp-layout': 'sandpack-editor-layout',
        'sp-tab-button': 'sandpack-editor-tab',
        'sp-preview-container': 'sandpack-editor-preview',
        'sp-editor': 'sandpack-editor',
        'sp-pre-placeholder': 'sandpack-pre-placeholder',
        'sp-code-editor': 'sandpack-code-editor',
        'sp-preview-iframe': 'sandpack-preview-iframe',
      },
    },
    files: {
      '/App.js': {
        code: `import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <code>Hello</code>
      </header>
    </div>
  );
}
          `,
      },
      '/styles.css': {
        code: `* {
  box-sizing: border-box;
}

::selection {
  color: #fff;
  background: var(--color-accent);
}

html, body {
  font-size: 18px;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-dark);
  color: var(--color-light);
  line-height: 1.42857143;
  /* transition: background 0.1s ease-in; */
  font-family: 'Source Sans 3', sans-serif;
}

@media (print), (prefers-reduced-motion) {
  * {
    animation: unset !important;
    transition: none !important;
  }
}

body {
    font-family: 'Source Sans 3', sans-serif;
}

pre, code {
    font-family: 'Fira Code', monospace;
}

.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

          `,
      },
    },
  };

  useLayoutEffect(() => {
    // Initial theme set
    if (window.localStorage) {
      setTheme(localStorage?.getItem('theme') || 'dark');
    }
  }, []);

  useEffect(() => {
    function handleThemeChange() {
      setTheme(localStorage?.getItem('theme') || 'dark');
    }

    window.addEventListener('theme-change', handleThemeChange);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.startViewTransition) {
      const nextFS = !isFullscreen;
      setIsFullscreen(nextFS);
      document.body.style.overflow = nextFS ? 'hidden' : '';
      document.documentElement.style.overflow = nextFS ? 'hidden' : '';
      return;
    }

    document.startViewTransition(() => {
      setIsFullscreen((prev) => {
        const nextFS = !prev;
        document.body.style.overflow = nextFS ? 'hidden' : '';
        document.documentElement.style.overflow = nextFS ? 'hidden' : '';
        return nextFS;
      });
    });
  }, [isFullscreen]);

  return (
    <>
      {isFullscreen || !isMounted.current ? (
        <Placeholder style={{ height: height + 34 }} />
      ) : null}
      {isMounted.current && (
        <SandpackContainer
          ref={sandpackRef}
          className={`${isFullscreen ? 'fullscreen' : ''}`}
        >
          <Toolbar>
            <div className="left">Playground</div>
            <div className="right">
              <TextButton
                onClick={toggleFullscreen}
                className="fullscreen-toggle"
                type="button"
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </TextButton>
            </div>
          </Toolbar>
          <div
            style={{
              height: isFullscreen ? 'calc(100vh - 34px)' : `${height}px`,
            }}
          >
            <SandpackProvider {...editorProps}>
              <SandpackLayout style={{ height: '100%' }}>
                <SandpackCodeEditor
                  showTabs
                  wrapContent={false}
                  closableTabs={false}
                  showLineNumbers={false}
                  showRunButton={false}
                  showNavigator={false}
                  style={{ height: '100%' }}
                />
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showNavigator={false}
                  style={{ height: '100%' }}
                />
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </SandpackContainer>
      )}
    </>
  );
}

export default SandpackPlugin;
