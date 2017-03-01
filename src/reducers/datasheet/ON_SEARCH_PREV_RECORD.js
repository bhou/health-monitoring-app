import backendProxy from '../../proxy';

export default function ON_SEARCH_PREV_RECORD (prevState, action, done) {
  let patientId = prevState.currentPatientId;
  let startTime = prevState.datasheet.from;
  let endTime = prevState.datasheet.to;
  prevState.datasheet.page--;
  let count = prevState.datasheet.count;
  let offset = prevState.datasheet.page * count;

  // get patient data
  backendProxy.getPatientData(patientId,
    startTime, endTime,
    offset, count, (err, records) => {
      // find current patient
      let patient = prevState.patients.find((patient) => {
        return patient.id === prevState.currentPatientId;
      });

      patient.data = records;

      done(null, prevState);
    });
}