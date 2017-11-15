import React, { Component } from 'react';
import TableComponent from './TableComponent'
import { Button } from 'semantic-ui-react'

export default class PatientOverview extends Component {

	constructor(props) {
		super(props)
		this.state = {...props.data}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({...nextProps.data})
	}

	render() {
		return (
			<div>
				<TableComponent {...this.props} title="Patient List" header={this.state.header} body={this.state.patients} dataType="patient" remove={this.state.removePatient}/>
				<Button style={{marginTop: 30}} basic color='black' onClick={this.props.importData}>Import Sample Data</Button>
			</div>
		)
	}
}