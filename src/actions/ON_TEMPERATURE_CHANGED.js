export default function ON_TEMPERATURE_CHANGED(rowIndex, value, unit) {
  return {
    actionType: 'ON_TEMPERATURE_CHANGED',
    rowIndex,
    value,
    unit
  }
}