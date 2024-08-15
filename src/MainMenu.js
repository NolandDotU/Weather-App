import React from 'react';

function MainMenu({ onStart }) {
  return (
    <div className="main-menu">
      <h1>Welcome to AXIS WEATHER</h1>
      <button onClick={onStart}>Start</button>
    </div>
  );
}

export default MainMenu;
