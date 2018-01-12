import ACTION_TYPE from './ActionType'
let defaultState={
    isLogin:false,
    cart:[]
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
            return {...state,isLogin:!state.isLogin,cart:[1]}
        }
        default:
            return state
    }

}