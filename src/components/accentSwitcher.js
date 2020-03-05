import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GithubPicker } from 'react-color';
import useOutsideClick from './hooks/useOutsideClick';
import { accentColors } from '../utils/helpers';
import SwitcherButton from './SwitcherButton';

const AccentToggleWrapper = styled.div`
  position: relative;
  transform: translateY(4px) translateX(1px);

  @media screen and (max-width: 767px) {
    transform: translateY(2px);
  }

  @media screen and (max-width: 300px) {
    display: none;
  }
`;

const AccentToggle = styled.div`
  width: 20px;
  height: 20px;
  background: ${p => p.background};
  border-radius: 2px 50% 50% 50%;
  transform: rotate(45deg) scale(0.7) translateY(2px);
  transform-origin: 50% 50%;
  background: var(--color-accent);
  border: 1px solid var(--color-dark);
  box-shadow: inset 0 0 0px 0 var(--color-light),
    0px -15px 0 -6px var(--color-accent);

  @media screen and (max-width: 767px) {
    transform: rotate(45deg) scale(0.75) translateY(2px);
  }

  @media screen and (hover: hover) and (pointer: fine) {
    transition: opacity 0.1s ease-out;

    &:hover {
      transition: opacity 0.15s ease-in;
      opacity: 0.8;
    }
  }
`;

const Div = styled.div`
  position: relative;

  @media screen and (min-width: 768px) {
    .github-picker {
      position: absolute !important;
      right: 3px;
      top: 54px;
      border: none !important;
      background: var(--color-dark) !important;
      box-shadow: 0 0px 12px 1px var(--color-light-op-2) !important;
      width: 36px !important;
      z-index: 1;

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
        transform: scale(0.7);
        transition: transform 0.1s ease-in;

        &:hover {
          transform: scale(1);
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .github-picker {
      position: fixed !important;
      left: 0;
      width: 100% !important;
      border: none !important;
      bottom: 60px;
      border-radius: 0 !important;
      background: var(--color-dark) !important;
      box-shadow: 0 -4px 4px -4px var(--color-light-op-2) !important;
      justify-content: space-around;
      padding: 1rem 0 0.5rem !important;

      > span > div {
        border-radius: 50%;
        overflow: hidden;
        outline: none !important;
        box-shadow: none !important;
      }
    }
  }
`;

function AccentSwitcher() {
  const wrapperRef = useRef(null);
  const [accentColor, setAccentColor] = useState(null);
  const [visible, setVisibility] = useState(false);
  const hideVisibility = () => setVisibility(false);
  const toggleVisibility = () => setVisibility(!visible);
  /* eslint-disable no-underscore-dangle */
  const toggleAccent = ({ hex: accent }) => {
    window.__setPreferredAccentColor(accent);
    toggleVisibility();
  };
  useOutsideClick(wrapperRef, hideVisibility);

  useEffect(() => {
    const setAccentColorOnBody = () => {
      setAccentColor(window.__accentColor);
      document.body.style.setProperty('--color-accent', window.__accentColor);
    };

    setAccentColorOnBody();
    window.__onAccentColorChange = setAccentColorOnBody;

    return () => {
      window.__onAccentColorChange = () => {};
    };
  }, []);
  /* eslint-enable no-underscore-dangle */

  return (
    <Div ref={wrapperRef}>
      {visible ? (
        <GithubPicker
          triangle="hide"
          colors={accentColors}
          onChange={toggleAccent}
        />
      ) : null}
      <SwitcherButton
        className="neumorphism"
        onClick={toggleVisibility}
        style={{ margin: 0 }}>
        <AccentToggleWrapper>
          <AccentToggle title="Change accent color" background={accentColor} />
        </AccentToggleWrapper>
      </SwitcherButton>
    </Div>
  );
}

export default AccentSwitcher;
