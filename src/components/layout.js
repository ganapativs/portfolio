import 'normalize.css';
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

const LayoutWidth = styled.div`
  max-width: ${props => (props.full ? '100%' : '900px')};
  margin: 0 auto;
  height: 100%;
  min-height: 100vh;
  padding: 0 25px;
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
`;

const Layout = props => {
  return (
    <>
      <GlobalStyles />
      <LayoutWidth full={props.full}>
        <Header />
        <Div>{props.children}</Div>
        <Footer></Footer>
      </LayoutWidth>
    </>
  );
};

export default React.memo(Layout);
