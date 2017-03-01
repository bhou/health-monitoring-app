import React from 'react';
import {Cell} from 'fixed-data-table';

import './TableCell.css';

import ON_PRESSURE_CHANGED from '../../actions/ON_PRESSURE_CHANGED';

class PressureEditorCell extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    // TODO: convert unit to storage value
    let value = event.target.value;
    this.props.sensor.send(
      ON_PRESSURE_CHANGED(this.props.rowIndex, this.props.type, value)
    )
  }

  render() {
    this.domProps = Object.assign({}, this.props);
    delete this.domProps.sensor;
    const {rowIndex, field, data, type, displayUnit, ...props} = this.domProps;

    let typeField = type === 'diastolic' ? 'diastolic_blood_pressure' : 'systolic_blood_pressure';
    let value = data[rowIndex].editBuffer[typeField];
    let unit = data[rowIndex][field][typeField].unit;

    // TODO: convert unit to display unit
    let displayValue = value;

    return (
      <Cell {...props}>
        <input className="cell-editor" type="number" value={displayValue}
               onChange={this.handleChange.bind(this)}/> <span className="cell-unit">{displayUnit}</span>
      </Cell>
    );
  }
}

export default PressureEditorCell;

