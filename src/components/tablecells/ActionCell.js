import React from 'react';
import {Cell} from 'fixed-data-table';

import './ActionCell.css';

import config from '../../config';

import ON_EDIT_TABLE_ROW from '../../actions/ON_EDIT_TABLE_ROW';
import ON_DELETE_TABLE_ROW from '../../actions/ON_DELETE_TABLE_ROW';
import ON_CANCEL_EDIT_TABLE_ROW from '../../actions/ON_CANCEL_EDIT_TABLE_ROW';
import ON_ACCEPT_EDIT_TABLE_ROW from '../../actions/ON_ACCEPT_EDIT_TABLE_ROW';

class ActionCell extends React.Component {
  constructor(props) {
    super(props);
  }

  onEdit() {
    this.props.sensor.send(ON_EDIT_TABLE_ROW(this.props.rowIndex));
  }

  onDelete() {
    this.props.sensor.send(ON_DELETE_TABLE_ROW(this.props.rowIndex));
  }

  onAcceptEdit() {
    this.props.sensor.send(ON_ACCEPT_EDIT_TABLE_ROW(this.props.rowIndex));
  }

  onCancelEdit() {
    this.props.sensor.send(ON_CANCEL_EDIT_TABLE_ROW(this.props.rowIndex));
  }

  render() {
    this.domProps = Object.assign({}, this.props);
    delete this.domProps.sensor;
    const {rowIndex, data, ...props} = this.domProps;

    let editing = data[rowIndex].editing;
    if (editing === true) {
      return (
        <Cell {...props}>
          <img className="tabe-edit-btn" src={config.rootPath + "/images/success.png"}
               onClick={this.onAcceptEdit.bind(this)}/>
          <img className="tabe-edit-btn" src={config.rootPath + "/images/error.png"}
               onClick={this.onCancelEdit.bind(this)}/>
        </Cell>
      );
    }

    return (
      <Cell {...props}>
        <img className="tabe-edit-btn" onClick={this.onEdit.bind(this)} src={config.rootPath + "/images/edit.png"}/>
        <img className="tabe-edit-btn" onClick={this.onDelete.bind(this)} src={config.rootPath + "/images/garbage.png"}/>
      </Cell>
    );
  }
}

export default ActionCell;