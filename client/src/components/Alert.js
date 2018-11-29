import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>{this.props.button}</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Alert;