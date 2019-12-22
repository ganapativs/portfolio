import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import SizeMe from 'react-sizeme';
import SEO from '../components/seo';
import 'react-pdf/dist/Page/AnnotationLayer.css';

const ResumeWrapper = styled.div`
  flex: 1;
`;

const ResumeDoc = styled.div`
  flex: 1;
  box-shadow: 0px 30px 60px -10px var(--color-light-op-2),
    0px 18px 36px -18px var(--color-light-op-2);
`;

const Resume = ({ size: { width } }) => {
  /* eslint-disable no-underscore-dangle */
  const [theme, setTheme] = useState(window.__theme);

  useEffect(() => {
    const originalOnThemeChange = window.__onThemeChange;

    // Proxy
    window.__onThemeChange = () => {
      setTheme(window.__theme);
      originalOnThemeChange();
    };

    return () => {
      window.__onThemeChange = originalOnThemeChange;
    };
  }, []);
  /* eslint-enable no-underscore-dangle */

  return (
    <ResumeWrapper>
      <SEO title="Resume" />
      <div key={theme}>
        <p>
          <b>Updated:</b> Dec 22, 2019
          <a
            style={{ float: 'right' }}
            href={`/resume/${theme}.pdf`}
            download={`Ganapati V S - Resume - ${theme}.pdf`}>
            <button>Download resume</button>
          </a>
        </p>
        <ResumeDoc>
          <Document
            file={`/resume/${theme}.pdf`}
            externalLinkTarget="_blank"
            loading={<div />}>
            <Page width={width} pageNumber={1} loading={<div />} />
          </Document>
        </ResumeDoc>
      </div>
    </ResumeWrapper>
  );
};

export default SizeMe()(Resume);
