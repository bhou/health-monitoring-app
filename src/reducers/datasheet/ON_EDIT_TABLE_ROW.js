import {convertCtoF, convertFtoC} from '../../utils/UnitConvertor';

export default function ON_EDIT_TABLE_ROW(prevState, action) {
  let rowIndex = action.rowIndex;

  // find current patient
  let patient = prevState.patients.find((patient) => {
    return patient.id === prevState.currentPatientId;
  });

  patient.data[rowIndex].editing = true;

  // convert unit here for display
  let temperatureUnit = patient.data[rowIndex].body_temperature.unit;
  let settingTemperatureUnit = prevState.settings.temperature_unit;

  let temperatureValue = patient.data[rowIndex].body_temperature.value;
  if (temperatureUnit !== settingTemperatureUnit) {
    temperatureValue = settingTemperatureUnit.toUpperCase() === 'C' ?
      convertFtoC(temperatureValue) : convertCtoF(temperatureValue);
  }

  // copy the info into editBuf
  patient.data[rowIndex].editBuffer = {
    temperature: temperatureValue,
    diastolic_blood_pressure: patient.data[rowIndex].blood_pressure.diastolic_blood_pressure.value,
    systolic_blood_pressure: patient.data[rowIndex].blood_pressure.systolic_blood_pressure.value
  };

  return prevState;
}
