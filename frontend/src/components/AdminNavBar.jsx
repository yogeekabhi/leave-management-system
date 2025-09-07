import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavBar = () => {
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
    </nav>
  );
};

export default AdminNavBar;
