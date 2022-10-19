import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { withStyles, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';
import { loginDialogOpen } from '../../../login/actions';
import windowsImage from '../../../../images/windows.jpg';
import styles from '../style';

class RaiseTicketCard extends React.Component {
  componentDidUpdate(prevProps) {
    const { isLoggedIn, history, dispatch } = this.props;
    if (prevProps.isRaiseTicket && (prevProps.isLoggedIn !== isLoggedIn) && !prevProps.isLoggedIn) {
      history.push('/ticket');
    }
    if ((prevProps.isLoggedIn !== isLoggedIn) && prevProps.isLoggedIn) {
      dispatch(loginDialogOpen({
        isDialogOpen: false, isEmployee: false, isRaiseTicket: false, isOrder: false,
      }));
      history.push('/');
    }
  }

  routeToTicket = () => {
    const { isLoggedIn, history, dispatch } = this.props;
    if (!isLoggedIn) {
      dispatch(loginDialogOpen({
        isDialogOpen: true, isEmployee: false, isRaiseTicket: true, isOrder: false,
      }));
    } else {
      history.push('/ticket');
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={windowsImage} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Get your issue resolved on windows
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="large"
            variant="contained"
            onClick={this.routeToTicket}
            color="primary"
            className={classes.fullButton}
          >
            Raise Ticket
          </Button>
        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  const isRaiseTicket = state?.login?.loginDialogData?.isRaiseTicket;
  const isLoggedIn = !!(state?.login?.user && state.login.user._id);
  return { isRaiseTicket, isLoggedIn };
};
export default withStyles(styles)(withRouter(connect(mapStateToProps)(RaiseTicketCard)));
