import React, {Component} from 'react';
import '../../support/css/signin.css';
import { Form, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {onUserRegister} from '../../action';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Register extends Component{
    componentWillReceiveProps(newProps){
        console.log(newProps.username)
        if(newProps.username!==""){
            cookies.set('dataUser',newProps.username,{path: '/'})
            cookies.set('idUser',newProps.id,{path: '/'})
        }
      }
      onBtnRegisterClick =()=> {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.phone.value;
        var password= this.refs.password.value
        var password2= this.refs.password2.value
        if(password !== password2){
        return (<p>password isnt match</p>)
        }
        this.props.onUserRegister({username,email,phone,password});
    
      }
      renderError=()=>{
        if(this.props.error.length > 0){
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }
    
    render(){
        if(this.props.username===''){
        return(
            <div className="signin">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-12">
                            <Form  className="form-signin text-center" id="login-form">
                                <h2 className="h3 mb-3 font-weight-normal">Register</h2>
                            <div className="form-group">
                                <label htmlFor="inputUsername" className="label-signin">Username:</label>
                                <Input className="form-control" ref="username" type="text" name="name" id="name" placeholder="Your Username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputUsername" className="label-signin">Email:</label>
                                <Input className="form-control" ref="email" type="email" name="email" id="email" placeholder="Your Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputUsername" className="label-signin">Phone Number:</label>
                                <Input className="form-control" ref="phone" type="number" name="number" id="number" placeholder="+628xxxx" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputUsername" className="label-signin">Password:</label>
                                <Input className="form-control" ref="password" type="password" name="pass" id="pass" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputUsername" className="label-signin">Re-Password:</label>
                                <Input className="form-control" ref="password2" type="password" name="pass" id="pass" placeholder="Password" />
                            </div>
                            <div className="checkbox mb-3">
                                <label>
                                    <Input type="checkbox" name="remember-me" id="remember-me" className="agree-term" /> Remember me
                                </label>
                            </div>
                            <div>
                                {this.renderError()}
                            </div>
                            <div className="form-group form-button">
                                <Input onClick={this.onBtnRegisterClick} type="button" name="signup" id="signup" className="form-submit" defaultValue="Submit" />
                            </div>
                        </Form>
                    </div>        
                </div>
            </div>               
        </div>
        )
    } 
    return <Redirect to="/home"/>
  }
}
const mapStateToProps =(state)=>{
    return {
        username: state.auth.username,
        id:state.auth.id,
        error: state.auth.error,
        loading: state.auth.loading
    
    };
}
export default connect(mapStateToProps,{onUserRegister})(Register);