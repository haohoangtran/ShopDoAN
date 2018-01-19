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
            nameUser: "",
            address: "",
            phoneNumber: "",
            valuePayment: "ship",
            openModal: false
        };
        this.options = [
            {key: 'm', text: 'Male', value: 'male'},
            {key: 'f', text: 'Female', value: 'female'},
        ]
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

    getPriceFoods() {
        let total = 0
        for (let food of this.state.foodInCart) {
            total += food.count * food.NewPrice;
        }
        return total;
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
                    <Modal open={this.state.openModal} trigger={<Button color={"green"} inverted onClick={() => {
                        const idUserSave = JSON.parse(localStorage.getItem(CONFIG.User)).id;
                        console.log(idUserSave)
                        fetch(`${CONFIG.BASE_URL}/user/${idUserSave}`)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                console.log(idUserSave, responseJson)
                                this.setState({
                                    nameUser: responseJson.Name || "",
                                    address: responseJson.Address || "",
                                    phoneNumber: responseJson.PhoneNumber || "",
                                    openModal: true
                                });
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}>Đặt hàng</Button>}
                           style={{width: '50%', height: '700px'}}>
                        <Modal.Header>Thông tin giao hàng</Modal.Header>
                        <Modal.Content image scrolling>
                            <Modal.Description>
                                <Header>Lưu ý</Header>
                                <p>Kiểm tra các trường bên dưới, chúng tôi sẽ giao hàng cho bạn theo địa chỉ này</p>
                                <Form.Group widths='equal'>
                                    <Form.Input style={!this.state.nameUser ? {border: '1px solid red'} : {}} fluid
                                                label='Họ tên' placeholder='Nhập tên bạn'
                                                value={this.state.nameUser} onChange={(e) => {

                                        this.setState({nameUser: e.target.value})
                                    }}/>
                                    <Form.Input style={!this.state.address ? {border: '1px solid red'} : {}} fluid
                                                label='Địa chỉ' placeholder='Địa chỉ' value={this.state.address}
                                                onChange={(e) => {

                                                    this.setState({address: e.target.value})
                                                }}/>
                                    <Form.Input type="number" style={!this.state.phoneNumber||this.state.phoneNumber.length<10||this.state.phoneNumber.length>11 ? {border: '1px solid red'} : {}} fluid
                                                label='Số điện thoại' placeholder='Số điện thoại'
                                                value={this.state.phoneNumber} onChange={(e) => {
                                        this.setState({phoneNumber: e.target.value})
                                    }}/>

                                </Form.Group>
                                <Form.Group inline>
                                    <Label content={"Phương thức thanh toán"} color={'green'}
                                           style={{marginTop: '8px'}}/>
                                    <Label pointing={'left'} content={`${this.getPriceFoods()}đ`} color={'yellow'}
                                           style={{marginTop: '8px'}}/>
                                    <Form.Radio label='Visa' value='sm' checked={this.state.valuePayment === 'visa'}
                                                onChange={() => {
                                                    this.setState({valuePayment: 'visa'})
                                                }}/>
                                    <Form.Radio label='PayPal' value='md' checked={this.state.valuePayment === 'paypal'}
                                                onChange={() => {
                                                    this.setState({valuePayment: 'paypal'})
                                                }}/>
                                    <Form.Radio label='Ship COD' value='lg' checked={this.state.valuePayment === 'ship'}
                                                onChange={() => {
                                                    this.setState({valuePayment: 'ship'})
                                                }}/>
                                </Form.Group>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button primary
                                    disabled={!this.state.nameUser || !this.state.phoneNumber || !this.state.address || this.state.foodInCart.length === 0}
                                    onClick={() => {
                                        let arr = [];
                                        const idUser = JSON.parse(localStorage.getItem(CONFIG.User)).id;

                                        for (let food of this.state.foodInCart) {

                                            arr.push(
                                                {
                                                    id: food.Id, count: food.count
                                                }
                                            )
                                        }
                                        console.log(arr)
                                        let insertStr = arr.map(function (elem) {
                                            return `${elem.id},${elem.count}`;
                                        }).join(";");
                                        fetch(`${CONFIG.BASE_URL}/order`, {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                inputStr: insertStr,
                                                idUser: idUser,
                                                address: this.state.address,
                                                phoneNumber: this.state.phoneNumber
                                            }),
                                        })
                                            .then((response) => response.json())
                                            .then((responseJson) => {
                                                console.log(responseJson);
                                                if (responseJson.status) {
                                                    this.setState({openModal: false, openConfirm: true});
                                                } else {
                                                    this.setState({openModal: false})
                                                }
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    }}>
                                Gửi <Icon name='right chevron'/>
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <Confirm
                        style={{height: '150px'}}
                        open={this.state.openConfirm}
                        content='Đặt hàng thành công'
                        cancelButton={"Đóng"}
                        onConfirm={() => {
                            this.props.history.push('/home')
                            localStorage.setItem(CONFIG.Cart, '[]')
                        }}
                        onCancel={() => {
                            this.props.history.push('/home');
                            localStorage.setItem(CONFIG.Cart, '[]')
                        }}
                    />
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