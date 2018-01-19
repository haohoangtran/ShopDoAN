import React, {Component} from 'react';
import './main.css';
import './util.css';
import {connect} from 'react-redux'
import ActionType from "../../redux/ActionType";
import store from '../../redux/Store';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const CONFIG = require('../../config')

class Login extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            email: '',
            password: '',
            wrongEmail: false,
            isEmail: false,
            open: false,
            msg: ""
        }

    }

    componentDidMount() {

        document.title = "Login to ...";
        let user=localStorage.getItem(CONFIG.User)
        if (user) {
            this.props.history.push('/')
        }

    }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    checkLogin = () => {
        fetch(`${CONFIG.BASE_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.status && responseJson.isActive) {
                    store.dispatch({type: ActionType.CHANGE_IS_LOGIN, value: true});
                    localStorage.setItem(CONFIG.User,JSON.stringify(responseJson.user))
                    this.props.history.push("/home");
                } else if (responseJson.status && !responseJson.isActive) {
                    this.setState({open: true, msg: 'Vui lòng kiểm tra hộp thư và xác nhận email của bạn!'})
                } else {
                    this.setState({wrongEmail: true, password: ''})
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={() => {
                    this.setState({open: false});
                }}
            />
        ];
        return (
            <div className="limiter">
                <img src="images/bg.jpg" id="bg" alt=""/>
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form validate-form">
					<span className="login100-form-title p-b-26">
						Welcome
					</span>
                            <span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"/>
					</span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                <input className="input100" type="text" name="email" value={this.state.email}
                                       onChange={(event) => {
                                           this.setState({email: event.target.value, wrongEmail: false})
                                       }}/>
                                <span className="focus-input100"
                                      data-placeholder={this.state.email.length === 0 ? "Email" : ""}/>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <span className="btn-show-pass">
                                    <i className="zmdi zmdi-eye"/>
                                    </span>
                                <input className="input100" type="password" value={this.state.password}
                                       onChange={(event) => {
                                           this.setState({password: event.target.value, wrongEmail: false})
                                       }}/>
                                <span className="focus-input100"
                                      data-placeholder={this.state.password.length === 0 ? "Password" : ""}/>
                            </div>
                            <h3>{this.state.wrongEmail ? "Tên tài khoản hoặc mật khẩu không đúng!" : ""}</h3>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"/>
                                    <button className="login100-form-btn" onClick={() => {
                                        console.log(this.state.email, this.state.password);
                                        this.checkLogin();
                                    }}>
                                        Login
                                    </button>
                                </div>
                            </div>

                            <div className="text-center p-t-115">
                                    <span className="txt1">
                                    Don’t have an account?
                                    </span>

                                <a className="txt2" href="/register">
                                    Sign Up
                                </a>
                            </div>
                            <MuiThemeProvider>
                                <Dialog
                                    title="Thông báo!"
                                    actions={actions}
                                    modal={true}
                                    open={this.state.open}
                                >
                                    {this.state.msg}
                                </Dialog>
                            </MuiThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLogin: state.isLogin
    };
})(Login);