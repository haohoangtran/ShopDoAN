import React, { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import {connect} from "react-redux";
import ACTION_TYPE from '../../redux/ActionType'
import store from '../../redux/Store';
class MenuCustom extends Component {

    handleItemClick = (e, { name }) => store.dispatch({type:ACTION_TYPE.CHANGE_PAGE,page:name});

    render() {
        const { activeItem } = this.props.activePage;
        return (
            <Menu size='mini'>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />

                <Menu.Menu position='right'>
                    <Dropdown item text='Language'>
                        <Dropdown.Menu>
                            <Dropdown.Item>English</Dropdown.Item>
                            <Dropdown.Item>Russian</Dropdown.Item>
                            <Dropdown.Item>Spanish</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item>
                        <Button primary>Sign Up</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
export default connect((state) => {
    return {
        activePage: state.activePage
    };
})(MenuCustom);