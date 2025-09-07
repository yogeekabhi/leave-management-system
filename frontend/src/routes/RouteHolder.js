import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';
import EmployeeApplyLeave from '../pages/EmployeeApplyLeave';
import EmployeeMyLeaves from '../pages/EmployeeMyLeaves';
import AuthenticatedRoute from './AuthenticatedRoute';

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
    </Routes>
  );
};

export default RouteHolder;
