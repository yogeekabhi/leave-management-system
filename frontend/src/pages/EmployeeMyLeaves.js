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
      <div
        style={{
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box',
          overflowX: 'hidden',
          background: '#f5f6fa',
          minHeight: '100vh',
          padding: '16px'
        }}
      >
        <EmployeeNavBar />

        <div
          style={{
            marginTop: '20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            padding: '16px',
            overflowX: 'auto'
          }}
        >
          <h2 style={{ margin: '0 0 16px 0', textAlign: 'center' }}>
            My Leaves
          </h2>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '500px'
            }}
          >
            <thead>
              <tr style={{ background: '#f1f1f1' }}>
                <th
                  style={{
                    padding: '10px',
                    textAlign: 'left',
                    fontSize: '14px',
                    color: '#333'
                  }}
                >
                  Start Date
                </th>
                <th
                  style={{
                    padding: '10px',
                    textAlign: 'left',
                    fontSize: '14px',
                    color: '#333'
                  }}
                >
                  End Date
                </th>
                <th
                  style={{
                    padding: '10px',
                    textAlign: 'left',
                    fontSize: '14px',
                    color: '#333'
                  }}
                >
                  Reason
                </th>
                <th
                  style={{
                    padding: '10px',
                    textAlign: 'left',
                    fontSize: '14px',
                    color: '#333'
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {authStore.leaveDetails.totalLeavesList.length > 0 ? (
                authStore.leaveDetails.totalLeavesList.map((leave) => (
                  <tr
                    key={leave.id}
                    style={{
                      borderBottom: '1px solid #eee',
                      background: '#fff'
                    }}
                  >
                    <td style={{ padding: '10px', fontSize: '14px' }}>
                      {leave.startDate}
                    </td>
                    <td style={{ padding: '10px', fontSize: '14px' }}>
                      {leave.endDate}
                    </td>
                    <td style={{ padding: '10px', fontSize: '14px' }}>
                      {leave.reason}
                    </td>
                    <td
                      style={{
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color:
                          leave.status === 'approved'
                            ? 'green'
                            : leave.status === 'pending'
                            ? 'orange'
                            : 'red'
                      }}
                    >
                      {leave.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan='4'
                    style={{
                      textAlign: 'center',
                      padding: '16px',
                      fontSize: '14px',
                      color: '#666'
                    }}
                  >
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
