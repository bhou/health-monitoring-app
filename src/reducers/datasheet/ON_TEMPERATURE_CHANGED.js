export default function ON_TEMPERATURE_CHANGED(prevState, action) {
  let rowIndex = action.rowIndex;
  let value = action.value;

  // find current patient
  let patient = prevState.patients.find((patient) => {
    return patient.id === prevState.currentPatientId;
  });

  let editBuffer = patient.data[rowIndex].editBuffer;

  editBuffer.temperature = value;

  return prevState;
}

