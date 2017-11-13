import { Icon, Label, Menu, Table, Button, Dropdown, Modal, Header } from 'semantic-ui-react'
import React, { Component } from 'react'

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Destroy', value: 'delete' },
  { key: 'show', icon: 'unhide', text: 'Show', value: 'show' },
]

export default class TableComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			header: props.header,
			body: props.body,
			removePatient: props.removePatient,
			confirmDelete: false,
			deletePatientMRN: 0
		}
		this.renderBody = this.renderBody.bind(this)
		this.performAction = this.performAction.bind(this)
		this.removePatient = this.removePatient.bind(this)
		this.modalOpen = this.modalOpen.bind(this)
		this.modalClose = this.modalClose.bind(this)
	}

	renderHeader(key) {
		const header = this.state.header[key]
		return <Table.HeaderCell key={key}>{header}</Table.HeaderCell>
	}

	renderBody(key) {
		const patient = this.state.body[key]
		let count = Object.keys(this.state.header).length - 1
		return (
			<Table.Row key={key}>
				{ 
					Object.keys(patient).map(pKey => {
						if (count === 0) {
							return null;
						}
						count --;
						return <Table.Cell key={pKey}>{patient[pKey]}</Table.Cell>
					})
				}
				<Table.Cell>
					<Dropdown ref={patient.mrn} additionLabel={patient.mrn} text="Actions" options={options} onChange={this.performAction} floating button />
					{
						console.log(this.refs)
					}
				</Table.Cell>
			</Table.Row>
		)
	}

	performAction(event, data) {
		console.log(event)
		console.log(event.DOMEventTarget)
		console.log(data)
		if (data.value === 'edit') {
			this.refs[data.additionLabel].text = 'edit'

		}
		else if (data.value === 'show') {
			this.refs[data.additionLabel].text = 'show'
		}
		else if (data.value === 'delete') {
			this.refs[data.additionLabel].text = 'delete'
			let patientMRN = parseInt(data.additionLabel)
			this.setState({ deletePatientMRN: patientMRN })
			this.modalOpen()
		}
	}

	removePatient() {
		this.state.removePatient(this.state.deletePatientMRN)
		this.modalClose()
	}

	modalOpen() {
		this.setState({ confirmDelete: true })
	}

	modalClose() {
		this.setState({ confirmDelete: false })
	}

	render() {
		return (
			<div>
			<Modal
				open={this.state.confirmDelete}
				onClose={this.modalClose}
				basic
			    size='small'
		    >
		        <Header icon='browser' content='Confirm Delete' />
		        <Modal.Content>
		          <h3>Are you sure you want to delete the current patient's entry?</h3>
		        </Modal.Content>
		        <Modal.Actions>
		          <Button color='red' onClick={this.modalClose} inverted>
		            No
		          </Button>
		          <Button color='green' onClick={this.removePatient} inverted>
		            <Icon name='checkmark' /> Yes
		          </Button>
		        </Modal.Actions>
		      </Modal>
			<Table celled striped>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell colSpan={Object.keys(this.state.header).length-1}>{this.props.title}</Table.HeaderCell>
			        <Table.HeaderCell><Button primary>Add User</Button></Table.HeaderCell>
			      </Table.Row>
			      <Table.Row>
			      {
			      	Object
					.keys(this.state.header)
					.map(key =>  this.renderHeader(key))
			      }
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			    {
			    	Object
			    	.keys(this.state.body)
			    	.map(key => this.renderBody(key))
			    }
			    </Table.Body>
			    <Table.Footer>
			      <Table.Row>
			        <Table.HeaderCell colSpan='3'>
			          <Menu floated='right' pagination>
			            <Menu.Item as='a' icon>
			              <Icon name='left chevron' />
			            </Menu.Item>
			            <Menu.Item as='a'>1</Menu.Item>
			            <Menu.Item as='a'>2</Menu.Item>
			            <Menu.Item as='a'>3</Menu.Item>
			            <Menu.Item as='a'>4</Menu.Item>
			            <Menu.Item as='a' icon>
			              <Icon name='right chevron' />
			            </Menu.Item>
			          </Menu>
			        </Table.HeaderCell>
			      </Table.Row>
			    </Table.Footer>
			</Table>
			</div>
		)
	}
}