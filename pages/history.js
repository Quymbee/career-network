import React from 'react';
import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection, useCompletedTasks } from '../components/Firebase';
import History from '../components/history/History';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function HistoryPage() {
  const { user } = useAuth();
  const allUserActivities = useUserSubcollection('activityLogEntries');
  const completedTasks = useCompletedTasks();

  return fullyLoaded(user, allUserActivities, completedTasks) ? (
    <History activities={allUserActivities} completedTasks={completedTasks} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(HistoryPage, 'Your History'));