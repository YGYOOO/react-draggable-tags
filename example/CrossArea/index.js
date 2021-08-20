import React, {Component} from 'react';

import {DraggableAreasGroup} from '../Draggable';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';

import styles from './style.less';

import mock from './mock.js';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea('area1');
const DraggableArea2 = group.addArea('area2');


export default class CrossArea extends Component {
  constructor() {
    super();
    this.state = {
      leftTags: mock.leftTags,
      rightTags: mock.rightTags
    }
  }

  handleClickDelete(tag) {
    const rightTags = this.state.rightTags.filter(t => tag.id !== t.id);
    this.setState({rightTags});
  }


  render() {
    return (
      <div className="CrossArea">
        <div className="square left">
          <DraggableArea1
            tags={this.state.leftTags}
            render={({tag}) => (
              <div className="tag">
                {tag.content}
              </div>
            )}
            onChange={leftTags => {
              this.setState({leftTags});
            }}
          />
        </div>
        <div className="square right">
          <DraggableArea2
            tags={this.state.rightTags}
            render={({tag}) => (
              <div className="tag">
                <img
                  className="delete"
                  src={deleteBtn}
                  srcSet={`${deleteBtn2x} 2x`}
                  onClick={() => this.handleClickDelete(tag)}
                />
                {tag.content}
              </div>
            )}
            onChange={rightTags => {
              this.setState({rightTags});
            }}
          />
        </div>
      </div>
    );
  }
}