import backendProxy from '../../proxy';

export default function ON_SEARCH_NEXT_RECORD (prevState, action, done) {
  let patientId = prevState.currentPatientId;
  let startTime = prevState.datasheet.from;
  let endTime = prevState.datasheet.to;

  // find current patient
  let patient = prevState.patients.find((patient) => {
    return patient.id === prevState.currentPatientId;
  });

  // prevent multiple clicks before server response
  if (prevState.datasheet.page * prevState.datasheet.count <= patient.data.length) {
    prevState.datasheet.page++;
  }

  let count = prevState.datasheet.count;
  let offset = prevState.datasheet.page * count;

  // get patient data
  backendProxy.getPatientData(patientId,
    startTime, endTime,
    offset, count, (err, records) => {
      patient.data = records;

      done(null, prevState);
    });
}