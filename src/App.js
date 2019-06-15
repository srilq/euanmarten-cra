import React, { useState } from 'react';
import 'tachyons-verbose';
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
    <div className="sans-serif">
      <header>
        <h1>Euan Marten</h1>
      </header>
      <main>
        <div><button aria-hidden disabled={isSelectedMin} onClick={isSelectedMin ? null : () => setSelected(selected - 1)}>Previous</button></div>
        <div><button aria-hidden disabled={isSelectedMax} onClick={isSelectedMax ? null : () => setSelected(selected + 1)}>Next</button></div>
        <div className={`Gallery-select-${selected}`}>
          <img src="/images/oranges.jpg" alt="" />
          <img src="/images/euan.jpg" alt="" />
          <img src="/images/bilbo.jpg" alt="" />
          <img src="/images/peel.jpg" alt="" />
        </div>
      </main>
    </div>
  );
}

export default App;
