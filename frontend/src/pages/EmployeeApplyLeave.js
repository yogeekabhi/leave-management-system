import React from 'react';
import EmployeeNavBar from '../components/EmployeeNavBar';
import { authStore } from '../stores/authStore';
import { observer } from 'mobx-react';
import AppContext from '../context/AppContext';

class EmployeeApplyLeave extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      reason: '',
      error: '',
      success: '',
      todayDate: '',
      yearEndDate: ''
    };
  }

  componentDidMount() {
    this.context.setRole('employee');
    console.log(authStore.userInfo.id, '**********authStore');
    this.getServerTime().then((serverTime) => {
      console.log('*****Server time*****', serverTime);
      this.setState({
        todayDate: serverTime.currentDate.toISOString().split('T')[0],
        yearEndDate: `${serverTime.currentYear}-12-31`
      });
    });
  }

  getServerTime = async () => {
    try {
      const res = await fetch(`/server-time`);
      if (!res.ok) throw new Error('Failed to fetch server time');
      const data = await res.json();
      return {
        currentDate: new Date(data.now),
        currentYear: new Date(data.now).getFullYear()
      };
    } catch (err) {
      console.error('Server time error:', err);
      // fallback to client time
      return {
        currentDate: new Date(),
        currentYear: new Date().getFullYear()
      };
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.startDate && this.state.endDate && this.state.reason) {
      authStore.updateLeaveDetails({
        id: new Date().getTime(),
        employeeId: parseInt(authStore?.userInfo?.id),
        employeeName: authStore?.userInfo?.name,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        reason: this.state.reason,
        status: 'pending',
        managerId: authStore?.userInfo?.managerId
      });
      this.setState({
        success: 'Leave applied successfully!',
        error: '',
        endDate: '',
        startDate: '',
        reason: ''
      });
      setTimeout(() => {
        this.setState({ success: '' });
      }, 2000);
    }
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' }, () => {
      if (this.state.startDate && this.state.endDate) {
        const startTimestamp = new Date(this.state.startDate).getTime();
        const endTimestamp = new Date(this.state.endDate).getTime();
        if (endTimestamp < startTimestamp) {
          this.setState({
            error: 'End date cannot be before start date',
            endDate: ''
          });
        }
      }
    });
  };

  onKeyDownAction = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      startDate,
      endDate,
      reason,
      error,
      todayDate,
      success,
      yearEndDate
    } = this.state;
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
        <form
          onSubmit={this.handleSubmit}
          style={{
            background: '#fff',
            padding: '24px',
            marginTop: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h2 style={{ textAlign: 'center', margin: 0 }}>Apply Leave</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor='name' style={{ fontSize: '14px', color: '#333' }}>
              Name
            </label>
            <input
              id='name'
              type='text'
              name='user-name'
              value={authStore?.userInfo?.name}
              readOnly
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px',
                background: '#f9f9f9'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              htmlFor='start-date'
              style={{ fontSize: '14px', color: '#333' }}
            >
              Start Date
            </label>
            <input
              id='start-date'
              type='date'
              name='startDate'
              value={startDate}
              min={todayDate}
              max={yearEndDate}
              onChange={this.handleInputChange}
              onKeyDown={this.onKeyDownAction}
              required
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              htmlFor='end-date'
              style={{ fontSize: '14px', color: '#333' }}
            >
              End Date
            </label>
            <input
              id='end-date'
              type='date'
              name='endDate'
              value={endDate}
              min={startDate || todayDate}
              max={yearEndDate}
              onChange={this.handleInputChange}
              onKeyDown={this.onKeyDownAction}
              required
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor='reason' style={{ fontSize: '14px', color: '#333' }}>
              Reason
            </label>
            <textarea
              required
              id='reason'
              name='reason'
              value={reason}
              onChange={this.handleInputChange}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
                resize: 'vertical',
                minHeight: '80px'
              }}
            />
          </div>

          {error && (
            <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </p>
          )}
          {success && (
            <p
              style={{ color: 'green', fontSize: '14px', textAlign: 'center' }}
            >
              {success}
            </p>
          )}

          <button
            type='submit'
            disabled={!authStore.leaveDetails.totalLeaves}
            style={{
              padding: '12px',
              background: '#4e73df',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '15px',
              cursor: !authStore.leaveDetails.totalLeaves
                ? 'not-allowed'
                : 'pointer',
              opacity: !authStore.leaveDetails.totalLeaves ? 0.6 : 1
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default observer(EmployeeApplyLeave);
