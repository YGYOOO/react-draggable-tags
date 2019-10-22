import React, {Component} from 'react';

import {DraggableArea} from '../Draggable';

import styles from './style.less';

const fruits = ['apple', 'olive', 'banana', 'lemon', 'orange', 'grape'];
class Fruit extends Component {
  constructor() {
    super();
    this.state = {
      fruitIndex: 0,
    }

    this.changeFruit = this.changeFruit.bind(this);
  }

  changeFruit() {
    this.setState({fruitIndex: ++this.state.fruitIndex % 6})
  }

  render() {
    return (
      <div className="tag3">
        <button onClick={this.changeFruit}>Change Fruit</button>
        <div>{fruits[this.state.fruitIndex]}</div>
      </div>
    );
  }
}

const initialTags = [
  {id: 1, content: <div className="tag">apple</div>}, {id: 2, content: <div className="tag"><input style={{width:50}} /></div>},
  {id: 3, content: <div className="tag2">banana</div>}, {id: 4,  content: <div className="tag">lemon</div>},
  {id: 5, content: <Fruit />}, {id: 6, content: <div className="tag">grape</div>}
];

export default class Main extends Component {
  render() {
    return (
      <div className="Customized">
        <DraggableArea
          tags={initialTags}
          render={({tag}) => tag.content}
          onChange={tags => console.log(tags)}
        />
      </div>
    );
  }
}
