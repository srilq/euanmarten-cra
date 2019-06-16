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
          isDisabled={isSelectedMin}
          onClick={isSelectedMin ? null : () => setSelected(selected - 1)}>
            Previous
        </Button>
        <Button
          isDisabled={isSelectedMax}
          onClick={isSelectedMax ? null : () => setSelected(selected + 1)}>
            Next
        </Button>
      </div>
      <div className={`Gallery-select-${selected}`}>
        {images.map(filename => <GalleryImage key={filename} filename={filename} />)}
      </div>
    </div>
  );
};

export default Gallery;
