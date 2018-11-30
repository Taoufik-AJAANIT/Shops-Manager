import React, { Component } from 'react'
import './Shop.css';
import Alert from './Alert'
import {
    Card, Button, CardImg, CardTitle, ButtonGroup, CardBody, CardSubtitle
} from 'reactstrap';
import API_url from "../API_url"


class Shop extends Component {


    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            text: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleClick = (e) => {
        let method = e.target.name;

        const headers = new Headers();
        headers.append('authorization', sessionStorage.getItem('jwToken'));
        headers.append('Content-Type', 'application/json');
        let body = method === 'POST' ? JSON.stringify({ shopId: this.props.id }) : '';
        let param = method === 'DELETE' ? this.props.id : '';

        const options = {
            method: method,
            headers,
            body
        }

        fetch(`${API_url}/${param}`, options)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(response => {
                this.setState({
                    text: response.messege,
                    modal: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return  <div className='carda'>
                    <Card>
                        <CardImg top src={this.props.imgUrl} alt="Card image cap" />
                        <CardBody>
                            <CardTitle>{this.props.shopName}</CardTitle>
                            <CardSubtitle>Distance : {this.props.distance} Km</CardSubtitle>
                            <ButtonGroup>
                                <Button onClick={this.handleClick} name='POST' outline color="success">Like</Button>
                                <Button outline name='DELETE' color="danger">Dislike</Button>
                            </ButtonGroup>
                        </CardBody>
                    </Card>
                    <Alert modal={this.state.modal} title={this.state.text} toggle={this.toggle} button='cool' ></Alert>
                </div >
    }
}


export default Shop;


