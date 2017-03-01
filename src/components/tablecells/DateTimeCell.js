import React from 'react';
import {Cell} from 'fixed-data-table';
import moment from 'moment';


function format(value) {
  var date = new Date(value);

  return moment(value).format('DD/MM/YYYY kk:mm');
}

class DateTimeCell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    this.domProps = Object.assign({}, this.props);
    delete this.domProps.sensor;
    const {rowIndex, field, data, ...props} = this.domProps;

    let value = data[rowIndex][field];

    // format value
    let formattedValue = format(value);

    return (
      <Cell {...props}>
        {formattedValue}
      </Cell>
    );
  }
}

export default DateTimeCell;