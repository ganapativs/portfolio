import React from 'react';
import styled, { keyframes } from 'styled-components';
import { captureEvent } from '../utils/ga';
import { rhythm } from '../utils/typography';
import ExternalLink from './externalLink';

const Div = styled.div`
  text-wrap: pretty;
`;

const DevName = styled.h1`
  font-size: ${rhythm(1.4)};
  margin-bottom: ${rhythm(0.8)};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media screen and (min-width: 768px) {
    margin-top: 0;
  }

  a {
    display: none;

    @media screen and (min-width: 768px) {
      display: inline-block;
    }
  }

  span {
    @media screen and (min-width: 768px) {
      font-size: ${rhythm(0.8)};
      vertical-align: middle;
    }
  }
`;

const SmallFadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 80px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const DevDescription = styled.div`
  animation-name: ${SmallFadeInUp};
`;

const Separator = styled.div`
  margin-bottom: ${(props) => props.mb}px;
`;

const Ul = styled.ul`
  list-style: none;
  margin-top: 1rem;
  margin-bottom: 0;

  li {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0.55rem;
      left: -1rem;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      background: currentColor;
    }
  }
`;

const FlagIndia = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 36 36"
    {...props}
  >
    <title>Indian Flag</title>
    <path fill="#138808" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-5H0v5z" />
    <path fill="#F93" d="M36 14V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v5h36z" />
    <path fill="#F7F7F7" d="M0 13.667h36v8.667H0z" />
    <circle cx="18" cy="18" r="4" fill="navy" />
    <circle cx="18" cy="18" r="3.375" fill="#F7F7F7" />
    <path
      fill="#6666B3"
      d="m18.1 16.75l-.1.65l-.1-.65l.1-1.95zm-.928-1.841l.408 1.909l.265.602l-.072-.653zm-.772.32l.888 1.738l.412.513l-.238-.613zm-.663.508l1.308 1.45l.531.389l-.389-.531zm-.508.663l1.638 1.062l.613.238l-.513-.412zm-.32.772l1.858.601l.653.072l-.602-.265zM14.8 18l1.95.1l.65-.1l-.65-.1zm.109.828l1.909-.408l.602-.265l-.653.072zm.32.772l1.738-.888l.513-.412l-.613.238zm.508.663l1.45-1.308l.389-.531l-.531.389zm.663.508l1.062-1.638l.238-.613l-.412.513zm.772.32l.601-1.858l.072-.653l-.265.602zM18 21.2l.1-1.95l-.1-.65l-.1.65zm.828-.109l-.408-1.909l-.265-.602l.072.653zm.772-.32l-.888-1.738l-.412-.513l.238.613zm.663-.508l-1.308-1.45l-.531-.389l.389.531zm.508-.663l-1.638-1.062l-.613-.238l.513.412zm.32-.772l-1.858-.601l-.653-.072l.602.265zM21.2 18l-1.95-.1l-.65.1l.65.1zm-.109-.828l-1.909.408l-.602.265l.653-.072zm-.32-.772l-1.738.888l-.513.412l.613-.238zm-.508-.663l-1.45 1.308l-.389.531l.531-.389zm-.663-.508l-1.062 1.638l-.238.613l.412-.513zm-.772-.32l-.601 1.858l-.072.653l.265-.602z"
    />
    <g fill="navy">
      <circle cx="17.56" cy="14.659" r=".2" />
      <circle cx="16.71" cy="14.887" r=".2" />
      <circle cx="15.948" cy="15.326" r=".2" />
      <circle cx="15.326" cy="15.948" r=".2" />
      <circle cx="14.887" cy="16.71" r=".2" />
      <circle cx="14.659" cy="17.56" r=".2" />
      <circle cx="14.659" cy="18.44" r=".2" />
      <circle cx="14.887" cy="19.29" r=".2" />
      <circle cx="15.326" cy="20.052" r=".2" />
      <circle cx="15.948" cy="20.674" r=".2" />
      <circle cx="16.71" cy="21.113" r=".2" />
      <circle cx="17.56" cy="21.341" r=".2" />
      <circle cx="18.44" cy="21.341" r=".2" />
      <circle cx="19.29" cy="21.113" r=".2" />
      <circle cx="20.052" cy="20.674" r=".2" />
      <circle cx="20.674" cy="20.052" r=".2" />
      <circle cx="21.113" cy="19.29" r=".2" />
      <circle cx="21.341" cy="18.44" r=".2" />
      <circle cx="21.341" cy="17.56" r=".2" />
      <circle cx="21.113" cy="16.71" r=".2" />
      <circle cx="20.674" cy="15.948" r=".2" />
      <circle cx="20.052" cy="15.326" r=".2" />
      <circle cx="19.29" cy="14.887" r=".2" />
      <circle cx="18.44" cy="14.659" r=".2" />
      <circle cx="18" cy="18" r=".9" />
    </g>
  </svg>
);

const DevInfo = () => {
  return (
    <Div>
      <DevName>
        Ganapati V S <FlagIndia aria-label="India" aria-hidden="true" />
      </DevName>
      <DevDescription>
        Hi{' '}
        <span role="img" aria-label="Hi!">
          👋
        </span>{' '}
        I&#39;m a Full-Stack JavaScript developer with over 10 years of
        experience in turning coffee into cutting-edge code. Currently steering
        the ship as Vice President - Technology at{' '}
        <ExternalLink
          href="https://tracxn.com/?ref=meetguns.com"
          onClick={() => captureEvent('Tracxn Website', 'click', 'Work Link')}
        >
          Tracxn
        </ExternalLink>
        , where we're revolutionizing the world of private market intelligence.
        <Separator mb={24} />
        My passion lies in coding, architecting elegant solutions, and
        contributing to the vibrant open-source ecosystem. I've had the thrill
        of building: <Separator mb={8} />
        <Ul style={{ color: 'var(--color-accent)' }}>
          <li>
            <ExternalLink
              href="https://sgb.vercel.app/?ref=meetguns.com"
              onClick={() =>
                captureEvent('sgb.vercel.app', 'click', 'Social Links')
              }
              style={{ whiteSpace: 'nowrap' }}
            >
              SGB.vercel.app
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://github.com/ganapativs/react-spectrum?ref=meetguns.com"
              onClick={() =>
                captureEvent('react-spectrum GitHub', 'click', 'Social Links')
              }
              style={{ whiteSpace: 'nowrap' }}
            >
              React Spectrum
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://github.com/ganapativs/react-delightful-scroller?ref=meetguns.com"
              onClick={() =>
                captureEvent(
                  'react-delightful-scroller GitHub',
                  'click',
                  'Social Links',
                )
              }
              style={{ whiteSpace: 'nowrap' }}
            >
              React Delightful Scroller
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://github.com/ganapativs/priority-browser-extension?ref=meetguns.com"
              onClick={() =>
                captureEvent(
                  'Priority browser extension Github',
                  'click',
                  'Priority Browser Extension',
                )
              }
              style={{ whiteSpace: 'nowrap' }}
            >
              Priority Browser Extension
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://github.com/ganapativs/react-dynamic-import?ref=meetguns.com"
              onClick={() =>
                captureEvent(
                  'react-dynamic-import GitHub',
                  'click',
                  'Social Links',
                )
              }
              style={{ whiteSpace: 'nowrap' }}
            >
              React Dynamic Import
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://bttn.surge.sh/?ref=meetguns.com"
              onClick={() =>
                captureEvent('bttn.surge.sh', 'click', 'Social Links')
              }
            >
              Bttn.css
            </ExternalLink>
          </li>
        </Ul>
        <Separator mb={24} />
        When I'm not wrestling with code, you'll find me:
        <Separator mb={8} />
        <Ul style={{ color: 'var(--color-light)' }}>
          <li>
            Exploring new horizons{' '}
            <span role="img" aria-label="Travel">
              ✈️
            </span>
          </li>
          <li>
            Capturing moments through my lens{' '}
            <span role="img" aria-label="Photography">
              📸
            </span>
          </li>
          <li>
            Scoring goals (or trying to){' '}
            <span role="img" aria-label="Soccer">
              ⚽️
            </span>
          </li>
          <li>
            Smashing shuttlecocks{' '}
            <span role="img" aria-label="Badminton">
              🏸
            </span>
          </li>
          <li>
            Saving virtual worlds{' '}
            <span role="img" aria-label="FIFA gaming">
              🎮
            </span>
          </li>
        </Ul>
        <Separator mb={24} />
        Let's{' '}
        <ExternalLink
          href="https://twitter.com/ganapativs?ref=meetguns.com"
          onClick={() => captureEvent('Personal Twitter', 'click', 'Connect')}
        >
          connect
        </ExternalLink>{' '}
        and explore the endless possibilities of tech 🌟
      </DevDescription>
      <Separator mb={24} />
    </Div>
  );
};

export default DevInfo;
