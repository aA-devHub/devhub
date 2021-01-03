import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';
import Photo from './Photo';
import arrayMove from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// import { photos } from './photos';

/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

export default function MasonWall({ images }) {
  const [items, setItems] = useState(images);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div>
      <SortableGallery
        style={{ maxHeight: 800 }}
        items={items}
        onSortEnd={onSortEnd}
        axis={'xy'}
      />
    </div>
  );
}
