import React from 'react';
import './PatientInfo.css';

class PatientInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let patient = this.props.info;
    return (
      <div className="patient-info-section">
        <div className="patient-photo">
          <img src={patient.photo}/>
        </div>
        <div className="patient-info">
          <div className="patient-info-item"><span>Name:</span> {patient.name}</div>
          <div className="patient-info-item"><span>Gender:</span> {patient.gender}</div>
          <div className="patient-info-item"><span>Age:</span> {patient.age}</div>
          <div className="patient-info-item"><span>Blood Type:</span> {patient.blood_type}</div>
        </div>
      </div>
    )
  }
}

export default PatientInfo;
