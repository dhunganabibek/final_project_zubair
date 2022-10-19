import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Typography, TextField,
  OutlinedInput, Select, Box, withStyles, FormControl,
} from '@material-ui/core';

import { submitTicketData } from './actions';
import styles from './style';
import * as DB_CONSTANTS from '../../common/constants/dbConstants';

class Ticket extends React.Component {
  constructor() {
    super();
    this.state = {
      deviceType: '',
      issueIn: '',
      issueType: '',
      replacementType: '',
      softwareName: '',
      description: '',
      ui: {
        showIssueType: false,
        showSoftwareName: false,
        showHardwareType: false,
      },
    };
  }

  handleChange = (event) => {
    const { state } = this;
    const { name } = event.target;
    const { value } = event.target;
    if (name === 'issueIn') {
      let showIssueType = false;
      let showHardwareType = false;
      const showSoftwareName = false;
      if ((value === DB_CONSTANTS.HARDWARE) || (value === DB_CONSTANTS.SOFTWARE)) {
        showIssueType = true;
        if (value === DB_CONSTANTS.HARDWARE) {
          showHardwareType = true;
        }
      }
      this.setState({
        ui: {
          ...state.ui, showIssueType, showHardwareType, showSoftwareName,
        },
      });
    }
    if (name === 'issueType') {
      let showSoftwareName = false;
      if (value === DB_CONSTANTS.SOFTWARE_INSTALLATION) {
        showSoftwareName = true;
      }
      this.setState({ ui: { ...state.ui, showSoftwareName } });
    }
    this.setState({
      [name]: value,
    });
  }

  submitTicket = () => {
    const { dispatch } = this.props;
    const { ui, ...data } = this.state;
    let submitData = data;
    if (data.issueIn === DB_CONSTANTS.SOFTWARE) {
      const { replacementType, ...rest } = data;
      submitData = rest;
      if (data.issueType === DB_CONSTANTS.SOFTWARE_DEVELOPMENT) {
        const { softwareName, ...restData } = submitData;
        submitData = restData;
      }
    } else if (data.issueIn === DB_CONSTANTS.HARDWARE) {
      const { softwareName, ...rest } = data;
      submitData = rest;
    }
    dispatch(submitTicketData(submitData));
  }

  render() {
    const {
      deviceType, issueIn, issueType, replacementType,
      softwareName, description, ui,
    } = this.state;
    const { handleChange } = this;
    const { classes } = this.props;
    return (
      <Box className={classes.wrapper}>
        <Typography variant="h4" component="h4" className={classes.header}>
          Describe your issue
        </Typography>
        <Box className={classes.formWrapper}>
          <FormControl classes={{ root: classes.form }}>
            <Typography variant="body1" className={classes.label}>Device Type</Typography>
            <Select
              native
              variant="outlined"
              classes={{ root: classes.selectRoot }}
              value={deviceType}
              onChange={handleChange}
              inputProps={{
                name: 'deviceType',
                id: 'outlined-age-native-simple',
              }}
            >

              <option value="">SELECT</option>
              <option value={DB_CONSTANTS.DESKTOP}>DESKTOP</option>
              <option value={DB_CONSTANTS.LAPTOP}>LAPTOP</option>
              <option value={DB_CONSTANTS.MACBOOK}>MACBOOK</option>
              <option value={DB_CONSTANTS.OTHERS}>OTHERS</option>
            </Select>
          </FormControl>
          <FormControl classes={{ root: classes.form }}>
            <Typography variant="body1" className={classes.label}>Issue in</Typography>
            <Select
              native
              variant="outlined"
              classes={{ root: classes.selectRoot }}
              value={issueIn}
              onChange={handleChange}
              inputProps={{
                name: 'issueIn',
                id: 'outlined-age-native-simple',
              }}
            >
              <option value="">SELECT</option>
              <option value={DB_CONSTANTS.HARDWARE}>HARDWARE</option>
              <option value={DB_CONSTANTS.SOFTWARE}>SOFTWARE</option>
              <option value={DB_CONSTANTS.OTHERS}>OTHERS</option>
            </Select>
          </FormControl>
          {ui.showIssueType
            && (
              <FormControl classes={{ root: classes.form }}>
                <Typography variant="body1" className={classes.label}>Issue type</Typography>
                <Select
                  native
                  variant="outlined"
                  classes={{ root: classes.selectRoot, outlined: classes.inputHeight }}
                  value={issueType}
                  onChange={handleChange}
                  inputProps={{
                    name: 'issueType',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option value="">SELECT</option>
                  {
                    DB_CONSTANTS.ISSUES.filter((issue) => (issue.type === issueIn))
                      .map((issue) => (<option key={issue.id} value={issue.value}>{issue.value}</option>))
                  }
                </Select>
              </FormControl>
            )}
          {ui.showSoftwareName
            && (
              <FormControl classes={{ root: classes.form }}>
                <Typography variant="body1" className={classes.label}>Enter software name</Typography>
                <OutlinedInput
                  classes={{ root: classes.input }}
                  id="outlined-helperText"
                  type="text"
                  name="softwareName"
                  value={softwareName}
                  variant="outlined"
                  onChange={handleChange}
                  placeholder="Enter software name"
                  inputProps={{ 'aria-label': 'description' }}
                />
              </FormControl>
            )}
          {ui.showHardwareType
            && (
              <FormControl classes={{ root: classes.form }}>
                <Typography variant="body1" className={classes.label}>Repair/Replacement</Typography>
                <Select
                  native
                  variant="outlined"
                  classes={{ root: classes.selectRoot }}
                  value={replacementType}
                  onChange={handleChange}
                  inputProps={{
                    name: 'replacementType',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option value="">SELECT</option>
                  {
                    DB_CONSTANTS.ISSUE_TYPE.filter((issue) => (issue.type === issueType))
                      .map((issue) => (<option key={issue.id} value={issue.value}>{issue.value}</option>))
                  }
                </Select>
              </FormControl>
            )}
          <FormControl classes={{ root: classes.form }}>
            <Typography variant="body1" className={classes.label}>Description</Typography>
            <TextField
              classes={{ input: classes.input, root: classes.textArea }}
              id="outlined-helperText"
              multiline
              rows={4}
              name="description"
              value={description}
              type="text"
              variant="outlined"
              placeholder="Describe your problem here"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'description' }}
            />
          </FormControl>
          <FormControl>
            <Typography variant="h6" className={classes.label} />
            <Button
              onClick={this.submitTicket}
              variant="contained"
              color="primary"
            >
              Raise Issue
            </Button>
          </FormControl>
        </Box>
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({ ticket: state.ticket });
export default withStyles(styles)(connect(mapStateToProps)(Ticket));
