import { Icon, Header, Form, Container, Button} from 'semantic-ui-react'
import React, { Component } from 'react'
import { getPatientLabels } from '../utils/config'

export default class ReadOnlyFormComponent extends Component {

	constructor(props){
		super(props)
		this.renderForm = this.renderForm.bind(this)
	}

	renderForm() {
		let formFieldNumber = Object.keys(this.props.data).length
		let fields = {}
		let patientLabels = getPatientLabels()
		let groups = []

		for (var i = 0; i < formFieldNumber/3; i++) {
			fields[i] = []
			Object
			.keys(this.props.data)
			.map((key, index) => {
				if (index >= i*3 && index < i*3+3) {
					fields[i].push(
						<Form.Input 
						key={index}
						label={patientLabels[key]}
						name={key}
						readOnly
						value={this.props.data[key]}
						/>)
				}
				return null
			})
			groups.push(
				<Form.Group
					key={i}
					width="equal"
					children={fields[i]}
				/>
			)
		}
		return (
			<Form style={{margin:50}}>
				{groups}
				<Container textAlign='center'>
				<Button primary onClick={()=> {
					if (this.props.data.mrn) {
						this.props.push('/')
					}
					else {
						this.props.push(this.props.url.substring(0, this.props.url.indexOf('/encounter')))
					}
				}}>{this.props.backLabel}</Button>
				{this.props.children}
				</Container>
			</Form>
		)
	}

	render() {
		return (
			<Container textAlign='center'>
				<Header as='h2' icon textAlign='center' style={{marginTop:50}}>
					<Icon name={this.props.icon} circular />
					<Header.Content>
					{this.props.title}
					</Header.Content>
				</Header>
					{this.renderForm()}
			</Container>
		)
	}
}