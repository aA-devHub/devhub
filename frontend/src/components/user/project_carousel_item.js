import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ProjectCarouselItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level,
      hovered: false,
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  generateTitle() {
    const title = this.props.project.title;

    if (title.length < 14) {
      return title;
    } else {
      return title.slice(0, 14) + '...';
    }
  }

  handleHover() {
    this.setState((prevState) => ({
      hovered: !prevState.hovered,
    }));
  }

  handleClick() {
    this.props.history.push(`/projects/${this.props.project._id}`);
  }

  render() {
    if (!this.props.project) return null;

    const className =
      'project-carousel-item level' +
      this.props.level +
      (this.state.hovered ? ' hovered pointer' : '');
    return (
      <div
        className={className}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
      >
        <h3 className="project-title">{this.generateTitle()}</h3>
        <span className="project-subtitle">
          {/* {this.props.project.description.slice(0, 30) + '...'} */}
        </span>
        <div
          className="project-image"
          style={{ backgroundImage: `url(${this.props.project.images.hero})` }}
        ></div>
      </div>
    );
  }
}

export default withRouter(ProjectCarouselItem);
