import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';
import FindingJob from './FindingJob';
import ApplyForJob from './ApplyForJob';
import Health from './Health';

const useStyles = makeStyles(theme => ({
  navContainer: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
  },
  navText: {
    color: theme.palette.background.dark,
  },
  title: {
    fontWeight: 500,
    lineHeight: '4.25rem',
  },
  shape: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    marginTop: '50%',
    background: `linear-gradient(to right top, #304ffe, #ffffff 100%)`,
    borderRadius: '50%',
    width: 400,
    height: 400,
  },
  square: {
    marginTop: '50%',
    background: `linear-gradient(223.56deg, #FFFFFF -20.79%, rgba(255, 255, 255, 0) 100%), #F7CA48`,
    borderRadius: 4,
    width: 368,
    height: 368,
    opacity: 0.3,
  },
  triangle: {
    borderRadius: 4,
    margin: '0 auto',
    background: 'transparent',
    overflow: 'hidden',
    width: 346.4 /* height*sqrt(3)/2 */,
    height: 400,
    transform: `translateX(25%) translateY(25%) rotate(90deg) skewY(30deg)`,
    '&::before': {
      display: 'block',
      width: 'inherit',
      height: 'inherit',
      transform: `skewY(-30deg) rotate(60deg) translate(50%)`,
      background: `linear-gradient(255.76deg, #FFFFFF -21.08%, rgba(255, 255, 255, 0) 149.76%), #CC97E1`,
      backgroundSize: 'cover',
      content: '""',
    },
  },
  hoverBlock: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    borderLeftStyle: 'solid',
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.grey['50'],
      borderRadius: theme.spacing(0, 1, 1, 0),
      borderLeftColor: theme.palette.background.dark,
    },
  },
}));

const SHAPES = {
  CIRCLE: 'circle',
  SQUARE: 'square',
  TRIANGLE: 'triangle',
};

const SECTIONS = {
  FINDING_JOBS: 'findingJobs',
  APPLY_FOR_JOB: 'applyForJob',
  HEALTH: 'health',
};

export default function JobSearchBasics() {
  const classes = useStyles();
  const [shape, setShowShape] = useState();
  const findingJobSection = useRef(null);
  const applyForJobSection = useRef(null);
  const healthSection = useRef(null);

  const handleScrollTo = section => {
    const selectedSection = {
      [SECTIONS.FINDING_JOBS]: findingJobSection,
      [SECTIONS.APPLY_FOR_JOB]: applyForJobSection,
      [SECTIONS.HEALTH]: healthSection,
    }[section];

    selectedSection.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div>
      <ScaffoldContainer>
        <Grid className={classes.navContainer} container justify="center">
          <Grid item xs={12} sm={5} className={classes.navText}>
            <Typography className={classes.title} component="h1" variant="h3">
              The Basics
              <br />
              of a Successful
              <br />
              Job Search
            </Typography>
            <Box
              className={classes.hoverBlock}
              onClick={() => handleScrollTo(SECTIONS.FINDING_JOBS)}
              onMouseLeave={() => setShowShape()}
              onMouseEnter={() => setShowShape(SHAPES.CIRCLE)}
            >
              <Typography variant="h6">Finding Job Opportunities</Typography>
              <Typography variant="body1">
                Expand your approach to finding jobs that match your needs and interests.
              </Typography>
            </Box>
            <Box
              className={classes.hoverBlock}
              onClick={() => handleScrollTo(SECTIONS.APPLY_FOR_JOB)}
              onMouseLeave={() => setShowShape()}
              onMouseEnter={() => setShowShape(SHAPES.SQUARE)}
            >
              <Typography variant="h6">Applying for Jobs</Typography>
              <Typography variant="body1">
                Stand out in today’s crowded job market by telling your story effectively.
              </Typography>
            </Box>
            <Box
              className={classes.hoverBlock}
              onClick={() => handleScrollTo(SECTIONS.HEALTH)}
              onMouseLeave={() => setShowShape()}
              onMouseEnter={() => setShowShape(SHAPES.TRIANGLE)}
            >
              <Typography variant="h6">Taking Care of Yourself</Typography>
              <Typography variant="body1">
                To stay healthy and motivated — because there’s a whole lot more to you than what
                you do for work.
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} sm={5} justify="center">
            <div className={classes.shape}>{shape && <div className={classes[shape]} />}</div>
          </Grid>
        </Grid>
      </ScaffoldContainer>
      <FindingJob scrollToRef={findingJobSection} />
      <ApplyForJob scrollToRef={applyForJobSection} />
      <Health scrollToRef={healthSection} />
    </div>
  );
}
