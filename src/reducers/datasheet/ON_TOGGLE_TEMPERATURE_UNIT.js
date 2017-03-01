
export default function ON_TOGGLE_TEMPERATURE_UNIT(prevState, action) {
  let unit = prevState.settings.temperature_unit || 'C';

  prevState.settings.temperature_unit = unit.toUpperCase() === 'C' ? 'F' : 'C';

  return prevState;
}