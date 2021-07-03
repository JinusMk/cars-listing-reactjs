import React from 'react'
import favActive from '../assets/images/favourite_active.svg'
import favInActive from '../assets/images/favourite_inactive.svg'

export default function CarItem(props){
    const { car } = props
    return(
        <div className="carItemWrapper">
            <img src={car.photo} alt="img" className="featuredImg"/>
            <h3 className="heading2">
                <span>{car.name}</span>
                {car.isFavourite ? <img src={favActive} alt="active" onClick={() => props.handleUpdateFavourites(car.id)}/> : <img src={favInActive} alt="inactive" onClick={() => props.handleUpdateFavourites(car.id)}/>}
            </h3>
        </div>
    )
}