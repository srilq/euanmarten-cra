import React from 'react';
import 'tachyons';
import './App.css';
import Gallery from './Gallery';
import Header from './Header';

const IMAGES = [
  'oranges.jpg',
  'self.jpg',
  'dungarees2.jpg',
  'bilbo.jpg',
  'peel.jpg'
];

const App = () => (
  <div className="sans-serif flex flex-column flex-row-l mw8 center pa4">
    <div className="w-30-l pr4-l pb4">
      <Header />
    </div>
    <main className="w-70-l pr5-m pr5-l">
      <Gallery images={IMAGES} />
    </main>
  </div>
);

export default App;
