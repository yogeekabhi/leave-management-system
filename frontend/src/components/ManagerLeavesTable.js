import React from 'react';
// import { observer } from 'mobx-react';
import { authStore } from '../stores/authStore';

class ManagerLeavesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  updateLeaveStatus = (ind, status) => {
    authStore.updateLeaveStatusByManger(ind, status);
  };

  render() {
    const { error, leavesList } = this.props;

    return (
      <div style={{ padding: 16 }}>
        <h2>Team Leave Requests</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <table
          border='1'
          cellPadding='8'
          style={{ width: '100%', marginTop: 12 }}
        >
          <thead>
            <tr>
              <th>Employee</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leavesList.length > 0 ? (
              leavesList.map((leave, ind) => (
                <tr key={leave.id}>
                  <td>{leave.employeeName}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    {leave.status.charAt(0).toUpperCase() +
                      leave.status.slice(1).toLowerCase()}
                  </td>
                  <td>
                    {leave.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => this.updateLeaveStatus(ind, 'A')}
                          style={{ marginRight: 8 }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => this.updateLeaveStatus(ind, 'R')}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' style={{ textAlign: 'center' }}>
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ManagerLeavesTable;
