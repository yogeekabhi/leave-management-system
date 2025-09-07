import React from 'react';
import { NavLink } from 'react-router-dom';

const EmployeeNavBar = () => {
  return (
    <>
      <NavLink to='/apply-leave'>Apply Leave</NavLink>
      <NavLink to='/my-leaves'>My Leaves</NavLink>
    </>
  );
};

export default EmployeeNavBar;
