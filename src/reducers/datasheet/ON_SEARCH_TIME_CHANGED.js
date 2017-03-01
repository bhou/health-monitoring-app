import moment from 'moment';

export default function ON_SWITCH_PATIENT (prevState, action) {
  let when = action.when;

  if (when === 'start') {
    prevState.datasheet.from = moment(action.timestamp);
  } else {
    prevState.datasheet.to = moment(action.timestamp);
  }

  return prevState;
}

