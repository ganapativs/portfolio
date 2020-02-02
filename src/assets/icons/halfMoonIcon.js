import React from 'react';
import styled from 'styled-components';
import { Svg, Path } from './svg';

const LocalSvg = styled(Svg)`
  @media screen and (min-width: 768px) {
    &:hover {
      transform: translateY(0);
    }
  }
`;

// https://www.flaticon.com/free-icon/half-moon_287647
function Icon(props) {
  return (
    <LocalSvg
      width="24"
      height="24"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Theme"
      role="img"
      viewBox="0 0 512 512">
      <Path
        d="M405.344,354.492c-141.399,0-256.008-114.625-256.008-256.008c0-31.781,5.789-62.211,16.375-90.289
			C68.883,44.696,0,138.211,0,247.813C0,389.21,114.617,503.805,256,503.805c109.594,0,203.125-68.875,239.625-165.703
			C467.531,348.68,437.125,354.492,405.344,354.492z M390.938,439.836c-39.625,27.906-86.281,42.656-134.938,42.656
			c-31.688,0-62.422-6.219-91.336-18.438c-27.938-11.812-53.039-28.75-74.602-50.312c-21.555-21.562-38.477-46.656-50.297-74.594
			c-12.227-28.906-18.43-59.656-18.43-91.336c0-48.648,14.75-95.312,42.648-134.938c13.453-19.102,29.633-36.062,48.086-50.414
			c6.586-5.125,13.422-9.883,20.469-14.25C129.523,64.696,128,81.493,128,98.485c0,37.43,7.336,73.75,21.805,107.953
			c13.969,33.031,33.961,62.68,59.422,88.148c25.469,25.469,55.125,45.453,88.148,59.438
			c34.203,14.453,70.531,21.781,107.969,21.781c16.969,0,33.781-1.5,50.266-4.531c-4.376,7.063-9.141,13.891-14.266,20.469
			C427,410.211,410.032,426.367,390.938,439.836z"
      />
      <Path
        d="M384,109.149c-5.89,0-10.656,4.773-10.656,10.664s4.765,10.672,10.656,10.672s10.656-4.781,10.656-10.672
			S389.89,109.149,384,109.149z"
      />
      <Path
        d="M320,226.484c-5.89,0-10.656,4.774-10.656,10.664c0,5.891,4.766,10.664,10.656,10.664s10.656-4.773,10.656-10.664
			C330.656,231.257,325.89,226.484,320,226.484z"
      />
      <Path
        d="M501.344,77.149c-5.906,0-10.688,4.773-10.688,10.664s4.781,10.672,10.688,10.672c5.875,0,10.656-4.781,10.656-10.672
			S507.219,77.149,501.344,77.149z"
      />
      <Path
        d="M309.344,13.149c-5.906,0-10.688,4.773-10.688,10.664s4.782,10.672,10.688,10.672c5.875,0,10.656-4.781,10.656-10.672
			S315.219,13.149,309.344,13.149z"
      />
      <Path
        d="M277.344,119.813h-10.68V98.485c0-5.898-4.773-10.672-10.664-10.672s-10.664,4.773-10.664,10.672v21.328h-10.672
			c-5.891,0-10.664,4.773-10.664,10.672c0,5.891,4.773,10.664,10.664,10.664h10.672v21.336c0,5.891,4.773,10.664,10.664,10.664
			s10.664-4.773,10.664-10.664v-21.336h10.68c5.875,0,10.656-4.773,10.656-10.664C288,124.586,283.219,119.813,277.344,119.813z"
      />
      <Path
        d="M458.656,237.148H448v-21.336c0-5.891-4.781-10.664-10.656-10.664c-5.906,0-10.688,4.773-10.688,10.664v21.336H416
			c-5.891,0-10.656,4.773-10.656,10.664s4.765,10.672,10.656,10.672h10.656v21.32c0,5.906,4.781,10.688,10.688,10.688
			c5.875,0,10.656-4.781,10.656-10.688v-21.32h10.656c5.906,0,10.688-4.781,10.688-10.672S464.563,237.148,458.656,237.148z"
      />
    </LocalSvg>
  );
}

export default Icon;
