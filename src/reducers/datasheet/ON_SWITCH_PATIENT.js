import backendProxy from '../../proxy';
export default function ON_SWITCH_PATIENT (prevState, action, done) {
  prevState.currentPatientId = action.id;

  let startTime = prevState.datasheet.from;
  let endTime = prevState.datasheet.to;
  prevState.datasheet.page = 0;
  let count = prevState.datasheet.count;
  let offset = prevState.datasheet.page * count;

  // get patient data
  backendProxy.getPatientData(action.id,
    startTime, endTime,
    offset, count, (err, records) => {
      // find current patient
      let patient = prevState.patients.find((patient) => {
        return patient.id === prevState.currentPatientId;
      });

      patient.data = records;

      done(null, prevState);
    })
  ;
}
