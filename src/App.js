import React, { useState } from 'react';
import 'tachyons';
import './App.css';
import './Gallery.css';

const galleryConfig = {
  min: 1,
  max: 4
};

function App() {
  const [selected, setSelected] = useState(1);

  const isSelectedMin = selected === galleryConfig.min;
  const isSelectedMax = selected === galleryConfig.max;

  return (
    <div className="sans-serif flex flex-column flex-row-l mw8 center pa4">
      <header className="w-20-l pr4-l pb4">
        <h1 className="mt0">Euan Marten</h1>
        <ul className="list pa0">
          <li className="email"><a href="mailto:euanscottm@gmail.com">euanscottm@gmail.com</a></li>
        </ul>
      </header>
      <main className="w-80-l pr5-m pr6-l">
        <div className="flex justify-between mb3">
          <div><button className="pa2 lh-solid" aria-hidden disabled={isSelectedMin} onClick={isSelectedMin ? null : () => setSelected(selected - 1)}>Previous</button></div>
          <div><button className="pa2 lh-solid" aria-hidden disabled={isSelectedMax} onClick={isSelectedMax ? null : () => setSelected(selected + 1)}>Next</button></div>
        </div>
        <div className={`Gallery Gallery-select-${selected}`}>
          <img src="/images/oranges.jpg" alt="" />
          <img src="/images/self.jpg" alt="" />
          <img src="/images/bilbo.jpg" alt="" />
          <img src="/images/peel.jpg" alt="" />
        </div>
      </main>
    </div>
  );
}

export default App;
