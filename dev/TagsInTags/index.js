import React, {Component} from 'react';
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../../src/index';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';

import styles from './style.less';

import mock from './mock.js';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

export default class TagsInTags extends Component {
  render() {
    return (
      <div className="TagsInTags">
        <div className="square left">
          <DraggableArea1
            tags={mock.leftTags}
            build={({tag}) => (
              <div className="tag">
                {tag.content}
              </div>
            )}
          />
        </div>
        <div className="square right">
          <DraggableArea2
            tags={mock.rightTags}
            build={({tag, deleteThis}) => {
              return (
                <div className="tag">
                  <img
                    className="delete"
                    src={deleteBtn}
                    srcSet={`${deleteBtn2x} 2x`}
                    onClick={deleteThis}
                  />
                  {tag.content}
                </div>
              )
            }}
          />
        </div>
      </div>
    );
  }
}