import React, { Component } from 'react';
import TableComponent from './TableComponent'

export default class PatientOverview extends Component {

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
					mrn: 1001,
					firstName: 'Leo',
					lastName: 'Liu',
					middleName: 'L',
					weight: '135',
					height: '178',
				},
				patient2: {
					mrn: 1002,
					firstName: 'Lee',
					lastName: 'Liu',
					middleName: 'L',
					weight: '135',
					height: '178',
				}
			}
		}
		this.removePatient = this.removePatient.bind(this)
	}

	removePatient(mrn) {
		let newState = {...this.state}
		let deletedKey = null
		Object.keys(newState.patients).map((key, index) => {
			if (newState.patients[key].mrn === mrn) {
				deletedKey = key
			}
		})
		delete newState.patients[deletedKey]
		this.setState({...newState})
	}

	render() {
		return (
			<div>
				<TableComponent title="Patient List" header={this.state.header} body={this.state.patients} removePatient={this.removePatient}/>
			</div>
		)
	}
}