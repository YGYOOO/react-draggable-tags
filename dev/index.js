import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { prism } from 'react-syntax-highlighter/styles/prism';

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
          <SyntaxHighlighter language="jsx" style={prism}>
{`npm install react-draggable-tags --save`}
          </SyntaxHighlighter>


          <h3 className="section-title">
            Simple Usage:
          </h3>
          <Simple />
          <SyntaxHighlighter language="jsx" style={prism}>
{`import {DraggableArea} from '../../src';

const initialTags = [
  {id: 1, name: 'apple'}, {id: 2, name: 'watermelon'}, {id: 3, name: 'banana'},
  {id: 4,  name: 'lemen'}, {id: 5, name: 'orange'}, {id: 6, name: 'grape'},
  {id: 7, name: 'strawberry'}, {id: 8, name: 'cherry'}, {id: 9, name: 'peach'}];`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`<div className="Simple">
  <DraggableArea
    initialTags={initialTags}
    build={({tag}) => (
      <div className="tag">
        {tag.name}
      </div>
    )}
    onChange={(tags) => console.log(tags)}
  />
</div>`}
          </SyntaxHighlighter>


          <h3 className="section-title">
            Add Add Delete:
          </h3>
          <AddAndDelete />
          <SyntaxHighlighter language="jsx" style={prism}>
{`<div className="main">
  <DraggableArea
    initialTags={initialTags}
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
          </SyntaxHighlighter>

          <SyntaxHighlighter language="jsx" style={prism}>
{`handleClickAdd() {
  this.addTag({id: this.input.value , name: this.input.value});
  this.input.value = '';
}`}
          </SyntaxHighlighter>


          <h3 className="section-title">
            Cross-Area Drag:
          </h3>
          <CrossArea />
          <SyntaxHighlighter language="jsx" style={prism}>
{`import {DraggableAreasGroup} from '../../src';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`<div className="square left">
  <DraggableArea1
    initialTags={initialTags1}
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
    initialTags={initialTags2}
    build={({tag, deleteThis}) => (
      <div className="tag">
        <img
          className="delete"
          src={deleteBtn}
          onClick={deleteThis}
        />
        {tag.id}
      </div>
    )}
    onChange={(tags) => console.log(tags)}
  />
</div>`}
          </SyntaxHighlighter>


          <h3 className="section-title">
            Tags In Tags:
          </h3>
          <TagsInTags />
          <SyntaxHighlighter language="jsx" style={prism}>
{`export default class Tag extends Component {
  render() {
    return (
      <div className="InnerTag">
        <div className="inner-square inner-left">
          <DraggableArea1
            ...
          />
        </div>
        <div className="inner-square inner-right">
          <DraggableArea2
            ...
          />
        </div>
      </div>
    );
  }
}`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`const leftTags = [
  {id: '1', content: <Tag />}, {id: '2', content: <Tag />},
  {id: '3', content: <Tag />}, {id: '4', content: <Tag />}];
const rightTags = [
  {id: '10', content: <Tag />}, {id: '11', content: <Tag />},
  {id: '12', content: <Tag />}];
  
  ...

<div className="square left">
  <DraggableArea1
    initialTags={leftTags}
    ...
  />
</div>
<div className="square right">
  <DraggableArea2
    initialTags={rightTags}
    ...
  />
</div>
`}
          </SyntaxHighlighter>


          <h3 className="section-title">
            "Controlled Tags":
          </h3>
          <ControlledTags />
          <SyntaxHighlighter language="jsx" style={prism}>
{`<div className="main">
  <DraggableArea
    // use "tags" instead of "initialTags"
    tags={this.state.tags}
    build={({tag}) => (
      <div className="tag">
        <img
          className="delete"
          src={deleteBtn}
          onClick={this.handleClickDelete}
        />
        {tag.name + ':' + tag.positionChangedTimes}
      </div>
    )}
    onChange={this.onChange}
  />
</div>
<div className="inputs">
  <input ref={r => this.input = r} />
  <button onClick={this.handleClickAdd}>Add</button>
</div>`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`handleClickDelete(tag) {
  const tags = this.state.tags.filter(t => tag.id !== t.id);
  this.setState({tags})
}

handleClickAdd() {
  const tags = this.state.tags.slice();
  tags.push({id: tags[tags.length - 1].id + 1 , name: this.input.value});
  this.setState({tags});
  this.input.value = '';
}`}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
