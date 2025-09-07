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
    <div>
      <NavLink to='/admin-dashboard'>Dashboard</NavLink>
      <button type='button' onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
});

export default AdminNavBar;
