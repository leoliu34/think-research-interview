import { Icon, Form, Header } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class CreatePatientView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			submitted: false,
			patient: {
				mrn: '',
				firstName: '',
				lastName: '',
				middleName: '',
				weight: '',
				height: '',
				encounters: {}
			},
			addPatient: props.addPatient
		}
		this.submitForm = this.submitForm.bind(this)
	}

	handleChange = (e, { name, value }) => {
		let patient = {
			patient: {
				...this.state.patient,
				[name]: value
			}
		}
		this.setState(patient)	
	}

	submitForm() {
		this.setState({submitted: true})
		if (this.state.patient.firstName && this.state.patient.middleName && this.state.patient.mrn) {
			this.state.addPatient(this.state.patient)
			this.props.history.goBack()
		}
	}
	render() {
		return (
			<div>
			<Header as='h2' icon textAlign='center' style={{marginTop:50}}>
				<Icon name='id badge' circular />
				<Header.Content>
				Add New Patient
				</Header.Content>
			</Header>
			<Form style={{margin: 50}}>
				<Form.Group widths='equal'>
					<Form.Input 
						label='First name'
						name='firstName'
						placeholder='First name'
						error={this.state.patient.firstName === "" && this.state.submitted}
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='Middle name'
						name='middleName'
						placeholder='Middle name'
						error={this.state.patient.middleName === "" && this.state.submitted}
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='Last name'
						name='lastName'
						placeholder='Last name'
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Input 
						label='Weight' 
						name='weight'
						placeholder='Weight' 
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='Height' 
						name='height'
						placeholder='Height' 
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='MRN' 
						name='mrn'
						placeholder='MRN' 
						error={this.state.patient.mrn === "" && this.state.submitted}
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group style={{marginTop: 40}}>
					<Form.Button primary onClick={this.submitForm}>Submit</Form.Button>
					<Form.Button secondary onClick={()=>{this.props.history.goBack()}}>Cancel</Form.Button>
				</Form.Group>
			</Form>
			</div>
		)
	}
}