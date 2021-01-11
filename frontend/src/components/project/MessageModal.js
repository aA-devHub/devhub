import * as COLORS from '../../colors';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
  InputBase,
  Avatar,
  Typography,
  makeStyles,
  fade,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  currentUserId,
  receiverId,
  avatar,
  sendMessage,
  userName,
}) {
  const useStyles = makeStyles((theme) => ({
    baseInput: {
      margin: '0 auto',
      width: 400,
      'label + &': {
        marginTop: theme.spacing(3),
      },
      '& > input': {
        borderRadius: 4,
        backgroundColor: '#f1f1f1',
        border: '1px solid #ced4da',
        fontSize: 16,
        fontWeight: 100,
        height: '5rem',
        padding: '10px 12px',
        marginTop: 20,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
          boxShadow: `${fade(COLORS.DEVBLUE, 0.25)} 0 0 0 0.2rem`,
          borderColor: COLORS.DEVBLUE,
        },
      },
      '& > textarea': {
        borderRadius: 4,
        backgroundColor: '#f1f1f1',
        border: '1px solid #ced4da',
        fontSize: 16,
        fontWeight: 100,
        height: '5rem',
        padding: '10px 12px',
        marginTop: 20,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
          boxShadow: `${fade(COLORS.DEVBLUE, 0.25)} 0 0 0 0.2rem`,
          borderColor: COLORS.DEVBLUE,
        },
      },
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({
    imageUrl:
      'https://cdn.dribbble.com/users/2202649/avatars/normal/bebd416006c3351d4731c0c626ed9548.png?1604385482',
  });
  const [messageBody, setMessageBody] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setMessageBody('');
    const msg = {
      body: messageBody,
      to: receiverId,
    };
    sendMessage(msg);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        style={{ color: 'white', backgroundColor: COLORS.DEVBLUE }}
        onClick={handleClickOpen}
      >
        Message
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '20px auto auto 20px',
          }}
        >
          <Avatar
            src={avatar || user.imageUrl}
            style={{ width: 80, height: 80 }}
          />
          <DialogTitle id="alert-dialog-slide-title">
            TO:
            <Typography style={{ fontWeight: 800, color: COLORS.DEVBLUE }}>
              {userName}
            </Typography>
          </DialogTitle>
        </div>
        <DialogContent
          style={{
            width: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          <InputBase
            className={classes.baseInput}
            multiline={true}
            rowsMax={7}
            rows={7}
            placeholder={`send a message to ${userName}`}
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: 'auto 1rem',
          }}
        >
          <Button onClick={handleClose} color="secondary">
            <Typography>Cancel</Typography>
          </Button>
          <Button onClick={handleSubmit} color="primary">
            <Typography style={{ color: COLORS.DEVBLUE }}>Send</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
