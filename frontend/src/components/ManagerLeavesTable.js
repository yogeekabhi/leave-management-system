import React from 'react';
// import { observer } from 'mobx-react';
import { authStore } from '../stores/authStore';

class ManagerLeavesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedRow: null,
      animationColor: ''
    };
  }
  updateLeaveStatus = (ind, status) => {
    // set animation state
    this.setState({
      animatedRow: ind,
      animationColor:
        status === 'A' ? 'rgba(46, 204, 113, 0.3)' : 'rgba(231, 76, 60, 0.3)'
    });

    setTimeout(() => {
      authStore.updateLeaveStatusByManger(ind, status);
      // reset animation after 600ms
      this.setState({ animatedRow: null, animationColor: '' });
    }, 600);
  };

  render() {
    const { error, leavesList } = this.props;
    const { animatedRow, animationColor } = this.state;
    return (
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
          Team Leave Requests
        </h2>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '600px'
          }}
        >
          <thead>
            <tr style={{ background: '#f1f1f1' }}>
              {[
                'Employee',
                'Start Date',
                'End Date',
                'Reason',
                'Status',
                'Action'
              ].map((head) => (
                <th
                  key={head}
                  style={{
                    padding: '10px',
                    textAlign: 'left',
                    fontSize: '14px',
                    color: '#333'
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leavesList.length > 0 ? (
              leavesList.map((leave, ind) => (
                <tr
                  key={ind}
                  style={{
                    borderBottom: '1px solid #eee',
                    background: animatedRow === ind ? animationColor : '#fff',
                    transition: 'background 0.6s ease'
                  }}
                >
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    {leave.employeeName}
                  </td>
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
                    {leave.status.charAt(0).toUpperCase() +
                      leave.status.slice(1).toLowerCase()}
                  </td>
                  <td style={{ padding: '10px' }}>
                    {leave.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => this.updateLeaveStatus(ind, 'A')}
                          style={{
                            marginRight: '8px',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            background: 'green',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '13px',
                            transform: 'scale(1)',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseDown={(e) =>
                            (e.target.style.transform = 'scale(0.95)')
                          }
                          onMouseUp={(e) =>
                            (e.target.style.transform = 'scale(1)')
                          }
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => this.updateLeaveStatus(ind, 'R')}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            background: 'red',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '13px',
                            transform: 'scale(1)',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseDown={(e) =>
                            (e.target.style.transform = 'scale(0.95)')
                          }
                          onMouseUp={(e) =>
                            (e.target.style.transform = 'scale(1)')
                          }
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
                <td
                  colSpan='6'
                  style={{
                    textAlign: 'center',
                    padding: '16px',
                    fontSize: '14px',
                    color: '#666'
                  }}
                >
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
