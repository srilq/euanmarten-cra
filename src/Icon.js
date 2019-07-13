import React from 'react';
import './Icon.css';
import icons from './icons';

const DEFAULT_SIZE = 24;

const Icon = ({ name, className = '', width = DEFAULT_SIZE, height = DEFAULT_SIZE }) => {
  const icon = icons[name];
  if (!icon) return null;

  const IconSvg = icon.svg;

  return (
    <IconSvg
      className={`Icon ${className}`}
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
    />
  );
};

export default Icon;
