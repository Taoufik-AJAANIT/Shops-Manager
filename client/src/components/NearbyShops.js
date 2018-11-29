import React, { Component } from 'react';
import { CardDeck } from 'reactstrap';
import Shop from './Shop'
import './nearbyShops.css';
import ReactLoading from 'react-loading';

class NearbyShops extends Component {
    constructor(props) {
        super(props);
        this.state = { shops: [], isFitched: false };
        // this.handleClick = this.handleClick.bind(this);
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
            fetch('http://localhost:5000/', options)
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

    // function helps in sort
    compare(a, b) {
        if (parseFloat(a.distance) < parseFloat(b.distance))
            return -1;
        if (parseFloat(a.distance) > parseFloat(b.distance))
            return 1;
        return 0;
    }


    render() {
        let isFitched = this.state.isFitched;


        while (!isFitched) {
            return <ReactLoading />
        }


        return <div className='nearby'>
            <CardDeck>
                {this.state.shops.map(shop =>
                    <Shop action='like' id={shop.key} key={shop.key} distance={shop.distance} shopName={shop.shopName} imgUrl={shop.imgUrl} />
                )}
            </CardDeck>
        </div>

    }
}

export default NearbyShops;
