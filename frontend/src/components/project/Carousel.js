import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Paper } from '@material-ui/core';

function Example(props) {
  var items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
  ];
  const [autoplay, setAutoplay] = useState(false);
  const Item = (props) => (
    <Paper
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1563381013529-1c922c80ac8d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)',
        height: 500,
        cursor: 'pointer',
      }}
      onMouseOver={() => setAutoplay(true)}
      onMouseOut={() => setAutoplay(false)}
    >
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );

  return (
    <Carousel
      animation="slide"
      autoPlay={autoplay}
      style={{ height: 500 }}
      interval="1500"
      indicators={false}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

export default Example;
