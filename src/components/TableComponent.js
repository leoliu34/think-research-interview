import { Icon, Label, Menu, Table, Button, Dropdown, Modal, Header } from 'semantic-ui-react'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import EditPatientView from './EditPatientView'

export default class TableComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			header: props.header,
			body: props.body,
			removePatient: props.removePatient,
			confirmDelete: false,
			currentPatientMRN: 0
		}
		this.renderBody = this.renderBody.bind(this)
		this.performAction = this.performAction.bind(this)
		this.removePatient = this.removePatient.bind(this)
		this.modalOpen = this.modalOpen.bind(this)
		this.modalClose = this.modalClose.bind(this)
		this.onClickDelete = this.onClickDelete.bind(this)
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
					<Dropdown ref={patient.mrn} additionLabel={patient.mrn} text="Actions" onClick={this.performAction} floating button >
						<Dropdown.Menu>
							<Dropdown.Item key="show" icon="unhide" text={<Link style={{ color: '#000000' }} to={{ pathname: '/patients/' + patient.mrn }}>Show</Link>} value="show"/>
							<Dropdown.Item key="edit" icon="edit" text={<Link style={{ color: '#000000' }} to={{ pathname: '/edit/' + patient.mrn }}>Edit</Link>} value="show"/>
							<Dropdown.Item key="delete" icon="delete" text="Destroy" value="delete" onClick={this.onClickDelete} />
						</Dropdown.Menu>
					</Dropdown>
				</Table.Cell>
			</Table.Row>
		)
	}

	onClickDelete(event, data) {
		this.modalOpen()
	}

	performAction(event, data) {
		this.setState({ currentPatientMRN: data.additionLabel })
	}

	removePatient() {
		this.state.removePatient(this.state.currentPatientMRN)
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
				        <Table.HeaderCell><Button primary><Link style={{color: '#FFF'}}to="/add/patient">Add User</Link></Button></Table.HeaderCell>
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