import React from 'react'; // kfdfk
import { connect } from 'react-redux';
import { Star } from '@material-ui/icons';

import * as COLORS from '../../colors';
import { addFavorite, deleteFavorite } from '../../actions/project_actions';

const mapStateToProps = (state, _ownProps) => ({
  currentUser: state.session.user,
});

// const mapDispatchToProps = (dispatch, { project: { _id: projectId } }) => ({
const mapDispatchToProps = (dispatch) => ({
  // addFavorite: () => dispatch(addFavorite(projectId)),
  addFavorite: (projectId) => dispatch(addFavorite(projectId)),

  // deleteFavorite: (projectId) => dispatch(deleteFavorite(projectId)),
  deleteFavorite: (projectId) => dispatch(deleteFavorite(projectId)),
});

const FavoriteButton = ({
  project,
  currentUser,
  deleteFavorite,
  addFavorite,
}) => {
  const isFavorite =
    currentUser &&
    currentUser.favorites &&
    currentUser.favorites.includes(project._id);

  const toggleFavorite = () => {
    if (!currentUser) return;
    if (isFavorite) deleteFavorite(project._id);
    else addFavorite(project._id);
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
