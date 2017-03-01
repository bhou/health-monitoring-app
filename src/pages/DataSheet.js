import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import DataTableView from '../components/DataTableView';

// actions
import RENDER from '../actions/RENDER';

// reducers
import ON_EDIT_TABLE_ROW from '../reducers/datasheet/ON_EDIT_TABLE_ROW';
import ON_DELETE_TABLE_ROW from '../reducers/datasheet/ON_DELETE_TABLE_ROW';
import ON_CANCEL_EDIT_TABLE_ROW from '../reducers/datasheet/ON_CANCEL_EDIT_TABLE_ROW';
import ON_PRESSURE_CHANGED from '../reducers/datasheet/ON_PRESSURE_CHANGED';
import ON_TEMPERATURE_CHANGED from '../reducers/datasheet/ON_TEMPERATURE_CHANGED';
import ON_ACCEPT_EDIT_TABLE_ROW from '../reducers/datasheet/ON_ACCEPT_EDIT_TABLE_ROW';
import ON_TOGGLE_TEMPERATURE_UNIT from '../reducers/datasheet/ON_TOGGLE_TEMPERATURE_UNIT';
import ON_SWITCH_PATIENT from '../reducers/datasheet/ON_SWITCH_PATIENT';
import ON_SEARCH_TIME_CHANGED from '../reducers/datasheet/ON_SEARCH_TIME_CHANGED';
import ON_SEARCH_RECORD from '../reducers/datasheet/ON_SEARCH_RECORD';
import ON_SEARCH_PREV_RECORD from '../reducers/datasheet/ON_SEARCH_PREV_RECORD';
import ON_SEARCH_NEXT_RECORD from '../reducers/datasheet/ON_SEARCH_NEXT_RECORD';

import ON_LOGOUT from '../reducers/login/ON_LOGOUT';

export default function page (route, app) {
  let datasheetView = null;
  app.route(route, {
    render: () => { // tell the app how to render datasheet view
      datasheetView = ReactDOM.render(
        <DataTableView sensor={app.getViewSensor()}/>,
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
        return {
          id: patient.id,
          name: patient.name,
          gender: patient.gender,
          age: patient.age,
          photo: patient.photo,
          blood_type: patient.blood_type
        }
      });

      let viewState = {
        user: state.user,
        from: state.datasheet.from,
        to: state.datasheet.to,
        temperature_unit: state.settings.temperature_unit || 'C',
        blood_pressure_unit: state.settings.blood_pressure_unit || 'mmHg',
        page: state.datasheet.page,
        count: state.datasheet.count,
        patients,
        currentPatientId: state.currentPatientId,
        data: selectedPatient.data
      };

      datasheetView.setState(viewState);
    }
  });

  app.store.reduce('ON_EDIT_TABLE_ROW', ON_EDIT_TABLE_ROW);
  app.store.reduce('ON_CANCEL_EDIT_TABLE_ROW', ON_CANCEL_EDIT_TABLE_ROW);
  app.store.reduce('ON_PRESSURE_CHANGED', ON_PRESSURE_CHANGED);
  app.store.reduce('ON_TEMPERATURE_CHANGED', ON_TEMPERATURE_CHANGED);
  app.store.reduce('ON_TOGGLE_TEMPERATURE_UNIT', ON_TOGGLE_TEMPERATURE_UNIT);
  app.store.reduce('ON_SEARCH_TIME_CHANGED', ON_SEARCH_TIME_CHANGED);
  app.store.reduce('ON_LOGOUT', ON_LOGOUT);

  app.store.reduceAsync('ON_DELETE_TABLE_ROW', ON_DELETE_TABLE_ROW);
  app.store.reduceAsync('ON_ACCEPT_EDIT_TABLE_ROW', ON_ACCEPT_EDIT_TABLE_ROW);
  app.store.reduceAsync('ON_SWITCH_PATIENT', ON_SWITCH_PATIENT);
  app.store.reduceAsync('ON_SEARCH_RECORD', ON_SEARCH_RECORD);
  app.store.reduceAsync('ON_SEARCH_PREV_RECORD', ON_SEARCH_PREV_RECORD);
  app.store.reduceAsync('ON_SEARCH_NEXT_RECORD', ON_SEARCH_NEXT_RECORD);
}