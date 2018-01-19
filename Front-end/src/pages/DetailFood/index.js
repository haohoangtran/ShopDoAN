import React, {Component} from 'react'
import {Button, Comment, Form, Header, Image, Label, Rating, Segment} from "semantic-ui-react";

const moment = require('moment')
require('moment/locale/vi.js')
moment.locale('vi');
const CONFIG = require('../../config');
export default class DetailFood extends Component {
    constructor(props) {
        super(...props)
        this.state = {
            food: {},
            user: localStorage.getItem(CONFIG.User),
            rateStar: 5,
            contentComment: "",
            isFocusedTextArea: false,
            comments: []
        }
    }

    componentWillMount() {
        this.refectFood();
    }

    refectFood() {
        fetch(`${CONFIG.BASE_URL}/get/food/${this.props.match.params.id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({food: responseJson, rateStar: responseJson.Rate})
            })
            .catch((error) => {
                console.error(error);
            });
        fetch(`${CONFIG.BASE_URL}/comment/${this.props.match.params.id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({comments: responseJson})
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        console.log(this.state.food['Rate'])
        return (
            <Segment>
                <Image src={this.state.food.Url} size='medium' floated='left'/>
                <p>
                    Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia facete scriptorem, est
                    autem aliquip
                    detraxit at. Usu ocurreret referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
                    electram, eos
                    choro alterum definiebas in. Vim dolorum definiebas an. Mei ex natum rebum iisque.
                </p>
                <p>
                    Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine definitiones. Quot wisi nulla ex
                    duo. Vis sint
                    solet expetenda ne, his te phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
                    phaedrum, vim
                    vivendum maiestatis in.
                </p>
                <p>
                    Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut facer dolores adolescens,
                    no illum
                    aperiri quo, usu odio brute at. Qui te porro electram, ea dico facete utroque quo. Populo quodsi te
                    eam, wisi
                    everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu per, quas minimum
                    postulant per id.
                </p>
                <Label style={{display: 'inline-block', margin: '8px'}} color={"green"} content={"Đánh giá"}/>
                <Rating onRate={(e, data) => {
                    this.setState({rateStar: data.rating});
                }} style={{display: 'block', margin: '8px'}} size={"large"} icon='star'
                        defaultRating={this.state.food['Rate']} rating={this.state.rateStar}
                        maxRating={5}/>
                <Button style={{marginLeft: '8px'}} content={"Gửi"} onClick={() => {
                    let id = JSON.parse(localStorage.getItem(CONFIG.User)).id;
                    fetch(`${CONFIG.BASE_URL}/rate`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idUser: id,
                            idFood: this.state.food.Id,
                            rate: this.state.rateStar
                        }),
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            this.refectFood()
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }} inverted color={'violet'}/>
                <Comment.Group>
                    <Header as='h3' dividing>Comments</Header>
                    {this.state.comments.map((item, key) => {
                        return (
                            <Comment>
                                <Comment.Avatar src={item.Avatar||'http://react.semantic-ui.com/assets/images/avatar/small/matt.jpg'}/>
                                <Comment.Content>
                                    <Comment.Author as='a'>{item.Name}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{moment(item.Date,"YYYY-MM-DDTHH:mm:ss").fromNow()}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{item.content}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        )
                    })}
                    <Form reply>
                        <Form.TextArea value={this.state.contentComment} onChange={(e) => {
                            this.setState({contentComment: e.target.value})
                            console.log(e.target.value)
                        }}/>
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => {
                            let id = JSON.parse(localStorage.getItem(CONFIG.User)).id;
                            fetch(`${CONFIG.BASE_URL}/comment`, {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    idUser: id,
                                    idFood: this.state.food.Id,
                                    content: this.state.contentComment
                                }),
                            })
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    console.log(responseJson);
                                    this.refectFood();
                                    this.setState({contentComment: ""})
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }}/>
                    </Form>
                </Comment.Group>
            </Segment>
        )
    }
}