import React from "react";

const ExternalLink = (props) => (
  <a rel="noopener noreferrer" target="_blank" {...props}>
    {props.children}
  </a>
);

export default ExternalLink;
