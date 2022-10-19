import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom'
import { routes } from '../../constants/routes'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      //width: theme.spacing(14),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    ...theme.mixins.toolbar,
  },
  textOnTheme: {
    color: theme.palette.common.white,
  },
  icon: {
    marginleft: 20,
    fontSize: 30,
  },
}));

export default function MiniDrawer({ open, handleDrawerOpen, contact, userType }) {
  const classes = useStyles();
  const history = useHistory()
  const routeTo = (path) => {
    history.push(path)
  }
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar} color="primary">
        <AccountCircle fontSize="large" />
        <Typography variant="body1">
          {contact}
        </Typography>
        <IconButton onClick={() => { handleDrawerOpen(false); }}>
          <ChevronLeftIcon className={classes.textOnTheme} />
        </IconButton>
      </div>
      <Divider />
      <List>
        {routes[userType].map((route, index) => (
          <ListItem button key={route.name} onClick={() => { routeTo(route.path) }}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
