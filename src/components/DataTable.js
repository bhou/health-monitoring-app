import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import './DataTable.css';

import DateTimeCell from './tablecells/DateTimeCell';
import TemperatureCell from './tablecells/TemperatureCell';
import PressureCell from './tablecells/PressureCell';
import ActionCell from './tablecells/ActionCell';

import TemperatureEditorCell from './tablecells/TemperatureEditorCell';
import PressureEditorCell from './tablecells/PressureEditorCell';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature_unit: 'F',
      blood_pressure_unit: 'mmHg',
      data: [],
    };
  }

  render() {
    let sensor = this.props.sensor;
    let tableData = this.props.data;
    return (
      <Table
        rowsCount={tableData.data.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={900}
        {...this.props}>
        <Column
          className="table-header"
          header={<Cell>Date Time</Cell>}
          cell={<DateTimeCell data={tableData.data}
                              field="timestamp"
                              sensor={sensor}/>}
          width={200}
        />
        <Column
          header={<Cell>Body Temperature</Cell>}
          cell={props => (
            tableData.data[props.rowIndex].editing ?
              <TemperatureEditorCell data={tableData.data} field="body_temperature" displayUnit={tableData.temperature_unit}
                                     sensor={sensor} {...props}/>
              : <TemperatureCell data={tableData.data} field="body_temperature" displayUnit={tableData.temperature_unit}
                                 sensor={sensor} {...props}/>
          )}
          width={200}
        />
        <Column
          header={<Cell>Systolic Blood Pressure</Cell>}
          cell={props => (
            tableData.data[props.rowIndex].editing ?
              <PressureEditorCell data={tableData.data} field="blood_pressure" type="systolic" displayUnit={tableData.blood_pressure_unit}
                              sensor={sensor} {...props}/>
              : <PressureCell data={tableData.data} field="blood_pressure" type="systolic" displayUnit={tableData.blood_pressure_unit}
                              sensor={sensor} {...props}/>
          )}
          width={200}
        />
        <Column
          header={<Cell>Diastolic Blood Pressure</Cell>}
          cell={props => (
            tableData.data[props.rowIndex].editing ?
              <PressureEditorCell data={tableData.data} field="blood_pressure" type="diastolic" displayUnit={tableData.blood_pressure_unit}
                                  sensor={sensor} {...props}/>
              : <PressureCell data={tableData.data} field="blood_pressure" type="diastolic" displayUnit={tableData.blood_pressure_unit}
                              sensor={sensor} {...props}/>
          )}
          width={200}
        />
        <Column
          header={<Cell>Action</Cell>}
          cell={<ActionCell data={tableData.data}
                            sensor={sensor}/>}
          width={110}
        />
      </Table>
    );
  }
}

export default DataTable;