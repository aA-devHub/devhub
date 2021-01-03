import * as COLORS from '../../../colors';
import React, { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago';
import {
  fade,
  withStyles,
  InputBase,
  makeStyles,
  Avatar,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    float: 'right',
    padding: 40,
    minWidth: 400,
    maxWidth: 700,
  },

  feedback: {
    marginTop: '2rem',
    paddingLeft: '2rem',
  },
  comments: {
    marginLeft: '1rem',
    marginTop: '1rem',
  },
  commentBox: {
    display: 'flex',
    marginBottom: '1.3rem',
  },
}));
const BootstrapInput = withStyles((theme) => ({
  root: {
    width: '80%',
    marginTop: -20,
  },
  input: {
    borderRadius: 4,
    backgroundColor: '#f1f1f1',
    border: '1px solid #ced4da',
    fontSize: 16,
    height: '10px',
    padding: '10px 12px',
    marginBottom: 10,
    placeholder: 'Share your thoughts...',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${fade(COLORS.DEVBLUE, 0.25)} 0 0 0 0.2rem`,
      borderColor: COLORS.DEVBLUE,
    },
  },
}))(InputBase);

const CommentItem = ({ comment }) => {
  const cmt = {
    commenterAvatarUrl:
      'https://res.cloudinary.com/willwang/image/upload/v1608279554/26_tqjlzc.webp',
    commenter: 'Will Wang',
    body: 'great project',
    createdAt: new Date(),
  };
  const classes = useStyles();
  return (
    <div className={classes.commentBox}>
      <Avatar
        src={
          cmt.commenterAvatarUrl ||
          'https://res.cloudinary.com/willwang/image/upload/v1607723511/avatar_l9tddb.png'
        }
        style={{ marginRight: '1rem' }}
      />
      <div>
        <Typography variant="body2" style={{ fontWeight: 400 }}>
          {cmt.commenter}
        </Typography>
        <Typography variant="body2" style={{ fontWeight: 100 }}>
          {cmt.body}
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '0.3rem',
          }}
        >
          <Typography
            variant="caption"
            style={{ fontWeight: '100', color: '#8f8f8f', marginRight: '1rem' }}
          >
            about <TimeAgo date={cmt.createdAt} />
          </Typography>
        </div>
      </div>
    </div>
  );
};

function Feedback({ userId }) {
  useEffect(() => {}, []);
  const classes = useStyles();
  const [height, setHeight] = useState(1);
  const [newComment, setNewComment] = useState('');
  console.log('userId');
  // const submitComment = () => {
  // console.log('userId', userId);
  // };
  return (
    <div className={classes.root}>
      <div className={classes.feedback}>
        <label>
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Comments
          </Typography>
          <div style={{ position: 'relative' }}>
            <BootstrapInput
              placeholder="share your thoughts"
              style={{ fontWeight: '100' }}
              className={classes.inputField}
              multiline
              rows={height}
              rowsMax={5}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onFocus={() => setHeight(5)}
              onBlur={() => setHeight(1)}
            />
            <Button
              // onMouseDown={submitComment}
              variant="contained"
              color="secondary"
              disabled={!newComment}
              style={{
                zIndex: 999,
                display: height === 1 ? 'none' : '',
                position: 'absolute',
                bottom: 30,
                left: 15,
                fontSize: 10,
                height: 20,
                width: 10,
                backgroundColor: COLORS.DEVBLUE,
                color: 'white',
                fontWeight: 800,
              }}
            >
              Post
            </Button>
          </div>
        </label>
      </div>
      <div className={classes.comments}>
        <CommentItem key={1} comment={{}} />
        <Divider style={{ marginBottom: 20 }} />
        <CommentItem key={2} comment={{}} />
        <Divider style={{ marginBottom: 20 }} />
        <CommentItem key={3} comment={{}} />
        <Divider style={{ marginBottom: 20 }} />
        <CommentItem key={4} comment={{}} />
        <Divider style={{ marginBottom: 20 }} />
        <CommentItem key={5} comment={{}} />
      </div>
    </div>
  );
}

export default connect(
  (state, ownProps) => ({
    toggleDrawer: ownProps.toggleDrawer,
    comments: ownProps.comments,
  }),
  (dispatch) => ({})
)(Feedback);
