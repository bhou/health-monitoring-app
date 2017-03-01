import React from 'react';
import './DataTableView.css';

import Toggle from 'react-toggle';
import DateTime from 'react-datetime';
import './DateTimeCtrl.css';

import moment from 'moment';

import DataTable from './DataTable';
import PatientList from './PatientList';
import PatientInfo from './PatientInfo';

import RENDER from '../actions/RENDER';
import ON_LOGOUT from '../actions/ON_LOGOUT';
import ON_TOGGLE_TEMPERATURE_UNIT from '../actions/ON_TOGGLE_TEMPERATURE_UNIT';
import ON_SEARCH_TIME_CHANGED from '../actions/ON_SEARCH_TIME_CHANGED';
import ON_SEARCH_RECORD from '../actions/ON_SEARCH_RECORD';
import ON_SEARCH_NEXT_RECORD from '../actions/ON_SEARCH_NEXT_RECORD';
import ON_SEARCH_PREV_RECORD from '../actions/ON_SEARCH_PREV_RECORD';

class DataTableView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      from: moment(),
      to: moment(),
      page: 0,
      count: 10,
      temperature_unit: 'F',
      blood_pressure_unit: 'mmHg',
      currentPatientId: '1235674889',
      patients: [
      ],
      data: [
      ]
    };
  }

  getTableData() {
    return {
      temperature_unit: this.state.temperature_unit,
      blood_pressure_unit: this.state.blood_pressure_unit,
      data: this.state.data,
    }
  }

  getPatientList() {
    return {
      patients: this.state.patients,
      currentPatientId: this.state.currentPatientId,
    }
  }

  getCurrentPatient() {
    let currentPatient = this.state.patients.find((patient) => {
      return patient.id === this.state.currentPatientId;
    });

    if (!currentPatient) {
      return {
        photo: '/images/user.png'
      }
    }
    return currentPatient;
  }

  onChangeTemperatureUnit() {
    this.props.sensor.send(ON_TOGGLE_TEMPERATURE_UNIT());
  }

  onChangeStartTime(momentTime) {
    this.props.sensor.send(ON_SEARCH_TIME_CHANGED('start', momentTime.valueOf()));
  }

  onChangeEndTime(momentTime) {
    this.props.sensor.send(ON_SEARCH_TIME_CHANGED('end', momentTime.valueOf()));
  }

  onSearch() {
    this.props.sensor.send(ON_SEARCH_RECORD(this.state.currentPatientId));
  }

  onSearchPrev() {
    this.props.sensor.send(ON_SEARCH_PREV_RECORD(this.state.currentPatientId));
  }

  onSearchNext() {
    this.props.sensor.send(ON_SEARCH_NEXT_RECORD(this.state.currentPatientId));
  }

  onLogout() {
    this.props.sensor.send(ON_LOGOUT());
  }

  onSwitchToChartView() {
    this.props.sensor.send(RENDER('/chart'));
  }

  render() {
    let sensor = this.props.sensor;
    let tableData = this.getTableData();
    let patientData = this.getPatientList();
    let currentPatient = this.getCurrentPatient();

    const borderRadiusStyle = { borderRadius: 2 }
    return (
      <div className="datasheet-view">
        <div className="view-header">
          <h4 className="logo">Health Monitoring Console</h4>
          <div className="user">
            <div className="user-name">Welcome, {this.state.user && this.state.user.username}</div>
            <button className="press logout-btn"
              onClick={this.onLogout.bind(this)}>Logout</button>
          </div>
        </div>
        <div className="view-body">
          <div className="view-sidebar">
            <PatientList data={patientData} sensor={this.props.sensor}/>
          </div>
          <div className="view-content">
            <div className="view-general-info">
              <PatientInfo info={currentPatient}/>
              <div className="settings">
                <div className="settings-temperature-unit">
                  <label>C</label>
                  <Toggle
                    className="temperature-unit-checkbox"
                    defaultChecked={this.state.temperature_unit.toUpperCase() === 'F'}
                    icons={false}
                    onChange={this.onChangeTemperatureUnit.bind(this)} />
                  <label>F</label>
                </div>
              </div>
            </div>
            <div className="table">
              <div className="table-search">
                <div className="table-search-zone">
                  <div className="table-search-criteria">
                    <span>From:&nbsp;</span>
                    <DateTime value={this.state.from} onChange={this.onChangeStartTime.bind(this)}/>
                  </div>
                  <div className="table-search-criteria">
                    <span>To:&nbsp;</span>
                    <DateTime value={this.state.to} onChange={this.onChangeEndTime.bind(this)}/></div>
                  <button className="press" onClick={this.onSearch.bind(this)}>Search</button>
                </div>
                <button className="press chart-btn"
                        onClick={this.onSwitchToChartView.bind(this)}><img src="/images/presentation.png"/></button>
                <div className="table-page-zone">
                  <button className={this.state.page <= 0 ? 'press prev-page disabled' : 'press prev-page'} disabled={this.state.page <= 0}
                          onClick={this.onSearchPrev.bind(this)}>&lsaquo;</button>
                  <span>{this.state.page + 1}</span>
                  <button className={this.state.data.length < this.state.count * this.state.page ? 'press next-page disabled' : 'press next-page'}
                          disabled={this.state.data.length < this.state.count * this.state.page }
                          onClick={this.onSearchNext.bind(this)}>&rsaquo;</button>
                </div>
              </div>
              <DataTable data={tableData} sensor={this.props.sensor}/>
            </div>
          </div>
        </div>
        <div className="view-footer">
          <h4 className="logo"><span>2017</span> made by <a href="https://medium.com/@bohou">Bo HOU</a> with&nbsp;
            <a href="http://collarjs.com">collar.js</a> & <a href="https://www.npmjs.com/package/collux">collux</a></h4>
        </div>
      </div>
    );
  }
}

export default DataTableView;
