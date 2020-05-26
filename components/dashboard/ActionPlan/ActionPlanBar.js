import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import startOfWeek from 'date-fns/startOfWeek';
import Typography from '@material-ui/core/Typography';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FirebasePropTypes from '../../Firebase/PropTypes';
import { useAuth } from '../../Auth';

const PLAN_COLORS = {
  goal: '#1980c8',
  activity: '#f29a38',
  application: '#7ea94f',
};

const ACTION_PLAN_DEFAULT = {
  goals: 1,
  activities: 1,
  applications: 1,
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2, 2),
    },
    marginBottom: theme.spacing(8),
  },
  iconContainer: {
    border: `3px solid`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(1),
  },
  buttonLabel: {
    justifyContent: 'left',
    margin: theme.spacing(0.5, 3, 0.5),
  },
  text: {
    textTransform: 'none',
    textAlign: 'left',
    marginLeft: theme.spacing(1),
  },
}));

function ActionPlanBar({ userStats, actionPlan }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();

  // reset actionPlan and weekly stats on Monday
  const todaysDate = new Date();
  const sow = startOfWeek(todaysDate, { weekStartsOn: 1 }).getTime() / 1000;
  const currentTime = todaysDate.getTime() / 1000;
  if (
    !actionPlan ||
    !actionPlan.lastUpdatedTimestamp ||
    (actionPlan.lastUpdatedTimestamp.seconds < sow && sow < currentTime)
  ) {
    const initialPlan = {
      ...ACTION_PLAN_DEFAULT,
      lastUpdatedTimestamp: new Date(),
    };
    userDocRef.set({ actionPlan: initialPlan }, { merge: true });

    const weeklyStats = {
      activities: 0,
      goals: 0,
      applications: 0,
      activitiesLatestTimestamp: new Date(),
      tasksLatestTimestamp: new Date(),
      applicationsLatestTimestamp: new Date(),
      showCelebration: true,
    };

    userDocRef.set({ weeklyStats }, { merge: true });
  }

  return (
    <Paper className={classes.paper} elevation={3} data-intercom="sentiment-container">
      <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={1}>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/progress">
            <Button
              classes={{ label: classes.buttonLabel }}
              fullWidth
              style={{ backgroundColor: fade(PLAN_COLORS.goal, 0.08) }}
              startIcon={
                <div
                  className={classes.iconContainer}
                  style={{ color: PLAN_COLORS.goal, borderColor: PLAN_COLORS.goal }}
                >
                  <VpnKeyIcon />
                </div>
              }
            >
              <Box>
                <Typography className={classes.text} variant="h6">
                  <span style={{ color: PLAN_COLORS.goal }}>
                    <b>{userStats.goals || 0}</b>
                  </span>
                  <span style={{ fontWeight: 400 }}> of {actionPlan.goals || 0}</span>
                </Typography>
                <Typography className={classes.text} variant="body2">
                  Goals Completed this Week
                </Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/progress">
            <Button
              classes={{ label: classes.buttonLabel }}
              fullWidth
              style={{ backgroundColor: fade(PLAN_COLORS.activity, 0.08) }}
              startIcon={
                <div
                  className={classes.iconContainer}
                  style={{ borderColor: PLAN_COLORS.activity, color: PLAN_COLORS.activity }}
                >
                  <AssignmentTurnedInIcon />
                </div>
              }
            >
              <Box>
                <Typography className={classes.text} variant="h6">
                  <span style={{ color: PLAN_COLORS.activity }}>
                    <b>{userStats.activities || 0}</b>
                  </span>
                  <span style={{ fontWeight: 400 }}> of {actionPlan.activities || 0}</span>
                </Typography>
                <Typography className={classes.text} variant="body2">
                  Activities Logged this Week
                </Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/application-tracker">
            <Button
              classes={{ label: classes.buttonLabel }}
              fullWidth
              style={{ backgroundColor: fade(PLAN_COLORS.application, 0.08) }}
              startIcon={
                <div
                  className={classes.iconContainer}
                  style={{ borderColor: PLAN_COLORS.application, color: PLAN_COLORS.application }}
                >
                  <NextWeekIcon />
                </div>
              }
            >
              <Box>
                <Typography className={classes.text} variant="h6">
                  <span style={{ color: PLAN_COLORS.application }}>
                    <b>{userStats.applications || 0}</b>
                  </span>
                  <span style={{ fontWeight: 400 }}> of {actionPlan.applications || 0}</span>
                </Typography>
                <Typography className={classes.text} variant="body2">
                  Applications Added this Week
                </Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
      </Grid>
    </Paper>
  );
}

ActionPlanBar.propTypes = {
  userStats: PropTypes.shape({
    activities: PropTypes.number,
    goals: PropTypes.number,
    applications: PropTypes.number,
  }),
  actionPlan: PropTypes.shape({
    goals: PropTypes.number,
    activities: PropTypes.number,
    applications: PropTypes.number,
    lastUpdatedTimestamp: FirebasePropTypes.timestamp.isRequired,
  }),
};

ActionPlanBar.defaultProps = {
  userStats: {
    activities: 0,
    goals: 0,
    applications: 0,
  },
  actionPlan: {
    goals: 0,
    activities: 0,
    applications: 0,
    lastUpdatedTimestamp: null,
  },
};

export default ActionPlanBar;
