import React from 'react'; // kfdfk
import { connect } from 'react-redux';
import { Star } from '@material-ui/icons';

import * as COLORS from '../../colors';
import { addFavorite, deleteFavorite } from '../../actions/project_actions';

const mapStateToProps = (state, _ownProps) => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = (dispatch, { project: { _id: projectId } }) => ({
  addFavorite: () => dispatch(addFavorite(projectId)),
  deleteFavorite: () => dispatch(deleteFavorite(projectId)),
});

const FavoriteButton = ({
  project,
  currentUser,
  deleteFavorite,
  addFavorite,
}) => {
  const isFavorite = currentUser && currentUser.favorites.includes(project._id);

  const toggleFavorite = () => {
    if (!currentUser) return;
    if (isFavorite) deleteFavorite();
    else addFavorite();
  };

  return (
    <Star
      style={{
        color: isFavorite ? COLORS.GOLDSTAR : COLORS.GREYSTAR,
        cursor: 'pointer',
      }}
      onClick={() => toggleFavorite()}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
