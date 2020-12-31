import React, { Component } from 'react';

class ProjectCarouselItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level,
    };
  }

  render() {
    const className = 'item level' + this.props.level;
    return (
      <div
        className={className}
        style={{
          backgroundImage: 'url(http://lorempixel.com/400/200/)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      ></div>
    );
  }
}

export default ProjectCarouselItem;
