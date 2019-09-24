import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { GithubPicker } from 'react-color';
import useOutsideClick from './hooks/useOutsideClick';

const AccentToggleWrapper = styled.button`
  position: relative;
  margin-right: 1.25rem;
`;

const AccentToggle = styled.div`
  width: 20px;
  height: 20px;
  background: ${p => p.background};
  border-radius: 2px 50% 50% 50%;
  transform: rotate(45deg) scale(0.9) translateY(2px);
  transform-origin: 50% 50%;
  border: 1px solid var(--color-dark);
  box-shadow: inset 0 0 0px 0 var(--color-light),
    0px -15px 0 -6px var(--color-accent);

  @media screen and (max-width: 767px) {
    transform: rotate(45deg) scale(0.75) translateY(4px);
  }

  @media screen and (hover: hover) and (pointer: fine) {
    transition: opacity 0.1s ease-out;

    &:hover {
      transition: opacity 0.15s ease-in;
      opacity: 0.8;
    }
  }

  + .github-picker {
    position: absolute !important;
    right: -7px;
    top: 30px;
    border: none !important;
    background: var(--color-dark) !important;
    box-shadow: var(--color-light-op-1) 0px 3px 12px !important;

    > div:first-child {
      border: none !important;
    }

    > div:nth-child(2) {
      border-color: transparent transparent var(--color-dark) !important;
    }

    > span > div {
      border-radius: 50%;
      overflow: hidden;
      margin: 0;
      outline: none !important;
      box-shadow: none !important;
      background: transparent !important;
      transform: scale(0.8);
      transition: transform 0.1s ease-in;

      &:hover {
        transform: scale(1);
      }
    }
  }
`;

const AccentGlobalStyle = createGlobalStyle`
    body {
        --color-accent: ${p => p.accentColor}
    }
`;

function AccentSwitcher() {
  const wrapperRef = useRef(null);
  const [accentColor, setAccentColor] = useState(null);
  const [visible, setVisibility] = useState(false);
  const hideVisibility = () => setVisibility(false);
  const toggleVisibility = () => setVisibility(!visible);
  const toggleAccent = ({ hex: accent }) => {
    // eslint-disable-next-line no-underscore-dangle
    window.__setPreferredAccentColor(accent);
    toggleVisibility();
  };
  useOutsideClick(wrapperRef, hideVisibility);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    setAccentColor(window.__accentColor || '#FF2E63');
    // eslint-disable-next-line no-underscore-dangle
    window.__onAccentColorChange = () => {
      // eslint-disable-next-line no-underscore-dangle
      setAccentColor(window.__accentColor);
    };
  }, []);

  return (
    <>
      <AccentGlobalStyle accentColor={accentColor} />
      <AccentToggleWrapper ref={wrapperRef}>
        <AccentToggle
          background={accentColor}
          onClick={toggleVisibility}></AccentToggle>
        {visible ? (
          <GithubPicker
            className="animated fadeIn faster"
            width="36px"
            colors={[
              '#f1404b',
              '#f07818',
              '#FF2E63',
              '#6abe83',
              '#209396',
              '#00A0FF',
            ]}
            onChange={toggleAccent}
          />
        ) : null}
      </AccentToggleWrapper>
    </>
  );
}

export default AccentSwitcher;
