import { Icon, Header, Form } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class CreateEncounterView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			submitted: false,
			encounter: {
				'visitNumber': '',
              	'admittedAt': '',
              	'dischargedAt': ''
			},
			addEncounter: props.addEncounter
		}
		this.submitForm = this.submitForm.bind(this)
	}

	handleChange = (e, { name, value }) => {
		let encounter = {
			encounter: {
				...this.state.encounter,
				[name]: value
			}
		}
		this.setState(encounter)	
	}

	submitForm() {
		this.setState({submitted: true})
		this.state.addEncounter(this.props.match.params.mrn ,this.state.encounter)
		this.props.history.goBack()
	}
	render() {
		return (
			<div>
			<Header as='h2' icon textAlign='center' style={{marginTop:50}}>
				<Icon name='id badge' circular />
				<Header.Content>
				Add New Encounter
				</Header.Content>
			</Header>
			<Form style={{margin: 50}}>
				<Form.Group widths='equal'>
					<Form.Input 
						label='Visit Number'
						name='visitNumber'
						placeholder='Visit Number'
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='Admitted At'
						name='admittedAt'
						placeholder='Admitted At'
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='Discharged At'
						name='dischargedAt'
						placeholder='Discharged At'
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