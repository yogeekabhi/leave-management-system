import React, { use } from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { authStore } from '../stores/authStore';

const ManagerNavBar = observer(() => {
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
        gap: '10px'
      }}
    >
      <NavLink
        to={`/team-leaves/${authStore.userInfo.id}/employeeId/all`}
        style={({ isActive }) => ({
          color: isActive ? '#ffd700' : '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500'
        })}
      >
        Team Leaves
      </NavLink>
    </nav>
  );
});

export default ManagerNavBar;
