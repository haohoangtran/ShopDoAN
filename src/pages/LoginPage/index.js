import React, {Component} from 'react';
import './main.css';
import './util.css';

class Login extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div className="limiter">
                <img src="images/bg.jpg" id="bg" alt=""/>
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" method="post" action="question">
					<span className="login100-form-title p-b-26">
						Welcome
					</span>
                            <span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                <input className="input100" type="text" name="email" onChange={(event) => {
                                    this.setState({email: event.target.value})
                                }}/>
                                <span className="focus-input100"
                                      data-placeholder={this.state.email.length === 0 ? "Email" : ""}></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <span className="btn-show-pass">
                                    <i className="zmdi zmdi-eye"></i>
                                    </span>
                                <input className="input100" type="password" name="pass"
                                       onChange={(event) => {
                                           this.setState({password: event.target.value})
                                       }}/>
                                <span className="focus-input100"
                                      data-placeholder={this.state.password.length === 0 ? "Password" : ""}></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button className="login100-form-btn" onClick={()=>{
                                        console.log('click')
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
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
