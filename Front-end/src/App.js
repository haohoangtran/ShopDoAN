import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Home from './pages/HomePage'
import About from './pages/About'
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import {connect} from 'react-redux'
import store from './redux/Store'
import ACTIONTYPE from './redux/ActionType'


class App extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            user: localStorage.getItem('user'),
        }
        this.logout.bind(this);
    }

    logout(e) {
        localStorage.setItem('user', '');
        window.location.replace("/");
    }

    render() {
        return (
            <Router>
                <div>
                    {(() => {
                        if (this.props.isLogin || this.state.user) {
                            return (
                                <ul className="nav nav-pills" style={{width: '100%', height: '100px'}}>
                                    <li role="presentation">
                                        <a href={"/home"}>Home</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={"/about"}>About</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={"/cart"}>Cart</a>
                                    </li>
                                    <li>
                                    <a onClick={this.logout}>logout</a>
                                    </li>
                                </ul>
                            )
                        }
                    })()}
                    <div class="main">
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/cart" component={Cart}/>
                    </div>
                </div>
            </Router>
        );
    }
}


export default connect((state) => {
    return {
        isLogin: state.isLogin,
        activePage: state.activePage
    }
})(App);
