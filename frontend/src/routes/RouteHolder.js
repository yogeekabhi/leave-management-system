import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';
import EmployeeApplyLeave from '../pages/EmployeeApplyLeave';
import EmployeeMyLeaves from '../pages/EmployeeMyLeaves';
import AuthenticatedRoute from './AuthenticatedRoute';
import ManagerTeamLeaves from '../pages/ManagerTeamLeaves';
import AdminDashboard from '../pages/AdminDashboard';

const RouteHolder = () => {
  return (
    <Routes>
      <Route path='/' element={<UserLogin />} />
      <Route
        path='/apply-leave'
        element={
          <AuthenticatedRoute>
            <EmployeeApplyLeave />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/my-leaves'
        element={
          <AuthenticatedRoute>
            <EmployeeMyLeaves />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/team-leaves/:managerId/:employeeId/:status'
        element={<ManagerTeamLeaves />}
      />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
    </Routes>
  );
};

export default RouteHolder;
