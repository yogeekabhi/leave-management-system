import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppContext from '../context/AppContext';
import { authStore } from '../stores/authStore';

class RoleSelection extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { role, setRole } = this.context;
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
            onChange={(e) => setRole(e.target.value)}
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

export default observer(RoleSelection);
