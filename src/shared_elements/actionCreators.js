import * as actions from './actions'

export function fetchCarsList(){
    return (dispatch) => (
        fetch(`https://run.mocky.io/v3/7ce099a1-0ca6-45b7-99cd-b3e76b7f1d32`)
        .then(res => res.json())
        .then(response => {
          dispatch({
            type: actions.UPDATE_CARS,
            payload: response.cars
          })
        })
    ) 
}