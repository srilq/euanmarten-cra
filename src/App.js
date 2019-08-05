import React, { useState, useEffect } from 'react';
import 'tachyons';
import './App.css';
import Icon from './Icon';
import Header from './Header';

const IMAGES = [
  'growing.png',
  'point.jpg',
  'oranges.jpg',
  'body.jpg',
  'self.jpg',
  'lane.jpg',
  'bilbo.png',
  'owl.jpg',
  'peel.jpg',
  'sword.jpg'
];

const getImageSrc = filename => `/images/${filename}`;

const Image = ({ image: { src, altText = '' }, ...rest }) => <img src={src} alt={altText} {...rest} />;

const Thumbnail = ({ imageFilename, setCurrentImage }) => {
  const src = getImageSrc(imageFilename);

  return (
    <div className="mb1 mb2-ns">
      <button
        className="button-reset bn pa0 db w-100 pointer"
        onClick={() => setCurrentImage(imageFilename)}
      >
        <Image image={{ src }} className="w-100 db" />
      </button>
    </div>
  );
};

const ThumbnailColumn = ({ images, className, thumbnailProps }) => (
  <div className={`ThumbnailColumn ${className}`}>
    {images.map(filename => <Thumbnail key={filename} imageFilename={filename} {...thumbnailProps} />)}
  </div>
);

const TwoColumnLayout = ({ images, thumbnailProps }) => {
  const firstColumnImages = [];
  const secondColumnImages = [];

  images.forEach((image, i) => {
    const isEven = i % 2 === 0;
    if (isEven) {
      firstColumnImages.push(image);
    } else {
      secondColumnImages.push(image);
    }
  });

  return (
    <div className="flex flex-row">
      <ThumbnailColumn
        images={firstColumnImages}
        className="w-50 pa1 pa2-ns"
        thumbnailProps={thumbnailProps}
      />
      <ThumbnailColumn
        images={secondColumnImages}
        className="w-50 pa1 pa2-ns pl0 pl0-ns"
        thumbnailProps={thumbnailProps}
      />
    </div>
  );
};

const LightboxOverlay = ({ src, onClose }) => {
  useEffect(() => {
    const escapeKeyHandler = event => {
      if (event.keyCode === 27) { // escape
        onClose();
      }
    };
    window.addEventListener('keydown', escapeKeyHandler);
    return () => window.removeEventListener('keydown', escapeKeyHandler);
  })

  return (
    <div className="Lightbox fixed absolute--fill bg-near-black pt5 pb5 pr3 pl3 pt4-l pb4-l pr5-l pl5-l">
      <Image image={{ src }} />
      <button
        className="Lightbox-CloseButton button-reset bg-transparent bn db pointer pa3 absolute top-0 right-0 right-1-ns"
        onClick={e => {
          e.preventDefault();
          onClose();
        }}
      >
        <Icon name="CLOSE" className="white" />
      </button>
    </div>
  );
};

const Lightbox = ({ isOpen, imageFilename, ...rest }) => {
  if(isOpen && imageFilename) {
    const src = getImageSrc(imageFilename);
    return <LightboxOverlay src={src} {...rest} />;
  } else {
    return null;
  }
};

const App = () => {
  const [currentImage, setCurrentImage] = useState(null);

  const isLightboxOpen = !!currentImage;

  return (
    <div className="sans-serif">
      <div className="pa4">
        <Header />
      </div>
      <main>
        <TwoColumnLayout
          images={IMAGES}
          thumbnailProps={{ setCurrentImage }}
        />
      </main>
      <Lightbox
        isOpen={isLightboxOpen}
        imageFilename={currentImage}
        onClose={() => setCurrentImage(null)}
      />
    </div>
  );
};

export default App;
