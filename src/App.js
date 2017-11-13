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
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={PatientOverview} />
          <Route exact path="/edit/:mrn" component={EditPatientView} />
          <Route exact path="/patients/:mrn" component={PatientDetailsView} />
          <Route exact path="/add/patient" component={CreatePatientView} />
        </Switch>
      </Router>
    );
  }
}

export default App;
