// import './style.css';

// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );


import buildDraggableArea from './DraggableAreaBuilder';
import DraggableAreasGroup from './DraggableAreasGroup';

const DraggableArea = buildDraggableArea({areaId: Math.random()});
export {DraggableArea, DraggableAreasGroup};