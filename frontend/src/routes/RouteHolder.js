import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';
import EmployeeApplyLeave from '../pages/EmployeeApplyLeave';
import EmployeeMyLeaves from '../pages/EmployeeMyLeaves';

const RouteHolder = () => {
  return (
    <Routes>
      <Route path='/' element={<UserLogin />} />
      <Route path='/apply-leave' element={<EmployeeApplyLeave />} />
      <Route path='/my-leaves' element={<EmployeeMyLeaves />} />

      {/* <Route path='/about' element={<About />} />
      <Route path='/dashboard' element={<Dashboard />} /> */}
    </Routes>
  );
};

export default RouteHolder;
