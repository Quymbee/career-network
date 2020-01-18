import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../Auth';
import { useSnackbar } from '../Snackbar';
import useIsSentimentSubmittedToday from '../Firebase/useIsSentimentSubmittedToday';
import EmojiCircle from './EmojiCircle';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(5, 4, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2, 2),
    },
    marginBottom: theme.spacing(8),
  },
  buttons: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    maxWidth: '75%',
  },
}));

const EmojiButton = ({ emoji, label, onClick }) => {
  const handleClick = () => {
    onClick({ emoji, label });
  };

  return (
    <Grid item style={{ textAlign: 'center' }}>
      <Button onClick={handleClick} data-intercom={`sentiment-${label.toLowerCase()}`}>
        <Box m={1} align="center">
          <span aria-label={label}>
            <EmojiCircle emoji={emoji} />
          </span>
          <br />
          {label}
        </Box>
      </Button>
    </Grid>
  );
};

EmojiButton.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SentimentTracker = () => {
  const { userDocRef } = useAuth();
  const [hidden, setHidden] = useState(false);
  const isAlreadySubmittedToday = useIsSentimentSubmittedToday();
  const showMessage = useSnackbar();
  const { user } = useAuth();

  const classes = useStyles();
  if (isAlreadySubmittedToday || hidden) {
    return null;
  }

  const submitSentiment = sentiment => {
    const data = {
      timestamp: new Date(),
      ...sentiment,
    };

    userDocRef.collection('sentimentEvents').add(data);
    window.Intercom('trackEvent', 'logged-sentiment', sentiment);
    window.Intercom('update', {
      'last-mood': sentiment.emoji,
      'last-sentiment': sentiment.label,
    });
    showMessage(`Thank you for sharing, ${user.firstName}`);
    setHidden(true);
  };

  const sentiments = [
    { emoji: '😩', label: 'Worried' },
    { emoji: '😔', label: 'Discouraged' },
    { emoji: '🙂', label: 'Okay' },
    { emoji: '😃', label: 'Hopeful' },
    { emoji: '😎', label: 'Motivated' },
  ];

  return (
    <Paper className={classes.paper} elevation={3} data-intercom="sentiment-container">
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={12} sm={3} md={3}>
          <Typography component="h4" variant="h6" align="center">
            How are you feeling today?
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={7}
          md={7}
          container
          item
          className={classes.buttons}
          justify="space-between"
          alignItems="center"
        >
          {sentiments.map(sentiment => (
            <EmojiButton {...sentiment} key={sentiment.label} onClick={submitSentiment} />
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SentimentTracker;
