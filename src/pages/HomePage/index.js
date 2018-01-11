import React, { Component } from 'react';
import store from '../../redux/Store'
export default class HomePage extends Component{
    constructor(props){
        super(...props);
        this.state={
            cart:store.getState().cart
        }

    }
    render(){
        return (
            <h1>Home</h1>
        )
    }
}