import { Icon, Header, Form} from 'semantic-ui-react'
import React, { Component } from 'react'

export default class EncounterDetailView extends Component {
	constructor(props) {
		super(props)
		this.state = {...props.encounter}
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
						readOnly
						value={this.state.visitNumber}
					/>
					<Form.Input 
						label='Admitted At'
						name='admittedAt'
						placeholder='Admitted At'
						readOnly
						value={this.state.admittedAt}
					/>
					<Form.Input 
						label='Discharged At'
						name='dischargedAt'
						placeholder='Discharged At'
						value={this.state.dischargedAt}
						readOnly
					/>
				</Form.Group>
				<Form.Button primary onClick={()=>{this.props.history.goBack()}}>Back To Patient Details</Form.Button>
			</Form>
			</div>
		)
	}

}