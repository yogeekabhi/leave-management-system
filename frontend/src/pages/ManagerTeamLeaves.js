import React from 'react';
import { observer } from 'mobx-react';
import { authStore } from '../stores/authStore';
import ManagerNavBar from '../components/ManagerNavBar';
import ManagerLeavesTable from '../components/ManagerLeavesTable';
import ManagerFilterSection from '../components/ManagerFilterSection';
import { withRouter } from '../utils/withRouter';

class ManagerTeamLeaves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  componentDidMount() {
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
    const { employeeId, status } = params;
    try {
      let url = `/leaves?managerId=${authStore.userInfo.id}`;
      if (employeeId && employeeId !== 'employeeId') {
        url += `&employeeId=${employeeId}`;
      }
      if (status && status !== 'all') {
        url += `&status=${status}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      authStore.setLeaveDetails({
        ...authStore.leaveDetails,
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
      <div>
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
