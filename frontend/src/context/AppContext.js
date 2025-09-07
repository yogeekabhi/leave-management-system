import React from 'react';

const AppContext = React.createContext({
  role: '',
  setRole: () => {}
});

export default AppContext;
