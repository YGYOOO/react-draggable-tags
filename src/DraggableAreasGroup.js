import React from 'react';
import { fromJS, List, is } from 'immutable';
import buildDraggableArea from './DraggableAreaBuilder';



export default class DraggableTagsGroup {
  constructor() {
    this.isInAreas = [];
  }

  addArea(areaId) {
    return buildDraggableArea({
      isInAnotherArea: (tagRect, tag) => {
        let x = tagRect.left + tagRect.width / 2;
        let y = tagRect.top + tagRect.height / 2;

        let result = {isIn: false};
        this.isInAreas.forEach(isInArea => {
          const r = isInArea({tag, x, y, areaId});
          if (r.isIn) {
            result = r;
          }
        });

        return result
      },
      passAddFunc: (ele, addTag) => {
        this.isInAreas.push(function({tag, x, y, areaId: fromAreaId}) {

          const rect = ele.getBoundingClientRect();
          if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            addTag({tag, fromAreaId, x, y});
            return {
              isIn: true,
              id: areaId
            };
          }

          return {
            isIn: false,
          };
        });
      }
    });
  }
}