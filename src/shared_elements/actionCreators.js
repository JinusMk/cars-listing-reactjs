import * as actions from './actions'
import { getStore }  from '../store/globalStore'

export function fetchCarsList(){
  return (dispatch) => (
    fetch(`https://run.mocky.io/v3/7ce099a1-0ca6-45b7-99cd-b3e76b7f1d32`)
    .then(res => res.json())
    .then(response => {
      if(localStorage.getItem('favIds') && JSON.parse(localStorage.getItem('favIds')).length){
        let favIds = JSON.parse(localStorage.getItem('favIds'))
        let updatedCars = response.cars.map(car => favIds.includes(car.id) ? {...car, isFavourite: true}: car)
        dispatch({
          type: actions.UPDATE_CARS,
          payload: updatedCars
        })
      }else{
        dispatch({
          type: actions.UPDATE_CARS,
          payload: response.cars
        })
      }
    })
) 
}