import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserLogin } from '../../action';

const cookies = new Cookies();

class Login extends Component{
    componentWillReceiveProps(newProps){
        console.log(newProps.username)
        if(newProps.username!==""){
            cookies.set('dataUser', newProps.username,{path:'/'})
            cookies.set('idUser', newProps.id,{path:'/'})
        }
    }
    onBtnLoginClick = () => {
        var username = this.refs.username.refs.tbusername.value;
        var password = this.refs.password.refs.tbpassword.value;
        this.props.onUserLogin({ username, password});
    }
    renderError = () => {
        if(this.props.loading == false){
            if(this.props.error.length > 0){
                return <p className="alert alert-danger">{this.props.error}</p>
            }
        }
    }
    renderButton = () => {
        if(this.props.loading){
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return <Button onClick={this.onBtnLoginClick} type="submit" class="form-submit">Log in</Button>
    }

    render(){
        if(this.props.username ===''){
            return(
                <div>
                    <Form style={{ margin: "0 auto", paddingTop: "50px"}} className="col-3">
                        <FormGroup>
                            <Label for="exampleUsername">Username</Label>
                            <Input type="text" name="username" ref="username" innerRef="tbusername" id="exampleUsername" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" ref="password" innerRef="tbpassword" id="examplePassword" placeholder="Your Password" />
                        </FormGroup>
                            {this.renderError()}
                            {this.renderButton()}
                    </Form>
                </div>
                )
            }
            return <Redirect to="/"/>
        }
    }

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        id: state.auth.id,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps,{onUserLogin})(Login);