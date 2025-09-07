import React from 'react';

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('roleType') === 'employee' ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        color: '#333'
      }}
    >
      <p
        style={{
          marginBottom: '12px',
          fontWeight: 'bold',
          fontSize: '18px',
          color: '#e74a3b',
          textAlign: 'center'
        }}
      >
        You don't have access to this page!!
      </p>
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
