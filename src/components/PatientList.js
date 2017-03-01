import React from 'react';
import './PatientList.css';

import PatientItem from './PatientItem';

class PatientList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let patientItems = this.props.data.patients.map((patient) => {
      return (<PatientItem key={patient.id} {...patient} selected={this.props.data.currentPatientId === patient.id} sensor={this.props.sensor}/>)
    });

    return (
      <div className="patient-list">
        <div className="patient-list-header"></div>
        <div className="patient-list-body">
          {patientItems}
        </div>
      </div>
    )
  }
}

export default PatientList;
