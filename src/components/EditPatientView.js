import { Icon, Label, Menu, Table, Button, Dropdown, Modal, Header, Form } from 'semantic-ui-react'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class EditPatientView extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			submitted: false,
			patient: props.location.state,
			editPatient: props.editPatient
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
			this.state.editPatient(this.props.location.state.patient.mrn, this.state.patient)
			this.props.history.goBack()
		}
	}

	render() {
		return (
			<div>
				<Header as='h2' icon textAlign='center' style={{marginTop:50}}>
				<Icon name='setting' circular />
			      <Header.Content>
			        Edit Patient
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
							value={this.state.patient.firstName}
						/>
						<Form.Input 
							label='Middle name'
							name='middleName'
							placeholder='Middle name'
							error={this.state.patient.middleName === "" && this.state.submitted}
							onChange={this.handleChange}
							value={this.state.patient.middleName}
						/>
						<Form.Input 
							label='Last name'
							name='lastName'
							placeholder='Last name'
							onChange={this.handleChange}
							value={this.state.patient.lastName}
						/>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Input 
							label='Weight' 
							name='weight'
							placeholder='Weight' 
							onChange={this.handleChange}
							value={this.state.patient.weight}
						/>
						<Form.Input 
							label='Height' 
							name='height'
							placeholder='Height' 
							onChange={this.handleChange}
							value={this.state.patient.height}
						/>
						<Form.Input 
							label='MRN' 
							name='mrn'
							placeholder='MRN' 
							error={this.state.patient.mrn == "" && this.state.submitted}
							onChange={this.handleChange}
							value={this.state.patient.mrn}
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