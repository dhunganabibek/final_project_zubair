import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import RaiseTicketCard from './components/RaiseTicketCard';
import RentedItemsCard from './components/RentedItemsCard';
import styles from './style';

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <RaiseTicketCard />
        <RentedItemsCard />
      </div>
    );
  }
}
export default withStyles(styles)(Home);
