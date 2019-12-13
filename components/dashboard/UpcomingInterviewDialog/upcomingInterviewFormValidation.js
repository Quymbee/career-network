import isEmpty from 'lodash/isEmpty';

const upcomingInterviewValidation = values => {
  const errors = {};

  if (isEmpty(values.type)) errors.type = 'Please select interview type.';
  if (isEmpty(values.date)) errors.date = 'Please select interview date.';
  if (isEmpty(values.company)) errors.company = 'Company is required.';
  if (isEmpty(values.role)) errors.role = 'Role is required.';

  return errors;
};

export default upcomingInterviewValidation;
