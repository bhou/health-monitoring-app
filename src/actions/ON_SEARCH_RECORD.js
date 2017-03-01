export default function ON_SEARCH_RECORD (patientId) {
  return {
    actionType: 'ON_SEARCH_RECORD',
    patientId,
  }
}