import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from '../stores/authStore';

const EmployeeNavBar = observer(() => {
  return (
    <div>
      <NavLink to='/apply-leave'>Apply Leave</NavLink>
      <NavLink to='/my-leaves'>My Leaves</NavLink>
      <div>Leave Balance: {authStore.leaveDetails.totalLeaves}</div>
    </div>
    // <AppContext.Consumer>
    //   {(context) => {
    //     console.log(context.authStore.userInfo.email, '%%%%%%%%%%%%%%%%%%5');
    //     return (
    //       <div>
    //         <NavLink to='/apply-leave'>Apply Leave</NavLink>
    //         <NavLink to='/my-leaves'>My Leaves</NavLink>
    //         <div>Total Leaves: {context.authStore.userInfo.totalLeaves} |</div>
    //       </div>
    //     );
    //   }}

    // </AppContext.Consumer>
  );
});

export default EmployeeNavBar;
