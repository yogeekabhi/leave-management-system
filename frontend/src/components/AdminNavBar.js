import React, { use } from 'react';
import { observer } from 'mobx-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authStore } from '../stores/authStore';

const AdminNavBar = observer(() => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authStore.clearStore();
    navigate('/');
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
        marginBottom: '20px'
      }}
    >
      <NavLink
        to='/admin-dashboard'
        style={({ isActive }) => ({
          color: isActive ? '#ffd700' : '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500'
        })}
      >
        Dashboard
      </NavLink>
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
    </nav>
  );
});

export default AdminNavBar;
