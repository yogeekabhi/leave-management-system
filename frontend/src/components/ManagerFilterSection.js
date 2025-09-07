import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
// import { observer } from 'mobx-react';

class ManagerFilterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   employeeOptions: []
    };
  }

  //   componentDidMount() {
  //     if (!this.state.employeeOptions.length) {
  //       this.setState({
  //         employeeOptions: this.getUniqueEmployees(this.props.leavesList)
  //       });
  //     }
  //   }

  //   UNSAFE_componentWillReceiveProps(nextProps) {
  //     if (
  //       nextProps.leavesList.length !== this.props.leavesList.length &&
  //       nextProps.leavesList.length > 0 &&
  //       !this.state.employeeOptions.length
  //     ) {
  //       this.setState({
  //         employeeOptions: this.getUniqueEmployees(nextProps.leavesList)
  //       });
  //     }
  //   }

  //   getUniqueEmployees = (data) => {
  //     const employeeMap = new Map(
  //       data.map((i) => [i.employeeId, i.employeeName])
  //     );
  //     const uniqueEmployees = Array.from(employeeMap, ([id, name]) => ({
  //       id,
  //       name
  //     }));
  //     return uniqueEmployees;
  //   };

  handleFilterChange = (e) => {
    console.log(e.target.name, e.target.value, '%%%%%filtering...');
    if (e.target.name === 'filterByEmployee') {
      this.props.router.navigate(
        `/team-leaves/${this.props.managerId}/${e.target.value}/${this.props.router.params.status}`
      );
    }
    if (e.target.name === 'filterByStatus') {
      this.props.router.navigate(
        `/team-leaves/${this.props.managerId}/${this.props.router.params.employeeId}/${e.target.value}`
      );
    }
  };

  render() {
    const { params } = this.props.router;
    const activeEmployee = params?.employeeId || 'employeeId';
    const activeStatus = params?.status || 'all';
    const statuses = ['All', 'Pending', 'Approved', 'Rejected'];
    const employeeOptions = !!localStorage.getItem('employeeOptions')
      ? JSON.parse(localStorage.getItem('employeeOptions'))
      : [];
    console.log(
      params,
      activeEmployee,
      activeStatus,
      '%%%params in filter section'
    );
    return (
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 12 }}>
          Filter by Employee:
          <select
            name='filterByEmployee'
            value={activeEmployee}
            onChange={this.handleFilterChange}
          >
            <option value='employeeId'>None</option>
            {employeeOptions?.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Status:
          <select
            name='filterByStatus'
            value={activeStatus}
            onChange={this.handleFilterChange}
          >
            {statuses.map((stat) => (
              <option key={stat} value={stat.toLowerCase()}>
                {stat}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default withRouter(ManagerFilterSection);
