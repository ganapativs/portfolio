import React, { Suspense } from 'react';
import styled from 'styled-components';
import sizeMe from 'react-sizeme';
import { accentColors } from '../utils/helpers';

const SuspenseReactSpectrum = React.lazy(() => import('react-spectrum'));

const FooterWrapper = styled.footer`
  max-width: 840px;
  margin: 0 auto;
  align-self: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem 0;
  color: var(--color-light-dark);

  a {
    transition: color 0.25s ease;
    color: var(--color-light-dark);
  }

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover {
      a {
        color: var(--color-accent);
      }
    }
  }
`;

const Footer = ({ size: { width } }) =>
  width <= 767 ? null : (
    <FooterWrapper data-width={width}>
      <Suspense fallback={null}>
        <SuspenseReactSpectrum
          width={width / 2}
          linesPerParagraph={1}
          lineDistance={0}
          paragraphDistance={0}
          wordHeight={4}
          wordWidths={[20, 30, 40, 50, 60]}
          truncateLastLine={false}
          colors={accentColors}
        />
      </Suspense>
    </FooterWrapper>
  );

export default sizeMe()(Footer);
