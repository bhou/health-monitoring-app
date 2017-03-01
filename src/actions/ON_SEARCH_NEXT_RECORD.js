export default function ON_SEARCH_NEXT_RECORD (patientId) {
  return {
    actionType: 'ON_SEARCH_NEXT_RECORD',
    patientId,
  }
}