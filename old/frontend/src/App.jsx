import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Drawer from './common/components/layout/Drawer';
import Header from './common/components/layout/Header';
import Main from './Main';
import Login from './modules/login';
import { getUserDetails, loginDialogOpen } from './modules/login/actions';
import theme from './common/theme';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUserDetails());
  }

  componentDidUpdate(prevProps) {
    const { dispatch, isLoggedIn, history } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn) {
      if (!prevProps.isLoggedIn) {
        dispatch(loginDialogOpen({ isDialogOpen: false }));
      } else {
        history.replace('/');
      }
    }
  }

  handleDrawerOpen = (open) => {
    this.setState({ open });
  }

  render() {
    const { isLoggedIn, userType, contact } = this.props;
    const { open } = this.state;
    const { handleDrawerOpen } = this;
    return (
      <ThemeProvider theme={theme}>
        <Header isLoggedIn={isLoggedIn} handleDrawerOpen={handleDrawerOpen} open={open} />
        {isLoggedIn && <Drawer handleDrawerOpen={handleDrawerOpen} open={open} contact={contact} userType={userType} />}
        <Main userType={userType} />
        <Login
          isLoggedIn={isLoggedIn}
        />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const isLoggedIn = !!(state?.login?.user && state.login.user._id);
  const contact = state?.login?.user && state.login.user.contact;
  const userType = state?.login?.user && state.login.user.userType;
  return { isLoggedIn, contact, userType };
};
export default withRouter(connect(mapStateToProps)(App));
