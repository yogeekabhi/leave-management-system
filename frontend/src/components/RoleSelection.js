import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppContext from '../context/AppContext';
import { authStore } from '../stores/authStore';
import { withRouter } from '../utils/withRouter';

class RoleSelection extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRoleChange = (e) => {
    this.context.setRole(e.target.value);
    authStore.clearStore();
    localStorage.clear();
    this.props.router.navigate('/');
  };

  render() {
    const { role } = this.context;
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box',
          background: '#f9f9f9',
          padding: '12px 16px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label
            htmlFor='role-select'
            style={{
              fontSize: '14px',
              color: '#333',
              fontWeight: '500'
            }}
          >
            Select Role:
          </label>
          <select
            id='role-select'
            name='roles'
            value={role}
            onChange={this.handleRoleChange}
            style={{
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            <option value=''>Choose Role</option>
            <option value='employee'>Employee</option>
            <option value='manager'>Manager</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
      </div>
    );
  }
}

export default withRouter(RoleSelection);
