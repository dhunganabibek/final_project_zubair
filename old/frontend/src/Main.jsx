import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import CustomerHome from './modules/home/customer';
import ManagerHome from './modules/home/manager';
import Ticket from './modules/ticket';
import Order from './modules/order';
import { routes, exempted } from './common/constants/routes';

const styles = {
  content: {
    marginTop: 90,
  },
};

class Main extends React.PureComponent {
  componentDidUpdate() {
    const { history } = this.props;
    const isExemptedUrl = exempted.includes(history.location.pathname);
    if (!isExemptedUrl && !this.isAuthenticated(history.location.pathname)) {
      history.push('/');
    }
  }

  isAuthenticated = (path) => {
    const { userType } = this.props;
    return routes[userType]?.map((route) => route.path).includes(path);
  };

  render() {
    const { classes, isLoggedIn } = this.props;
    return (
      <div className={classes.content}>
        {!isLoggedIn && <Route exact path="/" component={CustomerHome} />}
        {isLoggedIn
          && (
          <>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/ticket" component={Ticket} />
            <Route exact path="/tickets" component={ManagerHome} />
            <Route exact path="/dashboard" component={CustomerHome} />
          </>
          )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const isLoggedIn = !!(state?.login?.user && state.login.user._id);
  return { isLoggedIn };
};
export default withRouter(withStyles(styles)(connect(mapStateToProps)(Main)));
