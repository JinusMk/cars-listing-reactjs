import * as actions from './actions'

export default function(
    state = {
        cars: [],
    },
    action
){
    switch(action.type){
        case actions.UPDATE_CARS: 
            return {...state, cars: action.payload}
        default:
            return state
    }
}