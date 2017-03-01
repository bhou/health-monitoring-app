export default function ON_PRESSURE_CHANGED(prevState, action) {
  let rowIndex = action.rowIndex;

  // find current patient
  let patient = prevState.patients.find((patient) => {
    return patient.id === prevState.currentPatientId;
  });

  let editBuffer = patient.data[rowIndex].editBuffer;

  if (action.type === 'diastolic') {
    editBuffer.diastolic_blood_pressure = action.value;
  } else {
    editBuffer.systolic_blood_pressure = action.value;
  }

  return prevState;
}
