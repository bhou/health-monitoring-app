import moment from 'moment';
import config from '../src/config';

const data = {
  patients: [
    {
      id: '1235674889',
      name: 'John Smith',
      gender: 'male',
      photo: config.rootPath + '/images/man.png',
      age: 36,
      blood_type: "B+",
      data: []
    },
    {
      id: '1235674890',
      name: 'Anne',
      gender: 'female',
      photo: config.rootPath + '/images/girl.png',
      age: 27,
      blood_type: "B+",
      data: []
    },
    {
      id: '1235674891',
      name: 'Mike',
      gender: 'male',
      photo: config.rootPath + '/images/boy.png',
      age: 19,
      blood_type: "B-",
      data: []
    }
  ],

  records: [
  ]
};


export default function getPrevState() {
  let prevState = {
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
    currentPatientId: '1235674889',
  };

  prevState.patients = data.patients;

  for (let i = 0; i < 10; i++) {
    prevState.patients[0].data.push({
      id: Date.now(),
      patientId: '1235674889',
      timestamp: Date.now() + i * 1000 * 60 * 60,
      body_temperature: {
        value: 37 + Math.floor(Math.random() * 4) - 2 ,
        unit: "C"
      },
      blood_pressure: {
        systolic_blood_pressure: {
          value: 120 + Math.floor(Math.random() * 40) - 2 ,
          unit: "mmHg"
        },
        diastolic_blood_pressure: {
          value: 80  + Math.floor(Math.random() * 40) - 2 ,
          unit: "mmHg"
        }
      }
    });
  }

  return prevState;
};
