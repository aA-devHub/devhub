import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ProjectCarouselItem from './project_carousel_item';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class ProjectCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      direction: '',
    };

    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }

  generateprojects() {
    var projects = [];
    var level;

    for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
      var index = i;

      if (i < 0) {
        index = this.props.projects.length + i;
      } else if (i >= this.props.projects.length) {
        index = i % this.props.projects.length;
      }

      if (this.props.projects.length === 1) {
        level = 0;
      } else if (this.props.projects.length <= 3) {
        level = this.state.active - i + 1;
      } else {
        level = this.state.active - i;
      }

      projects.push(
        <ProjectCarouselItem
          key={index}
          project={this.props.projects[index]}
          level={level}
        />
      );
    }

    return projects;
  }

  renderLeftArrow() {
    if (this.props.projects.length > 1) {
      return (
        <div className="arrow arrow-left pointer" onClick={this.leftClick}>
          <ArrowBackIosIcon style={{ height: '30px', width: '30px' }} />
        </div>
      );
    }
  }

  renderRightArrow() {
    if (this.props.projects.length > 1) {
      return (
        <div className="arrow arrow-right pointer" onClick={this.rightClick}>
          <ArrowForwardIosIcon style={{ height: '30px', width: '30px' }} />
        </div>
      );
    }
  }

  moveLeft() {
    var newActive = this.state.active;
    newActive--;
    this.setState({
      active: newActive < 0 ? this.props.projects.length - 1 : newActive,
      direction: 'left',
    });
  }

  moveRight() {
    var newActive = this.state.active;
    this.setState({
      active: (newActive + 1) % this.props.projects.length,
      direction: 'right',
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="carousel-header">
          <h1 className="carousel-title">Projects</h1>
        </div>
        <div id="project-carousel" className="noselect">
          {this.renderLeftArrow()}
          <CSSTransitionGroup
            transitionName={this.state.direction}
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
          >
            {this.generateprojects()}
          </CSSTransitionGroup>
          {this.renderRightArrow()}
        </div>
      </React.Fragment>
    );
  }
}
export default ProjectCarousel;
