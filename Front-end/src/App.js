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
import OrderStatus from "./pages/OrderStatus";
import DetailFood from "./pages/DetailFood";
import {connect} from 'react-redux'
import store from './redux/Store'
import ACTIONTYPE from './redux/ActionType'
import {Menu} from "semantic-ui-react";


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
        const items = [
            {key: 'editorials', active: true, name: 'Editorials'},
            {key: 'review', name: 'Reviews'},
            {key: 'events', name: 'Upcoming Events'},
        ]
        return (
            <Router>
                <div>
                    {(() => {
                        if (this.props.isLogin || this.state.user) {
                            return (
                                <ul className="nav nav-pills" style={{width: '100%', height: '50px'}}>
                                    <li role="presentation">
                                        <a href={"/home"}>Trang chính</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={"/orderStatus"}>Trạng thái đơn hàng</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={"/cart"}>Giỏ hàng</a>
                                    </li>
                                    <li role="presentation">
                                        <a href={"/about"}>Về chúng tôi</a>
                                    </li>
                                    <li>
                                        <a onClick={this.logout}>Đăng xuất</a>
                                    </li>
                                </ul>
                            )
                        }
                    })()}
                    <div className="main">
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/cart" component={Cart}/>
                        <Route exact path="/orderStatus" component={OrderStatus}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/detail/:id" component={DetailFood}/>
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
