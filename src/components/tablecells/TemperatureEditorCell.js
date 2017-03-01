import React from 'react';
import {Cell} from 'fixed-data-table';
import {convertCtoF, convertFtoC} from '../../utils/UnitConvertor';

import ON_TEMPERATURE_CHANGED from '../../actions/ON_TEMPERATURE_CHANGED';

import './TableCell.css';

class TemperatureEditorCell extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    const {displayUnit} = this.props;

    let value = event.target.value;

    this.props.sensor.send(
      ON_TEMPERATURE_CHANGED(this.props.rowIndex, value, displayUnit)
    )
  }

  render() {
    this.domProps = Object.assign({}, this.props);
    delete this.domProps.sensor;
    const {rowIndex, field, data, displayUnit, ...props} = this.domProps;

    let value = data[rowIndex].editBuffer.temperature;
    let unit = data[rowIndex][field].unit;

    return (
      <Cell {...props}>
        <input className="cell-editor" type="number" value={value}
          onChange={this.handleChange.bind(this)}/> <span className="cell-unit">{displayUnit}</span>
      </Cell>
    );
  }
}

export default TemperatureEditorCell;
