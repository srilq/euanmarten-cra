import React from 'react';
import './Button.css';

const Button = ({ children, onClick, isDisabled }) => (
  <button
    className="Button pa2 lh-solid f7 mr0 mr3-ns ttl"
    aria-hidden
    disabled={isDisabled}
    onClick={onClick}>
      {children}
  </button>
);

export default Button;
