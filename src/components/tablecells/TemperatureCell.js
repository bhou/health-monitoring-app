import React from 'react';
import {Cell} from 'fixed-data-table';
import {convertCtoF, convertFtoC} from '../../utils/UnitConvertor';

import './TableCell.css';

class TemperatureCell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    this.domProps = Object.assign({}, this.props);
    delete this.domProps.sensor;
    const {rowIndex, field, data, displayUnit, ...props} = this.domProps;

    let value = data[rowIndex][field].value;
    let unit = data[rowIndex][field].unit;

    // convert unit to display unit
    let displayValue = value;
    if (displayUnit !== unit) {
      displayValue = displayUnit.toUpperCase() === 'C' ? convertFtoC(value) : convertCtoF(value);
    }

    return (
      <Cell {...props}>
        {displayValue} <span className="cell-unit">{displayUnit}</span>
      </Cell>
    );
  }
}

export default TemperatureCell;