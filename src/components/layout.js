import '../assets/animate-custom.css';
import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../utils/globalStyles';
/**
 * Show outline only on keyboard interaction
 *
 * Adds 'js-focus-visible' class to body and 'focus-visible' class to focused element
 *
 * https://github.com/WICG/focus-visible
 * https://davidwalsh.name/css-focus
 */
import 'focus-visible';
import Header from './header';
import Footer from './footer';

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    padding: 0 30px;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  max-width: ${props => (props.full ? '100%' : '840px')};
  width: 100%;
  margin: 0 auto;
`;

const fullPathPatterns = ['/captures/'];

const Layout = props => {
  const { location } = props;

  /* Removing `gatsby-plugin-offline` because it's buggy! */
  // Gatsby plugin offline messes up hydration and removes some styled component classes
  // Temp workaround is to render empty layout in offline page by default
  // https://github.com/gatsbyjs/gatsby/issues/11738#issuecomment-488660043
  // if (location.pathname === '/offline-plugin-app-shell-fallback/') {
  //   return null;
  // }

  const isFullWidth =
    props.full || fullPathPatterns.some(p => location.pathname.startsWith(p));

  return (
    <>
      <GlobalStyles />
      <LayoutWrapper>
        <Header full={isFullWidth} location={location} />
        <Div full={isFullWidth}>{props.children}</Div>
        <Footer full={isFullWidth}></Footer>
      </LayoutWrapper>
    </>
  );
};

export default React.memo(Layout);
