// AdminDashboard.jsx (class component, responsive cards + simple bar chart)
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
      <div style={styles.container}>
        <AdminNavBar />
        <h2 style={styles.header}>Admin Dashboard</h2>
        <div style={styles.cards}>
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
  <div style={{ ...styles.card, borderTop: `4px solid ${border}` }}>
    <h3 style={styles.cardTitle}>{title}</h3>
    <p style={styles.cardNumber}>{value}</p>
  </div>
);

const styles = {
  container: {
    padding: 16,
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: 900,
    margin: '0 auto'
  },
  header: { marginBottom: 20, fontSize: 22 },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 16,
    marginBottom: 30
  },
  card: {
    background: '#fff',
    padding: 16,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  cardTitle: { fontSize: 14, color: '#555', marginBottom: 8 },
  cardNumber: { fontSize: 22, fontWeight: 'bold', margin: 0 },
  sectionTitle: { marginBottom: 12, fontSize: 18 },
  chart: { background: '#f9f9f9', padding: 12, borderRadius: 8 },
  barRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap'
  },
  barLabel: { minWidth: 120, fontSize: 14, marginBottom: 4 },
  bar: {
    background: '#4e73df',
    height: 20,
    borderRadius: 4,
    position: 'relative',
    flexGrow: 1,
    minWidth: 100,
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontSize: 12,
    paddingLeft: 6
  },
  barValue: { position: 'absolute', right: 6, fontSize: 12 }
};

export default AdminDashboard;
