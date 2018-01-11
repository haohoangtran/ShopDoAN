import ACTION_TYPE from './ActionType'
let defaultState={cart:[1]};
export default function (state=defaultState, action) {
    switch (action.type){
        case ACTION_TYPE.ADD_TO_CARD:{
            return state
        }
        case ACTION_TYPE.GET_ALL_PRODUCT:{
            return state
        }
        default:
            return state
    }

}