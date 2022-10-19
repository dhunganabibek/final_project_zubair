import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import { red } from '@material-ui/core/colors';

import { logout, loginDialogOpen } from '../../../modules/login/actions';

const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 10,
  },
  super: {
    fontSize: 10,
    marginRight: 20,
    color: red[50],
  },
  logoName: {
    fontFamily: 'fantasy',
    display: 'inline-block',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  textOnTheme: {
    color: theme.palette.common.white,
  },
});
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
      anchorEl: null,
    };
  }

  openMenu = (e) => {
    this.setState({ isMenuOpen: true, anchorEl: e.currentTarget });
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  logout = () => {
    const { dispatch } = this.props;
    this.closeMenu();
    dispatch(logout());
  };

  doLogin = () => {
    const { dispatch } = this.props;
    this.closeMenu();
    dispatch(loginDialogOpen({ isDialogOpen: true, isEmployee: false }));
  };

  doEmployeeLogin = () => {
    const { dispatch } = this.props;
    this.closeMenu();
    dispatch(loginDialogOpen({ isDialogOpen: true, isEmployee: true }));
  };

  render() {
    const {
      classes, isLoggedIn, handleDrawerOpen, open, history,
    } = this.props;
    const { isMenuOpen, anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={() => { handleDrawerOpen(true); }}
              color="inherit"
              aria-label="menu"
            >
              {(isLoggedIn && !open) && <MenuIcon />}
            </IconButton>
            <Typography variant="h6" className={classes.title} onClick={() => { history.push('/'); }}>
              <div className={classes.logoName}>
                Computeronics
                <sup className={classes.super}>IT solution</sup>
              </div>
              {/* <div style={{display: 'inline-block'}}><CallIcon />7010628399</div> */}
            </Typography>
            {!isLoggedIn ? (
              <>
                <IconButton
                  edge="end"
                  ref={this.menu}
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={this.openMenu}
                >
                  <Typography variant="h6" fontSize="small">
                    Login
                  </Typography>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="menu-appbar"
                  open={isMenuOpen}
                  onClose={this.closeMenu}
                >
                  <MenuItem onClick={this.doLogin}>
                    <Person className={classes.icon} />
                    {' '}
                    Customer
                  </MenuItem>
                  <MenuItem onClick={this.doEmployeeLogin}>
                    <SupervisorAccountIcon className={classes.icon} />
                    {' '}
                    Manager
                  </MenuItem>
                </Menu>
              </>
            )
              : (
                <Button
                  variant="text"
                  onClick={this.logout}
                  className={classes.textOnTheme}
                  endIcon={<ExitToAppIcon />}
                >
                  Logout
                </Button>
              )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(connect()(Header)));
