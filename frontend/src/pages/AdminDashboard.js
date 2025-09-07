import React, { Component } from 'react';
import AdminDashboardChart from '../components/AdminDashboardChart';
import AdminNavBar from '../components/AdminNavBar';

class AdminDashboard extends Component {
  state = {
    summary: { total: 0, approved: 0, pending: 0, rejected: 0 },
    leavesByEmployee: {}
  };

  componentDidMount() {
    this.fetchLeaves();
  }

  fetchLeaves = async () => {
    try {
      const res = await fetch('/leaves');
      if (!res.ok) throw new Error('Failed to fetch leaves');
      const data = await res.json();

      const total = data.length;
      const approved = data.filter((l) => l.status === 'approved').length;
      const pending = data.filter((l) => l.status === 'pending').length;
      const rejected = data.filter((l) => l.status === 'rejected').length;

      const employeeChartCount = {};
      for (let i = 0; i < data.length; i++) {
        const empName = data[i].employeeName;
        const status = data[i].status;

        if (!employeeChartCount[empName]) {
          employeeChartCount[empName] = { [status]: 1 };
        } else {
          if (!employeeChartCount[empName][status]) {
            employeeChartCount[empName] = {
              ...employeeChartCount[empName],
              [status]: 1
            };
          } else {
            employeeChartCount[empName] = {
              ...employeeChartCount[empName],
              [status]: employeeChartCount[empName][status] + 1
            };
          }
        }
      }
      this.setState({
        summary: { total, approved, pending, rejected },
        leavesByEmployee: employeeChartCount
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { summary, leavesByEmployee } = this.state;

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
        <AdminNavBar />
        <h2 style={{ margin: '20px 0', fontSize: '22px', textAlign: 'center' }}>
          Admin Dashboard
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            marginBottom: '30px'
          }}
        >
          <Card title='Total' value={summary.total} border='#4e73df' />
          <Card title='Approved' value={summary.approved} border='green' />
          <Card title='Pending' value={summary.pending} border='orange' />
          <Card title='Rejected' value={summary.rejected} border='red' />
        </div>

        <AdminDashboardChart leavesByEmployee={leavesByEmployee} />
      </div>
    );
  }
}

const Card = ({ title, value, border }) => (
  <div
    style={{
      background: '#fff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      textAlign: 'center',
      borderTop: `4px solid ${border}`
    }}
  >
    <h3 style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
      {title}
    </h3>
    <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{value}</p>
  </div>
);

export default AdminDashboard;
