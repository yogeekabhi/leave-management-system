import React, { use } from 'react';
import { observer } from 'mobx-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authStore } from '../stores/authStore';

const ManagerNavBar = observer(() => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authStore.clearStore();
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <NavLink to={`/team-leaves/${authStore.userInfo.id}/employeeId/all`}>
        Team Leaves
      </NavLink>
      <button type='button' onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
});

export default ManagerNavBar;
