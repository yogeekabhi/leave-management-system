import React from 'react';
import EmployeeNavBar from '../components/EmployeeNavBar';
import { authStore } from '../stores/authStore';

class EmployeeMyLeaves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <EmployeeNavBar />
        <div style={{ padding: 16 }}>
          <h2>My Leaves</h2>
          <table
            border='1'
            cellPadding='8'
            style={{ width: '100%', marginTop: 12 }}
          >
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {authStore.leaveDetails.totalLeavesList.length > 0 ? (
                authStore.leaveDetails.totalLeavesList.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4' style={{ textAlign: 'center' }}>
                    No leaves applied yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeMyLeaves;
