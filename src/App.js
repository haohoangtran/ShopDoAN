import React, { Component } from 'react';
import logo from './logo.svg';
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

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/about" component={About}/>
                <Route path="/register" component={Register}/>
            </div>
        </Router>
    );
  }
}

export default App;
