import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CustomDialog extends React.Component {
  render() {
    const {
      open, handleClose, contentText, content, actions, title,
    } = this.props;
    return (

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
        <DialogContent>
          { contentText && <DialogContentText>{ contentText }</DialogContentText> }
          { content }
        </DialogContent>
        { actions && <DialogActions>{ actions }</DialogActions> }
      </Dialog>
    );
  }
}
export default CustomDialog;
