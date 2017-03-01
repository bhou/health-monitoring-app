import backendProxy from '../../proxy';
import {convertCtoF, convertFtoC} from '../../utils/UnitConvertor';

export default function ON_DELETE_TABLE_ROW(prevState, action, done) {
  let rowIndex = action.rowIndex;

  // find current patient
  let patient = prevState.patients.find((patient) => {
    return patient.id === prevState.currentPatientId;
  });

  // TODO: find the original index from patient data (when sorting is enabled)
  let index = rowIndex;

  backendProxy.deleteRecord(patient.id, patient.data[rowIndex].id, (error, result) => {
    patient.data.splice(index, 1);
    done(null, prevState);
  });
}
