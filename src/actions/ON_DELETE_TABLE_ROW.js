export default function ON_DELETE_TABLE_ROW(rowIndex) {
  return {
    actionType: 'ON_DELETE_TABLE_ROW',
    rowIndex,
  }
}
