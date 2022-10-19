import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from '../style';
import { loginDialogOpen } from '../../../login/actions';
import desktopImage from '../../../../images/desktop.png';

class RentedItemsCard extends React.Component {
  componentDidUpdate(prevProps) {
    const { isLoggedIn, history } = this.props;
    if (prevProps.isOrder && (prevProps.isLoggedIn !== isLoggedIn) && !prevProps.isLoggedIn) {
      history.push('/order');
    }
  }

  routeToOrder = () => {
    const { isLoggedIn, history, dispatch } = this.props;
    if (!isLoggedIn) {
      dispatch(loginDialogOpen({
        isDialogOpen: true, isEmployee: false, isOrder: true, isRaiseTicket: false,
      }));
    } else {
      history.push('/order');
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={desktopImage} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Order System/Accessories on rent
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={this.routeToOrder}
            className={classes.fullButton}
          >
            Order
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const isLoggedIn = !!(state?.login?.user && state.login.user._id);
  const isOrder = state?.login?.loginDialogData?.isOrder;
  return { isLoggedIn, isOrder };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps)(RentedItemsCard)));
