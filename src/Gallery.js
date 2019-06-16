import React, { useState } from 'react';
import Button from './Button';
import './Gallery.css';

const GalleryImage = ({ filename, alt = '' }) => (
  <img src={`/images/${filename}`} alt={alt} />
);

const Gallery = ({ images }) => {
  const [selected, setSelected] = useState(0);

  const isSelectedMin = selected === 0;
  const isSelectedMax = selected === images.length - 1;

  return (
    <div className="Gallery">
      <div className="flex justify-between justify-start-ns mb3">
        <Button
          disabled={isSelectedMin}
          ariaHidden
          onClick={isSelectedMin ? null : () => setSelected(selected - 1)}>
            <span aria-hidden>&lt;</span><span className="dn">Previous</span>
        </Button>
        <Button
          disabled={isSelectedMax}
          ariaHidden
          onClick={isSelectedMax ? null : () => setSelected(selected + 1)}>
            <span aria-hidden>&gt;</span><span className="dn">Next</span>
        </Button>
      </div>
      <div className={`Gallery-select-${selected}`}>
        {images.map(filename => <GalleryImage key={filename} filename={filename} />)}
      </div>
    </div>
  );
};

export default Gallery;
