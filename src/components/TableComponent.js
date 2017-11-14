import { Icon, Menu, Table, Button, Dropdown, Modal, Header } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class TableComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			header: props.header,
			body: props.body,
			remove: props.remove,
			confirmDelete: false,
			currentPatientMRN: 0,
			currentEncounterKey: {}
		}
		this.renderBody = this.renderBody.bind(this)
		this.performAction = this.performAction.bind(this)
		this.remove = this.remove.bind(this)
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
		let identifier = patient.mrn
		let showDetailsLink = '/patient/' + identifier
		if (this.props.dataType === 'encounter') {
			identifier = key;
			showDetailsLink = '/patient/' + this.props.mrn + '/encounter/' + patient.visitNumber
		}
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
					<Dropdown ref={identifier} additionLabel={identifier} text="Actions" onClick={this.performAction} floating button >
						<Dropdown.Menu>
							<Dropdown.Item key="show" icon="unhide" text="Show" value="show" onClick={()=> this.props.history.push(showDetailsLink)}/>
							<Dropdown.Item key="edit" icon="edit" text="Edit" value="edit" onClick={()=> this.props.history.push(showDetailsLink + '/edit')}/>
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
		if (this.props.dataType === 'encounter') {
			this.setState({ currentEncounterKey: data.additionLabel })
			this.setState({ currentPatientMRN: this.props.mrn })
		}
		else {
			this.setState({ currentPatientMRN: data.additionLabel })
		}
	}

	remove() {
		let removeParameters = [this.state.currentPatientMRN]
		if (this.props.dataType === 'encounter') {
			removeParameters.push(this.state.currentEncounterKey)
		}
		this.state.remove(...removeParameters)
		this.modalClose()
	}

	modalOpen() {
		this.setState({ confirmDelete: true })
	}

	modalClose() {
		this.setState({ confirmDelete: false })
	}

	render() {
		let createLink = '/add/' + this.props.dataType
		if (this.props.dataType === 'encounter') {
			createLink = '/patient/' + this.props.mrn + '/encounter/add'
		}
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
			          <h3>Are you sure you want to delete the current {this.props.dataType}'s entry?</h3>
			        </Modal.Content>
			        <Modal.Actions>
			          <Button color='red' onClick={this.modalClose} inverted>
			            No
			          </Button>
			          <Button color='green' onClick={this.remove} inverted>
			            <Icon name='checkmark' /> Yes
			          </Button>
			        </Modal.Actions>
			      </Modal>
				<Table celled striped>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell colSpan={Object.keys(this.state.header).length-1}>{this.props.title}</Table.HeaderCell>
				        <Table.HeaderCell><Button primary onClick={()=>this.props.history.push(createLink)}>Add {this.props.dataType}</Button></Table.HeaderCell>
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
				        <Table.HeaderCell colSpan={Object.keys(this.state.header).length}>
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