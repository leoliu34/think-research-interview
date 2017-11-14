import React, { Component } from 'react';
import PatientOverview from './components/PatientOverview'
import EditPatientView from './components/EditPatientView'
import PatientDetailsView from './components/PatientDetailsView'
import CreatePatientView from './components/CreatePatientView'
import CreateEncounterView from './components/CreateEncounterView'
import EncounterDetailsView from './components/EncounterDetailsView'
import EditEncounterView from './components/EditEncounterView'
import exportPatient from './utils/loadData'
import {
  BrowserRouter as Router,
  Route,
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
      encountersHeader: {
        col1: 'Visit Number',
        col2: 'Admitted At',
        col3: 'Discharged At',
        col4: 'Actions'
      },
      patients: exportPatient(),
      removePatient: this.removePatient.bind(this),
      removeEncounter: this.removeEncounter.bind(this)
    }
    this.addPatient = this.addPatient.bind(this)
    this.addEncounter = this.addEncounter.bind(this)
    this.editEncounter = this.editEncounter.bind(this)
    this.editPatient = this.editPatient.bind(this)
    this.getPatient = this.getPatient.bind(this)
    this.getEncounter = this.getEncounter.bind(this)
  }

  removePatient(mrn) {
    let newState = {...this.state}
    let deletedKey = null
    Object.keys(newState.patients).map((key, index) => {
      if (newState.patients[key].mrn === mrn) {
        deletedKey = key
      }
      return null
    })
    delete newState.patients[deletedKey]
    this.setState({...newState})
  }

  removeEncounter(mrn, deleteKey) {
    let newState = {...this.state}
    delete newState.patients['patient_' + mrn].encounters[deleteKey]
    this.setState({...newState})
  }

  addPatient(patient) {
    let newPatients = {...this.state.patients}
    newPatients['patient_' + patient.mrn] = patient
    this.setState({
      patients: newPatients
    })
  }

  addEncounter(mrn, encounter) {
    let newEncounters = {...this.state.patients}
    newEncounters['patient_' + mrn].encounters['encounter_' + encounter.visitNumber] = encounter
    this.setState({
      patients: newEncounters
    })
  }

  editPatient(mrn, newPatient) {
    if (mrn !== newPatient.mrn) {
      this.removePatient(mrn)
    }
    let newPatients = {...this.state.patients}
    newPatients['patient_' + newPatient.mrn] = newPatient
    this.setState({
      patients: newPatients
    })
  }

  editEncounter(mrn, visitNumber, encounter) {
    if (visitNumber !== encounter.visitNumber) {
      this.removeEncounter(mrn, 'encounter_' + visitNumber)
    }
    let newPatientsEncounters = {...this.state.patients}
    newPatientsEncounters['patient_' + mrn].encounters['encounter_' + encounter.visitNumber] = encounter
    this.setState({
      patients: newPatientsEncounters
    })
  }

  getPatient(mrn) {
    return this.state.patients['patient_' + mrn]
  }

  getEncounter(mrn, visitNumber) {
    return this.state.patients['patient_' + mrn].encounters['encounter_' + visitNumber]
  }
  //<EncounterDetailsView {...props} encounter={this.getEncounter(...props.match.params)} editEncounter={this.editEncounter}/>
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => 
            <PatientOverview {...props} data={this.state} />
          }/>
          <Route exact path="/patient/:mrn/edit" render={(props) =>
            <EditPatientView {...props} editPatient={this.editPatient} />
          }/>
          <Route exact path="/patient/:mrn" render={(props) =>
            <PatientDetailsView {...props} patient={this.getPatient(props.match.params.mrn)} header={this.state.encountersHeader} remove={this.state.removeEncounter} />
          }/>
          <Route exact path="/patient/:mrn/encounter/add" render={(props) =>
            <CreateEncounterView {...props} addEncounter={this.addEncounter} />
          }/>
          <Route exact path="/patient/:mrn/encounter/:visitNumber" render={(props) =>
            <EncounterDetailsView {...props} encounter={this.getEncounter(props.match.params.mrn, props.match.params.visitNumber)} />
          }/>
          <Route exact path="/patient/:mrn/encounter/:visitNumber/edit" render={(props) => 
            <EditEncounterView {...props} encounter={this.getEncounter(props.match.params.mrn, props.match.params.visitNumber)} editEncounter={this.editEncounter} />
          }/>
          <Route exact path="/add/patient" render={(props) =>
            <CreatePatientView {...props} addPatient={this.addPatient} />
          }/>
          <Route exact path="/patient/:mrn/encounter/add" render={(props) =>
            <CreateEncounterView {...props} addEncounter={this.addEncounter} />
          }/>
        </Switch>
      </Router>
    );
  }
}

export default App;
