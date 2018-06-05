import React, {Component} from 'react';
import {DraggableAreasGroup} from '../Draggable';

import Tag from './Tag';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';

import styles from './style.less';


const leftTags = [
  {id: '1', content: <Tag />}, {id: '2', content: <Tag />},
  {id: '3', content: <Tag />}, {id: '4', content: <Tag />}];
const rightTags = [
  {id: '10', content: <Tag />}, {id: '11', content: <Tag />},
  {id: '12', content: <Tag />}];

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

export default class NestedTags extends Component {
  render() {
    return (
      <div className="TagsInTags">
        <div className="square left">
          <DraggableArea1
            initialTags={leftTags}
            render={({tag}) => (
              <div className="tag">
                {tag.content}
              </div>
            )}
          />
        </div>
        <div className="square right">
          <DraggableArea2
            initialTags={rightTags}
            render={({tag, deleteThis}) => {
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