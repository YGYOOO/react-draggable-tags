import React from 'react';
import ReactDOM from "react-dom";
import { fromJS, List, is } from 'immutable';

import styles from './style.less';


export default function buildDraggableArea({isInAnotherArea = () => {}, passAddFunc = () => {}} = {}) {
  return class DraggableArea extends React.Component {
    constructor() {
      super();
      this.state = {
        tags: List([]),
      }
      
      this.draggableTagEles = {};
      this.tagEles = {};
      this.positions = [];
      this.rect = {};
    }

    componentDidMount() {
      if (this.props.initialTags) {
        this.setTags(List(this.props.initialTags));
      } else {
        this.setTags(List(this.props.tags));
      }

      passAddFunc(this.container, this.addTag.bind(this));
      this.props.getAddTagFunc && this.props.getAddTagFunc(this.addTag.bind(this));
    }
  
    componentWillReceiveProps({tags}) {
      if (!tags) return;
      if (tags.length !== this.props.tags.length || tags.some((tag, i) => tag.id !== this.state.tags.get(i).id)) {
        this.setTags(List(tags));
      }
    }
  
    dragElement(elmnt, id, parent) {
      let prevX = 0, prevY = 0;
      let rect = {};

      let index;
      this.positions.forEach((p, i) => {
        if (p.id === id) index = i;
      });
      // let shouldCheck = true;
    
      const dragMouseDown = (e) => {
        if (window.dragMouseDown) return;
        window.dragMouseDown = true;

        rect = this.container.getBoundingClientRect();
        e = e || window.event;
        prevX = e.clientX;
        prevY = e.clientY;
        elmnt.style.zIndex = 2;
        window.parentDragTag = elmnt.parentElement;
        while (window.parentDragTag && !window.parentDragTag.classList.contains('DraggableTags-tag-drag')) {
          window.parentDragTag = window.parentDragTag.parentElement;
        }
        if (window.parentDragTag) window.parentDragTag.style.zIndex = 2;
    
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
  
        this.positions.forEach((p, i) => {
          if (p.id === id) index = i;
        });
      }
    
      const elementDrag = (e) => {
        // if (!shouldCheck) return;
  
        // tag跟随鼠标移动
        e = e || window.event;  
        let movedX = e.clientX - prevX;
        let movedY = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        let t = elmnt.offsetTop + movedY;
        let l = elmnt.offsetLeft + movedX;
        elmnt.style.top = t + "px";
        elmnt.style.left = l + "px";
  
        // 该tag拖动前中心的坐标
        let baseCenterTop= parent.offsetTop + elmnt.offsetHeight / 2;
        let baseCenterLeft = parent.offsetLeft + elmnt.offsetWidth / 2;
        // 当前中心坐标
        let ctop = baseCenterTop + t;
        let cleft = baseCenterLeft + l;
  
        let i; // safari10 bug
        // 依次检查当前中心坐标是否在任何两个tag间的空隙中、行首、行尾、队头、队尾
        for (i = 0; i < this.positions.length - 1; i++) {
          // 不检查当前tag的左邻或右邻空隙
          if ((index !== i || (index === this.positions.length - 2 && i === this.positions.length - 2)) && !(index - 1 === i && i !== 0)) {
            const p1 = this.positions[i];
            const p2 = this.positions[i+1];
  
            let isHead = false;
            let isTail = false;
            if (
              // 队头
              i === 0 &&
              ctop > p1.top &&
              ctop < p1.bottom &&
              cleft < p1.left + 8
            ) isHead = true;
        
            if (
              // 队尾
              i === this.positions.length - 2 && ((
              ctop > p2.top &&
              cleft > p2.left - 8) || ctop > p2.bottom)
            ) isTail = true;
            if ((
                // 两个tag之间
              ctop > p1.top &&
              ctop < p1.bottom &&
              cleft > p1.right - 8 && // 判断范围稍微大一些更加友好
              cleft < p2.left + 8
            ) || (
              // 行尾
              parent.offsetTop === p1.top && (
              ctop > p1.top &&
              ctop < p1.bottom &&
              cleft > p1.right - 8 &&
              p1.top < p2.top)
            ) || (
              // 行首
              ctop > p2.top &&
              ctop < p2.bottom &&
              cleft < p2.left + 8 &&
              p1.top < p2.top
            ) || isHead || isTail
            ) {
              // shouldCheck = false;
              // 当前tag
              let cur = this.state.tags.get(index);
              let tags = this.state.tags.splice(index, 1);
              if ((index < i || isHead) && !isTail) {
                tags = tags.splice(i, 0, cur);
                index = i;
              }
              else {
                tags = tags.splice(i+1, 0, cur); 
                index = i + 1;
              }
              this.positions = [];
              const prevBaseTop = this.tagEles[cur.id].offsetTop;
              const prevBaseLeft = this.tagEles[cur.id].offsetLeft;
  
              this.setState({tags}, () => {
                let curBaseTop;
                let curBaseLeft;
                tags.forEach((t, i) => {
                  const tag = this.tagEles[t.id];
                  if (i === index) {
                    curBaseLeft = tag.offsetLeft;
                    curBaseTop= tag.offsetTop;
                  }
                  this.positions.push({
                    id: t.id,
                    top: tag.offsetTop, 
                    left: tag.offsetLeft,
                    bottom: tag.offsetTop + tag.offsetHeight,
                    right: tag.offsetLeft + tag.offsetWidth,
                  });
                });
  
                // 根据不同情况计算移动后的坐标
                if (curBaseLeft > prevBaseLeft) {
                  elmnt.style.left = `${l - (curBaseLeft - prevBaseLeft)}px`;
                } else {
                  elmnt.style.left = `${l + (prevBaseLeft - curBaseLeft)}px`;
                }
                if (prevBaseTop > curBaseTop) {
                  elmnt.style.top = `${t + (prevBaseTop - curBaseTop)}px`;
                } else {
                  elmnt.style.top = `${t - (curBaseTop - prevBaseTop)}px`;
                }
              });
              break;
            }
          }
        }
      }
  
      const closeDragElement = () => {
        window.dragMouseDown = false;
        document.onmouseup = null;
        document.onmousemove = null;
        if (window.parentDragTag) window.parentDragTag.style.zIndex = 1;

        let eRect = elmnt.getBoundingClientRect();
        let x = eRect.left + eRect.width / 2;
        let y = eRect.top + eRect.height / 2;
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          if (isInAnotherArea(elmnt.getBoundingClientRect(), this.state.tags.get(index))) {
            this.positions.splice(index, 1);
            this.setState({tags: this.state.tags.splice(index, 1)}, () => {
              this.props.onChange && this.props.onChange(this.state.tags.toJS());
            });
            return;
          }
        }
        elmnt.style.top = 0;
        elmnt.style.left = 0;
        elmnt.style.zIndex = 1;
  
        this.props.onChange && this.props.onChange(this.state.tags.toJS());
      }
  
      elmnt.onmousedown = dragMouseDown;
    }

    setTags(tags, callback) {
      this.setState({tags}, () => {
        callback && callback();
        this.positions = [];
        this.state.tags.forEach((t, i) => {
          const draggableTag = this.draggableTagEles[t.id];
          const tag = this.tagEles[t.id];
          this.positions.push({
            id: t.id,
            top: tag.offsetTop, 
            left: tag.offsetLeft,
            bottom: tag.offsetTop + tag.offsetHeight,
            right: tag.offsetLeft + tag.offsetWidth,
          });
          this.dragElement(draggableTag, t.id, tag);
        });
      });
    }

    addTag(tag) {
      this.setTags(this.state.tags.push(tag), () => {
        this.props.onChange && this.props.onChange(this.state.tags.toJS());
      });
    }

    buildDeleteTagFunc(tag) {
      return () => {
        const tags = this.state.tags.filter(t => tag.id !== t.id);
        this.setTags(tags);
      }
    }
  
    render() {
      const {build, style, className, tagMargin = '5px', tagStyle} = this.props;
      return (
        <div ref={r => this.container = r} className={`DraggableTags ${className}`} style={style}>
          {
            this.state.tags.toJS().map((tag) => (
              <div
                key={tag.id}
                className="DraggableTags-tag"
                ref={(target) => {
                  this.tagEles[tag.id] = target;
                }}
                style={tagStyle}
              >
                <div className="DraggableTags-tag-drag" ref={(target) => this.draggableTagEles[tag.id] = target}>
                  {build({tag, deleteThis: this.buildDeleteTagFunc(tag)})}
                </div>
                <div style={{opacity: 0}}>
                  {build({tag, deleteThis: this.buildDeleteTagFunc(tag)})}
                </div>
              </div>
            ))
          }
        </div>
      );
    }
  }
} 