import React, { Component } from 'react';
import Slide from './Slide'
import { Alert } from 'reactstrap';
import ReactLoading from 'react-loading';
import './NearbyShops.css';

class PreferedShops extends Component {
    constructor(props) {
        super(props);
        this.state = { shops: [], isFitched: false };
        this.remove = this.remove.bind(this);
    }

    remove(key) {
        this.setState({
            isFitched: false
        })
        let newShops = this.state.shops.filter(shop => {
            return shop.key !== key;
        })
        this.setState({
            shops: newShops
        })
        setTimeout(() => {
            this.setState({
                isFitched: true
            })
        }, 10);
    }

    componentWillMount() {
        // Fitching Shops :

        // check if token is ready : 
        if (sessionStorage.getItem('jwToken')) {
            const headers = new Headers();
            headers.append('authorization', sessionStorage.getItem('jwToken'));
            const options = {
                headers,
            }
            fetch('/prefered', options)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then(response => {
                    this.setState({
                        shops: [...response.shops.sort(this.compare)]
                    })
                    setTimeout(() => {
                        this.setState({
                            isFitched: true
                        })
                    }, 50)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }


    render() {
        let text = this.state.shops.length ? 'Click Shop to Remeove it from here' : 'Like a shop To see it here :)';
        let slides = this.state.shops.length ? <Slide remove={this.remove} items={this.state.shops} /> : '';
        let isFitched = this.state.isFitched;

        while (!isFitched) {
            return <ReactLoading />
        }
        return <div className='nearby'>
            <Alert color="light"> {text}</Alert>
            {slides}
        </div>

    }
}

export default PreferedShops;