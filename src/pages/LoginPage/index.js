import React, {Component} from 'react';
import './main.css';
import './util.css';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import ActionType from "../../redux/ActionType";
import store from '../../redux/Store'
class Login extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            email: '',
            password: '',
            wrongEmail:false
        }
    }
    goToHome = () => {
        store.dispatch({type:ActionType.CHANGE_IS_LOGIN})
    };

    render() {
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
                                <input className="input100" type="text" name="email" onChange={(event) => {
                                    this.setState({email: event.target.value,wrongEmail:false})
                                }}/>
                                <span className="focus-input100"
    data-placeholder={this.state.email.length === 0 ? "Email" : ""}/>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <span className="btn-show-pass">
                                    <i className="zmdi zmdi-eye"/>
                                    </span>
                                <input className="input100" type="password" name="pass"
                                       onChange={(event) => {
                                           this.setState({password: event.target.value,wrongEmail:false})
                                       }}/>
                                <span className="focus-input100"
    data-placeholder={this.state.password.length === 0 ? "Password" : ""}/>
                            </div>
                            <h3>{this.state.wrongEmail?"Tên tài khoản hoặc mật khẩu không đúng!":""}</h3>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"/>
                                    <button className="login100-form-btn" onClick={()=>{
                                        console.log(this.state.email,this.state.password);
                                        // this.goToHome();
                                        this.setState({wrongEmail:true});
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state)=>{

})(Login);
