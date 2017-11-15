import React, { Component } from 'react'
import TableComponent from './TableComponent'
import ReadOnlyFormComponent from './ReadOnlyFormComponent'

export default class PatientDetailsView extends Component {
	constructor(props) {
		super(props)
		this.state = {...props.patient}
	}
	render() {
		var {encounters, ...patientData} = this.state
		return (
			<div>
				<ReadOnlyFormComponent
					title="Patient Details"
					backLabel="Back To Patient Overview"
					push={this.props.history.push}
					data={patientData}
					icon='id card outline'
				/>
				<TableComponent {...this.props} mrn={this.state.mrn} title="Encounter List" dataType="encounter" header={this.props.header} body={this.state.encounters} remove={this.props.remove} />
			</div>
		)
	}
}