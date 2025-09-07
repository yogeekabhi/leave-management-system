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
        if (data.role === 'admin') {
        }
        if (data.role === 'manager') {
        }
        if (data.role === 'employee') {
          console.log(data, '*******login data');
          this.getEmployeeLeaveDetails(data.id).then((data) => {
            console.log('*****Leave details*****', data);
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
          authStore.setUserInfo({
            name: data.name,
            id: data.id,
            role: data.role,
            email: data.email,
            managerId: data.managerId
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
        style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        <form
          onSubmit={this.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '300px'
          }}
        >
          <h2>Login</h2>
          <div>
            <label htmlFor='emp_id'>Employee ID</label>
            <input
              id='emp_id'
              type='number'
              name='employeeId'
              value={employeeId}
              onChange={this.handleChange}
              placeholder='Enter your Employee ID'
              required
            />
          </div>
          <div>
            <label htmlFor='user_name'> Email</label>
            <input
              id='user_name'
              type='email'
              name='username'
              value={username}
              onChange={this.handleChange}
              placeholder='Enter your Email'
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              placeholder='Enter your Password'
              onChange={this.handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(UserLogin);
