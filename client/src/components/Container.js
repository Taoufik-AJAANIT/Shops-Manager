import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Auth from './Auth'
import Navbar from './Navbar'
import './Container.css';



class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, isFitched: false };
        this.connection = this.connection.bind(this);
        this.disconnection = this.disconnection.bind(this)
    }

    componentDidMount() {
        this.setState({
            isFitched: false
        })

        // check if Already logged in 
        const headers = new Headers();
        headers.append('authorization', sessionStorage.getItem('jwToken'));
        const options = {
            headers,
        }
        fetch('/', options)
            .then(response => {
                if (response.status === 200) {
                    this.connection()
                }
            })
            .then(

                setTimeout(() => {
                    this.setState({
                        isFitched: true
                    })
                }, 2000)
            )
            .catch(err => {
                console.log(err)
            })
    }

    //Login method : to set  isloggedin to true when connection succed
    connection() {
        this.setState({
            isLoggedIn: true
        })
    }

    // Logout method : to set isloggedin to false & and clear token
    disconnection() {
        sessionStorage.setItem('jwToken', '')
        this.setState({
            isLoggedIn: false
        });

    }


    render() {

        let { isLoggedIn, isFitched } = this.state;
        // wait until end of fetching
        while (!isFitched) {
            return <ReactLoading type='cylon' />
        }
        if (isLoggedIn) {
            return <div id='nav'>
                <Navbar disconnection={this.disconnection} />
            </div>
        }


        return <div id='auth'>
            <Auth connection={this.connection} />
        </div>

    }

}

export default Container;