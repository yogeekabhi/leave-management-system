import React from 'react';
import EmployeeNavBar from '../components/EmployeeNavBar';
import { authStore } from '../stores/authStore';

class EmployeeApplyLeave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      reason: '',
      error: '',
      success: '',
      todayDate: ''
    };
  }

  componentDidMount() {
    console.log(authStore.userInfo.id, '**********authStore');
    this.getServerTime().then((serverTime) => {
      console.log(
        '*****Server time*****',
        serverTime.toISOString().split('T')[0]
      );
      this.setState({ todayDate: serverTime.toISOString().split('T')[0] });
    });
  }

  getServerTime = async () => {
    try {
      const res = await fetch(`/server-time`);
      if (!res.ok) throw new Error('Failed to fetch server time');
      const data = await res.json();
      return new Date(data.now);
    } catch (err) {
      console.error('Server time error:', err);
      return new Date(); // fallback to client time
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
        status: 'Pending',
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
    const { startDate, endDate, reason, error, todayDate, success } =
      this.state;
    return (
      <div>
        <EmployeeNavBar />
        <form onSubmit={this.handleSubmit}>
          <h2>Apply Leave</h2>

          <label htmlFor='start-date'>
            Start Date:
            <input
              id='start-date'
              type='date'
              name='startDate'
              value={startDate}
              min={todayDate}
              onChange={this.handleInputChange}
              onKeyDown={this.onKeyDownAction}
              required
            />
          </label>
          <br />

          <label htmlFor='end-date'>
            End Date:
            <input
              id='end-date'
              type='date'
              name='endDate'
              value={endDate}
              min={startDate || todayDate}
              onChange={this.handleInputChange}
              onKeyDown={this.onKeyDownAction}
              required
            />
          </label>
          <br />

          <label htmlFor='reason'>
            Reason:
            <textarea
              required
              id='reason'
              name='reason'
              value={reason}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default EmployeeApplyLeave;
