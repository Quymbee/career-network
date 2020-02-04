import FirebasePropTypes from '../Firebase/PropTypes';

export default {
  activities: FirebasePropTypes.querySnapshot,
  completedTasks: FirebasePropTypes.querySnapshot,
  allActivityLogEntries: FirebasePropTypes.querySnapshot,
  confidentActivityLogEntries: FirebasePropTypes.querySnapshot,
};
