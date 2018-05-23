import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../../../src/index';
import deleteBtn from '../../imgs/delete.png';
import deleteBtn2x from '../../imgs/delete@2x.png';

import styles from './style.less';

import mock from './mock.js';


const getRandomTags = function(tags) {
  return tags.sort((a,b) => Math.random() - 0.5).slice(0, 1 + Math.floor(Math.random() * 3));
}

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      // random tags
      leftTags: getRandomTags(mock.leftTags),
      rightTags: getRandomTags(mock.rightTags),
    };

    const group = new DraggableAreasGroup();
    this.DraggableArea1 = group.addArea();
    this.DraggableArea2 = group.addArea();
  }

  handleClickDelete(id) {
    let rightTags = this.state.rightTags.filter(tags => tags.id !== id);
    this.setState({rightTags})
  }

  render() {
    return (
      <div className="inner">
        <div className="inner-square inner-left">
          <this.DraggableArea1
            tags={ this.state.leftTags}
            build={tag => (
              <div className="inner-tag">
                {tag.id}
              </div>
            )}
            onChange={(leftTags) => this.setState({leftTags})}
            style={{height: '55px'}}
            tagStyle={{margin: '3px'}}
          />
        </div>
        <div className="inner-square inner-right">
          <this.DraggableArea2
            tags={this.state.rightTags}
            build={(tag) => {
              return (
                <div className="inner-tag">
                  <img
                    className="inner-delete"
                    src={deleteBtn}
                    srcSet={`${deleteBtn2x} 2x`}
                    onClick={() => this.handleClickDelete(tag.id)}
                  />
                  {tag.id}
                </div>
              )
            }}
            style={{height: '55px'}}
            tagStyle={{margin: '3px'}}
            onChange={(rightTags) => this.setState({rightTags})}
          />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(
//   <Main />,
//   document.getElementById('root')
// );
