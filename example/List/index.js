import React, {Component} from 'react';

import {DraggableArea} from '../Draggable';
import deleteBtn from '../imgs/delete.png';
import deleteBtn2x from '../imgs/delete@2x.png';
import styles from './style.less';

import mock from './mock.js';

export default class List extends Component {
  constructor() {
    super();
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  handleClickAdd() {
    this.addTag({id: this.input.value , name: this.input.value});
    this.input.value = '';
  }

  render() {
    return (
      <div className="List">
        <div className="main">
          <DraggableArea
            isList
            initialTags={mock.tags}
            render={({tag, deleteThis}) => (
              <div className="row">
                <img
                  className="delete"
                  src={deleteBtn}
                  srcSet={`${deleteBtn2x} 2x`}
                  onClick={deleteThis}
                />
                {tag.name}
              </div>
            )}
            getAddTagFunc={addTag => this.addTag = addTag}
            onChange={(tags) => console.log(tags)}
          />
        </div>
        <div className="inputs">
          <input ref={r => this.input = r} />
          <button onClick={this.handleClickAdd}>Add</button>
        </div>
      </div>
    );
  }
}