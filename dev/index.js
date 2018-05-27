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
            An easy, flexible, draggable tag component
          </h2>
          <a href="https://github.com/YGYOOO/react-draggable-tags">
            View on Github
          </a>
        </div>
        <div className="content">
          <h3 className="section-title">
            Installation
          </h3>
          <pre className="line-numbers myCode">
          <code className="language-jsx">
{`npm install react-draggable-tags --save`}
          </code>
          </pre>


          <h3 className="section-title">
            Simple Usage:
          </h3>
          <Simple />
          <pre className="line-numbers myCode">
          <code className="language-jsx">
{`const initailTags = [
  {id: 1, name: 'apple'}, {id: 2, name: 'watermelon'}, {id: 3, name: 'banana'},
  {id: 4,  name: 'lemen'}, {id: 5, name: 'orange'}, {id: 6, name: 'grape'},
  {id: 7, name: 'strawberry'}, {id: 8, name: 'cherry'}, {id: 9, name: 'peach'}];`}
          </code>
          </pre>
          <pre className="line-numbers myCode">
          <code className="language-jsx">
{`<div className="Simple">
  <DraggableArea
    initailTags={initailTags}
    build={({tag}) => (
      <div className="tag">
        {tag.name}
      </div>
    )}
    onChange={(tags) => console.log(tags)}
  />
</div>`}
          </code>
          </pre>


          <h3 className="section-title">
            Add Add Delete:
          </h3>
          <AddAndDelete />
          <pre className="line-numbers myCode">
          <code className="language-jsx">
{`<div className="main">
  <DraggableArea
    initailTags={mock.tags}
    build={({tag, deleteThis}) => (
      <div className="tag">
        <img
          className="delete"
          src={deleteBtn}
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
</div>`}
          </code>
          </pre>
          <pre className="line-numbers myCode">
          <code className="language-jsx">
{`handleClickAdd() {
  this.addTag({id: this.input.value , name: this.input.value});
  this.input.value = '';
}`}
          </code>
          </pre>


          <h3 className="section-title">
            Cross-Area Drag:
          </h3>
          <CrossArea />
          <pre className="line-numbers myCode">
          <code className="language-jsx">
{`<div className="square left">
  <DraggableArea1
    initailTags={mock.leftTags}
    build={({tag, deleteThis}) => (
      <div className="tag">
        {tag.id}
      </div>
    )}
    onChange={(tags) => console.log(tags)}
  />
</div>
<div className="square right">
  <DraggableArea2
    initailTags={mock.rightTags}
    build={({tag, deleteThis}) => {
      return (
        <div className="tag">
          <img
            className="delete"
            src={deleteBtn}
            onClick={deleteThis}
          />
          {tag.id}
        </div>
      )
    }}
    onChange={(tags) => console.log(tags)}
  />
</div>`}
          </code>
          </pre>

          <h3 className="section-title">
            Tags In Tags:
          </h3>
          <TagsInTags />
          <pre className="line-numbers myCode">
          <code className="language-jsx">
{`handleClickAdd() {
  this.addTag({id: this.input.value , name: this.input.value});
  this.input.value = '';
}`}
          </code>
          </pre>

          <h3 className="section-title">
            "Controlled Tags":
          </h3>
          <ControlledTags />
          <pre className="line-numbers myCode">
          <code className="language-jsx">
{`handleClickAdd() {
  this.addTag({id: this.input.value , name: this.input.value});
  this.input.value = '';
}`}
          </code>
          </pre>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
