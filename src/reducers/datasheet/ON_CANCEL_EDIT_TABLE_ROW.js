export default function ON_CANCEL_EDIT_TABLE_ROW(prevState, action) {
  let rowIndex = action.rowIndex;

  // find current patient
  let patient = prevState.patients.find((patient) => {
    return patient.id === prevState.currentPatientId;
  });

  patient.data[rowIndex].editing = false;

  return prevState;
}
