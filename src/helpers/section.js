import React from "react";
import classNames from "classnames";
import "./section.css";

export default ({
  children,
  shadow = false,
  className,
  vspace = 20,
  hspace = 10
}) => (
  <div
    style={{ padding: `${vspace}px ${hspace}px` }}
    className={classNames(className, "section", { "section--shadow": shadow })}
  >
    {children}
  </div>
);
