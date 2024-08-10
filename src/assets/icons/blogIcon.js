import React from 'react';
import styled from 'styled-components';
import { Path, Svg } from './svg';

const LocalSvg = styled(Svg)`
  transform: scale(0.9) translateY(4px);
`;

// https://www.flaticon.com/free-icon/feather_2584922?term=feather%20writing&page=1&position=3
function Icon(props) {
  return (
    <>
      <LocalSvg
        width="20"
        height="20"
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Blog"
        role="img"
        viewBox="0 0 512 512"
      >
        <Path
          $active={props.active}
          d="m511.132812 79.929688c-.019531-21.390626-8.367187-41.488282-23.507812-56.59375-31.226562-31.15625-81.992188-31.113282-113.183594.117187l-322.207031 323.503906c-10.480469 10.472657-18.480469 23.4375-23.136719 37.496094l-.300781.914063-28.796875 126.632812 126.984375-28.429688.945313-.3125c14.0625-4.65625 27.035156-12.648437 37.542968-23.152343l322.25-323.542969c15.113282-15.132812 23.429688-35.246094 23.410156-56.632812zm-440.714843 375.34375-13.464844-13.472657 9.722656-42.765625 46.613281 46.640625zm389.003906-346.9375-312.847656 314.105468-56.652344-56.6875 214.300781-215.160156 32.632813 32.632812 28.261719-28.261718-32.691407-32.691406 30.402344-30.519532 32.75 32.75 28.261719-28.261718-32.808594-32.808594 11.707031-11.753906c15.605469-15.625 41.023438-15.648438 56.65625-.050782 7.578125 7.5625 11.757813 17.625 11.769531 28.332032.007813 10.710937-4.152343 20.777343-11.742187 28.375zm-249.164063 363.261718h300.875v39.96875h-340.707031zm0 0"
        />
      </LocalSvg>
    </>
  );
}

export default Icon;
