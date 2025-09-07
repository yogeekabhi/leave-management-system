import React from 'react';
import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import { authStore } from '../stores/authStore';

const AuthenticatedRoute = observer(({ children }) => {
  return authStore.userInfo.id ? children : <Navigate to='/' replace />;
});

export default AuthenticatedRoute;
