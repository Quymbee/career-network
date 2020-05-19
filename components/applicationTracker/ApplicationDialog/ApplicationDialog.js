import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, DialogActions } from '../../DialogComponents';

const APPLICATION_INITIAL_STATE = {
  jobTitle: '',
  company: '',
  dateApplied: '',
  notes: '',
};

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
}));

function ApplicationDialog({ open, applicationData, handleClose }) {
  const classes = useStyles();
  const [values, setValues] = useState(applicationData);
  const formId = 'application-form';

  const handleChange = event => {
    event.persist();
    setValues(prevValues => ({ ...prevValues, [event.target.name]: event.target.value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitting: ', values);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="application-dialog">
        <DialogTitle id="application-dialog" onClose={handleClose}>
          <Typography variant="h6">Add Application</Typography>
        </DialogTitle>
        <DialogContent>
          <form id={formId} onSubmit={handleSubmit}>
            <span>Job Title</span>
            <TextField
              autoFocus
              className={classes.textField}
              fullWidth
              id={`${formId}-job-title`}
              InputLabelProps={{ shrink: true }}
              inputProps={{ name: 'jobTitle' }}
              onChange={handleChange}
              placeholder="Enter the Job Title you applied for"
              type="text"
              value={values.jobTitle}
              variant="outlined"
            />
            <span>Company / Organization Name</span>
            <TextField
              autoFocus
              className={classes.textField}
              fullWidth
              id={`${formId}-org`}
              InputLabelProps={{ shrink: true }}
              inputProps={{ name: 'company' }}
              onChange={handleChange}
              placeholder="Enter the Company / Organization Name"
              type="text"
              value={values.company}
              variant="outlined"
            />
            <span>Date Applied</span>
            <TextField
              autoFocus
              className={classes.textField}
              fullWidth
              id={`${formId}-date-applied`}
              InputLabelProps={{ shrink: true }}
              inputProps={{ name: 'dateApplied' }}
              onChange={handleChange}
              placeholder="Select the Date Applied"
              type="date"
              value={values.dateApplied}
              variant="outlined"
            />
            <span>Note</span>
            <TextField
              autoFocus
              className={classes.textField}
              fullWidth
              id={`${formId}-notes`}
              InputLabelProps={{ shrink: true }}
              inputProps={{ name: 'notes' }}
              multiline
              onChange={handleChange}
              placeholder="Add any notes for future reference."
              rows={4}
              type="text"
              value={values.notes}
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            fullWidth
            type="submit"
            form={formId}
            size="large"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ApplicationDialog.propTypes = {
  applicationData: PropTypes.shape({
    jobTitle: PropTypes.string,
    company: PropTypes.string,
    dateApplied: PropTypes.instanceOf(Date),
    notes: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

ApplicationDialog.defaultProps = {
  applicationData: APPLICATION_INITIAL_STATE,
};

export default ApplicationDialog;
