import React from 'react';

const AdminDashboardChart = ({ leavesByEmployee }) => {
  console.log({ leavesByEmployee });
  return (
    <>
      <h3 style={styles.sectionTitle}>Leaves per Employee (out of 24)</h3>
      <div style={styles.chart}>
        {Object.keys(leavesByEmployee).map((emp) => {
          console.log({ emp });
          const used = leavesByEmployee[emp].approved;
          const percent = Math.min((used / 24) * 100, 100);

          // Decide color based on usage
          let barColor = 'green';
          if (percent > 75) barColor = 'red';
          else if (percent > 50) barColor = 'orange';

          return (
            <div key={emp} style={styles.barRow}>
              <span style={styles.barLabel}>{emp}</span>
              <div style={{ ...styles.barWrapper }}>
                <div
                  style={{
                    ...styles.bar,
                    width: `${percent}%`,
                    background: barColor
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const styles = {
  barRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap'
  },
  barLabel: {
    minWidth: 120,
    fontSize: 14,
    marginBottom: 4
  },
  barWrapper: {
    flexGrow: 1,
    background: '#eee',
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    minWidth: 100
  },
  bar: {
    height: '100%',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 6,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  barValue: {
    position: 'relative',
    zIndex: 1
  }
};

export default AdminDashboardChart;
