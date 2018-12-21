import {
    Button, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import React, { Component } from 'react';
import Messege from './Messege';
import ReactLoading from 'react-loading';
import API_url from "../API_url"
import validateForm from './validateForm' ;



class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: [],
            isRegestering: false,
            isFitched: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.switchForm = this.switchForm.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderConfirmPassword = this.renderConfirmPassword.bind(this);
        this.clearFeilds = this.clearFeilds.bind(this);
    }


    componentWillReceiveProps() {

        this.setState({ errors: [] });
        this.clearFeilds();
    }

    

    clearFeilds() {
        document.getElementById('email').value = '';
        document.getElementById('Password').value = '';
        if (this.state.Regester)
            document.getElementById('Password2').value = '';
    }


    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    switchForm() {
        this.setState({ isRegestering: !this.state.isRegestering, errors: [] });
    }

    handleClick() {
        let { formIsValid, errors } = validateForm(this.state.fields,this.state.isRegestering);

        if (!formIsValid){
            

            this.setState({
                errors: [...errors],
                fields: {},
                isFitched : true
            })

            this.clearFeilds();

        }

        else {

            this.setState({
                isFitched: false
            })

            const route = this.state.isRegestering ? 'regester' : 'login';
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const options = {
                method: 'POST',
                headers,
                body: JSON.stringify(this.state.fields)
            }

            const request = new Request(`${API_url}/auth/${route}`, options)
            fetch(request)
                .then(response => {
                    return response.json();

                })
                .then(response => {
                    // if authontication failled (we did not get a token)
                    if (!response.token) {
                        this.setState({
                            errors: [response.messege]
                        })
                    }
                    else {
                        // set the token to session storge
                        sessionStorage.setItem('jwToken', response.token);
                        this.props.connection();
                    }
                    this.setState({
                        isFitched: true
                    })
                })
                .catch(err => {
                    this.setState({
                        errors: [err]
                    })
                })
        }

    }



    renderConfirmPassword() {
        if (this.state.isRegestering) {
            return <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Password2" className="mr-sm-2">Confirme Password</Label>
                <Input type="password" name="password2" id="Password2" placeholder="confime that :)" onChange={this.handleChange} />
            </FormGroup>
        }
    }



    render() {
        let { isFitched, isRegestering } = this.state;

        while (!isFitched) {
            return <ReactLoading type='bubbles' />
        }
        let active = isRegestering ? 'Login' : 'Regester'
        let disactive = !isRegestering ? 'Login' : 'Regester'

        return <Form className="form">
                    <Messege color='secondary' messeges={[disactive + ' Form :']} />
                    <FormGroup>
                        <Label for="email" >Email</Label>
                        <Input type="email" name="email" id="email" placeholder="test@shops.com" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Password" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="Password" placeholder="don't tell!" onChange={this.handleChange} />
                    </FormGroup>
                    {this.renderConfirmPassword()}
                    <Messege color='dark' messeges={this.state.errors} />
                    <Button id='submit' size="lg" block onClick={this.handleClick} >{disactive}</Button>
                    <Breadcrumb className='Breadcrumb'>
                        <BreadcrumbItem>
                            <Button outline color="secondary" onClick={this.switchForm}>{active}
                            </Button>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{disactive}</BreadcrumbItem>
                    </Breadcrumb>
                </Form>
    }
}


export default Auth