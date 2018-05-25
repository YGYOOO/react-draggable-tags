import React, {Component} from 'react';
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../../src/index';

import styles from './style.less';

import mock from './mock.js';

export default class Main extends Component {
  render() {
    return (
      <div className="Simple">
        <DraggableArea
          initailTags={mock.tags}
          build={({tag}) => (
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
