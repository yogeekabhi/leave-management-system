import React from 'react';
import EmployeeNavBar from '../components/EmployeeNavBar';

class EmployeeMyLeaves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <EmployeeNavBar />
        <h3>My Leaves</h3>
      </div>
    );
  }
}

export default EmployeeMyLeaves;
