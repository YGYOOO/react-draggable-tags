import React from 'react';
import { fromJS, List, is } from 'immutable';
import buildDraggableArea from './DraggableAreaBuilder';

let i = -1;

export default class DraggableTagsGroup {
  constructor() {
    this.areas = [];
    this.areaFuncs = {};
  }

  addArea() {
    i++;
    let index = i;
    this.areas.push(`ddraggableArea-${index}`);
    return buildDraggableArea({
      areaId :`ddraggableArea-${index}`,
      isInAnotherArea: (tagRect, tag) => {
        let x = tagRect.left + tagRect.width / 2;
        let y = tagRect.top + tagRect.height / 2;
        return this.areas.some(id => {
          const rect = document.getElementById(id).getBoundingClientRect();
          if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            this.areaFuncs[id](tag);
            return true;
          }
          return false;
        });
      },
      passAddFunc: (addTag) => {
        this.areaFuncs[`ddraggableArea-${index}`] = function(tag) {
          addTag(tag);
        }
      }
    });
  }
}