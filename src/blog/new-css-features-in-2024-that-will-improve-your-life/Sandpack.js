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
import React from 'react';

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

function SandpackPlugin() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'dark',
  );

  React.useEffect(() => {
    function handleThemeChange() {
      setTheme(localStorage.getItem('theme') || 'dark');
    }

    window.addEventListener('theme-change', handleThemeChange);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, []);

  const editorProps = {
    template: 'react',
    theme: getTheme(theme),
    options: {
      //   showNavigator: false,
      //   showTabs: true,
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

  // Default Sandpack
  // <Sandpack {...editorProps} />;

  // Custom Rendering of Sandpack
  return (
    <SandpackProvider {...editorProps}>
      <SandpackLayout>
        {/* <SandpackFileExplorer /> */}
        <SandpackCodeEditor
          showTabs
          wrapContent={false}
          closableTabs={false}
          showLineNumbers={false}
          showRunButton={false}
          showNavigator={false}
        />
        <SandpackPreview showOpenInCodeSandbox={false} showNavigator={false} />
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default SandpackPlugin;
