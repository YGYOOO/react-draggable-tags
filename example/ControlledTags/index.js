import React, {Component} from 'react';
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../../src/index';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';
import styles from './style.less';

import mock from './mock.js';

export default class ControlledTags extends Component {
  constructor() {
    super();
    this.state = {
      tags: mock.tags,
    };
  }

  handleClickDelete(tag) {
    const tags = this.state.tags.filter(t => tag.id !== t.id);
    this.setState({tags})
  }

  handleClickAdd() {
    const tags = this.state.tags.slice();
    tags.push({id: this.input.value , name: this.input.value});
    this.setState({tags});
    this.input.value = '';
  }

  render() {
    return (
      <div className="ControlledTags">
        <div className="main">
          <DraggableArea
            tags={this.state.tags}
            build={({tag}) => {
              return (
                <div className="tag">
                  <img
                    className="delete"
                    src={deleteBtn}
                    srcSet={`${deleteBtn2x} 2x`}  
                    onClick={() => this.handleClickDelete(tag)}
                  />
                  {tag.name}
                </div>
              )
            }}
            style={{height: '231px'}}
            onChange={(tags) => this.setState({tags})}
          />
        </div>
        <div className="inputs">
          <input ref={r => this.input = r} />
          <button onClick={this.handleClickAdd.bind(this)}>Add</button>
        </div>
      </div>
    );
  }
}