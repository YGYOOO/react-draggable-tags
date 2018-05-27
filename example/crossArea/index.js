import React, {Component} from 'react';
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from 'react-draggable-tags';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';

import styles from './style.less';

import mock from './mock.js';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

export default class CrossArea extends Component {
  render() {
    return (
      <div className="CrossArea">
        <div className="square left">
          <DraggableArea1
            initailTags={mock.leftTags}
            build={({tag, deleteThis}) => (
              <div className="tag">
                {tag.id}
              </div>
            )}
            onChange={(tags) => console.log(tags)}
          />
        </div>
        <div className="square right">
          <DraggableArea2
            initailTags={mock.rightTags}
            build={({tag, deleteThis}) => {
              return (
                <div className="tag">
                  <img
                    className="delete"
                    src={deleteBtn}
                    srcSet={`${deleteBtn2x} 2x`}
                    onClick={deleteThis}
                  />
                  {tag.id}
                </div>
              )
            }}
            onChange={(tags) => console.log(tags)}
          />
        </div>
      </div>
    );
  }
}