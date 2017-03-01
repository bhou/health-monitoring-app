import backendProxy from '../../proxy';
import {convertCtoF, convertFtoC} from '../../utils/UnitConvertor';

export default function ON_ACCEPT_EDIT_TABLE_ROW(prevState, action, done) {
  let rowIndex = action.rowIndex;

  // find current patient
  let patient = prevState.patients.find((patient) => {
    return patient.id === prevState.currentPatientId;
  });

  let editBuffer = patient.data[rowIndex].editBuffer;

  if (isNaN(parseFloat(editBuffer.temperature))) {
    return prevState;
  }

  patient.data[rowIndex].editing = false;
  // convert unit
  let temperatureUnit = patient.data[rowIndex].body_temperature.unit;
  let settingTemperatureUnit = prevState.settings.temperature_unit;
  let temperatureValue = parseFloat(editBuffer.temperature);
  if (temperatureUnit !== settingTemperatureUnit) {
    temperatureValue = temperatureUnit.toUpperCase() === 'C' ?
      convertFtoC(temperatureValue) : convertCtoF(temperatureValue);
  }

  backendProxy.updateRecord(patient.id, patient.data[rowIndex].id,
    temperatureValue,
    editBuffer.systolic_blood_pressure,
    editBuffer.diastolic_blood_pressure,
    (err, result) => {
      patient.data[rowIndex].body_temperature.value = temperatureValue;
      patient.data[rowIndex].blood_pressure.diastolic_blood_pressure.value = editBuffer.diastolic_blood_pressure;
      patient.data[rowIndex].blood_pressure.systolic_blood_pressure.value = editBuffer.systolic_blood_pressure;
      done(null, prevState);
  });
}
