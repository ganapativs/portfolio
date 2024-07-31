import React, { Suspense, useState, useEffect } from 'react';
import SizeMe from 'react-sizeme';
import Spectrum from 'react-spectrum';
import styled from 'styled-components';
import Seo from '../components/seo';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const ResumePdf = React.lazy(() => import('../components/resumePdf'));

const ResumeWrapper = styled.div`
  flex: 1;
`;

const ResumeDoc = styled.div`
  flex: 1;
  box-shadow: 0px 30px 60px -10px var(--color-light-op-2),
    0px 18px 36px -18px var(--color-light-op-2);
`;

const Resume = ({ size: { width } }) => {
  const [theme, setTheme] = useState(window.__theme);
  // This state is needed because the pdf js remote worker renders
  // a white canvas for sometime, looks odd in dark mode.
  // Only show pdf view after it's completely rendered.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const originalOnThemeChange = window.__onThemeChange;

    // Proxy
    window.__onThemeChange = () => {
      setTheme(window.__theme);
      setVisible(false);
      originalOnThemeChange();
    };

    return () => {
      window.__onThemeChange = originalOnThemeChange;
    };
  }, []);

  return (
    <ResumeWrapper>
      <Seo title="Resume" />
      <div key={theme}>
        <p style={{ textAlign: 'right' }}>
          <a
            href={`/resume/${theme}.pdf`}
            download={`Ganapati V S - Resume - ${theme}.pdf`}
          >
            <button type="button">Download resume</button>
          </a>
        </p>
        {!visible ? (
          <div style={{ position: 'absolute' }}>
            <Spectrum
              width={width}
              wordRadius={0}
              colors={
                theme === 'light'
                  ? ['#bbb', '#ccc', '#ddd']
                  : ['#222', '#333', '#444']
              }
            />
          </div>
        ) : null}
        <ResumeDoc
          className="animated fadeIn"
          style={{ visibility: visible ? 'visible' : 'hidden' }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ResumePdf
              theme={theme}
              width={width}
              onRender={() => setVisible(true)}
            />
          </Suspense>
        </ResumeDoc>
        {visible ? (
          <div style={{ margin: '5rem 0 1rem 0' }}>
            <Spectrum
              width={width}
              linesPerParagraph={4}
              lineDistance={8}
              wordHeight={4}
              wordWidths={[20, 30, 40, 50, 60]}
              colors={
                theme === 'light'
                  ? [
                      '#d9ce71',
                      '#4a7770',
                      '#41466c',
                      '#dae198',
                      '#51b496',
                      '#418b90',
                      '#dae18f',
                      '#51b48c',
                      '#418b84',
                    ]
                  : [
                      '#e7ecf7',
                      '#aacdf7',
                      '#47b5f6',
                      '#fde1d7',
                      '#fab3d6',
                      '#f689d3',
                    ]
              }
            />
          </div>
        ) : null}
      </div>
    </ResumeWrapper>
  );
};

export default SizeMe()(Resume);
