import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/styles/prism';


import Simple from './Simple';
import AddAndDelete from './AddAndDelete';
import CrossArea from './CrossArea';
import CrossAreaRestriction from './CrossArea-restriction';
import List from './List';
import NestedTags from './NestedTags';
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
            An easy and flexible tag component
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

          <h3 className="section-title" id="Simple">
            Simple Usage:
          </h3>
          <div className="des">
            You need to pass an "tags" array and a "render" function to DraggableArea. Each tag should have a unique id.
            (React Draggable Tags do not have default styles, you could write any style for the tags as you want)
          </div>
          <Simple />
          <SyntaxHighlighter language="jsx" style={prism}>
{`import {DraggableArea} from 'react-draggable-tags';

const initialTags = [
  {id: 1, content: 'apple'}, {id: 2, content: 'undraggable', undraggable: true}, {id: 3, content: 'banana'},
  {id: 4,  content: 'lemon'}, {id: 5, content: 'orange'}, {id: 6, content: 'grape'},
  {id: 7, content: 'strawberry'}, {id: 8, content: 'cherry'}, {id: 9, content: 'peach'}];`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`<div className="Simple">
  <DraggableArea
    tags={initialTags}
    render={({tag, index}) => (
      <div className={\`tag \${tag.undraggable ? 'undraggable' : ''}\`}>
        {tag.content}
      </div>
    )}
    onChange={tags => console.log(tags)}
  />
</div>`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="css" style={prism}>
{`.Simple {
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  width: 294px;
  height: 220px;
  padding: 5px;
}
.tag {
  margin: 3px;
  font-size: 13px;
  border: 1px dashed #cccccc;
  border-radius: 4px;
  padding: 0 8px;
  line-height: 30px;
  color: #666666;
  background: rgba(255, 255, 255, 0.7);
}
.undraggable {
  background-color: rgb(243, 243, 243);
}`}
          </SyntaxHighlighter>
          <a href="https://github.com/YGYOOO/react-draggable-tags/tree/master/example/simple">
            View code on Github
          </a>


          <h3 className="section-title" id="AddAddDelete">
            Add Add Delete:
          </h3>
          <AddAndDelete />
          <SyntaxHighlighter language="jsx" style={prism}>
{`<div className="AddAndDelete">
  <div className="main">
    <DraggableArea
      tags={this.state.tags}
      render={({tag, index}) => (
        <div className="tag">
          <img
            className="delete"
            src={deleteBtn}
            onClick={() => this.handleClickDelete(tag)}
          />
          {tag.content}
        </div>
      )}
      onChange={tags => this.setState({tags})}
    />
  </div>
  <div className="inputs">
    <input ref={r => this.input = r} />
    <button onClick={this.handleClickAdd}>Add</button>
  </div>
</div>`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`handleClickAdd() {
  const tags = this.state.tags.slice();
  tags.push({id: Math.random() , content: this.input.value});
  this.setState({tags});
  this.input.value = '';
}

handleClickDelete(tag) {
  const tags = this.state.tags.filter(t => tag.id !== t.id);
  this.setState({tags});
}`}
          </SyntaxHighlighter>
          <a href="https://github.com/YGYOOO/react-draggable-tags/tree/master/example/AddAndDelete">
            View code on Github
          </a>


          <h3 className="section-title" id="CrossAreaDrag">
            Cross-Area Drag:
          </h3>
          <CrossArea />
          <SyntaxHighlighter language="jsx" style={prism}>
{`import {DraggableAreasGroup} from 'react-draggable-tags';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`<div className="square left">
  <DraggableArea1
    tags={this.state.leftTags}
    render={({tag}) => (
      <div className="tag">
        {tag.content}
      </div>
    )}
    onChange={leftTags => this.setState({leftTags})}
  />
</div>
<div className="square right">
  <DraggableArea2
    tags={this.state.rightTags}
    render={({tag}) => (
      <div className="tag">
        <img
          className="delete"
          src={deleteBtn}
          onClick={() => this.handleClickDelete(tag)}
        />
        {tag.content}
      </div>
    )}
    onChange={rightTags => this.setState({rightTags})}
  />
</div>`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`handleClickDelete(tag) {
  const tags = this.state.tags.filter(t => tag.id !== t.id);
  this.setState({tags});
}`}
          </SyntaxHighlighter>
          <a href="https://github.com/YGYOOO/react-draggable-tags/tree/master/example/CrossArea">
            View code on Github
          </a>



          <h3 className="section-title" id="CrossAreaRestriction">
            Cross-Area Drag with Restrictions:
          </h3>
          <div className="des">
            For the following example, you can only drag tags from the left area to the right area.
          </div>
          <CrossAreaRestriction />
          <SyntaxHighlighter language="jsx" style={prism}>
{`import {DraggableAreasGroup} from 'react-draggable-tags';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea('area1');
const DraggableArea2 = group.addArea('area2');`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`<div className="square">
  <DraggableArea1
    tags={this.state.leftTags}
    render={({tag}) => (
   <div className="tag">
         {tag.content}
       </div>
  )}
    onChange={(leftTags, {fromArea, toArea}) => {
    console.log(fromArea); // {id: "area2", tag: {…}}
    if (fromArea.id === 'area2') {
      this.setState({leftTags: this.state.leftTags});
    } else {
      this.setState({leftTags});
    }
  }}
  />
</div>
....
<div className="square">
  <DraggableArea2
    tags={this.state.rightTags}
    render={({tag}) => (
   <div className="tag">
         {tag.content}
      </div>
  )}
    onChange={(rightTags, {fromArea, toArea}) => {
    if (toArea.id === 'area1') {
      this.setState({rightTags: this.state.rightTags});
    } else {
      this.setState({rightTags});
    }
  }}
  />
</div>`}
          </SyntaxHighlighter>
          <a href="https://github.com/YGYOOO/react-draggable-tags/tree/master/example/CrossArea-restriction">
            View code on Github
          </a>


          <h3 className="section-title" id="List">
            Draggable List:
          </h3>
          <List />
          <SyntaxHighlighter language="jsx" style={prism}>
{`<DraggableArea
  isList
  tags={this.state.tags}
  render={({tag}) => (
    <div className="row">
      <img
        className="delete"
        src={deleteBtn}
        onClick={() => this.handleClickDelete(tag)}
      />
      {tag.content}
    </div>
  )}
  onChange={(tags) => this.setState({tags})}
/>`}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="jsx" style={prism}>
{`handleClickAdd() {
  const tags = this.state.tags.slice();
  tags.push({id: Math.random() , content: this.input.value});
  this.setState({tags});
  this.input.value = '';
}

handleClickDelete(tag) {
  const tags = this.state.tags.filter(t => tag.id !== t.id);
  this.setState({tags});
}`}
          </SyntaxHighlighter>
          <a href="https://github.com/YGYOOO/react-draggable-tags/tree/master/example/List">
            View code on Github
          </a>


          <h3 className="section-title" id="NestedTags">
            Nested Tags:
          </h3>
          <div className="des">
            React Draggable Tags is quite flexible, you can put anything in a tag. So you could even build "nested tags" like this:
          </div>
          <NestedTags />
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
{`constructor() {
  ...
  this.state = {
    leftTags: [
      {id: '1', content: <Tag />}, {id: '2', content: <Tag />},
      {id: '3', content: <Tag />}, {id: '4', content: <Tag />}
    ],
    rightTags: ...
  };
}
  ...

<div className="square left">
  <DraggableArea1
    tags={this.state.leftTags}
    render={({tag}) => (
      <div className="tag">
        {tag.content}
      </div>
    )}
    ...
  />
</div>
<div className="square right">
  <DraggableArea2
    tags={this.state.rightTags}
    ...
  />
</div>
`}
          </SyntaxHighlighter>
          <a href="https://github.com/YGYOOO/react-draggable-tags/tree/master/example/NestedTags">
            View code on Github
          </a>
        </div>
      </div>
    );
  }
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(
  <Main />,
  root
);
