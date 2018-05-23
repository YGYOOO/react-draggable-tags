import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../../src/index';

import styles from './style.less';

import mock from './mock.js';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      tags: mock.tags,
    };
  }

  render() {
    return (
      <div className="main">
        <DraggableArea
          tags={this.state.tags}
          build={tag => (
            <div className="tag">
              {tag.id}
            </div>
          )}
          style={{height: '231px'}}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
