import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import DateCompleted from '../DateCompleted';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardHeaderTitle: {
    fontSize: '1.2rem',
    paddingBottom: theme.spacing(1),
  },
  cardContent: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function ProgressFeedItem(props) {
  const classes = useStyles();
  const { title, subheader, date, timeSpentInMinutes, icon } = props;

  return (
    <Card className={classes.card} data-intercom="progress-feed-item">
      <CardHeader
        title={
          <Grid container justify="space-between">
            <Typography variant="body2">{subheader}</Typography>
          </Grid>
        }
        titleTypographyProps={{ component: 'h2' }}
        subheader={
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        }
        classes={{ title: classes.cardHeaderTitle }}
      />
      <CardContent className={classes.cardContent}>
        <Divider className={classes.divider} />
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <DateCompleted variant="body2">{date}</DateCompleted>
          </Grid>
          <Grid item>
            {timeSpentInMinutes && (
              <Typography variant="body2">
                <span role="img" aria-label="Clock">
                  🕒
                </span>
                {timeSpentInMinutes} Minutes
              </Typography>
            )}
            {icon}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ProgressFeedItem.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  date: FirebasePropTypes.timestamp.isRequired,
  timeSpentInMinutes: PropTypes.number,
  icon: PropTypes.element,
};

ProgressFeedItem.defaultProps = {
  icon: null,
  timeSpentInMinutes: null,
};
