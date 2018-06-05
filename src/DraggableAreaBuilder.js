import React from 'react';
import ReactDOM from "react-dom";
import { fromJS, List, is } from 'immutable';

import styles from './style.less';

const isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

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
      this.dragStart = {};
      this.tagChanged = false;
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

    componentDidUpdate(prevProps, {tags}) {
      this.tagChanged = this.tagChanged || this.state.tags.some((tag, i) => !tags.get(i) || tag.id !== tags.get(i).id);
    }
  
    dragElement(elmnt, id, parent) {
      const isList = this.props.isList;
      let prevX = 0, prevY = 0;
      let rect = {};

      let index;
      this.positions.forEach((p, i) => {
        if (p.id === id) index = i;
      });
    
      const dragStart = (e) => {
        // e.preventDefault();
        this.tagChanged = false;

        if (window.dragMouseDown) return;
        window.dragMouseDown = true;

        rect = this.container.getBoundingClientRect();
        e = e || window.event;
        prevX = e.clientX || e.touches[0].clientX;
        prevY = e.clientY || e.touches[0].clientY;
        elmnt.style.zIndex = 2;
        window.parentDragTag = elmnt.parentElement;
        while (window.parentDragTag && !window.parentDragTag.classList.contains('DraggableTags-tag-drag')) {
          window.parentDragTag = window.parentDragTag.parentElement;
        }
        if (window.parentDragTag) window.parentDragTag.style.zIndex = 2;
        document.addEventListener("mouseup", closeDragElement, false);
        document.addEventListener("mousemove", elementDrag, false);
        elmnt.addEventListener("touchend", closeDragElement, false);
        elmnt.addEventListener("touchcancel", closeDragElement, false);
        elmnt.addEventListener("touchmove", elementDrag, false);
  
        this.positions.forEach((p, i) => {
          if (p.id === id) index = i;
        });
      }

      const elementDrag = (e) => {
        if (isMobile) this.container.style.overflowY = 'visible';
        // Prevent scrolling on mobile devices
        e.type === 'touchmove' &&  e.preventDefault();

        // Figure out the new position of tag
        e = e || window.event;
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;
        let movedX = clientX - prevX;
        let movedY = clientY - prevY;
        prevX = clientX;
        prevY = clientY;
        let t = elmnt.offsetTop + movedY;
        let l = elmnt.offsetLeft + movedX;
        elmnt.style.top = t + "px";
        elmnt.style.left = l + "px";

        
        let baseCenterTop= parent.offsetTop + elmnt.offsetHeight / 2;
        let baseCenterLeft = parent.offsetLeft + elmnt.offsetWidth / 2;
        // The center position of the tag
        let ctop = baseCenterTop + t;
        let cleft = baseCenterLeft + l;
  
        let i; // safari 10 bug
        // Check if the tag could be put into a new position
        for (i = 0; i < this.positions.length - 1; i++) {
          // Do not check its left-side space and right-side space
          if ((index !== i || (index === this.positions.length - 2 && i === this.positions.length - 2)) && !(index - 1 === i && i !== 0)) {
            const p1 = this.positions[i];
            const p2 = this.positions[i+1];
  
            let isHead = false;
            let isTail = false;
            let between2Tags = false;
            let endOfLine = false;
            let startOfLine = false;

            if (!isList) {
              // Is not "list view"
              if (
                // Head of tag list
                i === 0 &&
                ctop > p1.top &&
                ctop < p1.bottom &&
                cleft < p1.left + 8
              ) isHead = true;
          
              if (
                // Tail of tag list
                i === this.positions.length - 2 && ((
                ctop > p2.top &&
                cleft > p2.left - 8) || ctop > p2.bottom)
              ) isTail = true;
  
              if (
                // Between two tags
                ctop > p1.top &&
                ctop < p1.bottom &&
                cleft > p1.right - 8 &&
                cleft < p2.left + 8
              ) between2Tags = true;
  
              if (
                // Start of line
                ctop > p2.top &&
                ctop < p2.bottom &&
                cleft < p2.left + 8 &&
                p1.top < p2.top
              ) startOfLine = true;
  
              if (
                // End of line
                ctop > p1.top &&
                ctop < p1.bottom &&
                cleft > p1.right - 8 &&
                p1.top < p2.top
              ) endOfLine = true;
            } else {
              // Is "list view"
              if (
                // Between two tags
                ctop < p1.bottom + 6 &&
                ctop > p2.top - 6
              ) between2Tags = true;

              if (
                // Head of tag list
                i === 0 &&
                ctop < p1.top + 4
              ) isHead = true;

              if (
                // Tail of tag list
                i === this.positions.length - 2 &&
                ctop > p2.bottom - 4
              ) isTail = true;
            }

            if (
              (!isList && (isHead || isTail || between2Tags || startOfLine || endOfLine))
              ||
              (isList && (isHead || isTail || between2Tags))
            ) {
              let cur = this.state.tags.get(index);
              let tags = this.state.tags.splice(index, 1);
              if ((index < i || isHead) && !isTail) {
                tags = tags.splice(i, 0, cur);
                index = i;
              } else {
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
  
      const closeDragElement = (e) => {
        if (isMobile) this.container.style.overflowY = 'auto';
        
        window.dragMouseDown = false;

        document.removeEventListener("mouseup", closeDragElement, false);
        document.removeEventListener("mousemove", elementDrag, false);
        elmnt.removeEventListener("touchend", closeDragElement, false);
        elmnt.removeEventListener("touchcancel", closeDragElement, false);
        elmnt.removeEventListener("touchmove", elementDrag, false);

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
        if (this.tagChanged  && this.props.onChange) {
          this.tagChanged  = false;
          this.props.onChange(this.state.tags.toJS());
        }
      }
  
      elmnt.addEventListener("mousedown", dragStart, false);
      elmnt.addEventListener("touchstart", dragStart, false);
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
        this.setTags(tags, () => {
          this.props.onChange && this.props.onChange(this.state.tags.toJS());
        });
      }
    }

  
    render() {
      let {render, build, style, className, isList, tagMargin = '5px', tagStyle} = this.props;
      if (!render) render = build;
      const tags = this.state.tags.toJS().map((tag) => (
        <div
          key={tag.id}
          className="DraggableTags-tag"
          ref={(target) => {
            this.tagEles[tag.id] = target;
          }}
          style={isList ? {display: 'block', ...tagStyle} : tagStyle}
        >
          <div 
            className="DraggableTags-tag-drag"
            ref={(target) => this.draggableTagEles[tag.id] = target}
          >
            {render({tag, deleteThis: this.buildDeleteTagFunc(tag)})}
          </div>
          <div style={{opacity: 0, overflow: 'hidden'}}>
            {render({tag, deleteThis: this.buildDeleteTagFunc(tag)})}
          </div>
        </div>
      ))
      return (
        <div
          ref={r => this.container = r}
          className={`DraggableTags ${className || ''}`}
          style={isMobile ? { overflowY: 'auto', ...style} : style}
        >
        {
          // To prevent body scroll on mobile device when dragging tags
          isMobile ? (<div style={{height: '101%'}}>{tags}</div>) : tags
        }
        </div>
      );
    }
  }
} 