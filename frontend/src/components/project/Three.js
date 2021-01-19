import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Carousel = ({ images }) => {
  // const handleDrag = (e) => e.preventDefault();
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    if (images.hero) setImgs([images.hero].concat(images.secondaries));
  }, [images]);

  const items = imgs.map((item, index) => {
    return (
      <div className="item" style={{ width: 150 + index * 100 }}>
        {index}
      </div>
      // <img
      //   className="item"
      //   src={item}
      //   onDragStart={handleDrag}
      //   alt="project images"
      //   style={{ width: 150 + index * 100 }}
      // />
    );
  });
  return <AliceCarousel infinite mouseTracking items={items} />;
};

export default Carousel;
