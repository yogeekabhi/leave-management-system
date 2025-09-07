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
      <div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='role-select' style={{ marginRight: '8px' }}>
            Select Role:
          </label>
          <select
            id='role-select'
            name='roles'
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
