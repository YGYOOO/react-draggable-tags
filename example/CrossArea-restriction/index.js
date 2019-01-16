import React, {Component} from 'react';

import {DraggableAreasGroup} from '../Draggable';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';

import styles from './style.less';

import {correct, wrong} from './icons';

import mock from './mock.js';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea('area1');
const DraggableArea2 = group.addArea('area2');


export default class CrossAreaRestriction extends Component {
  constructor() {
    super();
    this.state = {
      leftTags: mock.leftTags,
      rightTags: mock.rightTags,
    }
  }


  render() {
    return (
      <div className="CrossArea-restriction">
        <div className="square">
          <DraggableArea1
            tags={this.state.leftTags}
            render={({tag}) => (
              <div className="tag">
                {tag.content}
              </div>
            )}
            onChange={(leftTags, {fromArea, toArea}) => {
              console.log(fromArea); // {id: "area2", tag: {…}}
              if (fromArea.id === 'area2') {
                this.setState({leftTags: this.state.leftTags});
              } else {
                this.setState({leftTags});
              }
            }}
          />
        </div>
        <div className="middle">
          <div className="arrow-right">
            <div>
              →
            </div>
            {/* {correct} */}
          </div>
          <div className="arrow-left">
            <div>←</div>
            {wrong}
          </div>
        </div>
        <div className="square">
          <DraggableArea2
            tags={this.state.rightTags}
            render={({tag}) => (
              <div className="tag">
                {tag.content}
              </div>
            )}
            onChange={(rightTags, {fromArea, toArea}) => {
              if (toArea.id === 'area1') {
                this.setState({rightTags: this.state.rightTags});
              } else {
                this.setState({rightTags});
              }
            }}
          />
        </div>
      </div>
    );
  }
}