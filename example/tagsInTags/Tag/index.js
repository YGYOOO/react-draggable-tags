import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../../../src/index';
import deleteBtn from '../../imgs/delete.png';
import deleteBtn2x from '../../imgs/delete@2x.png';

import styles from './style.less';

import mock from './mock.js';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

const getRandomTags = function(tags) {
  return tags.sort((a,b) => Math.random() - 0.5).slice(0, 1 + Math.floor(Math.random() * 3));
}

export default class Main extends Component {
  render() {
    return (
      <div className="InnerTag">
        <div className="inner-square inner-left">
          <DraggableArea1
            tags={getRandomTags(mock.leftTags)}
            build={({tag}) => (
              <div className="inner-tag">
                {tag.id}
              </div>
            )}
            style={{height: '55px'}}
            tagStyle={{margin: '3px'}}
          />
        </div>
        <div className="inner-square inner-right">
          <DraggableArea2
            tags={getRandomTags(mock.rightTags)}
            build={({tag, deleteThis}) => {
              return (
                <div className="inner-tag">
                  <img
                    className="inner-delete"
                    src={deleteBtn}
                    srcSet={`${deleteBtn2x} 2x`}
                    onMouseDown={(e) => {
                      this.clientX = e.clientX;
                      this.clientY = e.clientY;
                    }}
                    onMouseUp={(e) => {
                      if (this.clientX - e.clientX < 2 & this.clientY - e.clientY < 2) {
                        deleteThis();
                      }
                    }}
                  />
                  {tag.id}
                </div>
              )
            }}
            style={{height: '55px'}}
            tagStyle={{margin: '3px'}}
          />
        </div>
      </div>
    );
  }
}
