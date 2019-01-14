import React, {Component} from 'react';

import {DraggableArea, DraggableAreasGroup} from '../../Draggable';
import deleteBtn from '../../imgs/delete.png';
import deleteBtn2x from '../../imgs/delete@2x.png';

import styles from './style.less';

import mock from './mock.js';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

const getRandomTags = function(tags) {
  return tags.sort((a,b) => Math.random() - 0.5) //random sort
  .slice(0, 1 + Math.floor(Math.random() * 3)); // random slice
}

export default class Tag extends Component {
  constructor() {
    super();

    this.state = {
      topTags: getRandomTags(mock.leftTags).map(tag => ({id: Math.random(), content: tag.content})),
      bottomTags: getRandomTags(mock.rightTags).map(tag => ({id: Math.random(), content: tag.content})),
    };
  }

  handleClickDelete(tag) {
    const bottomTags = this.state.bottomTags.filter(t => tag.id !== t.id);
    this.setState({bottomTags});
  }

  render() {
    return (
      <div className="InnerTag">
        <div className="inner-square inner-left">
          <DraggableArea1
            tags={this.state.topTags}
            render={({tag}) => (
              <div className="inner-tag">
                {tag.content}
              </div>
            )}
            onChange={topTags => this.setState({topTags})}
          />
        </div>
        <div className="inner-square inner-right">
          <DraggableArea2
            tags={this.state.bottomTags}
            render={({tag}) => {
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
                        // deleteThis();
                        this.handleClickDelete(tag);
                      }
                    }}
                  />
                  {tag.content}
                </div>
              )
            }}
            onChange={bottomTags => this.setState({bottomTags})}
          />
        </div>
      </div>
    );
  }
}
