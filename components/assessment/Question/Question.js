import React, { useState } from 'react';

import { useAuth } from '../../Auth';
import AirtablePropTypes from '../../Airtable/PropTypes';
import BinaryQuestion from './BinaryQuestion';
import FirebasePropTypes from '../../Firebase/PropTypes';
import OptionQuestion from './OptionQuestion';
import TextQuestion from './TextQuestion';

function getDefaultValue(responseType) {
  switch (responseType) {
    case 'Text':
    case 'Number':
    case 'Email':
    case 'Option':
      return '';
    case 'Binary':
      return false;
    default:
      return undefined;
  }
}

export default function Question(props) {
  const { userDocRef } = useAuth();
  const { question, allQuestionResponseOptions, allQuestionResponses } = props;
  const responseType = question.fields['Response Type'];

  const response = allQuestionResponses.find(doc => doc.id === question.id);
  const persistedValue = response && response.data().value;
  const defaultValue = getDefaultValue(responseType);
  const [value, setValue] = useState(persistedValue || defaultValue);

  const { 'Response Options': responseOptionIds } = question.fields;
  const responseOptions = responseOptionIds
    && allQuestionResponseOptions.filter(responseOption => (
      responseOptionIds.includes(responseOption.id)
    ));

  const persistValue = async (_value) => {
    const docRef = userDocRef.collection('questionResponses').doc(question.id);
    const data = { question, value: _value };

    if (responseOptions) {
      Object.assign(data, { responseOptions });
    }

    try {
      return docRef.set(data);
    } catch (error) {
      // TODO: better error UX, and reporting solution
      // eslint-disable-next-line no-alert
      alert(`There was a problem saving your data:\n\n${error.message}`);
      throw error;
    }
  };

  const commonProps = {
    question,
    value,
  };

  const textQuestionProps = {
    ...commonProps,
    onChange: _value => setValue(_value),
    onBlur: _value => persistValue(_value),
  };

  const nonTextQuestionProps = {
    ...commonProps,
    onChange: (_value) => {
      setValue(_value);
      persistValue(_value);
    },
  };

  switch (responseType) {
    case 'Text':
      return <TextQuestion {...textQuestionProps} />;
    case 'Number':
      return <TextQuestion {...textQuestionProps} type="number" />;
    case 'Email':
      return <TextQuestion {...textQuestionProps} type="email" autoComplete="email" />;
    case 'Binary':
      return <BinaryQuestion {...nonTextQuestionProps} />;
    case 'Option':
      return <OptionQuestion {...nonTextQuestionProps} responseOptions={responseOptions} />;
    default:
      return null;
  }
}

Question.propTypes = {
  question: AirtablePropTypes.question.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
};
