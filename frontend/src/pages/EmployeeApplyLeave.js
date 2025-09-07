import React from 'react';
import EmployeeNavBar from '../components/EmployeeNavBar';

class EmployeeApplyLeave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <EmployeeNavBar />
        <h3>Apply Leave</h3>
      </div>
    );
  }
}

export default EmployeeApplyLeave;
