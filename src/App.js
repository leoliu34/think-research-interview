import React, { Component } from 'react';
import PatientOverview from './components/PatientOverview'
import EditPatientView from './components/EditPatientView'
import PatientDetailsView from './components/PatientDetailsView'
import CreatePatientView from './components/CreatePatientView'
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserHistory,
  Switch
} from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      header: {
        col1: 'MRN',
        col2: 'First Name',
        col3: 'Last Name',
        col4: 'Actions'
      },
      patients: {
        patient1: {
          mrn: '1001',
          firstName: 'Leo',
          lastName: 'Liu',
          middleName: 'L',
          weight: '135',
          height: '178',
        },
        patient2: {
          mrn: '1002',
          firstName: 'Lee',
          lastName: 'Liu',
          middleName: 'L',
          weight: '135',
          height: '178',
        }
      },
      removePatient: this.removePatient.bind(this),
    }
    this.addPatient = this.addPatient.bind(this)
  }

  removePatient(mrn) {
    let newState = {...this.state}
    let deletedKey = null
    Object.keys(newState.patients).map((key, index) => {
      console.log(newState.patients[key].mrn)
      if (newState.patients[key].mrn === mrn) {
        deletedKey = key
      }
    })
    delete newState.patients[deletedKey]
    this.setState({...newState})
  }

  addPatient(patient) {
    console.log(patient)
    let newPatients = {...this.state.patients}
    newPatients['patient_' + patient.mrn] = patient
    this.setState({
      patients: newPatients
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => 
            <PatientOverview data={this.state} />
          }/>
          <Route exact path="/edit/:mrn" component={EditPatientView} />
          <Route exact path="/patients/:mrn" component={PatientDetailsView} />
          <Route exact path="/add/patient" render={(props) =>
            <CreatePatientView {...props} addPatient={this.addPatient} />
          }/>
        </Switch>
      </Router>
    );
  }
}

export default App;
