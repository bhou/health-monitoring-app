import React from 'react';
import {Cell} from 'fixed-data-table';

import './TableCell.css';

class PressureCell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    this.domProps = Object.assign({}, this.props);
    delete this.domProps.sensor;
    const {rowIndex, field, data, type, displayUnit, ...props} = this.domProps;

    let typeField = type === 'diastolic' ? 'diastolic_blood_pressure' : 'systolic_blood_pressure';
    let value = data[rowIndex][field][typeField].value;
    let unit = data[rowIndex][field][typeField].unit;

    // TODO: convert unit to display unit
    let displayValue = value;

    return (
      <Cell {...props}>
        {displayValue} <span className="cell-unit">{displayUnit}</span>
      </Cell>
    );
  }
}

export default PressureCell;
