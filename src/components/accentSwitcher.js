import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { GithubPicker } from 'react-color';
import useOutsideClick from './hooks/useOutsideClick';
import { accentColors } from '../utils/helpers';
import SwitcherButton from './SwitcherButton';

const AccentToggleWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    transform: translateY(-2px) translateX(-2px);
  }

  @media screen and (max-width: 300px) {
    display: none;
  }
`;

const Div = styled.div`
  position: relative;

  @media screen and (min-width: 768px) {
    .switcher-button {
      z-index: 1;
      margin: 0;

      &.visible {
        --opacity: 0.2;
        background: rgb(from var(--color-accent) r g b / var(--opacity));
      }
    }

    .github-picker {
      position: absolute !important;
      right: 1px;
      top: 0;
      --opacity: 0.1;
      box-shadow: 0 0 0 2px
        rgb(from var(--color-accent) r g b / calc(var(--opacity) * 4)) !important;
      background: rgb(
        from var(--color-accent) r g b / var(--opacity)
      ) !important;
      border: none !important;
      width: 185px !important;
      z-index: 1;
      height: 44px;
      align-items: center;
      border-radius: 50px !important;
      padding: 5px 10px !important;
      clip-path: inset(-10px -10px -10px 110%);
      transition: clip-path 0.15s ease-in-out;

      &.visible {
        transition: clip-path 0.2s ease-in-out;
        clip-path: inset(-10px -10px -10px -10px);
      }

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
      clip-path: inset(110% -10px -10px -10px);
      transition: clip-path 0.15s ease-in-out;

      &.visible {
        transition: clip-path 0.2s ease-in-out;
        clip-path: inset(-10px -10px -10px -10px);
      }

      > span > div {
        border-radius: 50%;
        overflow: hidden;
        outline: none !important;
        box-shadow: none !important;
      }
    }
  }
`;

const Color = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="var(--color-accent)"
      d="M7.08 11.25A4.84 4.84 0 0 1 8 9.05L4.43 5.49A9.88 9.88 0 0 0 2 11.25zM9.05 8a4.84 4.84 0 0 1 2.2-.91V2a9.88 9.88 0 0 0-5.76 2.43zm3.7-6v5A4.84 4.84 0 0 1 15 8l3.56-3.56A9.88 9.88 0 0 0 12.75 2zM8 15a4.84 4.84 0 0 1-.91-2.2H2a9.88 9.88 0 0 0 2.39 5.76zm3.25 1.92a4.84 4.84 0 0 1-2.2-.92l-3.56 3.57A9.88 9.88 0 0 0 11.25 22zM16 9.05a4.84 4.84 0 0 1 .91 2.2h5a9.88 9.88 0 0 0-2.39-5.76zM15 16a4.84 4.84 0 0 1-2.2.91v5a9.88 9.88 0 0 0 5.76-2.39zm1.92-3.25A4.84 4.84 0 0 1 16 15l3.56 3.56A9.88 9.88 0 0 0 22 12.75z"
    ></path>
  </svg>
);

function AccentSwitcher() {
  const wrapperRef = useRef(null);
  const [accentColor, setAccentColor] = useState(null);
  const [visible, setVisibility] = useState(false);
  const hideVisibility = () => setVisibility(false);
  const toggleVisibility = () => setVisibility(!visible);

  const toggleAccent = useCallback(
    ({ hex: accent }) => {
      window.__setPreferredAccentColor(accent);
      setAccentColor(accent);
    },
    [setAccentColor],
  );

  const toggleAccentTransition = useCallback(
    (...args) => {
      if (!document.startViewTransition) {
        return toggleAccent(...args);
      } else {
        document.startViewTransition(() => toggleAccent(...args));
      }
    },
    [toggleAccent],
  );

  useOutsideClick(wrapperRef, hideVisibility);

  useEffect(() => {
    const setAccentColorOnBody = () => {
      document.body.style.setProperty('--color-accent', window.__accentColor);
      setAccentColor(window.__accentColor);
    };

    setAccentColorOnBody();
    window.__onAccentColorChange = setAccentColorOnBody;

    return () => {
      window.__onAccentColorChange = () => {};
    };
  }, []);

  return (
    <Div ref={wrapperRef}>
      <style>
        {`
          .github-picker [title="${accentColor}"] {
            box-shadow: inset 0 0 0 8px var(--color-accent), inset 0 0 0 14px var(--color-dark) !important;
            border-radius: 50% !important;
          }
        `}
      </style>
      <GithubPicker
        triangle="hide"
        colors={accentColors}
        onChange={toggleAccentTransition}
        className={`${visible ? 'visible' : ''}`}
      />
      <SwitcherButton
        onClick={toggleVisibility}
        className={`switcher-button ${visible ? 'visible' : ''}`}
      >
        <AccentToggleWrapper title="Change accent color">
          <Color />
        </AccentToggleWrapper>
      </SwitcherButton>
    </Div>
  );
}

export default AccentSwitcher;
