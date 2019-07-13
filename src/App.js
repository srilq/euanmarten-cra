import React from 'react';
import 'tachyons';
import './App.css';
import Header from './Header';

const IMAGES = [
  'oranges.jpg',
  'point.jpg',
  'body.jpg',
  'self.jpg',
  'lane.jpg',
  'bilbo.jpg',
  'owl.jpg',
  'peel.jpg',
  'sword.jpg'
];

const Thumbnail = ({ filename, alt = '' }) => {
  const src = `/images/${filename}`;

  return (
    <a href={src} target="_self">
      <img src={src} alt={alt} className="w-100 db mb1 mb2-ns" />
    </a>
  );
};

const ThumbnailColumn = ({ images, className }) => {
  return (
    <div className={`${className} ThumbnailColumn`}>
      {images.map(filename => <Thumbnail key={filename} filename={filename} />)}
    </div>
  );

}

const TwoColumnLayout = ({ images }) => {
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
      <ThumbnailColumn images={firstColumnImages} className="w-50 pa1 pa2-ns" />
      <ThumbnailColumn images={secondColumnImages} className="w-50 pa1 pa2-ns pl0 pl0-ns" />
    </div>
  );
};

const App = () => (
  <div className="sans-serif">
    <div className="pa4">
      <Header />
    </div>
    <main>
      <TwoColumnLayout images={IMAGES} />
    </main>
  </div>
);

export default App;
