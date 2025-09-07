import { makeAutoObservable } from 'mobx';

function createAuthStore() {
  return makeAutoObservable({
    userInfo: {
      name: '',
      id: '',
      role: '',
      email: '',
      managerId: ''
    },
    leaveDetails: {
      totalLeaves: 0,
      totalLeavesList: []
    },
    setUserInfo(userInfo) {
      this.userInfo = { ...userInfo };
    },
    setLeaveDetails(leaveDetails) {
      this.leaveDetails = { ...leaveDetails };
    },
    updateLeaveDetails(appliedLeave) {
      if (this.leaveDetails.totalLeaves > 0) {
        this.leaveDetails.totalLeaves -= 1;
        this.leaveDetails.totalLeavesList.push(appliedLeave);
      }
    },
    updateLeaveStatusByManger(index, status) {
      const leaveList = this.leaveDetails.totalLeavesList;
      if (leaveList[index]) {
        leaveList[index].status = status === 'A' ? 'Approved' : 'Rejected';
        this.leaveDetails.totalLeavesList = [...leaveList];
      }
    },
    clearStore() {
      this.userInfo = {
        name: '',
        id: '',
        role: '',
        email: '',
        managerId: ''
      };
      this.leaveDetails = {
        totalLeaves: 0,
        totalLeavesList: []
      };
    }
  });
}

export const authStore = createAuthStore();
