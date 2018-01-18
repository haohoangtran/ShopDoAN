import ACTION_TYPE from './ActionType'
let defaultState={
    isLogin:false,
    cart:[],
    activePage: 'home'
};
export default function (state=defaultState, action) {
    switch (action.type){
        case ACTION_TYPE.ADD_TO_CARD:{
            return state
        }
        case ACTION_TYPE.GET_ALL_PRODUCT:{
            return state
        }
        case ACTION_TYPE.CHANGE_IS_LOGIN:{
            return {...state,isLogin:action.value}
        }
        case ACTION_TYPE.CHANGE_PAGE:{
            return {...state,activePage:action.page}
        }
        default:
            return state
    }

}