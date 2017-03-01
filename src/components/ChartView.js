import React from 'react';
import './ChartView.css';

import moment from 'moment';
import PatientInfo from './PatientInfo';
import { LineChart, Line, XAxis, YAxis, AreaChart, Area,
  CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

import {convertCtoF, convertFtoC} from '../utils/UnitConvertor';

import RENDER from '../actions/RENDER';
import ON_LOGOUT from '../actions/ON_LOGOUT';



class ChartView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      temperature_unit: 'C',
      blood_pressure_unit: 'mmHg',
      selectedPatient: {}
    };
  }

  onLogout() {
    this.props.sensor.send(ON_LOGOUT());
  }

  onBackToTableView () {
    this.props.sensor.send(RENDER('/datasheet'));
  }

  render() {
    let sensor = this.props.sensor;

    let data = [
      {uv: 100, pv: 20},
      {uv: 10, pv: 25},
      {uv: 10, pv: 30},
      {uv: 60, pv: 26},
      {uv: 80, pv: 40},
      {uv: 100, pv: 35},
    ];

    let rawData = this.state.selectedPatient.data || [];

    let minTemperature = Infinity;
    let maxTemperature = -Infinity;
    let refTemperature = this.state.temperature_unit.toUpperCase() === 'F' ? convertCtoF(37) : 37;

    let displayData = rawData.map((d) => {
      if (d.body_temperature.value < minTemperature) minTemperature = d.body_temperature.value;
      if (d.body_temperature.value > minTemperature) maxTemperature = d.body_temperature.value;

      return {
        timestamp: moment(d.timestamp).hour() + 'h',
        temperature: (d.body_temperature.unit === this.state.temperature_unit) ?
          d.body_temperature.value :
          (this.state.temperature_unit.toUpperCase() === 'F' ? convertCtoF(d.body_temperature.value) : convertFtoC(d.body_temperature.value)),
        diastolic_blood_pressure: d.blood_pressure.diastolic_blood_pressure.value,
        systolic_blood_pressure: d.blood_pressure.systolic_blood_pressure.value
      }
    });

    return (
      <div className="chart-view">
        <div className="view-header">
          <h4 className="logo">Health Monitoring Console</h4>
          <div className="user">
            <div className="user-name">Welcome, {this.state.user && this.state.user.username}</div>
            <button className="press logout-btn"
                    onClick={this.onLogout.bind(this)}>Logout</button>
          </div>
        </div>
        <div className="view-body chart-view-body">
          <div className="general-info">
            <PatientInfo info={this.state.selectedPatient}/>
            <button className="press to-table-btn"><img src="/images/presentation-1.png"
              onClick={this.onBackToTableView.bind(this)}/></button>
          </div>

          <div className="chart-section">
            <div className="chart-area">
              <h4>Temperature</h4>
              <AreaChart width={660} height={360} data={displayData}>
                <Area type="monotone" dataKey="temperature" stroke="#684b37" strokeWidth={2} fill="#C8C8A9" dot={true}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <ReferenceLine y={refTemperature} label="Max" stroke="red" strokeWidth={2} strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" padding={{ left: 10 }} label="Time"/>
                <YAxis label={this.state.temperature_unit} domain={['dataMin - 1', 'dataMax + 1']}/>
              </AreaChart>
            </div>
          </div>

          <div className="chart-section">
            <div className="chart-area">
              <h4>Blood Pressure</h4>
              <LineChart width={660} height={360} data={displayData}>
                <Line type="monotone" dataKey="systolic_blood_pressure" stroke="#547980" strokeWidth={2} dot={true}/>
                <Line type="monotone" dataKey="diastolic_blood_pressure" stroke="#684b37" strokeWidth={2} dot={true}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <XAxis dataKey="timestamp" padding={{ left: 10 }} label="Time"/>
                <YAxis label={this.state.temperature_unit} domain={['dataMin - 2', 'dataMax + 2']}/>
              </LineChart>
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

export default ChartView;

