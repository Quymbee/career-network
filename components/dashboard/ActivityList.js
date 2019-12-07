import React from 'react';
import Typography from '@material-ui/core/Typography';

import Activity from './Activity';
import FirebasePropTypes from '../Firebase/PropTypes';

export default function ActivityList(props) {
  const { activities } = props;

  return (
    <div>
      {!activities.length && <Typography color="textSecondary">None</Typography>}
      {activities.map(activity => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

ActivityList.propTypes = {
  activities: FirebasePropTypes.querySnapshot.isRequired,
};