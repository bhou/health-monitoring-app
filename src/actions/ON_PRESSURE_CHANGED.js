export default function ON_PRESSURE_CHANGED(rowIndex, type, value) {
  return {
    actionType: 'ON_PRESSURE_CHANGED',
    rowIndex,
    type,
    value
  }
}