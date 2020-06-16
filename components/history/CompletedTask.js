import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import DateCompleted from '../DateCompleted';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  group: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  label: {
    fontSize: 13,
    color: 'textSecondary',
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
  },
  description: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

function CompleteTask(props) {
  const classes = useStyles();

  const { categoryName, title, why, dateCompleted } = props;
  const category = categoryName && AirtablePropTypes.findTaskCategory(categoryName);

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <div className={classes.header}>
          {category && (
            <Chip
              size="small"
              label={category.name}
              className={classes.type}
              style={{ backgroundColor: category.color }}
            />
          )}
        </div>

        <Typography component="h1" variant="h5" className={classes.group}>
          {title}
        </Typography>
        <div>
          <Typography variant="subtitle2" component="h3" color="textSecondary" gutterBottom>
            Why?
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            {why}
          </Typography>
        </div>

        <Divider className={classes.divider} />
        <Grid container className={classes.group}>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Date Completed
            </Typography>
            <DateCompleted variant="body1" style={{ fontWeight: 500 }}>
              {dateCompleted}
            </DateCompleted>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CompleteTask.propTypes = {
  categoryName: PropTypes.string,
  dateCompleted: FirebasePropTypes.timestamp.isRequired,
  title: PropTypes.string.isRequired,
  why: PropTypes.string.isRequired,
};

CompleteTask.defaultProps = {
  categoryName: undefined,
};

export default CompleteTask;