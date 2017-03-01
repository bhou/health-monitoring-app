import Collux from 'collux';
import moment from 'moment';

import DevToolAddon from 'collar.js-dev-webclient';
import LoginPage from './pages/Login';
import DataSheetPage from './pages/DataSheet';
import ChartPage from './pages/Chart';

import './index.css';

import backendProxy from './proxy';


Collux.use(new DevToolAddon({
  url: 'ws://localhost:7500'
}));

// create a singe route redux application
var app = Collux.createApp('redux-multiple-routes-app');

// init state
app.store.setStateInitiator((done) => {
  /*let state = {
    user: null,  // store user information when login,
    settings: { // shared settings
      temperature_unit: 'F',  // the temperature unit we used for display
      blood_pressure_unit: 'mmHg', // the blood pressure unit we used for display
    },
    // login view related state
    login: {
      username: '',
      password: '',
    },
    // datasheet view related state
    datasheet: {
      from: moment().subtract(23, 'days').calendar(),
      to: moment().calendar(),
    },
    // dashboard view related state
    dashboard: {

    },
    patients: [
      {
        id: '1235674889',
        name: 'John Smith',
        gender: 'male',
        photo: '/images/man.png',
        age: 36,
        blood_type: "B+",
        data: [
          {
            id: Date.now(),
            timestamp: Date.now(),
            body_temperature: {
              "value": 37,
              "unit": "C"
            },
            blood_pressure: {
              "systolic_blood_pressure": {
                "value": 160,
                "unit": "mmHg"
              },
              "diastolic_blood_pressure": {
                "value": 60,
                "unit": "mmHg"
              }
            },
            heart_rate: {
              "value": 60,
              "unit": "beats/min"
            }
          },
          {
            id: Date.now() + 1,
            timestamp: Date.now(),
            body_temperature: {
              "value": 37,
              "unit": "C"
            },
            blood_pressure: {
              "systolic_blood_pressure": {
                "value": 160,
                "unit": "mmHg"
              },
              "diastolic_blood_pressure": {
                "value": 60,
                "unit": "mmHg"
              }
            },
            heart_rate: {
              "value": 60,
              "unit": "beats/min"
            }
          },
        ]
      },
      {
        id: '1235674899',
        name: 'Anne',
        gender: 'female',
        photo: '/images/girl.png',
        age: 27,
        blood_type: "B+",
        data: [
          {
            id: Date.now() + 101,
            timestamp: Date.now(),
            body_temperature: {
              "value": 37,
              "unit": "C"
            },
            blood_pressure: {
              "systolic_blood_pressure": {
                "value": 160,
                "unit": "mmHg"
              },
              "diastolic_blood_pressure": {
                "value": 60,
                "unit": "mmHg"
              }
            },
            heart_rate: {
              "value": 60,
              "unit": "beats/min"
            }
          },
          {
            id: Date.now() + 102,
            timestamp: Date.now(),
            body_temperature: {
              "value": 36.5,
              "unit": "C"
            },
            blood_pressure: {
              "systolic_blood_pressure": {
                "value": 120,
                "unit": "mmHg"
              },
              "diastolic_blood_pressure": {
                "value": 60,
                "unit": "mmHg"
              }
            },
            heart_rate: {
              "value": 60,
              "unit": "beats/min"
            }
          },
        ]
      },

      {
        id: '1235674900',
        name: 'Mike',
        gender: 'male',
        photo: '/images/boy.png',
        age: 19,
        blood_type: "B-",
        data: [
          {
            id: Date.now() + 201,
            timestamp: Date.now(),
            body_temperature: {
              "value": 37,
              "unit": "C"
            },
            blood_pressure: {
              "systolic_blood_pressure": {
                "value": 160,
                "unit": "mmHg"
              },
              "diastolic_blood_pressure": {
                "value": 60,
                "unit": "mmHg"
              }
            },
            heart_rate: {
              "value": 60,
              "unit": "beats/min"
            }
          },
        ]
      }
    ],
    currentPatientId: '1235674889',
  };
*/

  let state = {
    user: null,  // store user information when login,
    settings: { // shared settings
      temperature_unit: 'C',  // the temperature unit we used for display
      blood_pressure_unit: 'mmHg', // the blood pressure unit we used for display
    },
    // login view related state
    login: {
      username: '',
      password: '',
    },
    // datasheet view related state
    datasheet: {
      from: moment().subtract(1, 'days').calendar(),
      to: moment().calendar(),
      page: 0,
      count: 15,
    },
    // dashboard view related state
    dashboard: {
    },
    patients: [],
    currentPatientId: null,
  };

  backendProxy.getPatients((error, patients) => {
    state.patients = patients;
    state.currentPatientId = patients[0].id;
    console.log('init state', state);
    backendProxy.getPatientData(state.currentPatientId,
      state.dashboard.from, state.dashboard.to,
      state.datasheet.page * state.datasheet.count, state.datasheet.count, (err, records) => {
      patients[0].data = records;
      done(null, state);
    });
  });
}, true); // async state initiator


// register all the pages
LoginPage('/login', app);
DataSheetPage('/datasheet', app);
ChartPage('/chart', app);

// setup default route
app.setDefaultRoute('/login');
app.setRootPath('/health-monitoring-app');
// run the application
app.run();
