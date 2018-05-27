import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Simple from './Simple';
import AddAndDelete from './AddAndDelete';
import CrossArea from './CrossArea';
import TagsInTags from './TagsInTags';
import ControlledTags from './ControlledTags';

import styles from './style.less';

class Main extends Component { 
  render() {
    return (
      <div>
        <div className="head">
          <h1>
            React Draggable Tags
          </h1>
          <h2>
            An easy and flexible component for React.
          </h2>
          <div>
            View on Github
          </div>
        </div>
        <Simple />
        <pre className="line-numbers myCode">
        <code className="language-jsx">
{`<DraggableArea
  initailTags={mock.tags}
  build={({tag}) => (
    <div className="tag">
      {tag.id}
    </div>
  )}
  style={{height: '200px'}}
  onChange={(tags) => console.log(tags)}
/>`}
        </code>
        </pre>
        <AddAndDelete />
        <CrossArea />
        <TagsInTags />
        <ControlledTags />
      </div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
