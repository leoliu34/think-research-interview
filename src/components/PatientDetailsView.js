import { Icon, Header, Form} from 'semantic-ui-react'
import React, { Component } from 'react'
import TableComponent from './TableComponent'

export default class PatientDetailsView extends Component {
	constructor(props) {
		super(props)
		this.state = {...props.patient}
	}
	render() {
		return (
			<div>
				<Header as='h2' icon textAlign='center' style={{marginTop:50}}>
					<Icon name='id card outline' circular />
					<Header.Content>
					Patient Details
					</Header.Content>
				</Header>
				<Form style={{margin: 50}}>
					<Form.Group widths='equal'>
						<Form.Input 
							label='First name'
							name='firstName'
							readOnly
							value={this.state.firstName}
						/>
						<Form.Input 
							label='Middle name'
							name='middleName'
							readOnly
							value={this.state.middleName}
						/>
						<Form.Input 
							label='Last name'
							name='lastName'
							readOnly
							value={this.state.lastName}
						/>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Input 
							label='Weight' 
							name='weight'
							readOnly
							value={this.state.weight}
						/>
						<Form.Input 
							label='Height' 
							name='height'
							readOnly
							value={this.state.height}
						/>
						<Form.Input 
							label='MRN' 
							name='mrn'
							readOnly
							value={this.state.mrn}
						/>
					</Form.Group>
					<Form.Button primary onClick={()=>{this.props.history.goBack()}}>Back To Patient Overview</Form.Button>
				</Form>
				<TableComponent {...this.props} mrn={this.state.mrn} title="Encounter List" dataType="encounter" header={this.props.header} body={this.state.encounters} remove={this.props.remove} />
			</div>
		)
	}
}