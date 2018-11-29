import {
    Button, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import React, { Component } from 'react';
import Messege from './Messege';
import ReactLoading from 'react-loading';



class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: [],
            Regester: false,
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


    // Fron-end Validation Funtion
    validateForm() {

        let fields = this.state.fields;
        let errors = [];
        let formIsValid = true;


        if (!fields.email) {
            formIsValid = false;
            errors.push("*Please enter your email-ID.");

        }

        if (typeof fields.email !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields.email)) {
                formIsValid = false;
                errors.push("*Please enter valid email-ID.");
            }
        }


        if (!fields.password) {
            formIsValid = false;
            errors.push("*Please enter your password.");
        }


        //only check that if the user is Regestering
        if (this.state.Regester) {

            if (!fields.password2) {
                formIsValid = false;
                errors.push("*and Please confirme your password.");
            }



            if (fields.password2 !== fields.password) {
                formIsValid = false;
                errors.push("*PAsswords does not match !!.");
            }
        }

        this.setState({
            errors: [...errors],
            fields: {}
        })

        this.clearFeilds();

        if (!formIsValid)
            this.setState({
                isFitched: true
            })

        return formIsValid;

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
        this.setState({ Regester: !this.state.Regester, errors: [] });
    }

    handleClick() {

        this.setState({
            isFitched: false
        })

        if (this.validateForm()) {

            const route = this.state.Regester ? 'regester' : 'login';
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const options = {
                method: 'POST',
                headers,
                body: JSON.stringify(this.state.fields)
            }

            const request = new Request(`/auth/${route}`, options)
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
        if (this.state.Regester) {
            return <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Password2" className="mr-sm-2">Confirme Password</Label>
                <Input type="password" name="password2" id="Password2" placeholder="confime that :)" onChange={this.handleChange} />
            </FormGroup>
        }
    }



    render() {
        let { isFitched, Regester } = this.state;

        while (!isFitched) {
            return <ReactLoading type='bubbles' />
        }
        let active = Regester ? 'Login' : 'Regester'
        let disactive = !Regester ? 'Login' : 'Regester'

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