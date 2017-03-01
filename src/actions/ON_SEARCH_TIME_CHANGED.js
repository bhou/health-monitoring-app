export default function ON_SEARCH_TIME_CHANGED (when, timestamp) {
  return {
    actionType: 'ON_SEARCH_TIME_CHANGED',
    when, // start or end
    timestamp
  }
}