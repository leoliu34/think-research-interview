import { Icon, Header, Modal, Button, Container } from 'semantic-ui-react'
import React, { Component } from 'react'
import ReadOnlyFormComponent from './ReadOnlyFormComponent'

export default class EncounterDetailView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			encounter: {...props.encounter},
			confirmDelete: false,
			dataType: 'encounter'
		}
		this.modalOpen = this.modalOpen.bind(this)
		this.modalClose = this.modalClose.bind(this)
		this.remove = this.remove.bind(this)
	}

	modalOpen() {
		this.setState({ confirmDelete: true })
	}

	modalClose() {
		this.setState({ confirmDelete: false })
	}

	remove() {
		this.props.remove(this.props.match.params.mrn, 'encounter_' + this.props.match.params.visitNumber)
		this.props.history.goBack()
		this.modalClose()
	}

	render() {
		let {...encounterData} = this.state.encounter
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
			          <h3>Are you sure you want to delete the current {this.state.dataType}'s entry?</h3>
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
			      <Container textAlign='right'>
				</Container>
				<ReadOnlyFormComponent
					title="Encounter Details"
					backLabel="Back To Patient Details"
					push={this.props.history.push}
					url={this.props.match.url}
					data={encounterData}
					icon='checked calendar'
				>
					<Button color='red' onClick={()=>{this.props.history.push(this.props.match.url + '/edit')}} >
					Edit
					</Button>
					<Button secondary onClick={this.modalOpen}>
					Destroy
					</Button>
				</ReadOnlyFormComponent>
			</div>
		)
	}

}