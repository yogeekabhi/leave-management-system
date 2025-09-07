import React from 'react';

const AdminDashboardChart = ({ leavesByEmployee }) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        padding: '16px'
      }}
    >
      <h3
        style={{ marginBottom: '16px', fontSize: '18px', textAlign: 'center' }}
      >
        Leaves per Employee (out of 24)
      </h3>
      {Object.keys(leavesByEmployee).map((emp) => {
        const used = leavesByEmployee[emp].approved;
        const percent = Math.min((used / 24) * 100, 100);

        let barColor = 'green';
        if (percent > 75) barColor = 'red';
        else if (percent > 50) barColor = 'orange';

        return (
          <div
            key={emp}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              flexWrap: 'wrap'
            }}
          >
            <span
              style={{
                minWidth: '120px',
                fontSize: '14px',
                marginBottom: '4px'
              }}
            >
              {emp}
            </span>
            <div
              style={{
                flexGrow: 1,
                background: '#eee',
                height: '20px',
                borderRadius: '4px',
                overflow: 'hidden',
                minWidth: '100px'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${percent}%`,
                  background: barColor,
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '6px',
                  transition: 'width 0.5s ease'
                }}
              >
                {used}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminDashboardChart;
