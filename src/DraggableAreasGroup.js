import React from 'react';
import { fromJS, List, is } from 'immutable';
import buildDraggableArea from './DraggableAreaBuilder';



export default class DraggableTagsGroup {
  constructor() {
    this.isInAreas = [];
  }

  addArea() {
    return buildDraggableArea({
      isInAnotherArea: (tagRect, tag) => {
        let x = tagRect.left + tagRect.width / 2;
        let y = tagRect.top + tagRect.height / 2;
        return this.isInAreas.some(isInArea => {
          return isInArea(tag, x, y);
        });
      },
      passAddFunc: (ele, addTag) => {
        this.isInAreas.push(function(tag, x, y) {
          const rect = ele.getBoundingClientRect();
          if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            addTag(tag);
            return true;
          }
        });
      }
    });
  }
}