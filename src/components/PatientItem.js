import React from 'react';
import './PatientItem.css';

import ON_SWITCH_PATIENT from '../actions/ON_SWITCH_PATIENT';

class PatientItem extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickPatient() {
    this.props.sensor.send(ON_SWITCH_PATIENT(this.props.id));
  }

  render() {
    return (
      <div className={this.props.selected ? 'patient-list-item patient-list-item-selected' : 'patient-list-item'}
        onClick={this.onClickPatient.bind(this)}>
        <img src={this.props.photo} onClick={this.onClickPatient.bind(this)}/>
        <div>{this.props.name}</div>
      </div>
    )
  }
}

export default PatientItem;
