import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { format, compareDesc, isSameMonth, isSameYear } from 'date-fns';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Activity from './Activity';
import CompletedTask from './CompletedTask';
import HistoryPropTypes from './PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';

import AirtablePropTypes from '../Airtable/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  pageHeader: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    fontWeight: theme.typography.fontWeightMedium,
  },
  listItem: {
    marginTop: theme.spacing(2),
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  calendarIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function History(props) {
  const isInMonthYear = (date, monthYear) =>
    isSameMonth(date, monthYear) && isSameYear(date, monthYear);
  const classes = useStyles();
  const { activities, completedTasks } = props;
  let activityMonths = [];
  let cards = [];

  const categoryOptions = Object.keys(AirtablePropTypes.TASK_CATEGORIES).map(category => {
    return {
      label: category,
      isSelected: true,
    };
  });

  const activitiesTemp = activities.map(a => {
    const { dateCompleted, ...activity } = a.data();
    return {
      ...activity,
      dateCompleted,
      dateCmp: dateCompleted.toDate(),
      component: Activity,
      id: a.id,
    };
  });

  const tasksTemp = completedTasks.map(taskEvent => {
    const { task, timestamp } = taskEvent.data();
    return {
      ...task,
      categoryName: task.fields.Category,
      title: task.fields.Task,
      why: task.fields.Why,
      dateCompleted: timestamp,
      dateCmp: timestamp.toDate(),
      timestamp,
      component: CompletedTask,
      id: taskEvent.id,
    };
  });

  cards = [...activitiesTemp, ...tasksTemp].sort((a, b) =>
    compareDesc(new Date(a.dateCmp), new Date(b.dateCmp))
  );
  activityMonths = cards
    .map(c => c.dateCmp)
    .reduce((datesArr, current) => {
      const date = format(current, 'MMMM y');
      return !datesArr.includes(date) ? [...datesArr, date] : datesArr;
    }, []);

  const handleChange = label => event => {
    const index = categoryOptions.findIndex(option => option.label === label);
    categoryOptions[index].isSelected = event.target.checked;
  };

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper>
              <Typography variant="h5" component="h5" className={classes.pageHeader}>
                Filter List By...
              </Typography>
              <FormControl>
                <FormGroup>
                  {categoryOptions.map(option => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onChange={handleChange(option.label)}
                          value="primary"
                          label={option.label}
                        />
                      }
                      label={AirtablePropTypes.TASK_CATEGORIES[option.label].name}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h5" className={classes.pageHeader}>
              All Progress
            </Typography>
            {activityMonths.map(dateString => (
              <div key={dateString}>
                <div className={classes.sectionHeader}>
                  <CalendarIcon className={classes.calendarIcon} fontSize="small" />
                  <Typography
                    variant="subtitle2"
                    display="inline"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {dateString}
                  </Typography>
                </div>
                <Grid container direction="row" justify="center" alignItems="flex-start">
                  {cards
                    .filter(card => isInMonthYear(card.dateCmp, new Date(dateString)))
                    .map(card => (
                      <Grid key={card.id} item xs={12} className={classes.listItem}>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <card.component {...card} />
                      </Grid>
                    ))}
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

History.propTypes = HistoryPropTypes;
