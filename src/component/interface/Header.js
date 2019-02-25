import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { onUserLogout, keepLogin } from '../../action';

const cookies = new Cookies();

class Header extends Component{
    state = { listUser:[], searchListUser: [] }

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    componentDidMount() {
        axios.get('http://localhost:2000/users')
            .then((res) => {
                this.setState({ listUser: res.data, searchListUser: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }
    onLogOutSelect = () => {
        this.props.onUserLogout();
        cookies.remove('dataUser');
    }

    render() {
        if(this.props.username === "admin") {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink href="/editproduk">Manage Produk</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/editkategori">Manage Categories</NavLink>
                                        </NavItem>
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                Hello, {this.props.username}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>
                                                    coming soon                          
                                                </DropdownItem>
                                                <DropdownItem>
                                                    coming soon
                                                </DropdownItem>
                                            <DropdownItem divider />
                                        <DropdownItem onClick={this.onLogOutSelect}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        }
        if(this.props.username === "") {
            return (
                <div>
                 <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                   <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto" navbar>
                       <NavItem>
                        <Link to="/register"><NavLink>Register</NavLink></Link>
                       </NavItem>
                       <NavItem>
                        <Link to="/login"><NavLink>Login</NavLink></Link>
                       </NavItem>
                      </Nav>
                     </Collapse>
                    </Navbar>
                </div>
            )
        }
        return (
            <div>
             <Navbar color="light" light expand="md">
              <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
               <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                 <Nav className="ml-auto" navbar>
                  <NavItem>
                   <NavLink href="/produk">Search Product</NavLink>
                    </NavItem>
                     <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                       Hello, {this.props.username}
                      </DropdownToggle>
                        <DropdownMenu right>
                         <DropdownItem>
                          coming soon                          
                           </DropdownItem>
                            <DropdownItem>
                             coming soon
                            </DropdownItem>
                             <DropdownItem divider />
                              <DropdownItem onClick={this.onLogOutSelect}>
                               Logout
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                         </Nav>
                        </Collapse>
                       </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      username:state.auth.username
    }
}
  
export default connect(mapStateToProps, {onUserLogout, keepLogin})(Header);