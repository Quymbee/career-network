import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth, withAuthRequired } from '../components/Auth';
import ScaffoldContainer from '../components/ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(10),
  },
}));

function Dashboard() {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography>{user ? user.displayName : 'Logged Out'}</Typography>
      </ScaffoldContainer>
    </div>
  );
}

export default withAuthRequired(Dashboard);
