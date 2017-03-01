
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import ChartView from '../components/ChartView';

// actions
import RENDER from '../actions/RENDER';

// reducers


export default function page (route, app) {
  let chartView = null;
  app.route(route, {
    render: () => { // tell the app how to render datasheet view
      chartView = ReactDOM.render(
        <ChartView sensor={app.getViewSensor()}/>,
        document.getElementById('app')
      );
    },
    updateState: (state) => { // tell the app how to update datasheet view
      if (!state.user) {
        app.getViewSensor().send(RENDER('/login'));
      }

      let selectedPatient = null;

      let patients = state.patients.map((patient) => {
        if (patient.id === state.currentPatientId) {
          selectedPatient = patient;
        }
      });

      let viewState = {
        user: state.user,
        temperature_unit: state.settings.temperature_unit || 'C',
        blood_pressure_unit: state.settings.blood_pressure_unit || 'mmHg',
        currentPatientId: state.currentPatientId,
        selectedPatient,
      };

      chartView.setState(viewState);
    }
  });
}