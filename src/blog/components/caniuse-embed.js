import React, { useEffect, useRef, memo } from 'react';

// get featureName from https://caniuse.com/
function CaniuseEmbed({ featureName }) {
  const ref = useRef(null);

  useEffect(() => {
    // https://caniuse.bitsofco.de/
    // Modified https://github.com/ireade/caniuse-embed/blob/master/src/caniuse-embed.js
    if (featureName) {
      const embed = ref.current;
      const feature = embed.getAttribute('data-feature');
      const periods = embed.getAttribute('data-periods');
      const accessibleColours =
        embed.getAttribute('data-accessible-colours') || 'false';
      const imageBase = embed.getAttribute('data-image-base') || 'none';

      const url = 'https://caniuse.bitsofco.de/embed/index.html';
      const iframe = `<iframe src="${url}?feat=${feature}&periods=${periods}&accessible-colours=${accessibleColours}&image-base=${imageBase}" frameborder="0" width="100%" height="400px"></iframe>`;

      embed.innerHTML = iframe;

      const onIframeMessage = (e) => {
        const { data } = e;
        if (typeof data === 'string' && data.indexOf('ciu_embed') > -1) {
          const featureID = data.split(':')[1];
          const height = data.split(':')[2];

          if (embed.getAttribute('data-feature') === featureID) {
            const iframeHeight = parseInt(height, 10) + 30;
            embed.childNodes[0].height = `${iframeHeight}px`;
          }
        }
      };

      // GET RESPONSIVE HEIGHT PASSED FROM IFRAME
      window.addEventListener('message', onIframeMessage, false);

      return () => {
        window.removeEventListener('message', onIframeMessage, false);
      };
    }

    return undefined;
  }, [featureName]);

  return featureName ? (
    <div
      ref={ref}
      className="ciu_embed"
      data-feature={featureName}
      data-periods="future_2,future_1,current,past_1,past_2"
      data-accessible-colours="false"
    >
      <a href={`http://caniuse.com/#feat=${featureName}`}>
        <picture>
          <source
            type="image/webp"
            srcSet={`https://caniuse.bitsofco.de/image/${featureName}.webp`}
          />
          <img
            src={`https://caniuse.bitsofco.de/image/${featureName}.png`}
            alt={`Data on support for the ${featureName} feature across the major browsers from caniuse.com`}
          />
        </picture>
      </a>
    </div>
  ) : null;
}

// Create once, never update
export default memo(CaniuseEmbed, () => true);
