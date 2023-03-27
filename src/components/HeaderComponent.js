import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import{ loginUser, logoutUser} from '../actions/authActions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUpModalOpen: false,
            isLoginModalOpen: false
        };
        this.toggleSignUpModal = this.toggleSignUpModal.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
        // this.handleLogout = this.handleLogout.bind(this);
    }
    toggleSignUpModal() {this.setState({ isSignUpModalOpen: !this.state.isSignUpModalOpen });}
    toggleLoginModal() {this.setState({isLoginModalOpen: !this.state.isLoginModalOpen});}

    handleLogin=(event)=> {
        this.toggleLoginModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
        }
    // handleLogout() {
    //     this.props.logoutUser();
    // }
    render() {
        return(
            <React.Fragment>                                                    
                <Link className="nav-link" to="/">
                    Home
                </Link>                                    
                { !this.props.auth.isAuthenticated ?
                    <div>
                    <Button outline onClick={()=>this.toggleLoginModal()}>
                        SignUp
                        {this.props.auth.isFetching ?
                        <span>..Loading</span>
                        : null
                        }
                    </Button>  
                    <Button outline onClick={()=>this.toggleLoginModal()}>
                        Login
                        {this.props.auth.isFetching ?
                        <span>..Loading</span>
                        : null
                        }
                    </Button> 
                    </div>
                                                            
                    :
                    <div>
                    {this.props.auth.user.admin ?
                        <Link to="/admin">Admin</Link>
                        : null
                    }                                
                        <span >{this.props.auth.user.username} {"     "}
                        </span>
                        <Button  onClick={()=>this.props.logoutUser()}>
                                Logout
                            {this.props.auth.isFetching ?
                                <span >..Loading</span>
                                : null
                            }
                        </Button>
                    </div>
                }             
                
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                <Zoom>    
                <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                <button className="close-modal" onClick={this.toggleLoginModal}>
                Close
              </button>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                    </Zoom>
                </Modal>

                <Modal isOpen={this.state.isSignUpModalOpen} toggle={this.toggleSignUpModal}>
                <Zoom>    
                <ModalHeader toggle={this.toggleSignUpModal}>SignUp</ModalHeader>
                <button className="close-modal" onClick={this.toggleSignUpModal}>
                Close
                </button>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                    </Zoom>
                </Modal>
            </React.Fragment>
        );
    }
}

export default connect(
(state) =>({  auth:state.auth }),
{
    loginUser,
    logoutUser
}
) (Header);