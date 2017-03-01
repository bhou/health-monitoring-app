/* proxy wrapper for server side api */

import config from './config';
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

export default {
  getPatients(done) {
    setTimeout(() => {
      done(null, data.patients);
    }, 300);
  },
  getPatientData(patientId, startTime, endTime, offset, count, done) {
    let n = count;
    if (offset > 35) n--;
    setTimeout(() => {
      let records = [];
      for (let i = 0; i < n; i++) {
        records.push({
          id: Date.now(),
          patientId: patientId,
          timestamp: Date.now() + i * 1000 * 60 * 60,
          body_temperature: {
            "value": 37 + Math.floor(Math.random() * 4) - 2 ,
            "unit": "C"
          },
          blood_pressure: {
            "systolic_blood_pressure": {
              "value": 120 + Math.floor(Math.random() * 40) - 2 ,
              "unit": "mmHg"
            },
            "diastolic_blood_pressure": {
              "value": 80  + Math.floor(Math.random() * 40) - 2 ,
              "unit": "mmHg"
            }
          }
        });
      }

      done(null, records);
    }, 300)
  },
  updateRecord(patientId, rowId, body_temperature, systolic_blood_pressure, diastolic_blood_pressure, done) {
    setTimeout(() => {
      done();
    }, 300);
  },
  deleteRecord(patientId, rowId, done) {
    setTimeout(() => {
      done();
    }, 300);
  }
}
