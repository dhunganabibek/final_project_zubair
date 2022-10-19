import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CustomDialog from "../../common/components/CustomDialog";
import { getAccessToken, verifyOtp, loginDialogOpen } from "./actions";
import styles from "./style";
import Utils from "../../utils";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      contact: "",
      otp: "",
      password: "",
      isDisabled: true,
      errors: {
        contact: {
          regEx: /(^[0-9]{10}$)|(^[0][0-9]{10}$)/,
          error: false,
          message:
            "Field must contain 10 digit numeric data or 11 digit if starts with zero",
        },
      },
    };
    this.requiredFields = ["contact"];
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.open && !nextProps.isShowOtp) {
      const { errors } = this.state;
      Object.keys(errors).forEach((key) => {
        errors[key].error = false;
      });
      this.setState({
        contact: "",
        password: "",
        otp: "",
        isDisabled: true,
        errors,
      });
    }
  }

  validateInputs = (name, value) => {
    const { errors } = this.state;
    if (!errors[name]) return;
    const { regEx } = errors[name];
    const error = !regEx.test(value.trim());
    this.setState({
      errors: { ...errors, [name]: { ...errors[name], error } },
    });
  };

  handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    const { isEmployee, isShowOtp } = this.props;
    const { contact, password } = this.state;
    this.setState({ [name]: value }, () => {
      let isDisabled = true;
      if (isEmployee && contact && password) {
        isDisabled = false;
      } else if (contact || isShowOtp) {
        isDisabled = false;
      }
      this.validateInputs(name, value);
      this.setState({ isDisabled });
    });
  };

  loginAction = () => {
    console.log(data, "======================");
    const { contact, otp, password, errors } = this.state;
    if (
      Utils.validateEmptyFields(this.requiredFields, this.state) ||
      Utils.validateFieldErrors(errors)
    ) {
      return;
    }
    const { isEmployee, dispatch, isShowOtp } = this.props;
    if (isEmployee) {
      const data = { contact, isEmployee, password };
      dispatch(getAccessToken(data));
      return;
    }
    const action = isShowOtp ? verifyOtp : getAccessToken;
    const data = isShowOtp ? { contact, otp } : { contact };

    dispatch(action(data));
  };

  render() {
    const { isDisabled, contact, errors, otp, password } = this.state;
    const {
      isShowOtp,
      dispatch,
      isEmployee,
      classes,
      isIncorrectOtp,
      isIncorrectPassword,
      isDialogOpen,
    } = this.props;
    return (
      <CustomDialog
        open={isDialogOpen}
        title="Login"
        actions={
          <>
            <Button
              onClick={() => {
                dispatch(loginDialogOpen({ isDialogOpen: false }));
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.loginAction}
              disabled={isDisabled}
              color="primary"
            >
              Login
            </Button>
          </>
        }
        content={
          <>
            {!isShowOtp ? (
              <TextField
                autoFocus
                error={errors.contact.error || isIncorrectPassword}
                helperText={
                  errors?.contact?.error ? errors.contact.message : ""
                }
                className={classes.inputWrapper}
                margin="dense"
                value={contact}
                onChange={this.handleChange}
                name="contact"
                variant="outlined"
                label="Enter your contact"
                type="text"
                fullWidth
              />
            ) : (
              <TextField
                autoFocus
                error={isIncorrectOtp}
                helperText={isIncorrectOtp && "OTP is incorrect"}
                className={classes.inputWrapper}
                margin="dense"
                value={otp}
                onChange={this.handleChange}
                name="otp"
                variant="outlined"
                label="Enter OTP"
                type="text"
                fullWidth
              />
            )}
            {isEmployee && (
              <TextField
                className={classes.inputWrapper}
                autoFocus
                error={isIncorrectPassword}
                helperText={
                  isIncorrectPassword && "Username or password is not correct"
                }
                margin="dense"
                value={password}
                onChange={this.handleChange}
                name="password"
                variant="outlined"
                label="Enter Password"
                type="password"
                fullWidth
              />
            )}
          </>
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  const isShowOtp = !!(
    state?.login?.user?.error &&
    (state?.login?.user?.userNotFound || state?.login?.user?.incorrectOtp)
  );
  const isIncorrectOtp = !!(
    state?.login?.user?.error && state?.login?.user?.incorrectOtp
  );
  const isIncorrectPassword = !!(
    state?.login?.user?.error && state?.login?.user?.incorrectPassword
  );
  return {
    isShowOtp,
    isIncorrectOtp,
    isIncorrectPassword,
    isDialogOpen: state?.login?.loginDialogData?.isDialogOpen,
    isEmployee: state?.login?.loginDialogData?.isEmployee,
  };
};
const LoginConnect = connect(mapStateToProps)(Login);
export default withStyles(styles)(LoginConnect);
