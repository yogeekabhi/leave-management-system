import React from 'react';
import { observer } from 'mobx-react';
import { authStore } from '../stores/authStore';
import ManagerNavBar from '../components/ManagerNavBar';
import ManagerLeavesTable from '../components/ManagerLeavesTable';
import ManagerFilterSection from '../components/ManagerFilterSection';
import { withRouter } from '../utils/withRouter';
import AppContext from '../context/AppContext';

class ManagerTeamLeaves extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  componentDidMount() {
    this.context.setRole('manager');
    this.getFilteredResults(this.props.router.params);
    // this.getFilteredResults(this.).then((data) => {
    //   console.log('*****MANAGER LEAVE DETAILS*****', data);
    //   authStore.setLeaveDetails({
    //     totalLeaves: data.length,
    //     totalLeavesList: data
    //   });
    // });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.router.params?.employeeId !==
        nextProps.router.params?.employeeId ||
      this.props.router.params?.status !== nextProps.router.params?.status
    ) {
      this.getFilteredResults(nextProps.router.params);
    }
  }

  //   getManagerTeamLeaveDetails = async () => {
  //     try {
  //       const res = await fetch(
  //         `/leaves?managerId=${this.props.router.params.managerId}`
  //       );
  //       const data = await res.json();
  //       return data;
  //     } catch (err) {
  //       console.error('Fetch leave details error:', err);
  //       return [];
  //     }
  //   };

  getFilteredResults = async (params) => {
    const { employeeId, status, managerId } = params;
    try {
      let url = `/leaves?managerId=${managerId}`;
      if (employeeId && employeeId !== 'employeeId') {
        url += `&employeeId=${employeeId}`;
      }
      if (status && status !== 'all') {
        url += `&status=${status}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      authStore.setLeaveDetails({
        totalLeaves: data.length,
        totalLeavesList: data
      });
    } catch (err) {
      console.error('Error Filtering results', err);
      this.setState({ error: 'Error Filtering results' });
    }
  };

  render() {
    console.log(authStore.leaveDetails.totalLeavesList, '%%%%');
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box',
          overflowX: 'hidden',
          background: '#f5f6fa',
          minHeight: '100vh',
          padding: '16px'
        }}
      >
        <ManagerNavBar />
        <ManagerFilterSection
          managerId={this.props.router.params.managerId}
          leavesList={authStore.leaveDetails.totalLeavesList}
        />
        <ManagerLeavesTable
          error={this.state.error}
          leavesList={authStore.leaveDetails.totalLeavesList}
        />
      </div>
    );
  }
}
export default withRouter(observer(ManagerTeamLeaves));
