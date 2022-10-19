import React from 'react';
import { withStyles, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './style';
import { getTicketsData } from './actions';

class Home extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTicketsData());
  }

  createData = (createdBy, createdOn, description, deviceType, issueIn, issueType,
    raisedVia, status, replacementType) => ({
    createdBy, createdOn, description, deviceType, issueIn, issueType, raisedVia, status, replacementType,
  })

  render() {
    const { classes, managerPageData } = this.props;
    return (
      <Box className={classes.tableWrapper}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Tickets</TableCell>
                <TableCell align="right">Created By</TableCell>
                <TableCell align="right">Created On</TableCell>
                <TableCell align="right">Raised Via</TableCell>
                <TableCell align="right">Device Type</TableCell>
                <TableCell align="right">Issue In</TableCell>
                <TableCell align="right">Issue Type</TableCell>
                <TableCell align="right">Replacement Type</TableCell>
                <TableCell align="right">Description</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {managerPageData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.status}
                  </TableCell>
                  <TableCell align="right">{row.createdBy}</TableCell>
                  <TableCell align="right">{row.createdOn}</TableCell>
                  <TableCell align="right">{row.raisedVia}</TableCell>
                  <TableCell align="right">{row.deviceType}</TableCell>
                  <TableCell align="right">{row.issueIn}</TableCell>
                  <TableCell align="right">{row.issueType}</TableCell>
                  <TableCell align="right">{row.replacementType}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { managerPageData: state.managerTicket };
};

const managerTicketConnect = connect(mapStateToProps)(Home);
export default withStyles(styles)(managerTicketConnect);
