import React, {Component} from 'react'
import {Step, List, Label} from 'semantic-ui-react'

const CONFIG = require('../../config')

class OrderStatusPage extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            orders: []
        }
    }

    componentWillMount() {
        const idUserSave = JSON.parse(localStorage.getItem(CONFIG.User)).id;
        console.log(idUserSave)
        fetch(`${CONFIG.BASE_URL}/get/order/${idUserSave}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({orders: responseJson})
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const colors = [
            'red', 'orange', 'yellow', 'olive', 'green', 'teal',
            'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
        ]
        return (
            <div style={{
                width: '50%',
                'display': 'block',
                'marginLeft': 'auto',
                'marginRight': 'auto',
                marginBottom: '16px'
            }}>
                <List relaxed='very' verticalAlign={'middle'}>


                    {this.state.orders.map((item, key) => {
                        return (
                            <div>
                                <Label color={'green'} style={{display: 'inline-block', marginTop: '16px'}}
                                       content={`Đơn hàng #${item.Id}`}/>
                                <Label color={colors[Math.floor(Math.random() * (colors.length - 1))] || 'green'}
                                       style={{display: 'inline-block'}}
                                       content={`Giá: ${item.TotalPrice}đ`}/>
                                <Label pointing={'left'} color={item.isShipping ? 'blue' : 'pink'}
                                       style={{display: 'inline-block'}}
                                       content={item.isShipping ? `Hoàn thành` : "Đang xử lý"}/>
                                <Step.Group ordered>
                                    <Step completed>
                                        <Step.Content>
                                            <Step.Title>Đã gửi</Step.Title>
                                            <Step.Description>Đơn hàng của bạn đã được gửi đi</Step.Description>
                                        </Step.Content>
                                    </Step>
                                    <Step completed={item.isReceive}>
                                        <Step.Content>
                                            <Step.Title>Nhận đơn</Step.Title>
                                            <Step.Description>Chúng tôi đang xử lý yêu cầu của bạn</Step.Description>
                                        </Step.Content>
                                    </Step>

                                    <Step completed={item.isShipping}>
                                        <Step.Content>
                                            <Step.Content>
                                                <Step.Title>Shipping</Step.Title>
                                                <Step.Description>Vui lòng chờ, đơn hàng của bạn đã được chuyển
                                                    đi</Step.Description>
                                            </Step.Content>
                                        </Step.Content>
                                    </Step>
                                </Step.Group>
                            </div>
                        )
                    })}

                </List>
            </div>
        )
    }
}

export default OrderStatusPage
