import React, {Component} from 'react';
import './index.css'
import 'semantic-ui-css/semantic.min.css';
import {Button, Card, Confirm, Header, Icon, Image, List, Modal, Rating} from 'semantic-ui-react'
import {connect} from "react-redux";

const CONFIG = require('../../config')

class HomePage extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            foods: [],
            cart: new Set(JSON.parse(localStorage.getItem(CONFIG.Cart)||[])),
            openConfirm: false,
            foodChoose: {}
        }

    }

    componentWillMount() {
        this.getAllFood();
    }
    componentDidMount(){
        console.log(this.state.cart)
    }

    getAllFood() {
        fetch(`${CONFIG.BASE_URL}/food`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    foods: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    checkInCart(id){
        let cart=[...this.state.cart]

        for (let item of cart){
            if(item.Id===id){
                return true;
            }
        }
        return false;
    }

    render() {
        const activeItem = this.props.activePage;
        return (
            <div id="wrapper">
                <Card.Group itemsPerRow={5} textAlign={'center'}>
                    {this.state.foods.map(value =>
                        <Card class={"child"} >
                            <Image onClick={()=>{
                                console.log(value);
                                this.props.history.push(`/detail/${value.Id}`)
                            }} src={value.Url}/>
                            <Card.Content onClick={()=>{
                                console.log(value);
                                this.props.history.push(`/detail/${value.Id}`)
                            }}>
                                <Card.Header>
                                    {value.Name}
                                </Card.Header>
                                <Card.Meta>
                                                <span style={{'textDecoration': 'line-through', display: 'block'}}
                                                      className='date'>
                                                    Giá cũ: {value.OldPrice}đ
                                                </span>
                                    <span style={{display: 'block', 'color': 'red'}} className='date'>
                                                    Giá mới: {value.NewPrice}đ
                                                </span>
                                    <Rating disabled icon='star' defaultRating={value.Rate} maxRating={5}/>
                                </Card.Meta>
                                <Card.Description>
                                    {value.Description}
                                </Card.Description>

                            </Card.Content>
                            <Card.Content extra textAlign={"center"}>
                                <Button disabled={this.checkInCart(value.Id)} inverted color={"green"}
                                        onClick={() => {
                                            this.setState({openConfirm: true, foodChoose: value})
                                        }}>Thêm vào giỏ</Button>
                            </Card.Content>
                        </Card>
                    )}
                </Card.Group>
                <Confirm size={'small'} style={{height: '150px'}}
                         content={`Thêm ${this.state.foodChoose.Name} vào giỏ?`}
                         open={this.state.openConfirm}
                         onCancel={() => {
                             this.setState({openConfirm: false})
                         }}
                         onConfirm={() => {
                             this.setState({openConfirm: false, cart: this.state.cart.add({Id:this.state.foodChoose.Id,count:1})});
                             console.log(this.state.cart);
                             localStorage.setItem(CONFIG.Cart,JSON.stringify([...this.state.cart]))
                         }}
                />
            </div>
        )
    }

}

export default connect((state) => {
    return {
        activePage: state.activePage,

    };
})(HomePage);