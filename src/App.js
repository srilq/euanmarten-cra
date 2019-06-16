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
      <header className="w-30-l pr4-l pb4">
        <h1 className="mt0 f5 normal mb4 ttl">Euan Marten</h1>
        <ul className="list pa0 f5">
          <li className="email">email: <a href="mailto:euanscottm@gmail.com">euanscottm@gmail.com</a></li>
          <li className="email">instagram: <a href="https://www.instagram.com/e.seilide/">e.seilide</a></li>
        </ul>
      </header>
      <main className="w-70-l pr5-m pr5-l">
        <div className="flex justify-between justify-start-ns mb3">
          <div><button className="pa2 lh-solid f7 mr0 mr3-ns ttl" aria-hidden disabled={isSelectedMin} onClick={isSelectedMin ? null : () => setSelected(selected - 1)}>Previous</button></div>
          <div><button className="pa2 lh-solid f7 mr0 mr3-ns ttl" aria-hidden disabled={isSelectedMax} onClick={isSelectedMax ? null : () => setSelected(selected + 1)}>Next</button></div>
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
