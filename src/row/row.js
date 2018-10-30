import React from 'react';
import classNames from 'classnames';
import './row.css';

export default ({
  children,
  shadow = false,
  className,
  vspace = undefined,
  hspace = undefined,
}) => (
  <div
    style={{ padding: `${vspace}px ${hspace}px` }}
    className={classNames(className, 'row', { 'section--shadow': shadow })}>
    {children}
  </div>
);
