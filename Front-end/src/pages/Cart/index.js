import React, {Component} from 'react';
import './index.css'

import 'semantic-ui-css/semantic.min.css';
import {
    Button,
    ButtonGroup,
    Card,
    Confirm,
    Form,
    Header,
    Icon,
    Image,
    Label,
    List,
    Modal,
    Rating
} from 'semantic-ui-react'
import {connect} from "react-redux";

const CONFIG = require('../../config')

class CartPage extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            allFood: [],
            foodInCart: [],
            cart: new Set(JSON.parse(localStorage.getItem(CONFIG.Cart) || [])),
            openConfirm: false,
            nameUser:"",
            address:"",
            phoneNumber:""
        }
    }

    componentWillMount() {
        this.getAllFood();
        if (!localStorage.getItem('user')) {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        console.log(this.state.cart)
    }

    getAllFood() {
        fetch(`${CONFIG.BASE_URL}/food`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                let arr = []
                for (let food of responseJson) {
                    let cartItem = this.getCountFromId(food.Id);
                    if (cartItem) {
                        food.count = cartItem.count;
                        arr.push(food)
                    }
                }

                this.setState({
                    foodInCart: arr,
                    allFood: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }


    getCountFromId(id) {
        let cart = [...this.state.cart];
        for (let item of cart) {
            if (item.Id === id) {
                return item
            }
        }
        return null;
    }

    render() {
        const activeItem = this.props.activePage;
        console.log(this.state.foodInCart)
        return (
            <div style={{
                width: '50%',
                'display': 'block',
                'marginLeft': 'auto',
                'marginRight': 'auto',
                marginBottom: '16px'
            }}>
                <List relaxed='very' verticalAlign={'middle'}>
                    {this.state.foodInCart.map((item, key) =>
                        <List.Item>
                            <Image size='small' wrapped circular src={item.Url}/>
                            <List.Content>
                                <List.Header as='a'>{item.Name}</List.Header>
                                <Label pointing={"left"} circular color={'green'}
                                       style={{display: 'inline-block'}}>{item.count}</Label>
                                <Label color={'green'}
                                       style={{display: 'inline-block'}}>Giá: {item.count * item.NewPrice}đ</Label>
                                <List.Description>Last seen watching <a><b>Arrested Development</b></a> just
                                    now.</List.Description>
                                <Button.Group>

                                    <Button disabled={item.count === 0} basic color='yellow' icon='minus'
                                            onClick={() => {
                                                let arrFoods = [];
                                                for (let food of this.state.foodInCart) {
                                                    if (food.Id === item.Id) {
                                                        food.count -= 1;

                                                    }
                                                    arrFoods.push(food)
                                                }
                                                this.setState({foodInCart: arrFoods});
                                                let cart = [...this.state.cart];
                                                for (let c of cart) {
                                                    if (c.Id === item.Id) {
                                                        c.count -= 1;
                                                    }
                                                }
                                                localStorage.setItem(CONFIG.Cart, JSON.stringify(cart));
                                            }}/>
                                    <Button disabled={item.count === 20} basic color='green' icon='add'
                                            onClick={() => {
                                                let arrFoods = []
                                                for (let food of this.state.foodInCart) {
                                                    if (food.Id === item.Id) {
                                                        food.count += 1;

                                                    }
                                                    arrFoods.push(food)
                                                }
                                                this.setState({foodInCart: arrFoods})
                                                let cart = [...this.state.cart];
                                                for (let c of cart) {
                                                    if (c.Id === item.Id) {
                                                        c.count += 1;
                                                    }
                                                }
                                                localStorage.setItem(CONFIG.Cart, JSON.stringify(cart));
                                            }}
                                    />
                                    <Button basic color='red' icon='delete' onClick={() => {
                                        let cart = [...this.state.cart];
                                        let foods = this.state.foodInCart.filter(f => f.Id !== item.Id);
                                        console.log('jojo', foods)
                                        this.setState({foodInCart: foods});
                                        cart = cart.filter(c => c.Id !== item.Id);
                                        localStorage.setItem(CONFIG.Cart, JSON.stringify(cart));
                                    }}/>
                                </Button.Group>
                            </List.Content>
                        </List.Item>
                    )}


                </List>
                <center style={{marginTop: '10%'}}>
                    <Modal trigger={<Button color={"green"} inverted onClick={()=>{
                        fetch(`${CONFIG.BASE_URL}/user/${localStorage.getItem(CONFIG.User).Id}`)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                this.setState({
                                    nameUser: responseJson.Name ||"",
                                    address:responseJson.Address||"",
                                    phoneNumber:responseJson.PhoneNumber||""
                                });
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}>Scrolling Content Modal</Button>}
                           style={{width: '50%', height: '500px'}}>
                        <Modal.Header>Thông tin giao hàng</Modal.Header>
                        <Modal.Content image scrolling>
                            <Modal.Description>
                                <Header>Lưu ý</Header>
                                <p>Kiểm tra các trường bên dưới, chúng tôi sẽ giao hàng cho bạn theo địa chỉ này</p>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Họ tên' placeholder='Nhập tên bạn' value={this.state.nameUser} onChange={(e)=>{

                                        this.setState({nameUser:e.target.value})
                                    }}/>
                                    <Form.Input fluid label='Địa chỉ' placeholder='Địa chỉ' value={this.state.address}  onChange={(e)=>{

                                        this.setState({address:e.target.value})
                                    }}/>
                                    <Form.Input fluid label='Số điện thoại' placeholder='Số điện thoại' value={this.state.phoneNumber}  onChange={(e)=>{

                                        this.setState({phoneNumber:e.target.value})
                                    }}/>
                                </Form.Group>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button primary>
                                Proceed <Icon name='right chevron'/>
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </center>
            </div>

        )
    }

}

export default connect((state) => {
    return {
        activePage: state.activePage,

    };
})(CartPage);