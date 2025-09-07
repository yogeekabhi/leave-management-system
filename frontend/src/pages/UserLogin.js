import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter'; // your custom wrapper for navigate
import { authStore } from '../stores/authStore';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      employeeId: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  };

  getEmployeeLeaveDetails = async (employeeId) => {
    try {
      const res = await fetch(`/leaves?employeeId=${employeeId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Fetch leave details error:', err);
      return [];
    }
  };

  getManagerTeamLeaveDetails = async (managerId) => {
    try {
      const res = await fetch(`/leaves?managerId=${managerId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Fetch leave details error:', err);
      return [];
    }
  };

  getUniqueEmployees = (data) => {
    const employeeMap = new Map(
      data.map((i) => [i.employeeId, i.employeeName])
    );
    const uniqueEmployees = Array.from(employeeMap, ([id, name]) => ({
      id,
      name
    }));
    return uniqueEmployees;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, password, employeeId } = this.state;
      const response = await fetch(`/users/${employeeId}`);
      const data = await response.json();
      console.log({ data });
      if (
        data?.email.toLowerCase() === username.toLowerCase() &&
        data?.password === password
      ) {
        // Successful login
        authStore.setUserInfo({
          name: data.name,
          id: data.id,
          role: data.role,
          email: data.email,
          managerId: data.managerId
        });
        if (data.role === 'admin') {
          this.props.router.navigate('/admin-dashboard');
        }
        if (data.role === 'manager') {
          this.getManagerTeamLeaveDetails(data.id).then((data) => {
            console.log('*****MANAGER LEAVE DETAILS*****', data);
            authStore.setLeaveDetails({
              totalLeaves: data.length,
              totalLeavesList: data
            });
            localStorage.setItem(
              'employeeOptions',
              JSON.stringify(this.getUniqueEmployees(data))
            );
          });
          this.props.router.navigate(`/team-leaves/${data.id}/employeeId/all`);
        }
        if (data.role === 'employee') {
          console.log(data, '*******login data');
          this.getEmployeeLeaveDetails(data.id).then((data) => {
            console.log('*****EMPLOYEE LEAVE DETAILS*****', data);
            if (data?.length > 0) {
              authStore.setLeaveDetails({
                totalLeaves: 24 - data.length,
                totalLeavesList: data
              });
            } else {
              authStore.setLeaveDetails({
                totalLeaves: 24,
                totalLeavesList: []
              });
            }
          });
          this.props.router.navigate('/apply-leave');
        }
      } else {
        this.setState({ error: 'Invalid credentials. Please try again.' });
      }
    } catch (error) {
      this.setState({
        error: 'No records found, Please enter correct credentials.'
      });
    }
  };

  render() {
    const { username, password, employeeId, error } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f5f6fa',
          padding: '16px',
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden'
        }}
      >
        <form
          onSubmit={this.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '360px',
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          <h2
            style={{ textAlign: 'center', marginBottom: '8px', color: '#333' }}
          >
            Login
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor='emp_id' style={{ fontSize: '14px', color: '#555' }}>
              Employee ID
            </label>
            <input
              id='emp_id'
              type='number'
              name='employeeId'
              value={employeeId}
              onChange={this.handleChange}
              placeholder='Enter your Employee ID'
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
              htmlFor='user_name'
              style={{ fontSize: '14px', color: '#555' }}
            >
              Email
            </label>
            <input
              id='user_name'
              type='email'
              name='username'
              value={username}
              onChange={this.handleChange}
              placeholder='Enter your Email'
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
              htmlFor='password'
              style={{ fontSize: '14px', color: '#555' }}
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              placeholder='Enter your Password'
              onChange={this.handleChange}
              required
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          {error && (
            <p
              style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}
            >
              {error}
            </p>
          )}

          <button
            type='submit'
            style={{
              padding: '12px',
              background: '#4e73df',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '15px',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => (e.target.style.background = '#3b5cb8')}
            onMouseOut={(e) => (e.target.style.background = '#4e73df')}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(UserLogin);
