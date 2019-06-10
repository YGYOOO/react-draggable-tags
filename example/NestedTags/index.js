import React, {Component} from 'react';
import {DraggableAreasGroup} from '../Draggable';

import Tag from './Tag';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';

import styles from './style.less';

import mock from './mock.js';

const getRandomTags = function(tags) {
  return tags.sort((a,b) => Math.random() - 0.5) //random sort
  .slice(0, 1 + Math.floor(Math.random() * 3)) // random slice
  .map(tag => ({id: Math.random(), content: tag.content}));
}

const leftTags = [
  { id: "1", content: <Tag topTags={getRandomTags(mock.topTags)} bottomTags={getRandomTags(mock.bottomTags)} /> },
  { id: "2", content: <Tag topTags={getRandomTags(mock.topTags)} bottomTags={getRandomTags(mock.bottomTags)} /> },
  { id: "3", content: <Tag topTags={getRandomTags(mock.topTags)} bottomTags={getRandomTags(mock.bottomTags)} /> },
  { id: "4", content: <Tag topTags={getRandomTags(mock.topTags)} bottomTags={getRandomTags(mock.bottomTags)} /> }
];
const rightTags = [
  { id: "10", content: <Tag topTags={getRandomTags(mock.topTags)} bottomTags={getRandomTags(mock.bottomTags)} /> },
  { id: "11", content: <Tag topTags={getRandomTags(mock.topTags)} bottomTags={getRandomTags(mock.bottomTags)} /> },
  { id: "12", content: <Tag topTags={getRandomTags(mock.topTags)} bottomTags={getRandomTags(mock.bottomTags)} /> }
];

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

export default class NestedTags extends Component {
  constructor() {
    super();
    this.state = {
      leftTags,
      rightTags
    };
  }

  handleClickDelete(tag) {
    const rightTags = this.state.rightTags.filter(t => tag.id !== t.id);
    this.setState({rightTags});
  }

  render() {
    return (
      <div className="TagsInTags">
        <div className="square left">
          <DraggableArea1
            tags={this.state.leftTags}
            render={({tag}) => (
              <div className="tag">
                {tag.content}
              </div>
            )}
            onChange={leftTags => this.setState({leftTags})}
          />
        </div>
        <div className="square right">
          <DraggableArea2
            tags={this.state.rightTags}
            render={({tag}) => {
              return (
                <div className="tag">
                  <img
                    className="delete"
                    src={deleteBtn}
                    srcSet={`${deleteBtn2x} 2x`}
                    onClick={() => this.handleClickDelete(tag)}
                  />
                  {tag.content}
                </div>
              )
            }}
            onChange={rightTags => this.setState({rightTags})}
          />
        </div>
      </div>
    );
  }
}