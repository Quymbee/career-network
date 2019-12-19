import PropTypes from 'prop-types';
import React from 'react';

import { isDone } from '../../src/app-helper';
import Action from './Action';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';

export default function ActionList(props) {
  const { actions, actionDispositionEvents, onAllDone, ...restProps } = props;
  const onDone = (action, i) => {
    // last action in the task
    if (i === actions.length - 1) {
      onAllDone();
    }
  };

  return (
    <div>
      <ol>
        {actions.map((action, i) => (
          <Action
            key={action.id}
            action={action}
            disabled={i > 0 && !isDone(actions[i - 1], actionDispositionEvents, 'actionId')}
            isDone={isDone(action, actionDispositionEvents, 'actionId')}
            onDone={() => onDone(action, i)}
            {...restProps}
          />
        ))}
      </ol>
    </div>
  );
}

ActionList.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  actionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
  onAllDone: PropTypes.func.isRequired,
};
