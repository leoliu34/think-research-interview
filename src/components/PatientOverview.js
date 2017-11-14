import React, { Component } from 'react';
import TableComponent from './TableComponent'

export default class PatientOverview extends Component {

	constructor(props) {
		super(props)
		this.state = {...props.data}
	}

	render() {
		return (
			<div>
				<TableComponent {...this.props} title="Patient List" header={this.state.header} body={this.state.patients} removePatient={this.state.removePatient}/>
			</div>
		)
	}
}