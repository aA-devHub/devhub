import React from 'react';
import * as COLORS from '../../colors';
import { Star } from '@material-ui/icons';

function FavoriteButton({ project }) {
  const favoriteProject = () => {
    console.log('favorited the project');
  };
  return (
    <div>
      <Star
        style={{ color: COLORS.GOLDSTAR, cursor: 'pointer' }}
        onClick={favoriteProject}
      />
    </div>
  );
}

export default FavoriteButton;
