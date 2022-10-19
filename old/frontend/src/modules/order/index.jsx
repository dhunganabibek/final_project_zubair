import React from 'react';
import { Link } from 'react-router-dom';

class Ticket extends React.Component {
  text = () => (
    <>
      I am in Order form
      {' '}
      <Link to="/">Go to home</Link>
    </>
  );

  render() {
    return <>{this.text()}</>;
  }
}
export default Ticket;
