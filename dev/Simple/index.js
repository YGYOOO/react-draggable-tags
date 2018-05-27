import React, {Component} from 'react';
import { fromJS } from 'immutable';

import {DraggableArea} from '../../src/index';

import styles from './style.less';

const initailTags = [
  {id: 1, name: 'apple'}, {id: 2, name: 'watermelon'}, {id: 3, name: 'banana'},
  {id: 4,  name: 'lemen'}, {id: 5, name: 'orange'}, {id: 6, name: 'grape'},
  {id: 7, name: 'strawberry'}, {id: 8, name: 'cherry'}, {id: 9, name: 'peach'}];

export default class Main extends Component {
  render() {
    return (
      <div className="Simple">
        <DraggableArea
          initailTags={initailTags}
          build={({tag}) => (
            <div className="tag">
              {tag.name}
            </div>
          )}
          onChange={(tags) => console.log(tags)}
        />
      </div>
    );
  }
}
