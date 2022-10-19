import { ChangeEvent, useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { loginMenuClickedValueAction } from "../common/actions";
import { loginAction, userAction, logoutAction } from "../login/actions";
import { CUSTOMER, TICKET_MANAGER } from "../../constants/appConstants";
import { LoginPayloadModel } from "../../models/login";

const styles = {
  flexGrow: 1,
};
export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [loginPayload, setLoginPayload] = useState<LoginPayloadModel>(
    {} as LoginPayloadModel
  );
  const [isOtpDialog, setIsOtpDialog] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const loginMenuItem = useSelector((state: any) => state.loginMenuItem);
  const userData = useSelector((state: any) => state.user);

  const anchorRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const handleClose = (event: Event | React.SyntheticEvent): void => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    dispatch(userAction());
  }, []);

  useEffect(() => {
    if (userData.userNotFound) {
      setIsOtpDialog(true);
      setIsDialogOpened(false);
    } else if (userData?.data?._id) {
      setIsOtpDialog(false);
      setIsDialogOpened(false);
    }
  }, [userData]);
  function handleListKeyDown(event: React.KeyboardEvent): void {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };
  const openDialog = (userType: string): void => {
    dispatch(loginMenuClickedValueAction(userType));
    setIsDialogOpened(!isDialogOpened);
  };
  const closeDialog = (): void => {
    setIsDialogOpened(false);
  };
  const closeOtpDialog = (): void => {
    setIsOtpDialog(false);
  };
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginPayload({
      ...loginPayload,
      [name]: value,
    });
  };
  const doLogin = async () => {
    const isManager = loginMenuItem.item === TICKET_MANAGER;
    const payload = {
      contact: loginPayload.contact,
      ...(isManager ? { password: loginPayload.password } : {}),
      ...(userData?.userNotFound ? { otp: "1234" } : {}),
    };
    dispatch(loginAction(payload));
  };
  return (
    <>
      <Box sx={styles}>
        <AppBar position="static">
          <Toolbar>
            {userData?.data?._id && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h4" component="div" sx={styles}>
              Computeronics
            </Typography>
            {!userData?.data?._id ? (
              <Button color="inherit" ref={anchorRef} onClick={handleToggle}>
                Login
              </Button>
            ) : (
              <Button color="inherit" ref={anchorRef} onClick={handleLogout}>
                Logout
              </Button>
            )}
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={() => {
                            openDialog(CUSTOMER);
                          }}
                        >
                          Customer
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            openDialog(TICKET_MANAGER);
                          }}
                        >
                          Manager
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Toolbar>
        </AppBar>
      </Box>
      <Dialog open={isDialogOpened} onClose={handleClose} fullWidth>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="name"
            value={loginPayload?.contact}
            name="contact"
            label="Enter your Contact"
            type="text"
            fullWidth
            variant="standard"
          />
          {loginMenuItem.item === TICKET_MANAGER && (
            <TextField
              autoFocus
              onChange={handleChange}
              margin="dense"
              id="name"
              name="password"
              value={loginPayload?.password}
              label="Enter your Password"
              type="password"
              fullWidth
              variant="standard"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={doLogin}>Login</Button>
        </DialogActions>
      </Dialog>
      {isOtpDialog && (
        <Dialog open={isOtpDialog} onClose={handleClose} fullWidth>
          <DialogTitle>Get Otp</DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="name"
              value={loginPayload?.otp}
              name="otp"
              label="Enter your Otp"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeOtpDialog}>Cancel</Button>
            <Button onClick={doLogin}>Login</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
