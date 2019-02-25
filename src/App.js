import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from "universal-cookie";
import {keepLogin,cookieChecked} from './action';
import {withRouter} from 'react-router-dom';
import Login from './component/interface/Login';
import Header from './component/interface/Header';
import Register from './component/interface/Register';
import Home from './component/interface/Home';
import DetailProduk from './component/interface/DetailProduk';
import PageKategori from './component/feature/PageKategori';
import PageProduk from './component/feature/PageProduk';

const cookies = new Cookies();

class App extends Component {

  componentDidMount(){
    const userCookie = cookies.get('dataUser');
    if(userCookie !== undefined){
      this.props.keepLogin(userCookie);
    }
    else{
      this.props.cookieChecked();
    }
  }

  render() {
    if(this.props.cookie){
      return (
        <div>
          <Header navBrand={'LOOTBOX'} />
            <div>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/produk-detail' component={DetailProduk}/>
              <Route exact path='/editproduk' component={PageProduk}/>
              <Route exact path='/editkategori' component={PageKategori}/>
            </div>
        </div>
      );
    }
    return (<div><center><h1>Loading...</h1></center></div>)
  }
}

const mapStateToProps =(state)=>{
  return {
      cookie: state.auth.cookie
  };
}

export default withRouter(connect(mapStateToProps, {keepLogin,cookieChecked})(App));

