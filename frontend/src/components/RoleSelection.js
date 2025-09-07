import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class RoleSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AppContext.Consumer>
        {({ role, setRole }) => (
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
        )}
      </AppContext.Consumer>
    );
  }
}

export default RoleSelection;
