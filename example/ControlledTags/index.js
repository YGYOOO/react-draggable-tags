import React, {Component} from 'react';
import { fromJS } from 'immutable';

import {DraggableArea, DraggableAreasGroup} from '../Draggable';
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
    this.onChange = this.onChange.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickSort = this.handleClickSort.bind(this);
  }

  onChange(tags) {
    console.log(tags)
    tags = tags.map((t, i) => {
      if (this.state.tags[i].id !== t.id) {
        return {...t, positionChangedTimes: t.positionChangedTimes + 1}
      }
      return t;
    });
    this.setState({tags})
  }

  handleClickDelete(tag) {
    const tags = this.state.tags.filter(t => tag.id !== t.id);
    this.setState({tags})
  }

  handleClickAdd() {
    const tags = this.state.tags.slice();
    tags.push({id: tags[tags.length - 1].id + 1 , name: this.input.value});
    this.setState({tags});
    this.input.value = '';
  }

  handleClickSort() {
    const tags = this.state.tags.sort(() => Math.random() > .5);
    this.setState({tags})
  }

  render() {
    return (
      <div className="ControlledTags">
        <div className="main">
          <DraggableArea
            tags={this.state.tags}
            build={({tag}) => (
              <div className="tag">
                <img
                  className="delete"
                  src={deleteBtn}
                  srcSet={`${deleteBtn2x} 2x`}  
                  onClick={this.handleClickDelete}
                />
                {tag.name}
              </div>
            )}
            onChange={this.onChange}
          />
        </div>
        <div className="inputs">
          <input ref={r => this.input = r} />
          <button onClick={this.handleClickAdd}>Add</button>
          <button onClick={this.handleClickSort}>Random Sort</button>
        </div>
      </div>
    );
  }
}