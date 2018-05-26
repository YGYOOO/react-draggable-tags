import React, {Component} from 'react';
import ReactDOM from "react-dom";

import Simple from './Simple';
import AddAndDelete from './AddAndDelete';
import CrossArea from './CrossArea';
import ControlledTags from './ControlledTags';
import TagsInTags from './TagsInTags';

class Main extends Component { 
  render() {
    return (
      <div>
        <Simple />
        <AddAndDelete />
        <CrossArea />
        <ControlledTags />
        <TagsInTags />
      </div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
