import React from 'react';
import './Button.css';

const Button = ({ children, onClick, disabled, ariaHidden }) => (
  <button
    className="Button pa2 lh-solid f7 mr0 mr3-ns ttl ba br2 b--black bg-transparent black"
    aria-hidden={ariaHidden}
    disabled={disabled}
    onClick={onClick}>
      {children}
  </button>
);

export default Button;
