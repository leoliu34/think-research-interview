import { Icon, Label, Menu, Table, Button, Dropdown, Modal, Header } from 'semantic-ui-react'
import React, { Component } from 'react'
import {
	Form,
	Message
} from 'semantic-ui-react'

export default class CreatePatientView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			submitted: false,
			patient: {
				firstName: '',
				lastName: '',
				middleName: '',
				weight: '',
				height: '',
				mrn: ''
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
			this.props.history.push('/')
		}
	}
	render() {
		return (
			<Form style={{margin: 50}}>
				<Form.Button primary onClick={()=>{this.props.history.push('/')}}>Back to Overview</Form.Button>
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
						error={this.state.patient.mrn == "" && this.state.submitted}
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Button primary onClick={this.submitForm}>Submit</Form.Button>
					<Form.Button secondary onClick={this.submitForm}>Cancel</Form.Button>
				</Form.Group>
			</Form>
		)
	}
}