import React from 'react';
import './App.css';
import RoleSelection from './components/RoleSelection';
import AppContext from './context/AppContext';
import RouteHolder from './routes/RouteHolder';
// import { authStore } from './stores/authStore';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ''
    };
  }
  setRole = (newRole) => {
    this.setState({ role: newRole });
  };

  render() {
    console.log('Current State:', this.state);
    return (
      <AppContext.Provider
        value={{ role: this.state.role, setRole: this.setRole }}
      >
        <RoleSelection />
        <RouteHolder />
      </AppContext.Provider>
    );
  }
}

export default App;
