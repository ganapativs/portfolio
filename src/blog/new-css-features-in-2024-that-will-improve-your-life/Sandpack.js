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

const Toolbar = styled.div`
    padding: 0 .75rem;
    background: var(--color-ultra-dark);
    box-shadow: inset 0px -1.5px var(--color-light-op-3);
    height: 32px;
    border-radius: 1rem 1rem 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .8rem;
    color: var(--color-light-dark);
    position: relative;

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
    color: var(--color-accent);
    font-size: small;
    cursor: pointer;
    padding: 0;
    margin: 0;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: rgb(from var(--color-accent) r g b / 0.8);
    }
`;

const Backdrop = styled.div`
    position: ${(props) => (props.$isFullscreen ? 'fixed' : 'absolute')};
    inset: ${(props) => (props.$isFullscreen ? '0' : '2rem')};
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SandpackContainer = styled.div`
    border-radius: 1rem;
    margin-bottom: 1.75rem;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
    position: relative;

    @media screen and (max-width: 767px) {
        border-radius: 1rem;
        margin-left: 0;
        margin-right: 0;
        overflow: hidden;
    }

    @media screen and (max-width: 991px) {
        .sandpack-size-wrapper {
          height: 100% !important;
        }
    }

    &.fullscreen {
        position: fixed;
        inset: 20px;
        z-index: 10000;
        overflow: auto;
        max-width: 1800px;
        margin: 0 auto;
        border-radius: 1rem;
        animation: fadeIn 0.25s ease-in-out;

        @media screen and (min-width: 1200px) {
            inset: 150px;
        }

        ${Toolbar} {
            border-radius: 0 !important;
        }

        .sandpack-editor-layout {
            border-radius: 0 !important;
        }
    }


    @media screen and (min-width: 992px) {
        .sandpack-editor-wrapper {
            height: 100%;
        }
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

    .sandpack-file-explorer {
      height: 100% !important;
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

function SandpackPlugin({ height = 400, template = 'react', files = [] }) {
  const [theme, setTheme] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMounted = useMounted();
  const sandpackRef = useRef(null);

  const editorProps = {
    template,
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
        'sp-file-explorer': 'sandpack-file-explorer',
      },
    },
    files,
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

    window.addEventListener('theme-change', handleThemeChange, true);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange, true);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  });

  const toggleFullscreen = useCallback(() => {
    const nextFS = !isFullscreen;
    setIsFullscreen(nextFS);
    document.body.style.overflow = nextFS ? 'hidden' : '';
    document.documentElement.style.overflow = nextFS ? 'hidden' : '';
  }, [isFullscreen]);

  return (
    <>
      {isFullscreen || !isMounted.current ? (
        <Placeholder style={{ height: height + 32 }} />
      ) : null}
      {isMounted.current && (
        <SandpackContainer
          ref={sandpackRef}
          className={`${isFullscreen ? 'fullscreen' : ''}`}
        >
          <Backdrop onClick={toggleFullscreen} $isFullscreen={isFullscreen} />
          <Toolbar>
            <div className="left">Playground</div>
            <div className="right">
              <TextButton
                onClick={toggleFullscreen}
                className="fullscreen-toggle"
                type="button"
              >
                {isFullscreen ? 'Close' : 'Expand'}
              </TextButton>
            </div>
          </Toolbar>
          <div
            style={{
              height: isFullscreen ? 'calc(100% - 32px)' : `${height}px`,
            }}
            className="sandpack-size-wrapper"
          >
            <SandpackProvider {...editorProps}>
              <SandpackLayout style={{ height: '100%' }}>
                {isFullscreen ? <SandpackFileExplorer /> : null}
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
