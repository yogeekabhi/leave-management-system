import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from '../stores/authStore';

const EmployeeNavBar = observer(() => {
  const onLogoutClick = () => {
    authStore.clearStore();
  };
  return (
    <nav
      style={{
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        background: '#4e73df',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        color: '#fff'
      }}
    >
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <NavLink
          to='/apply-leave'
          style={({ isActive }) => ({
            color: isActive ? '#ffd700' : '#fff',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          })}
        >
          Apply Leave
        </NavLink>
        <NavLink
          to='/my-leaves'
          style={({ isActive }) => ({
            color: isActive ? '#ffd700' : '#fff',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          })}
        >
          My Leaves
        </NavLink>
      </div>

      <div style={{ fontSize: '14px', fontWeight: '500' }}>
        Leave Balance: {authStore.leaveDetails.totalLeaves}
      </div>

      {authStore.userInfo.id && (
        <button
          type='button'
          onClick={onLogoutClick}
          style={{
            padding: '8px 12px',
            background: '#e74a3b',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
});

export default EmployeeNavBar;
