import React from 'react';
import { authStore } from '../stores/authStore';

const AppContext = React.createContext({
  role: '',
  setRole: () => {}
});

export default AppContext;
