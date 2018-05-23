import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../../src/index';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';

import styles from './style.less';

import mock from './mock.js';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

class Main extends Component {
  constructor() {
    super();
    this.state = {
      leftTags: mock.leftTags,
      rightTags: mock.rightTags,
    };
  }

  handleClickDelete(id) {
    let rightTags = this.state.rightTags.filter(tags => tags.id !== id);
    this.setState({rightTags})
  }

  render() {
    return (
      <div>
        <div className="square left">
          <DraggableArea1
            tags={ this.state.leftTags}
            build={tag => (
              <div className="tag">
                {tag.id}
              </div>
            )}
            onChange={(leftTags) => this.setState({leftTags})}
            style={{height: '231px'}}
          />
        </div>
        <div className="square right">
          <DraggableArea2
            tags={this.state.rightTags}
            build={(tag) => {
              return (
                <div className="tag">
                  <img
                    className="delete"
                    src={deleteBtn}
                    srcSet={`${deleteBtn2x} 2x`}
                    onClick={() => this.handleClickDelete(tag.id)}
                  />
                  {tag.id}
                </div>
              )
            }}
            style={{height: '231px'}}
            onChange={(rightTags) => this.setState({rightTags})}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
