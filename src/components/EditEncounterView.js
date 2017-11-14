import { Icon, Header, Form} from 'semantic-ui-react'
import React, { Component } from 'react'

export default class EditEncounterView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			submitted: false,
			encounter: props.encounter,
			editEncounter: props.editEncounter,
			oldVisitNumber: props.encounter.visitNumber
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
		this.state.editEncounter(this.props.match.params.mrn, this.state.oldVisitNumber, this.state.encounter)
		this.props.history.goBack()
	}

	render() {
		return (
			<div>
			<Header as='h2' icon textAlign='center' style={{marginTop:50}}>
				<Icon name='checked calendar' circular />
				<Header.Content>
				Encounter Details
				</Header.Content>
			</Header>
			<Form style={{margin: 50}}>
				<Form.Group widths='equal'>
					<Form.Input 
						label='Visit Number'
						name='visitNumber'
						placeholder='Visit Number'
						onChange={this.handleChange}
						value={this.state.encounter.visitNumber}
					/>
					<Form.Input 
						label='Admitted At'
						name='admittedAt'
						placeholder='Admitted At'
						onChange={this.handleChange}
						value={this.state.encounter.admittedAt}
					/>
					<Form.Input 
						label='Discharged At'
						name='dischargedAt'
						placeholder='Discharged At'
						onChange={this.handleChange}
						value={this.state.encounter.dischargedAt}
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