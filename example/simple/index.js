import React, {Component} from 'react';
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../../src/index';

import styles from './style.less';


export default class Main extends Component {
  render() {
    return (
      <div className="Simple">
        <DraggableArea
          initailTags={
            [{id: 'apple'},{id: 'watermelon'},{id: 'banana'},{ id: 'lemen'},{id: 'orange'},
            {id: 'grape'},{id: 'strawberry'},{id: 'cherry'},{id: 'peach'}]
          }
          build={({tag}) => (
            <div className="tag">
              {tag.id}
            </div>
          )}
          onChange={(tags) => console.log(tags)}
        />
      </div>
    );
  }
}
